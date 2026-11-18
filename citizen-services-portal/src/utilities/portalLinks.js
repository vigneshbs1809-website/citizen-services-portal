/**
 * Verified Official Government Portal References
 * Links citizens to verified .gov.in and .nic.in official public infrastructure.
 */

export const OFFICIAL_PORTAL_LINKS = {
  'income-certificate': {
    name: 'National Portal of India (Citizen Services)',
    portalUrl: 'https://www.india.gov.in',
    domain: 'india.gov.in',
    department: 'Ministry of Electronics & Information Technology / State e-District',
    offlineAlternative: 'Nearest Gram Panchayat, Taluk Office, or CSC Seva Kendra',
  },
  'caste-certificate': {
    name: 'National Portal of India (Public Services)',
    portalUrl: 'https://www.india.gov.in',
    domain: 'india.gov.in',
    department: 'Social Welfare & Revenue Department',
    offlineAlternative: 'Taluk Tehsildar Office or Village Gram Panchayat',
  },
  'residence-certificate': {
    name: 'National Portal of India (Citizen Registry)',
    portalUrl: 'https://www.india.gov.in',
    domain: 'india.gov.in',
    department: 'Department of Revenue & Home Affairs',
    offlineAlternative: 'Sub-Divisional Magistrate / Revenue Inspector Office',
  },
  'scholarship-guidance': {
    name: 'National Scholarship Portal (NSP)',
    portalUrl: 'https://scholarships.gov.in',
    domain: 'scholarships.gov.in',
    department: 'Ministry of Education & Social Justice',
    offlineAlternative: 'College / School Nodal Scholarship Verification Desk',
  },
  'pension-guidance': {
    name: 'National Social Assistance Programme (myScheme)',
    portalUrl: 'https://www.myscheme.gov.in/schemes/nsap-oap',
    domain: 'myscheme.gov.in',
    department: 'Ministry of Rural Development',
    offlineAlternative: 'Block Development Officer (BDO) or Municipal Ward Office',
  },
  'ration-card': {
    name: 'National Food Security Portal (NFSA)',
    portalUrl: 'https://nfsa.gov.in',
    domain: 'nfsa.gov.in',
    department: 'Department of Food and Public Distribution',
    offlineAlternative: 'Nearest Fair Price Ration Shop or Food Supply Office',
  },
  'ayushman-card': {
    name: 'National Health Authority (PM-JAY Beneficiary Portal)',
    portalUrl: 'https://beneficiary.nha.gov.in',
    domain: 'beneficiary.nha.gov.in',
    department: 'National Health Authority (NHA)',
    offlineAlternative: 'Ayushman Mitra Desk at any Empanelled Government Hospital',
  },
  'pm-kisan': {
    name: 'PM-Kisan Official National Portal',
    portalUrl: 'https://pmkisan.gov.in',
    domain: 'pmkisan.gov.in',
    department: 'Ministry of Agriculture and Farmers Welfare',
    offlineAlternative: 'Village Patwari / Lekhpal or CSC Digital Seva Center',
  },
  'sample-solar-subsidy': {
    name: 'PM Surya Ghar: Muft Bijli Yojana (National Solar Portal)',
    portalUrl: 'https://pmsuryaghar.gov.in',
    domain: 'pmsuryaghar.gov.in',
    department: 'Ministry of New and Renewable Energy (MNRE)',
    offlineAlternative: 'Local DISCOM Electricity Office or Authorized Vendor',
  },
};

export function getOfficialPortal(serviceId) {
  return (
    OFFICIAL_PORTAL_LINKS[serviceId] || {
      name: 'National Portal of India',
      portalUrl: 'https://www.india.gov.in',
      domain: 'india.gov.in',
      department: 'Government of India Citizen Gateway',
      offlineAlternative: 'Nearest Gram Panchayat or Common Service Center (CSC)',
    }
  );
}
