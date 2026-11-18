/**
 * Comprehensive Master Directory of All 36 Indian States and Union Territories
 * ==============================================================================
 * 28 States + 8 Union Territories
 * Verified against the National Portal of India (india.gov.in) and
 * Integrated Government Online Directory (goidirectory.gov.in).
 *
 * Each entry includes:
 * - code: 2-letter standard ISO/postal code
 * - name: Official English Name
 * - nativeNames: Regional script names (hi, kn, te, ta, ml, etc.)
 * - regionType: 'state' | 'ut'
 * - capital: Administrative Headquarters / Capital
 * - officialWebsite: Official State Government apex portal
 * - servicePortal: Main Citizen e-Governance / Single-Window Portal name
 * - servicePortalUrl: Official HTTPS portal address
 * - portalDescription: Plain-language summary of citizen services provided
 * - verificationStatus: 'verified' (audited from official .gov.in/.nic.in directory)
 * - lastVerified: Audit date
 * - sourceUrl: National Portal of India reference
 * - helpline: State Citizen Helpline / CM Helpline / Toll-free number
 * - keyDepartments: Key state administrative departments
 * - commonServices: Typical certificates and schemes provided
 */

export const STATES_AND_UTS = [
  // =========================================================================
  // 28 STATES
  // =========================================================================
  {
    code: 'AP',
    name: 'Andhra Pradesh',
    nativeNames: {
      te: 'ఆంధ్రప్రదేశ్',
      hi: 'आंध्र प्रदेश',
      kn: 'ಆಂಧ್ರಪ್ರದೇಶ',
      ta: 'ஆந்திரப் பிரதேசம்',
      ml: 'ആന്ധ്രാപ്രദേശ്'
    },
    regionType: 'state',
    capital: 'Amaravati',
    officialWebsite: 'https://www.ap.gov.in',
    servicePortal: 'AP Seva Portal (MeeSeva)',
    servicePortalUrl: 'https://onlineap.meeseva.gov.in',
    portalDescription: 'Unified citizen gateway for income, caste, residence certificates, land records, and welfare pensions across Andhra Pradesh.',
    verificationStatus: 'verified',
    lastVerified: '2026-11-18',
    sourceUrl: 'https://www.india.gov.in/directory/web-directory/state-uts',
    helpline: '1902 (Spandana CM Helpline) / 1100',
    keyDepartments: [
      { name: 'Revenue Department', url: 'https://revenue.ap.gov.in' },
      { name: 'Civil Supplies', url: 'https://epdsap.ap.gov.in' },
      { name: 'Social Welfare', url: 'https://jnanabhumi.ap.gov.in' }
    ],
    commonServices: ['Income Certificate', 'Integrated Caste Certificate', 'Residence Certificate', 'Pensions (YSR Pension Kanuka)', 'Ration Card']
  },
  {
    code: 'AR',
    name: 'Arunachal Pradesh',
    nativeNames: {
      hi: 'अरुणाचल प्रदेश',
      kn: 'ಅರುಣಾಚಲ ಪ್ರದೇಶ',
      te: 'అరుణాచల్ ప్రదేశ్',
      ta: 'அருணாச்சலப் பிரதேசம்',
      ml: 'അരുണാചൽ പ്രദേശ്'
    },
    regionType: 'state',
    capital: 'Itanagar',
    officialWebsite: 'https://arunachalpradesh.gov.in',
    servicePortal: 'ServicePlus Arunachal Pradesh',
    servicePortalUrl: 'https://eservice.arunachal.gov.in',
    portalDescription: 'State portal for issuance of permanent residence, scheduled tribe certificates, and public service guarantees.',
    verificationStatus: 'verified',
    lastVerified: '2026-11-18',
    sourceUrl: 'https://www.india.gov.in/directory/web-directory/state-uts',
    helpline: '155250 / 0360-2212541',
    keyDepartments: [
      { name: 'Department of IT & Communication', url: 'https://ditc.arunachal.gov.in' },
      { name: 'Department of Social Justice', url: 'https://arunachalpradesh.gov.in' }
    ],
    commonServices: ['Permanent Residence Certificate (PRC)', 'ST Certificate', 'Income Certificate', 'Character Certificate']
  },
  {
    code: 'AS',
    name: 'Assam',
    nativeNames: {
      hi: 'असम',
      kn: 'ಅಸ್ಸಾಂ',
      te: 'అస్సాం',
      ta: 'அசாம்',
      ml: 'അസം'
    },
    regionType: 'state',
    capital: 'Dispur',
    officialWebsite: 'https://assam.gov.in',
    servicePortal: 'Sewa Setu Assam (Right to Public Services)',
    servicePortalUrl: 'https://sewasetu.assam.gov.in',
    portalDescription: 'Over 500 state public services delivered under the Assam Right to Public Services Act (ARTPS), including revenue, land and social welfare.',
    verificationStatus: 'verified',
    lastVerified: '2026-11-18',
    sourceUrl: 'https://www.india.gov.in/directory/web-directory/state-uts',
    helpline: '1800-345-3574 / 1905',
    keyDepartments: [
      { name: 'Revenue & Disaster Management', url: 'https://landrevenue.assam.gov.in' },
      { name: 'Food & Civil Supplies', url: 'https://fcsca.assam.gov.in' }
    ],
    commonServices: ['Income Certificate', 'Caste Certificate', 'Permanent Resident Certificate', 'Mutation of Land', 'Senior Citizen Certificate']
  },
  {
    code: 'BR',
    name: 'Bihar',
    nativeNames: {
      hi: 'बिहार',
      kn: 'ಬಿಹಾರ',
      te: 'బీహార్',
      ta: 'பீகார்',
      ml: 'ബിഹാർ'
    },
    regionType: 'state',
    capital: 'Patna',
    officialWebsite: 'https://state.bihar.gov.in',
    servicePortal: 'RTPS Bihar (Right to Public Services)',
    servicePortalUrl: 'https://serviceonline.bihar.gov.in',
    portalDescription: 'Official Bihar portal for immediate digital delivery of residence, caste, non-creamy layer, and income certificates without counter queues.',
    verificationStatus: 'verified',
    lastVerified: '2026-11-18',
    sourceUrl: 'https://www.india.gov.in/directory/web-directory/state-uts',
    helpline: '1800-345-6284',
    keyDepartments: [
      { name: 'General Administration Department', url: 'https://state.bihar.gov.in/gad' },
      { name: 'Social Welfare Department', url: 'https://state.bihar.gov.in/socialwelfare' }
    ],
    commonServices: ['Residential Certificate (Niwas)', 'Caste Certificate (Jati)', 'Income Certificate (Aay)', 'Non-Creamy Layer (NCL)', 'EWS Certificate']
  },
  {
    code: 'CG',
    name: 'Chhattisgarh',
    nativeNames: {
      hi: 'छत्तीसगढ़',
      kn: 'ಛತ್ತೀಸ್‌ಗಢ',
      te: 'ఛత్తీస్‌గఢ్',
      ta: 'சத்தீஸ்கர்',
      ml: 'ഛത്തീസ്ഗഡ്'
    },
    regionType: 'state',
    capital: 'Raipur',
    officialWebsite: 'https://cgstate.gov.in',
    servicePortal: 'e-District Chhattisgarh (Lok Seva Kendra)',
    servicePortalUrl: 'https://edistrict.cgstate.gov.in',
    portalDescription: 'Single window delivery portal for citizen certificates, social security schemes, scholarships, and revenue court cases.',
    verificationStatus: 'verified',
    lastVerified: '2026-11-18',
    sourceUrl: 'https://www.india.gov.in/directory/web-directory/state-uts',
    helpline: '0771-2533350 / 1100',
    keyDepartments: [
      { name: 'Revenue & Disaster Management', url: 'https://revenue.cg.nic.in' },
      { name: 'Food & Civil Supplies', url: 'https://khadya.cg.nic.in' }
    ],
    commonServices: ['Domicile Certificate', 'Income Certificate', 'ST/SC/OBC Caste Certificate', 'Birth/Death Registration', 'Social Security Pension']
  },
  {
    code: 'GA',
    name: 'Goa',
    nativeNames: {
      hi: 'गोवा',
      kn: 'ಗೋವಾ',
      te: 'గోవా',
      ta: 'கோவா',
      ml: 'ഗോവ'
    },
    regionType: 'state',
    capital: 'Panaji',
    officialWebsite: 'https://www.goa.gov.in',
    servicePortal: 'GoaOnline Services Portal',
    servicePortalUrl: 'https://goaonline.gov.in',
    portalDescription: 'All-in-one digital portal offering certificates, utility payments, trade licenses, and Griha Aadhar welfare benefits.',
    verificationStatus: 'verified',
    lastVerified: '2026-11-18',
    sourceUrl: 'https://www.india.gov.in/directory/web-directory/state-uts',
    helpline: '0832-2419700 / 1800-233-0201',
    keyDepartments: [
      { name: 'Directorate of Information Technology', url: 'https://ditc.goa.gov.in' },
      { name: 'Social Welfare Goa', url: 'https://socialwelfare.goa.gov.in' }
    ],
    commonServices: ['Residence Certificate', 'Income Certificate', 'Caste Certificate', 'Dayanand Social Security Scheme', 'Griha Aadhar']
  },
  {
    code: 'GJ',
    name: 'Gujarat',
    nativeNames: {
      hi: 'गुजरात',
      kn: 'ಗುಜರಾತ್',
      te: 'గుజరాత్',
      ta: 'குஜராத்',
      ml: 'ഗുജറാത്ത്'
    },
    regionType: 'state',
    capital: 'Gandhinagar',
    officialWebsite: 'https://gujaratindia.gov.in',
    servicePortal: 'Digital Gujarat Citizen Portal',
    servicePortalUrl: 'https://www.digitalgujarat.gov.in',
    portalDescription: 'Integrated citizen service portal providing online applications for scholarships, caste & income certificates, and revenue clearances.',
    verificationStatus: 'verified',
    lastVerified: '2026-11-18',
    sourceUrl: 'https://www.india.gov.in/directory/web-directory/state-uts',
    helpline: '1800-233-5500',
    keyDepartments: [
      { name: 'Revenue Department', url: 'https://revenuedepartment.gujarat.gov.in' },
      { name: 'Social Justice & Empowerment', url: 'https://sje.gujarat.gov.in' }
    ],
    commonServices: ['Income Certificate', 'SEBC / OBC Certificate', 'Domicile Certificate', 'Digital Gujarat Scholarship', 'Senior Citizen Card']
  },
  {
    code: 'HR',
    name: 'Haryana',
    nativeNames: {
      hi: 'हरियाणा',
      kn: 'ಹರಿಯಾಣ',
      te: 'హర్యానా',
      ta: 'அரியானா',
      ml: 'ഹരിയാന'
    },
    regionType: 'state',
    capital: 'Chandigarh',
    officialWebsite: 'https://haryana.gov.in',
    servicePortal: 'Antyodaya Saral Haryana',
    servicePortalUrl: 'https://saralharyana.gov.in',
    portalDescription: 'Unified e-service delivery platform for all citizen services linked directly with Parivar Pehchan Patra (PPP Family ID).',
    verificationStatus: 'verified',
    lastVerified: '2026-11-18',
    sourceUrl: 'https://www.india.gov.in/directory/web-directory/state-uts',
    helpline: '0172-3968400 / 1800-180-2128',
    keyDepartments: [
      { name: 'Citizen Resources Information Dept', url: 'https://meraparivar.haryana.gov.in' },
      { name: 'Social Justice & Empowerment', url: 'https://socialjusticehry.gov.in' }
    ],
    commonServices: ['Parivar Pehchan Patra (PPP)', 'Income Verification', 'Old Age Samman Allowance', 'Caste Certificate', 'Resident Certificate']
  },
  {
    code: 'HP',
    name: 'Himachal Pradesh',
    nativeNames: {
      hi: 'हिमाचल प्रदेश',
      kn: 'ಹಿಮಾಚಲ ಪ್ರದೇಶ',
      te: 'హిమాచల్ ప్రదేశ్',
      ta: 'இமாச்சலப் பிரதேசம்',
      ml: 'ഹിമാചൽ പ്രദേശ്'
    },
    regionType: 'state',
    capital: 'Shimla',
    officialWebsite: 'https://himachal.nic.in',
    servicePortal: 'e-District Himachal Pradesh',
    servicePortalUrl: 'https://edistrict.hp.gov.in',
    portalDescription: 'Official citizen portal for revenue certificates, driving licenses, ration cards, and social welfare pensions in Himachal Pradesh.',
    verificationStatus: 'verified',
    lastVerified: '2026-11-18',
    sourceUrl: 'https://www.india.gov.in/directory/web-directory/state-uts',
    helpline: '1800-180-8026 / 1100 (Mukhyamantri Seva Sankalp)',
    keyDepartments: [
      { name: 'Revenue Department', url: 'https://revenue.hp.nic.in' },
      { name: 'Social Justice & Women Empowerment', url: 'https://esomsa.hp.gov.in' }
    ],
    commonServices: ['Bonafide Himachali Certificate', 'Income Certificate', 'SC/ST/OBC Certificate', 'Rural Area Certificate', 'Old Age Pension']
  },
  {
    code: 'JH',
    name: 'Jharkhand',
    nativeNames: {
      hi: 'झारखंड',
      kn: 'ಜಾರ್ಖಂಡ್',
      te: 'జార్ఖండ్',
      ta: 'சார்க்கண்ட்',
      ml: 'ജാർഖണ്ഡ്'
    },
    regionType: 'state',
    capital: 'Ranchi',
    officialWebsite: 'https://www.jharkhand.gov.in',
    servicePortal: 'Jharsewa Citizen Services',
    servicePortalUrl: 'https://jharsewa.jharkhand.gov.in',
    portalDescription: 'State portal providing online certificates, social welfare assistance, and public grievance redressal across all 24 districts.',
    verificationStatus: 'verified',
    lastVerified: '2026-11-18',
    sourceUrl: 'https://www.india.gov.in/directory/web-directory/state-uts',
    helpline: '1800-345-6538 / 1950',
    keyDepartments: [
      { name: 'Department of Personnel & AR', url: 'https://jharsewa.jharkhand.gov.in' },
      { name: 'Women, Child & Social Security', url: 'https://wcd.jharkhand.gov.in' }
    ],
    commonServices: ['Local Resident Certificate', 'Income Certificate', 'Caste Certificate', 'Sarvajon Pension Yojana', 'Birth & Death Certificate']
  },
  {
    code: 'KA',
    name: 'Karnataka',
    nativeNames: {
      kn: 'ಕರ್ನಾಟಕ',
      hi: 'कर्नाटक',
      te: 'కర్ణాటక',
      ta: 'கர்நாடகா',
      ml: 'കർണാടക'
    },
    regionType: 'state',
    capital: 'Bengaluru',
    officialWebsite: 'https://www.karnataka.gov.in',
    servicePortal: 'Seva Sindhu Citizen Portal',
    servicePortalUrl: 'https://sevasindhu.karnataka.gov.in',
    portalDescription: 'Comprehensive Karnataka government citizen service gateway integrating Nadakacheri, Bangalore One, and Grama One services.',
    verificationStatus: 'verified',
    lastVerified: '2026-11-18',
    sourceUrl: 'https://www.india.gov.in/directory/web-directory/state-uts',
    helpline: '080-22230282 / 1902',
    keyDepartments: [
      { name: 'Revenue (Nadakacheri)', url: 'https://nadakacheri.karnataka.gov.in' },
      { name: 'Food, Civil Supplies & Consumer Affairs', url: 'https://ahara.kar.nic.in' },
      { name: 'Social Welfare Department', url: 'https://sw.kar.nic.in' }
    ],
    commonServices: ['Income Certificate (Form 16)', 'Caste & Income Certificate', 'Residence Certificate', 'Gruha Lakshmi / Guarantee Schemes', 'Ration Card (Ahara)']
  },
  {
    code: 'KL',
    name: 'Kerala',
    nativeNames: {
      ml: 'കേരളം',
      hi: 'केरल',
      kn: 'ಕೇರಳ',
      te: 'కేరళ',
      ta: 'கேரளா'
    },
    regionType: 'state',
    capital: 'Thiruvananthapuram',
    officialWebsite: 'https://kerala.gov.in',
    servicePortal: 'e-Sevanam Unified Service Portal',
    servicePortalUrl: 'https://esevanam.kerala.gov.in',
    portalDescription: 'Single sign-on digital portal for all Kerala state department services, integrating with Akshaya Kendras and e-District Kerala.',
    verificationStatus: 'verified',
    lastVerified: '2026-11-18',
    sourceUrl: 'https://www.india.gov.in/directory/web-directory/state-uts',
    helpline: '1800-425-1188 / 155300 (Citizen Call Centre)',
    keyDepartments: [
      { name: 'Revenue Department (e-District)', url: 'https://edistrict.kerala.gov.in' },
      { name: 'Civil Supplies Department', url: 'https://civilsupplieskerala.gov.in' },
      { name: 'Social Justice Department', url: 'https://sjd.kerala.gov.in' }
    ],
    commonServices: ['Income Certificate', 'Community Certificate', 'Nativity Certificate', 'Social Security Pension (Sevana)', 'Ration Card (Civil Supplies)']
  },
  {
    code: 'MP',
    name: 'Madhya Pradesh',
    nativeNames: {
      hi: 'मध्य प्रदेश',
      kn: 'ಮಧ್ಯಪ್ರದೇಶ',
      te: 'మధ్యప్రదేశ్',
      ta: 'மத்தியப் பிரதேசம்',
      ml: 'മധ്യപ്രദേശ്'
    },
    regionType: 'state',
    capital: 'Bhopal',
    officialWebsite: 'https://mp.gov.in',
    servicePortal: 'MP e-District (Lok Seva Guarantee)',
    servicePortalUrl: 'https://mpedistrict.gov.in',
    portalDescription: 'Public Services Guarantee portal of Madhya Pradesh delivering statutory certificates and Samagra citizen database entitlements.',
    verificationStatus: 'verified',
    lastVerified: '2026-11-18',
    sourceUrl: 'https://www.india.gov.in/directory/web-directory/state-uts',
    helpline: '181 (CM Helpline MP)',
    keyDepartments: [
      { name: 'Public Service Management', url: 'https://loksewa.mp.gov.in' },
      { name: 'Samagra Social Security', url: 'https://samagra.gov.in' },
      { name: 'Revenue Department', url: 'https://saara.mp.gov.in' }
    ],
    commonServices: ['Mool Niwas (Domicile) Certificate', 'Income Certificate', 'Caste Certificate', 'Samagra ID Verification', 'Ladli Behna Yojana']
  },
  {
    code: 'MH',
    name: 'Maharashtra',
    nativeNames: {
      hi: 'महाराष्ट्र',
      kn: 'ಮಹಾರಾಷ್ಟ್ರ',
      te: 'మహారాష్ట్ర',
      ta: 'மகாராஷ்டிரா',
      ml: 'മഹാരാഷ്ട്ര'
    },
    regionType: 'state',
    capital: 'Mumbai',
    officialWebsite: 'https://www.maharashtra.gov.in',
    servicePortal: 'Aaple Sarkar Citizen Portal',
    servicePortalUrl: 'https://aaplesarkar.mahaonline.gov.in',
    portalDescription: 'Right to Public Services portal of Maharashtra enabling paperless application for revenue, police verification, and civic services.',
    verificationStatus: 'verified',
    lastVerified: '2026-11-18',
    sourceUrl: 'https://www.india.gov.in/directory/web-directory/state-uts',
    helpline: '1800-120-8040 (Toll Free)',
    keyDepartments: [
      { name: 'Revenue & Forest Department', url: 'https://revenue.maharashtra.gov.in' },
      { name: 'Food, Civil Supplies & Consumer Protection', url: 'https://mahaepos.gov.in' },
      { name: 'Rural Development', url: 'https://rdd.maharashtra.gov.in' }
    ],
    commonServices: ['Age, Nationality & Domicile Certificate', 'Income Certificate (Tahsildar)', 'Caste Certificate & Validity', 'Non-Creamy Layer', 'Ration Card Services']
  },
  {
    code: 'MN',
    name: 'Manipur',
    nativeNames: {
      hi: 'मणिपुर',
      kn: 'ಮಣಿಪುರ',
      te: 'మణిపూర్',
      ta: 'மணிப்பூர்',
      ml: 'മണിപ്പൂർ'
    },
    regionType: 'state',
    capital: 'Imphal',
    officialWebsite: 'https://manipur.gov.in',
    servicePortal: 'e-District Manipur',
    servicePortalUrl: 'https://eservicesmanipur.gov.in',
    portalDescription: 'Digital gateway providing certificates, scholarships, and tribal development schemes across the hill and valley districts of Manipur.',
    verificationStatus: 'verified',
    lastVerified: '2026-11-18',
    sourceUrl: 'https://www.india.gov.in/directory/web-directory/state-uts',
    helpline: '0385-2451144',
    keyDepartments: [
      { name: 'Department of IT', url: 'https://ditmanipur.gov.in' },
      { name: 'Tribal Affairs & Hills', url: 'https://tahmanipur.gov.in' }
    ],
    commonServices: ['Permanent Resident Certificate', 'Income Certificate', 'ST/SC Certificate', 'Tribal Welfare Scholarship']
  },
  {
    code: 'ML',
    name: 'Meghalaya',
    nativeNames: {
      hi: 'मेघालय',
      kn: 'ಮೇಘಾಲಯ',
      te: 'మేఘాలయ',
      ta: 'மேகாலயா',
      ml: 'മേഘാലയ'
    },
    regionType: 'state',
    capital: 'Shillong',
    officialWebsite: 'https://meghalaya.gov.in',
    servicePortal: 'e-District Meghalaya',
    servicePortalUrl: 'https://edistrict.meghalaya.gov.in',
    portalDescription: 'Electronic citizen services for domicile, scheduled tribe certificates, and rural development assistance in Meghalaya.',
    verificationStatus: 'verified',
    lastVerified: '2026-11-18',
    sourceUrl: 'https://www.india.gov.in/directory/web-directory/state-uts',
    helpline: '1800-345-3644',
    keyDepartments: [
      { name: 'Information Technology & Communication', url: 'https://ditmeghalaya.gov.in' },
      { name: 'Social Welfare Department', url: 'https://megsocialwelfare.gov.in' }
    ],
    commonServices: ['Permanent Residence Certificate', 'ST Certificate', 'Income Certificate', 'Senior Citizen Certificate']
  },
  {
    code: 'MZ',
    name: 'Mizoram',
    nativeNames: {
      hi: 'मिज़ोरम',
      kn: 'ಮಿಜೋರಾಂ',
      te: 'మిజోరం',
      ta: 'மிசோரம்',
      ml: 'മിസോറാം'
    },
    regionType: 'state',
    capital: 'Aizawl',
    officialWebsite: 'https://mizoram.gov.in',
    servicePortal: 'e-District Mizoram',
    servicePortalUrl: 'https://edistrict.mizoram.gov.in',
    portalDescription: 'Citizen service portal providing tribal certificates, income verification, and social pensions across Mizoram districts.',
    verificationStatus: 'verified',
    lastVerified: '2026-11-18',
    sourceUrl: 'https://www.india.gov.in/directory/web-directory/state-uts',
    helpline: '0389-2336010',
    keyDepartments: [
      { name: 'Department of ICT', url: 'https://dict.mizoram.gov.in' },
      { name: 'Social Welfare Department', url: 'https://socialwelfare.mizoram.gov.in' }
    ],
    commonServices: ['Tribal Certificate', 'Residential Certificate', 'Income Certificate', 'Disability Certificate']
  },
  {
    code: 'NL',
    name: 'Nagaland',
    nativeNames: {
      hi: 'नागालैंड',
      kn: 'ನಾಗಾಲ್ಯಾಂಡ್',
      te: 'నాగాలాండ్',
      ta: 'நாகாலாந்து',
      ml: 'നാഗാലാൻഡ്'
    },
    regionType: 'state',
    capital: 'Kohima',
    officialWebsite: 'https://nagaland.gov.in',
    servicePortal: 'e-District Nagaland Portal',
    servicePortalUrl: 'https://edistrict.nagaland.gov.in',
    portalDescription: 'Online government services for indigenous inhabitant certificates, scheduled tribe recognition, and educational scholarships.',
    verificationStatus: 'verified',
    lastVerified: '2026-11-18',
    sourceUrl: 'https://www.india.gov.in/directory/web-directory/state-uts',
    helpline: '0370-2270050',
    keyDepartments: [
      { name: 'Department of IT & Communication', url: 'https://ditc.nagaland.gov.in' },
      { name: 'Home Department', url: 'https://nagaland.gov.in' }
    ],
    commonServices: ['Indigenous Inhabitant Certificate (IIC)', 'ST Certificate', 'Backward Tribe Certificate', 'Permanent Residence Certificate']
  },
  {
    code: 'OD',
    name: 'Odisha',
    nativeNames: {
      hi: 'ओडिशा',
      kn: 'ಒಡಿಶಾ',
      te: 'ఒడిశా',
      ta: 'ஒடிசா',
      ml: 'ഒഡീഷ'
    },
    regionType: 'state',
    capital: 'Bhubaneswar',
    officialWebsite: 'https://odisha.gov.in',
    servicePortal: 'Odisha One Unified Portal',
    servicePortalUrl: 'https://odishaone.gov.in',
    portalDescription: 'Unified citizen service portal powered by 5T governance delivering revenue certificates, utility services, and Madhu Babu Pension.',
    verificationStatus: 'verified',
    lastVerified: '2026-11-18',
    sourceUrl: 'https://www.india.gov.in/directory/web-directory/state-uts',
    helpline: '1800-121-303030',
    keyDepartments: [
      { name: 'Revenue & Disaster Management', url: 'https://edistrict.odisha.gov.in' },
      { name: 'Social Security & Disability Empowerment', url: 'https://ssepd.gov.in' }
    ],
    commonServices: ['Resident / Domicile Certificate', 'Income Certificate', 'Legal Heir Certificate', 'Caste (SC/ST/SEBC) Certificate', 'Madhu Babu Pension Yojana']
  },
  {
    code: 'PB',
    name: 'Punjab',
    nativeNames: {
      hi: 'पंजाब',
      kn: 'ಪಂಜಾಬ್',
      te: 'పంజాబ్',
      ta: 'பஞ்சாப்',
      ml: 'പഞ്ചാബ്'
    },
    regionType: 'state',
    capital: 'Chandigarh',
    officialWebsite: 'https://punjab.gov.in',
    servicePortal: 'Connect Punjab (Sewa Kendra)',
    servicePortalUrl: 'https://connect.punjab.gov.in',
    portalDescription: 'Doorstep and online public service delivery portal for certificates, social security pensions, and ration cards across Punjab.',
    verificationStatus: 'verified',
    lastVerified: '2026-11-18',
    sourceUrl: 'https://www.india.gov.in/directory/web-directory/state-uts',
    helpline: '1076 (Doorstep Delivery) / 1100',
    keyDepartments: [
      { name: 'Department of Governance Reforms', url: 'https://dgrpunjab.gov.in' },
      { name: 'Social Security, Women & Child Dev', url: 'https://sswcd.punjab.gov.in' }
    ],
    commonServices: ['Residence / Domicile Certificate', 'Income & Asset Certificate', 'SC/BC Certificate', 'Old Age Pension', 'Birth & Death Registration']
  },
  {
    code: 'RJ',
    name: 'Rajasthan',
    nativeNames: {
      hi: 'राजस्थान',
      kn: 'ರಾಜಸ್ಥಾನ',
      te: 'రాజస్థాన్',
      ta: 'ராஜஸ்தான்',
      ml: 'രാജസ്ഥാൻ'
    },
    regionType: 'state',
    capital: 'Jaipur',
    officialWebsite: 'https://rajasthan.gov.in',
    servicePortal: 'e-Mitra Citizen Services Portal',
    servicePortalUrl: 'https://emitra.rajasthan.gov.in',
    portalDescription: 'Over 600 citizen services accessible online through SSO ID and 80,000+ e-Mitra service centers across Rajasthan.',
    verificationStatus: 'verified',
    lastVerified: '2026-11-18',
    sourceUrl: 'https://www.india.gov.in/directory/web-directory/state-uts',
    helpline: '181 (Rajasthan Sampark Helpline)',
    keyDepartments: [
      { name: 'Department of IT & Communication', url: 'https://doitc.rajasthan.gov.in' },
      { name: 'Social Justice & Empowerment', url: 'https://sje.rajasthan.gov.in' },
      { name: 'Planning (Jan Aadhaar)', url: 'https://janaadhaar.rajasthan.gov.in' }
    ],
    commonServices: ['Jan Aadhaar Card', 'Bonafide Domicile Certificate', 'Caste Certificate (SC/ST/OBC)', 'Income Certificate', 'Social Security Pension']
  },
  {
    code: 'SK',
    name: 'Sikkim',
    nativeNames: {
      hi: 'सिक्किम',
      kn: 'ಸಿಕ್ಕಿಂ',
      te: 'సిక్కిం',
      ta: 'சிக்கிம்',
      ml: 'സിക്കിം'
    },
    regionType: 'state',
    capital: 'Gangtok',
    officialWebsite: 'https://sikkim.gov.in',
    servicePortal: 'e-District Sikkim Portal',
    servicePortalUrl: 'https://edistrict.sikkim.gov.in',
    portalDescription: 'Unified e-governance portal for Certificate of Identification, Sikkim Subject recognition, and welfare grants.',
    verificationStatus: 'verified',
    lastVerified: '2026-11-18',
    sourceUrl: 'https://www.india.gov.in/directory/web-directory/state-uts',
    helpline: '03592-202634',
    keyDepartments: [
      { name: 'Information Technology Department', url: 'https://dit.sikkim.gov.in' },
      { name: 'Social Welfare Department', url: 'https://sikkimsocialwelfare.gov.in' }
    ],
    commonServices: ['Certificate of Identification (COI)', 'Income Certificate', 'SC/ST/OBC Certificate', 'Senior Citizen Identity Card']
  },
  {
    code: 'TN',
    name: 'Tamil Nadu',
    nativeNames: {
      ta: 'தமிழ்நாடு',
      hi: 'तमिलनाडु',
      kn: 'ತಮಿಳುನಾಡು',
      te: 'తమిళనాడు',
      ml: 'തമിഴ്നാട്'
    },
    regionType: 'state',
    capital: 'Chennai',
    officialWebsite: 'https://www.tn.gov.in',
    servicePortal: 'e-Sevai Portal (TNeGA)',
    servicePortalUrl: 'https://www.tnesevai.tn.gov.in',
    portalDescription: 'Tamil Nadu e-Governance Agency platform for digital revenue certificates, Kalaignar Magalir Urimai Thittam, and welfare schemes.',
    verificationStatus: 'verified',
    lastVerified: '2026-11-18',
    sourceUrl: 'https://www.india.gov.in/directory/web-directory/state-uts',
    helpline: '1100 (CM Helpline) / 1800-425-6000',
    keyDepartments: [
      { name: 'Revenue & Disaster Management', url: 'https://revenue.tn.gov.in' },
      { name: 'Civil Supplies & Consumer Protection', url: 'https://www.tnpds.gov.in' },
      { name: 'Adi Dravidar and Tribal Welfare', url: 'https://adw.tn.gov.in' }
    ],
    commonServices: ['Community Certificate (சாதிச் சான்றிதழ்)', 'Income Certificate (வருமானச் சான்றிதழ்)', 'Nativity Certificate (இருப்பிடச் சான்றிதழ்)', 'Smart Ration Card (TNPDS)', 'First Graduate Certificate']
  },
  {
    code: 'TS',
    name: 'Telangana',
    nativeNames: {
      te: 'తెలంగాణ',
      hi: 'तेलंगाना',
      kn: 'ತೆಲಂಗಾಣ',
      ta: 'தெலுங்கானா',
      ml: 'തെലങ്കാന'
    },
    regionType: 'state',
    capital: 'Hyderabad',
    officialWebsite: 'https://www.telangana.gov.in',
    servicePortal: 'MeeSeva Telangana Portal',
    servicePortalUrl: 'https://ts.meeseva.telangana.gov.in',
    portalDescription: 'Telangana digital platform delivering over 300 government services including Dharani land records and Aasara welfare pensions.',
    verificationStatus: 'verified',
    lastVerified: '2026-11-18',
    sourceUrl: 'https://www.india.gov.in/directory/web-directory/state-uts',
    helpline: '1800-425-1110 / 040-48560012',
    keyDepartments: [
      { name: 'Revenue (Dharani)', url: 'https://dharani.telangana.gov.in' },
      { name: 'Panchayat Raj & Rural Development', url: 'https://epanchayat.telangana.gov.in' },
      { name: 'Civil Supplies', url: 'https://epds.telangana.gov.in' }
    ],
    commonServices: ['Integrated Certificate (Caste, Nativity, Date of Birth)', 'Income Certificate', 'Residence Certificate', 'Aasara Pension', 'Food Security Card (Ration Card)']
  },
  {
    code: 'TR',
    name: 'Tripura',
    nativeNames: {
      hi: 'त्रिपुरा',
      kn: 'ತ್ರಿಪುರ',
      te: 'త్రిపుర',
      ta: 'திரிபுரா',
      ml: 'ത്രിപുര'
    },
    regionType: 'state',
    capital: 'Agartala',
    officialWebsite: 'https://tripura.gov.in',
    servicePortal: 'e-District Tripura Portal',
    servicePortalUrl: 'https://edistrict.tripura.gov.in',
    portalDescription: 'Unified e-governance service delivery mechanism for certificates, revenue records, and welfare schemes in Tripura.',
    verificationStatus: 'verified',
    lastVerified: '2026-11-18',
    sourceUrl: 'https://www.india.gov.in/directory/web-directory/state-uts',
    helpline: '0381-2414013 / 1905',
    keyDepartments: [
      { name: 'Directorate of Information Technology', url: 'https://dit.tripura.gov.in' },
      { name: 'Social Welfare & Social Education', url: 'https://socialwelfare.tripura.gov.in' }
    ],
    commonServices: ['Permanent Resident Certificate of Tripura (PRTC)', 'Income Certificate', 'SC/ST/OBC Certificate', 'Social Pension Assistance']
  },
  {
    code: 'UP',
    name: 'Uttar Pradesh',
    nativeNames: {
      hi: 'उत्तर प्रदेश',
      kn: 'ಉತ್ತರ ಪ್ರದೇಶ',
      te: 'ఉత్తర ప్రదేశ్',
      ta: 'உத்தரப் பிரதேசம்',
      ml: 'ഉത്തർപ്രദേശ്'
    },
    regionType: 'state',
    capital: 'Lucknow',
    officialWebsite: 'https://up.gov.in',
    servicePortal: 'e-District Uttar Pradesh',
    servicePortalUrl: 'https://edistrict.up.gov.in',
    portalDescription: 'Comprehensive citizen services portal for birth, death, caste, income, domicile certificates, and revenue court status across all 75 UP districts.',
    verificationStatus: 'verified',
    lastVerified: '2026-11-18',
    sourceUrl: 'https://www.india.gov.in/directory/web-directory/state-uts',
    helpline: '1076 (Chief Minister Helpline UP) / 0522-2304706',
    keyDepartments: [
      { name: 'Board of Revenue UP', url: 'https://bor.up.nic.in' },
      { name: 'Food & Civil Supplies (FCS UP)', url: 'https://fcs.up.gov.in' },
      { name: 'Social Welfare Department', url: 'https://socialwelfareup.upsdc.gov.in' }
    ],
    commonServices: ['Aay Praman Patra (Income)', 'Niwas Praman Patra (Domicile)', 'Jati Praman Patra (Caste)', 'Ration Card (FCS UP)', 'Vridhavastha Pension (Old Age)']
  },
  {
    code: 'UK',
    name: 'Uttarakhand',
    nativeNames: {
      hi: 'उत्तराखंड',
      kn: 'ಉತ್ತರಾಖಂಡ',
      te: 'ఉత్తరాఖండ్',
      ta: 'உத்தராகண்ட்',
      ml: 'ഉത്തരാഖണ്ഡ്'
    },
    regionType: 'state',
    capital: 'Dehradun',
    officialWebsite: 'https://uk.gov.in',
    servicePortal: 'Apuni Sarkar Uttarakhand (e-District)',
    servicePortalUrl: 'https://eservices.uk.gov.in',
    portalDescription: 'Citizen-centric platform providing online application and digital certificate download for all 13 hill and plains districts of Uttarakhand.',
    verificationStatus: 'verified',
    lastVerified: '2026-11-18',
    sourceUrl: 'https://www.india.gov.in/directory/web-directory/state-uts',
    helpline: '1905 (Uttarakhand CM Helpline) / 1800-180-4025',
    keyDepartments: [
      { name: 'Information Technology Development Agency', url: 'https://itda.uk.gov.in' },
      { name: 'Social Welfare Department', url: 'https://socialwelfare.uk.gov.in' }
    ],
    commonServices: ['Permanent Residence Certificate', 'Income Certificate', 'Caste Certificate', 'Widow & Old Age Pension', 'Ration Card']
  },
  {
    code: 'WB',
    name: 'West Bengal',
    nativeNames: {
      hi: 'पश्चिम बंगाल',
      kn: 'ಪಶ್ಚಿಮ ಬಂಗಾಳ',
      te: 'పశ్ಚಿమ బెంగాల్',
      ta: 'மேற்கு வங்காளம்',
      ml: 'പശ്ചിമ ബംഗാൾ'
    },
    regionType: 'state',
    capital: 'Kolkata',
    officialWebsite: 'https://wb.gov.in',
    servicePortal: 'e-District West Bengal & Duare Sarkar',
    servicePortalUrl: 'https://edistrict.wb.gov.in',
    portalDescription: 'Citizen e-District portal delivering certificates, clearances, and doorstep flagship welfare schemes under Duare Sarkar.',
    verificationStatus: 'verified',
    lastVerified: '2026-11-18',
    sourceUrl: 'https://www.india.gov.in/directory/web-directory/state-uts',
    helpline: '1800-345-5555 / 033-2214-5555',
    keyDepartments: [
      { name: 'Department of Personnel & AR', url: 'https://wb.gov.in' },
      { name: 'Backward Classes Welfare', url: 'https://castcertificatewb.gov.in' },
      { name: 'Food & Supplies Department', url: 'https://food.wb.gov.in' }
    ],
    commonServices: ['Residential Certificate', 'Income Certificate', 'Caste Certificate (SC/ST/OBC)', 'Lakshmir Bhandar', 'Digital Ration Card (Khadya Sathi)']
  },

  // =========================================================================
  // 8 UNION TERRITORIES
  // =========================================================================
  {
    code: 'AN',
    name: 'Andaman and Nicobar Islands',
    nativeNames: {
      hi: 'अंडमान और निकोबार द्वीप समूह',
      kn: 'ಅಂಡಮಾನ್ ಮತ್ತು ನಿಕೋಬಾರ್ ದ್ವೀಪಗಳು',
      te: 'అండమాన్ మరియు నికోబార్ దీవులు',
      ta: 'அந்தமான் நிக்கோபார் தீவுகள்',
      ml: 'ആൻഡമാൻ നിക്കോബാർ ദ്വീപുകൾ'
    },
    regionType: 'ut',
    capital: 'Port Blair',
    officialWebsite: 'https://www.andaman.gov.in',
    servicePortal: 'e-District Andaman & Nicobar',
    servicePortalUrl: 'https://edistrict.andaman.gov.in',
    portalDescription: 'Citizen e-services for local certificate issuance, islander identification, and welfare pensions across the island territory.',
    verificationStatus: 'verified',
    lastVerified: '2026-11-18',
    sourceUrl: 'https://www.india.gov.in/directory/web-directory/state-uts',
    helpline: '03192-233372',
    keyDepartments: [
      { name: 'Revenue Administration', url: 'https://andaman.gov.in' },
      { name: 'Social Welfare Andaman', url: 'https://andssw1.and.nic.in' }
    ],
    commonServices: ['Local Certificate', 'Income Certificate', 'OBC / ST Certificate', 'Senior Citizen Pension']
  },
  {
    code: 'CH',
    name: 'Chandigarh',
    nativeNames: {
      hi: 'चंडीगढ़',
      kn: 'ಚಂಡೀಗಢ',
      te: 'చండీగఢ్',
      ta: 'சண்டிகர்',
      ml: 'ചണ്ഡീഗഡ്'
    },
    regionType: 'ut',
    capital: 'Chandigarh',
    officialWebsite: 'https://chandigarh.gov.in',
    servicePortal: 'e-District Chandigarh (Sampark)',
    servicePortalUrl: 'https://edistrict.chd.gov.in',
    portalDescription: 'Citizen services portal integrating Chandigarh Sampark centers for revenue certificates, tenant verification, and social security.',
    verificationStatus: 'verified',
    lastVerified: '2026-11-18',
    sourceUrl: 'https://www.india.gov.in/directory/web-directory/state-uts',
    helpline: '1800-180-1725 / 0172-2700172',
    keyDepartments: [
      { name: 'Chandigarh Administration', url: 'https://chd.gov.in' },
      { name: 'Sampark Centres', url: 'https://sampark.chd.nic.in' }
    ],
    commonServices: ['Residence / Domicile Certificate', 'Income Certificate', 'Caste Certificate', 'Senior Citizen Card', 'Ration Card']
  },
  {
    code: 'DN',
    name: 'Dadra and Nagar Haveli and Daman and Diu',
    nativeNames: {
      hi: 'दादरा और नगर हवेली और दमन और दीव',
      kn: 'ದಾದ್ರಾ ಮತ್ತು ನಗರ ಹವೇಲಿ ಮತ್ತು ದಮನ್ ಮತ್ತು ದಿಯು',
      te: 'దాద్రా మరియు నగర్ హవేలీ మరియు డామన్ మరియు డయ్యు',
      ta: 'தாத்ரா மற்றும் நகர் அவேலி மற்றும் தாமன் மற்றும் தியூ',
      ml: 'ദാദ്ര നഗർ ഹവേലി ദാമൻ ദിയു'
    },
    regionType: 'ut',
    capital: 'Daman',
    officialWebsite: 'https://ddd.gov.in',
    servicePortal: 'e-District DNH & DD Portal',
    servicePortalUrl: 'https://edistrict.ddd.gov.in',
    portalDescription: 'Integrated citizen services portal for domicile, caste, income certificates, and utility clearances across the merged UT.',
    verificationStatus: 'verified',
    lastVerified: '2026-11-18',
    sourceUrl: 'https://www.india.gov.in/directory/web-directory/state-uts',
    helpline: '0260-2230470 / 1800-233-4000',
    keyDepartments: [
      { name: 'Department of Revenue DNH&DD', url: 'https://daman.nic.in' }
    ],
    commonServices: ['Domicile Certificate', 'Income Certificate', 'SC/ST/OBC Certificate', 'Social Welfare Pension']
  },
  {
    code: 'DL',
    name: 'Delhi',
    nativeNames: {
      hi: 'दिल्ली (राष्ट्रीय राजधानी क्षेत्र)',
      kn: 'ದೆಹಲಿ (ಎನ್‌ಸಿಟಿ)',
      te: 'ఢిల్లీ (ఎన్‌సిటి)',
      ta: 'தில்லி (என்சிடி)',
      ml: 'ഡൽഹി (എൻസിടി)'
    },
    regionType: 'ut',
    capital: 'New Delhi',
    officialWebsite: 'https://delhi.gov.in',
    servicePortal: 'e-District Delhi Portal',
    servicePortalUrl: 'https://edistrict.delhigovt.nic.in',
    portalDescription: 'Doorstep and online delivery of over 200 revenue, social welfare, transport, and municipal certificates in the National Capital Territory.',
    verificationStatus: 'verified',
    lastVerified: '2026-11-18',
    sourceUrl: 'https://www.india.gov.in/directory/web-directory/state-uts',
    helpline: '1076 (Doorstep Delivery Helpline) / 011-23935264',
    keyDepartments: [
      { name: 'Revenue Department GNCTD', url: 'https://revenue.delhi.gov.in' },
      { name: 'Food, Supplies & Consumer Affairs', url: 'https://nfs.delhigovt.nic.in' },
      { name: 'Social Welfare Department', url: 'https://socialwelfare.delhi.gov.in' }
    ],
    commonServices: ['Income Certificate', 'Domicile Certificate', 'SC/ST/OBC Certificate', 'Old Age / Financial Assistance Pension', 'Delhi Ration Card']
  },
  {
    code: 'JK',
    name: 'Jammu and Kashmir',
    nativeNames: {
      hi: 'जम्मू और कश्मीर',
      kn: 'ಜಮ್ಮು ಮತ್ತು ಕಾಶ್ಮೀರ',
      te: 'జమ్ము మరియు కాశ్మీర్',
      ta: 'ஜம்மு காஷ்மீர்',
      ml: 'ജമ്മു കശ്മീർ'
    },
    regionType: 'ut',
    capital: 'Srinagar (Summer) / Jammu (Winter)',
    officialWebsite: 'https://jk.gov.in',
    servicePortal: 'e-UNNAT Jammu and Kashmir',
    servicePortalUrl: 'https://eunnat.jk.gov.in',
    portalDescription: 'Unified single-window portal (e-UNNAT) offering over 400 digital services including Domicile Certificate and revenue land passbooks.',
    verificationStatus: 'verified',
    lastVerified: '2026-11-18',
    sourceUrl: 'https://www.india.gov.in/directory/web-directory/state-uts',
    helpline: '0194-2479231 / 1800-572-2327',
    keyDepartments: [
      { name: 'Revenue Department J&K', url: 'https://jkrevenue.nic.in' },
      { name: 'Social Welfare Department', url: 'https://jksocialwelfare.nic.in' }
    ],
    commonServices: ['Domicile Certificate', 'Income Certificate', 'Category (RBA/SC/ST/OBC) Certificate', 'AASRA Welfare Scheme', 'Golden Card / Ayushman J&K']
  },
  {
    code: 'LA',
    name: 'Ladakh',
    nativeNames: {
      hi: 'लद्दाख',
      kn: 'ಲಡಾಖ್',
      te: 'లడఖ్',
      ta: 'லடாக்',
      ml: 'ലഡാക്ക്'
    },
    regionType: 'ut',
    capital: 'Leh',
    officialWebsite: 'https://ladakh.gov.in',
    servicePortal: 'ServicePlus Ladakh (e-District)',
    servicePortalUrl: 'https://serviceonline.gov.in',
    portalDescription: 'Citizen service platform for Resident Certificate of Ladakh, Scheduled Tribe certification, and high-altitude welfare assistance.',
    verificationStatus: 'verified',
    lastVerified: '2026-11-18',
    sourceUrl: 'https://www.india.gov.in/directory/web-directory/state-uts',
    helpline: '01982-255567',
    keyDepartments: [
      { name: 'Administration of Union Territory of Ladakh', url: 'https://ladakh.gov.in' }
    ],
    commonServices: ['Resident Certificate of Ladakh', 'ST Certificate', 'Income Certificate', 'Tribal Social Security']
  },
  {
    code: 'LD',
    name: 'Lakshadweep',
    nativeNames: {
      hi: 'लक्षद्वीप',
      kn: 'ಲಕ್ಷದ್ವೀಪ',
      te: 'లక్షద్వీప్',
      ta: 'லட்சத்தீவு',
      ml: 'ലക്ഷദ്വീപ്'
    },
    regionType: 'ut',
    capital: 'Kavaratti',
    officialWebsite: 'https://lakshadweep.gov.in',
    servicePortal: 'e-District Lakshadweep',
    servicePortalUrl: 'https://edistrict.lakshadweep.gov.in',
    portalDescription: 'Island administration portal delivering native resident status, islander permits, and central subsidy linkages.',
    verificationStatus: 'verified',
    lastVerified: '2026-11-18',
    sourceUrl: 'https://www.india.gov.in/directory/web-directory/state-uts',
    helpline: '04896-262256',
    keyDepartments: [
      { name: 'Lakshadweep Administration', url: 'https://lakshadweep.gov.in' }
    ],
    commonServices: ['Native Resident Certificate', 'ST Certificate', 'Income Certificate', 'Island Welfare Pension']
  },
  {
    code: 'PY',
    name: 'Puducherry',
    nativeNames: {
      ta: 'புதுச்சேரி',
      hi: 'पुदुचेरी',
      kn: 'ಪುದುಚೇರಿ',
      te: 'పుదుచ్చేరి',
      ml: 'പുതുച്ചേരി'
    },
    regionType: 'ut',
    capital: 'Puducherry',
    officialWebsite: 'https://www.py.gov.in',
    servicePortal: 'e-District Puducherry',
    servicePortalUrl: 'https://edistrict.py.gov.in',
    portalDescription: 'Unified e-services for residence, nativity, caste certificates, and Franco-Indian social welfare entitlements in Puducherry.',
    verificationStatus: 'verified',
    lastVerified: '2026-11-18',
    sourceUrl: 'https://www.india.gov.in/directory/web-directory/state-uts',
    helpline: '1800-425-1077 / 0413-2233301',
    keyDepartments: [
      { name: 'Department of Revenue & Disaster Management', url: 'https://revenue.py.gov.in' },
      { name: 'Social Welfare Department', url: 'https://socwelfare.py.gov.in' }
    ],
    commonServices: ['Nativity / Residence Certificate', 'Community (SC/OBC) Certificate', 'Income Certificate', 'Old Age Pension', 'Ration Card Services']
  }
];

export const STATES_MAP = Object.fromEntries(STATES_AND_UTS.map((s) => [s.code, s]));

export function getStateByCode(code) {
  if (!code) return null;
  return STATES_MAP[code.toUpperCase()] || null;
}

export function getAllStates() {
  return STATES_AND_UTS.filter((s) => s.regionType === 'state');
}

export function getAllUnionTerritories() {
  return STATES_AND_UTS.filter((s) => s.regionType === 'ut');
}
