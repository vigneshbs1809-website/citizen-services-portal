/**
 * Citizen Services Portal - API Client with Local Fallback
 * ========================================================
 * Communicates with the Flask REST API backend (`/api/services`, `/api/categories`, `/api/search`).
 * If the backend is running, live data from the SQLite database is used.
 * If the backend is unreachable or offline, automatically falls back to local JSON demo data
 * without breaking the UI.
 */

import { servicesData as localServices } from '../data/servicesData';
import { serviceCategories as localCategories } from '../data/categoriesData';
import { searchServices as localSearch } from '../utilities/searchService';
import { STATES_AND_UTS, getStateByCode } from '../data/statesData';
import { getDistrictsForState } from '../data/districtsData';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:5000/api';
const TIMEOUT_MS = 600;

let isBackendOffline = false;
let lastOfflineCheck = 0;
const OFFLINE_CACHE_DURATION = 10000; // 10 seconds

/**
 * Merge API service object with local reference to guarantee complete schema attributes
 */
function mergeWithLocalService(apiService) {
  if (!apiService || !apiService.id) return apiService;
  const localMatch = localServices.find((s) => s.id === apiService.id) || {};
  return {
    ...localMatch,
    ...apiService,
    requiredDocuments:
      Array.isArray(apiService.requiredDocuments) && apiService.requiredDocuments.length > 0
        ? apiService.requiredDocuments
        : localMatch.requiredDocuments || [],
    simpleSteps:
      Array.isArray(apiService.simpleSteps) && apiService.simpleSteps.length > 0
        ? apiService.simpleSteps
        : localMatch.simpleSteps || [],
    documentDetails:
      Array.isArray(apiService.documentDetails) && apiService.documentDetails.length > 0
        ? apiService.documentDetails
        : localMatch.documentDetails || [],
    eligibilityCriteria:
      apiService.eligibilityCriteria && Object.keys(apiService.eligibilityCriteria).length > 0
        ? apiService.eligibilityCriteria
        : localMatch.eligibilityCriteria || {},
  };
}

/**
 * Fetch wrapper with timeout to prevent hanging on network failures
 */
async function fetchWithTimeout(url, options = {}, timeoutMs = TIMEOUT_MS) {
  const now = Date.now();
  if (isBackendOffline && now - lastOfflineCheck < OFFLINE_CACHE_DURATION) {
    throw new Error('Backend recently marked offline; failing over instantly');
  }

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
        ...(options.headers || {})
      }
    });
    clearTimeout(id);
    isBackendOffline = false;
    return response;
  } catch (error) {
    clearTimeout(id);
    isBackendOffline = true;
    lastOfflineCheck = Date.now();
    throw error;
  }
}

/**
 * GET /api/services
 * Fetches services from Flask API with fallback to local JSON dataset
 */
export async function getServices(options = {}) {
  let { category, popular, lang } = options;
  if (!lang && typeof localStorage !== 'undefined') {
    lang = localStorage.getItem('i18nextLng');
  }
  if (lang) {
    lang = lang.slice(0, 2).toLowerCase();
  } else {
    lang = 'en';
  }

  const params = new URLSearchParams();

  if (category && category !== 'all') {
    params.append('category', category);
  }
  if (popular !== undefined) {
    params.append('popular', popular ? 'true' : 'false');
  }
  if (lang) {
    params.append('lang', lang);
  }

  const queryString = params.toString() ? `?${params.toString()}` : '';
  const url = `${API_BASE}/services${queryString}`;

  try {
    const res = await fetchWithTimeout(url);
    if (res.ok) {
      const data = await res.json();
      if (data && data.success && Array.isArray(data.services)) {
        return data.services.map(mergeWithLocalService);
      }
    }
  } catch (err) {
    // Backend offline or unreachable: fall back gracefully
    console.debug('[API] Backend unreachable, using local demo data fallback:', err.message);
  }

  // Local JSON fallback
  let fallback = [...localServices];
  if (category && category !== 'all') {
    fallback = fallback.filter((s) => s.category === category);
  }
  if (popular) {
    fallback = fallback.filter((s) => s.isPopular);
  }
  return fallback;
}

/**
 * GET /api/services/<id>
 * Fetches single service details from Flask API with fallback to local JSON
 */
