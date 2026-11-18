const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const http = require('http');

const PORT = 9226;
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const USER_DATA = path.join(__dirname, 'temp_cdp_screens');
const OUT_DIR = path.join(__dirname, '..', 'citizen-services-portal', 'screenshots');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

class CDP {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.ws = null;
    this.id = 1;
    this.callbacks = new Map();
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.wsUrl);
      this.ws.onopen = () => resolve();
      this.ws.onerror = (e) => reject(e);
      this.ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id && this.callbacks.has(msg.id)) {
          const { res, rej } = this.callbacks.get(msg.id);
          this.callbacks.delete(msg.id);
          if (msg.error) rej(msg.error);
          else res(msg.result);
        }
      };
    });
  }

  send(method, params = {}) {
    return new Promise((res, rej) => {
      const id = this.id++;
      this.callbacks.set(id, { res, rej });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  async screenshot(filePath) {
    const result = await this.send('Page.captureScreenshot', { format: 'png' });
    const buffer = Buffer.from(result.data, 'base64');
    fs.writeFileSync(filePath, buffer);
  }

  close() {
    if (this.ws) this.ws.close();
  }
}

async function run() {
  const chrome = spawn(CHROME_PATH, [
    '--headless=new',
    `--remote-debugging-port=${PORT}`,
    '--no-first-run',
    '--disable-gpu',
    `--user-data-dir=${USER_DATA}`,
    'about:blank'
  ]);

  await sleep(2000);

  try {
    const targets = await fetchJson(`http://127.0.0.1:${PORT}/json/list`);
    const pageTarget = targets.find(t => t.type === 'page');
    if (!pageTarget) throw new Error('No page target found');

    const cdp = new CDP(pageTarget.webSocketDebuggerUrl);
    await cdp.connect();
    await cdp.send('Page.enable');
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false
    });

    const routes = [
      { name: '01_homepage.png', url: 'http://127.0.0.1:5174/' },
      { name: '02_welcome.png', url: 'http://127.0.0.1:5174/welcome' },
      { name: '03_services.png', url: 'http://127.0.0.1:5174/services' },
      { name: '04_service_detail.png', url: 'http://127.0.0.1:5174/services/income-certificate' },
      { name: '05_assistant.png', url: 'http://127.0.0.1:5174/assistant/income-certificate' },
      { name: '06_documents.png', url: 'http://127.0.0.1:5174/documents' },
      { name: '07_glossary.png', url: 'http://127.0.0.1:5174/glossary' },
      { name: '08_accessibility.png', url: 'http://127.0.0.1:5174/accessibility' },
      { name: '09_help.png', url: 'http://127.0.0.1:5174/help' }
    ];

    // Ensure portal_welcomed is true so / does not redirect to /welcome
    await cdp.send('Page.navigate', { url: 'http://127.0.0.1:5174/welcome' });
    await sleep(1500);
    await cdp.send('Runtime.evaluate', {
      expression: `localStorage.setItem('portal_welcomed', 'true');`
    });

    for (const r of routes) {
      console.log(`Navigating to ${r.url}...`);
      await cdp.send('Page.navigate', { url: r.url });
      await sleep(1200);
      const outPath = path.join(OUT_DIR, r.name);
      await cdp.screenshot(outPath);
      console.log(`Saved screenshot: ${r.name}`);
    }

    cdp.close();
  } finally {
    chrome.kill();
  }
}

run().catch(console.error);