export async function getServiceById(id, lang = null) {
  if (!id) return null;
  if (!lang && typeof localStorage !== 'undefined') {
    lang = localStorage.getItem('i18nextLng');
  }
  if (lang) {
    lang = lang.slice(0, 2).toLowerCase();
  } else {
    lang = 'en';
  }

  const params = new URLSearchParams();
  if (lang) {
    params.append('lang', lang);
  }
  const queryString = params.toString() ? `?${params.toString()}` : '';
  const url = `${API_BASE}/services/${encodeURIComponent(id)}${queryString}`;

  try {
    const res = await fetchWithTimeout(url);
    if (res.ok) {
      const data = await res.json();
      if (data && data.success && data.service) {
        return mergeWithLocalService(data.service);
      }
    }
  } catch (err) {
    console.debug(`[API] Fallback for service '${id}':`, err.message);
  }

  // Local fallback
  return localServices.find((s) => s.id === id) || null;
}

/**
 * GET /api/categories
 * Fetches categories list from Flask API with fallback to local JSON
 */
export async function getCategories() {
  const url = `${API_BASE}/categories`;

  try {
    const res = await fetchWithTimeout(url);
    if (res.ok) {
      const data = await res.json();
      if (data && data.success && Array.isArray(data.categories)) {
        return data.categories;
      }
    }
  } catch (err) {
    console.debug('[API] Categories fallback used:', err.message);
  }

  return [...localCategories];
}

/**
 * GET /api/search?q=<query>&category=<category>&lang=<lang>
 * Fetches search results from Flask API with fallback to local search engine
 */
export async function searchServicesApi(query, category = 'all', lang = null, t = null) {
  let resolvedLang = 'en';
  let resolvedT = t;
  if (typeof lang === 'function') {
    resolvedT = lang;
    resolvedLang = (resolvedT?.i18n?.language || (typeof localStorage !== 'undefined' && localStorage.getItem('i18nextLng')) || 'en');
  } else if (typeof lang === 'string') {
    resolvedLang = lang;
  } else if (typeof localStorage !== 'undefined') {
    resolvedLang = localStorage.getItem('i18nextLng') || 'en';
  }
  resolvedLang = (resolvedLang || 'en').slice(0, 2).toLowerCase();

  if (!query || !query.trim()) {
    return getServices({ category, lang: resolvedLang });
  }

  const params = new URLSearchParams();
  params.append('q', query.trim());
  if (category && category !== 'all') {
    params.append('category', category);
  }
  if (resolvedLang) {
    params.append('lang', resolvedLang);
  }

  const url = `${API_BASE}/search?${params.toString()}`;

  try {
    const res = await fetchWithTimeout(url);
    if (res.ok) {
      const data = await res.json();
      if (data && data.success && Array.isArray(data.services)) {
        return data.services.map(mergeWithLocalService);
      }
    }
  } catch (err) {
    console.debug('[API] Search fallback used:', err.message);
  }

  // Fallback to local multilingual search engine
  return localSearch(query, category, resolvedT);
}

/**
 * GET /api/states
 * Fetches all 36 Indian states and union territories with fallback to local master
 */
export async function getStatesApi(regionType = null) {
  const params = new URLSearchParams();
  if (regionType) {
    params.append('type', regionType);
  }
  const queryString = params.toString() ? `?${params.toString()}` : '';
  const url = `${API_BASE}/states${queryString}`;

  try {
    const res = await fetchWithTimeout(url);
    if (res.ok) {
      const data = await res.json();
      if (data && data.success && Array.isArray(data.states)) {
        return data.states;
      }
    }
  } catch (err) {
    console.debug('[API] States fallback used:', err.message);
  }

  // Local fallback
  if (regionType) {
    return STATES_AND_UTS.filter((s) => s.regionType.toLowerCase() === regionType.toLowerCase());
  }
  return [...STATES_AND_UTS];
}

/**
 * GET /api/states/<state_code>
 * Fetches single state details with departments and official portals
 */
export async function getStateDetailsApi(stateCode) {
  if (!stateCode) return null;
  const url = `${API_BASE}/states/${encodeURIComponent(stateCode.toUpperCase())}`;

  try {
    const res = await fetchWithTimeout(url);
    if (res.ok) {
      const data = await res.json();
      if (data && data.success && data.state) {
        return data.state;
      }
    }
  } catch (err) {
    console.debug(`[API] State details fallback for '${stateCode}':`, err.message);
  }

  return getStateByCode(stateCode);
}

/**
 * GET /api/states/<state_code>/districts
 * Fetches districts for given state code
 */
export async function getStateDistrictsApi(stateCode) {
  if (!stateCode) return [];
  const url = `${API_BASE}/states/${encodeURIComponent(stateCode.toUpperCase())}/districts`;

  try {
    const res = await fetchWithTimeout(url);
    if (res.ok) {
      const data = await res.json();
      if (data && data.success && Array.isArray(data.districts)) {
        return data.districts;
      }
    }
  } catch (err) {
    console.debug(`[API] Districts fallback for '${stateCode}':`, err.message);
  }

  return getDistrictsForState(stateCode);
}
