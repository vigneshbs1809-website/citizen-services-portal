/**
 * Verified State-Specific Service Portals Mapping
 * ==================================================
 * Maps standard services (e.g. Income Certificate, Caste Certificate, Residence Certificate,
 * Ration Card, Pensions, Scholarships) to verified state-specific e-governance application portals.
 *
 * When a state is selected, services display their official state-specific government application
 * URLs and department names in addition to national portals.
 */

export const STATE_SPECIFIC_SERVICE_PORTALS = {
  // Karnataka
  KA: {
    'income-certificate': {
      portalName: 'Nadakacheri (Atalji Janasnehi Kendra)',
      portalUrl: 'https://nadakacheri.karnataka.gov.in',
      department: 'Revenue Department, Government of Karnataka',
      verificationStatus: 'verified',
      lastVerified: '2026-11-18',
      serviceCode: 'RD001',
      offlineCenter: 'Nearest Grama One, Bangalore One, or Nadakacheri Front Desk'
    },
    'caste-certificate': {
      portalName: 'Nadakacheri / Seva Sindhu',
      portalUrl: 'https://nadakacheri.karnataka.gov.in',
      department: 'Social Welfare & Revenue Department, Karnataka',
      verificationStatus: 'verified',
      lastVerified: '2026-11-18',
      serviceCode: 'RD002',
      offlineCenter: 'Grama One / Karnataka One Counter'
    },
    'residence-certificate': {
      portalName: 'Nadakacheri Karnataka',
      portalUrl: 'https://nadakacheri.karnataka.gov.in',
      department: 'Revenue Department, Karnataka',
      verificationStatus: 'verified',
      lastVerified: '2026-11-18',
      serviceCode: 'RD003',
      offlineCenter: 'Taluk Office or Village Accountant'
    },
    'ration-card': {
      portalName: 'Ahara Karnataka (Food & Civil Supplies)',
      portalUrl: 'https://ahara.kar.nic.in',
      department: 'Food, Civil Supplies & Consumer Affairs Department',
      verificationStatus: 'verified',
      lastVerified: '2026-11-18',
      serviceCode: 'FCS01',
      offlineCenter: 'Fair Price Shop or Taluk Food Inspector Desk'
    },
    'pension-guidance': {
      portalName: 'SSP Karnataka (Social Security Pensions)',
      portalUrl: 'https://ssp.karnataka.gov.in',
      department: 'Directorate of Social Security and Pensions, Karnataka',
      verificationStatus: 'verified',
      lastVerified: '2026-11-18',
      serviceCode: 'SSP01',
      offlineCenter: 'Taluk Office or Grama One Centre'
    },
    'scholarship-guidance': {
      portalName: 'State Scholarship Portal (SSP Karnataka)',
      portalUrl: 'https://ssp.postmatric.karnataka.gov.in',
      department: 'Social Welfare & Backward Classes Dept, Karnataka',
      verificationStatus: 'verified',
      lastVerified: '2026-11-18',
      serviceCode: 'SSP-EDU',
      offlineCenter: 'College Nodal Officer / Taluk Social Welfare Office'
    }
  },

  // Tamil Nadu
  TN: {
    'income-certificate': {
      portalName: 'e-Sevai Citizen Portal (TNeGA)',
      portalUrl: 'https://www.tnesevai.tn.gov.in',
      department: 'Revenue & Disaster Management, Government of Tamil Nadu',
      verificationStatus: 'verified',
      lastVerified: '2026-11-18',
      serviceCode: 'REV-104',
      offlineCenter: 'Nearest Arasu e-Sevai Centre or Taluk Vattaatchiyar Office'
    },
    'caste-certificate': {
      portalName: 'e-Sevai Community Certificate',
      portalUrl: 'https://www.tnesevai.tn.gov.in',
      department: 'Adi Dravidar and Tribal Welfare / BC & MBC Department',
      verificationStatus: 'verified',
      lastVerified: '2026-11-18',
      serviceCode: 'REV-101',
      offlineCenter: 'Arasu e-Sevai Kendra or VAO Office'
    },
    'residence-certificate': {
      portalName: 'e-Sevai Nativity / Residence',
      portalUrl: 'https://www.tnesevai.tn.gov.in',
      department: 'Revenue & Disaster Management, Tamil Nadu',
      verificationStatus: 'verified',
      lastVerified: '2026-11-18',
      serviceCode: 'REV-103',
      offlineCenter: 'Arasu e-Sevai Centre or Village Administrative Officer (VAO)'
    },
    'ration-card': {
      portalName: 'TNPDS (Tamil Nadu Public Distribution System)',
      portalUrl: 'https://www.tnpds.gov.in',
      department: 'Civil Supplies and Consumer Protection Department, TN',
      verificationStatus: 'verified',
      lastVerified: '2026-11-18',
      serviceCode: 'PDS-01',
      offlineCenter: 'Taluk Supply Office (TSO) or Ration Shop'
    },
    'pension-guidance': {
      portalName: 'e-Sevai Social Welfare Pensions (OAP/Widow)',
      portalUrl: 'https://www.tnesevai.tn.gov.in',
      department: 'Revenue Administration & Social Security, Tamil Nadu',
      verificationStatus: 'verified',
      lastVerified: '2026-11-18',
      serviceCode: 'REV-501',
      offlineCenter: 'Special Tahsildar (SSS) Office'
    }
  },

  // Kerala
  KL: {
    'income-certificate': {
      portalName: 'e-District Kerala',
      portalUrl: 'https://edistrict.kerala.gov.in',
      department: 'Revenue Department, Government of Kerala',
      verificationStatus: 'verified',
      lastVerified: '2026-11-18',
      serviceCode: 'KL-ED-INC',
      offlineCenter: 'Nearest Akshaya Kendra or Village Office'
    },
    'caste-certificate': {
      portalName: 'e-District Community Certificate',
      portalUrl: 'https://edistrict.kerala.gov.in',
      department: 'Revenue & SC/ST Development Department, Kerala',
      verificationStatus: 'verified',
      lastVerified: '2026-11-18',
      serviceCode: 'KL-ED-COM',
      offlineCenter: 'Akshaya Centre or Village Officer'
    },
    'residence-certificate': {
      portalName: 'e-District Nativity / Domicile',
      portalUrl: 'https://edistrict.kerala.gov.in',
      department: 'Revenue Department, Kerala',
      verificationStatus: 'verified',
      lastVerified: '2026-11-18',
      serviceCode: 'KL-ED-NAT',
      offlineCenter: 'Akshaya Kendra or Village Office'
    },
    'ration-card': {
      portalName: 'Civil Supplies Portal Kerala',
      portalUrl: 'https://ecitizen.civilsupplieskerala.gov.in',
      department: 'Civil Supplies & Consumer Affairs Department, Kerala',
      verificationStatus: 'verified',
      lastVerified: '2026-11-18',
      serviceCode: 'KL-CS-01',
      offlineCenter: 'Taluk Supply Office (TSO) or Akshaya Centre'
    },
    'pension-guidance': {
      portalName: 'Sevana Pension Portal Kerala',
      portalUrl: 'https://welfarepension.lsgkerala.gov.in',
      department: 'Local Self Government Department, Kerala',
      verificationStatus: 'verified',
      lastVerified: '2026-11-18',
      serviceCode: 'LSG-SEV',
      offlineCenter: 'Grama Panchayat, Municipality or Corporation Office'
    }
  },

  // Telangana
  TS: {
    'income-certificate': {
      portalName: 'MeeSeva Telangana',
      portalUrl: 'https://ts.meeseva.telangana.gov.in',
      department: 'Revenue Department, Government of Telangana',
      verificationStatus: 'verified',
      lastVerified: '2026-11-18',
      serviceCode: 'TS-REV-INC',
      offlineCenter: 'Nearest MeeSeva Center or Tahsildar Office'
    },
    'caste-certificate': {
      portalName: 'MeeSeva Integrated Certificate',
      portalUrl: 'https://ts.meeseva.telangana.gov.in',
      department: 'Scheduled Castes & BC Development Dept, Telangana',
      verificationStatus: 'verified',
      lastVerified: '2026-11-18',
      serviceCode: 'TS-REV-INT',
      offlineCenter: 'MeeSeva Center or Mandal Revenue Office (MRO)'
    },
    'residence-certificate': {
      portalName: 'MeeSeva Residence Services',
      portalUrl: 'https://ts.meeseva.telangana.gov.in',
      department: 'Revenue Department, Telangana',
      verificationStatus: 'verified',
      lastVerified: '2026-11-18',
      serviceCode: 'TS-REV-RES',
      offlineCenter: 'MeeSeva Center or Tahsildar Office'
    },
    'ration-card': {
      portalName: 'Telangana Food Security Portal (EPDS)',
      portalUrl: 'https://epds.telangana.gov.in',
      department: 'Consumer Affairs, Food & Civil Supplies, Telangana',
      verificationStatus: 'verified',
      lastVerified: '2026-11-18',
      serviceCode: 'TS-FSC',
      offlineCenter: 'Mandal Civil Supplies Office or MeeSeva'
    },
    'pension-guidance': {
      portalName: 'Aasara Pension Portal',
      portalUrl: 'https://aasara.telangana.gov.in',
      department: 'Panchayat Raj & Rural Development Department, Telangana',
      verificationStatus: 'verified',
      lastVerified: '2026-11-18',
      serviceCode: 'TS-AASARA',
      offlineCenter: 'Gram Panchayat Secretary or Municipal Ward Officer'
    }
  },

  // Andhra Pradesh
  AP: {
    'income-certificate': {
      portalName: 'AP Seva Portal (MeeSeva AP)',
      portalUrl: 'https://onlineap.meeseva.gov.in',
      department: 'Revenue Department, Government of Andhra Pradesh',
      verificationStatus: 'verified',
      lastVerified: '2026-11-18',
      serviceCode: 'AP-REV-INC',
      offlineCenter: 'Nearest Grama / Ward Sachivalayam or MeeSeva'
    },
    'caste-certificate': {
      portalName: 'AP Seva Integrated Caste & Residence',
      portalUrl: 'https://onlineap.meeseva.gov.in',
      department: 'Social Welfare & Revenue, Andhra Pradesh',
      verificationStatus: 'verified',
      lastVerified: '2026-11-18',
      serviceCode: 'AP-REV-CST',
      offlineCenter: 'Grama / Ward Sachivalayam (Village / Ward Secretariat)'
    },
    'residence-certificate': {
      portalName: 'AP Seva Residence Services',
      portalUrl: 'https://onlineap.meeseva.gov.in',
      department: 'Revenue Department, Andhra Pradesh',
      verificationStatus: 'verified',
      lastVerified: '2026-11-18',
      serviceCode: 'AP-REV-RES',
      offlineCenter: 'Grama / Ward Secretariat or Tahsildar Office'
    },
    'ration-card': {
      portalName: 'AP EPDS (Civil Supplies)',
      portalUrl: 'https://epdsap.ap.gov.in',
      department: 'Consumer Affairs, Food & Civil Supplies, AP',
      verificationStatus: 'verified',
      lastVerified: '2026-11-18',
      serviceCode: 'AP-PDS',
      offlineCenter: 'Grama Sachivalayam or Fair Price Shop'
    },
    'pension-guidance': {
      portalName: 'YSR Pension Kanuka Portal',
      portalUrl: 'https://sspensions.ap.gov.in',
      department: 'Panchayat Raj & Rural Development, AP',
      verificationStatus: 'verified',
      lastVerified: '2026-11-18',
      serviceCode: 'AP-YSR-PEN',
      offlineCenter: 'Village / Ward Volunteer or Welfare Assistant'
    }
  },

  // Maharashtra
  MH: {
    'income-certificate': {
      portalName: 'Aaple Sarkar Maharashtra',
      portalUrl: 'https://aaplesarkar.mahaonline.gov.in',
      department: 'Revenue Department, Government of Maharashtra',
      verificationStatus: 'verified',
      lastVerified: '2026-11-18',
      serviceCode: 'MH-REV-INC',
      offlineCenter: 'Nearest Maha e-Seva Kendra or Tahsildar Office'
    },
    'caste-certificate': {
      portalName: 'Aaple Sarkar Caste Certificate',
      portalUrl: 'https://aaplesarkar.mahaonline.gov.in',
      department: 'Social Justice & Special Assistance Department, Maharashtra',
      verificationStatus: 'verified',
      lastVerified: '2026-11-18',
      serviceCode: 'MH-REV-CST',
      offlineCenter: 'Sub-Divisional Officer (SDO) or Setu Kendra'
    },
    'residence-certificate': {
      portalName: 'Aaple Sarkar Domicile & Nationality',
      portalUrl: 'https://aaplesarkar.mahaonline.gov.in',
      department: 'Revenue & Forest Department, Maharashtra',
      verificationStatus: 'verified',
      lastVerified: '2026-11-18',
      serviceCode: 'MH-REV-DOM',
      offlineCenter: 'Maha e-Seva Kendra or Tehsil Karyalay'
    },
    'ration-card': {
      portalName: 'Maha Food (Civil Supplies)',
      portalUrl: 'https://mahaepos.gov.in',
      department: 'Food, Civil Supplies and Consumer Protection Dept, Maharashtra',
      verificationStatus: 'verified',
      lastVerified: '2026-11-18',
      serviceCode: 'MH-FCS',
      offlineCenter: 'Zonal Rationing Office (ZRO) or Tehsil Food Branch'
    }
  },

  // Uttar Pradesh
  UP: {
    'income-certificate': {
      portalName: 'e-District Uttar Pradesh',
      portalUrl: 'https://edistrict.up.gov.in',
      department: 'Board of Revenue, Government of Uttar Pradesh',
      verificationStatus: 'verified',
      lastVerified: '2026-11-18',
      serviceCode: 'UP-ED-INC',
      offlineCenter: 'Nearest Jan Seva Kendra (CSC) or Tehsil Lekhpal'
    },
    'caste-certificate': {
      portalName: 'e-District UP Caste Certificate',
      portalUrl: 'https://edistrict.up.gov.in',
      department: 'Social Welfare & Backward Classes Welfare, UP',
      verificationStatus: 'verified',
      lastVerified: '2026-11-18',
      serviceCode: 'UP-ED-CST',
      offlineCenter: 'Common Service Center (CSC) or Tehsildar Office'
    },
    'residence-certificate': {
      portalName: 'e-District UP Niwas Praman Patra',
      portalUrl: 'https://edistrict.up.gov.in',
      department: 'Board of Revenue, Uttar Pradesh',
      verificationStatus: 'verified',
      lastVerified: '2026-11-18',
      serviceCode: 'UP-ED-DOM',
      offlineCenter: 'Jan Seva Kendra (CSC) or Tehsil Front Desk'
    },
    'ration-card': {
      portalName: 'FCS UP (Food and Civil Supplies)',
      portalUrl: 'https://fcs.up.gov.in',
      department: 'Department of Food and Logistics, Uttar Pradesh',
      verificationStatus: 'verified',
      lastVerified: '2026-11-18',
      serviceCode: 'UP-FCS',
      offlineCenter: 'Block Supply Officer (BSO) or CSC Kendra'
    },
    'pension-guidance': {
      portalName: 'SSP UP (Integrated Social Pension)',
      portalUrl: 'https://sspy-up.gov.in',
      department: 'Social Welfare Department, Uttar Pradesh',
      verificationStatus: 'verified',
      lastVerified: '2026-11-18',
      serviceCode: 'UP-SSPY',
      offlineCenter: 'District Social Welfare Officer (DSWO) or Block Office'
    }
  },

  // Delhi
  DL: {
    'income-certificate': {
      portalName: 'e-District Delhi GNCTD',
      portalUrl: 'https://edistrict.delhigovt.nic.in',
      department: 'Revenue Department, Govt of NCT of Delhi',
      verificationStatus: 'verified',
      lastVerified: '2026-11-18',
      serviceCode: 'DL-ED-INC',
      offlineCenter: 'Call 1076 for Doorstep Delivery or Sub-Divisional Magistrate (SDM) Office'
    },
    'caste-certificate': {
      portalName: 'e-District Delhi SC/ST/OBC',
      portalUrl: 'https://edistrict.delhigovt.nic.in',
      department: 'Revenue Department & SC/ST/OBC Welfare, Delhi',
      verificationStatus: 'verified',
      lastVerified: '2026-11-18',
      serviceCode: 'DL-ED-CST',
      offlineCenter: 'Doorstep Delivery Service (1076) or SDM Counter'
    },
    'residence-certificate': {
      portalName: 'e-District Delhi Domicile',
      portalUrl: 'https://edistrict.delhigovt.nic.in',
      department: 'Revenue Department, Govt of NCT of Delhi',
      verificationStatus: 'verified',
      lastVerified: '2026-11-18',
      serviceCode: 'DL-ED-DOM',
      offlineCenter: 'Doorstep Executive Visit (1076) or SDM Office'
    },
    'ration-card': {
      portalName: 'Delhi e-Food Security Portal',
      portalUrl: 'https://nfs.delhigovt.nic.in',
      department: 'Food, Supplies and Consumer Affairs Dept, GNCTD',
      verificationStatus: 'verified',
      lastVerified: '2026-11-18',
      serviceCode: 'DL-NFS',
      offlineCenter: 'Circle Office Food & Civil Supplies'
    }
  },

  // Rajasthan
  RJ: {
    'income-certificate': {
      portalName: 'e-Mitra Rajasthan',
      portalUrl: 'https://emitra.rajasthan.gov.in',
      department: 'Revenue Department, Government of Rajasthan',
      verificationStatus: 'verified',
      lastVerified: '2026-11-18',
      serviceCode: 'RJ-EM-INC',
      offlineCenter: 'Nearest e-Mitra Kiosk or Tehsil Office'
    },
    'caste-certificate': {
      portalName: 'e-Mitra SC/ST/OBC/MBC Certificate',
      portalUrl: 'https://emitra.rajasthan.gov.in',
      department: 'Social Justice & Empowerment Department, Rajasthan',
      verificationStatus: 'verified',
      lastVerified: '2026-11-18',
      serviceCode: 'RJ-EM-CST',
      offlineCenter: 'e-Mitra Kiosk or Sub-Divisional Officer (SDO)'
    },
    'residence-certificate': {
      portalName: 'e-Mitra Bonafide Domicile',
      portalUrl: 'https://emitra.rajasthan.gov.in',
      department: 'Revenue Department, Rajasthan',
      verificationStatus: 'verified',
      lastVerified: '2026-11-18',
      serviceCode: 'RJ-EM-DOM',
      offlineCenter: 'e-Mitra Kiosk or Tehsildar Office'
    },
    'pension-guidance': {
      portalName: 'RajSSP Social Security Pension',
      portalUrl: 'https://rajssp.raj.nic.in',
      department: 'Social Justice & Empowerment Department, Rajasthan',
      verificationStatus: 'verified',
      lastVerified: '2026-11-18',
      serviceCode: 'RJ-SSP',
      offlineCenter: 'Block Development Officer (BDO) or e-Mitra'
    }
  },

  // Gujarat
  GJ: {
    'income-certificate': {
      portalName: 'Digital Gujarat Portal',
      portalUrl: 'https://www.digitalgujarat.gov.in',
      department: 'Revenue Department, Government of Gujarat',
      verificationStatus: 'verified',
      lastVerified: '2026-11-18',
      serviceCode: 'GJ-DG-INC',
      offlineCenter: 'Jan Seva Kendra (Mamlatdar Office) or e-Gram Kendra'
    },
    'caste-certificate': {
      portalName: 'Digital Gujarat SC/ST/SEBC Certificate',
      portalUrl: 'https://www.digitalgujarat.gov.in',
      department: 'Social Justice & Empowerment, Gujarat',
      verificationStatus: 'verified',
      lastVerified: '2026-11-18',
      serviceCode: 'GJ-DG-CST',
      offlineCenter: 'Jan Seva Kendra or Taluka Mamlatdar Office'
    },
    'residence-certificate': {
      portalName: 'Digital Gujarat Domicile',
      portalUrl: 'https://www.digitalgujarat.gov.in',
      department: 'Revenue Department, Gujarat',
      verificationStatus: 'verified',
      lastVerified: '2026-11-18',
      serviceCode: 'GJ-DG-DOM',
      offlineCenter: 'Mamlatdar / Collectorate Jan Seva Counter'
    }
  },

  // West Bengal
  WB: {
    'income-certificate': {
      portalName: 'e-District West Bengal',
      portalUrl: 'https://edistrict.wb.gov.in',
      department: 'Department of Personnel & Administrative Reforms, WB',
      verificationStatus: 'verified',
      lastVerified: '2026-11-18',
      serviceCode: 'WB-ED-INC',
      offlineCenter: 'Duare Sarkar Camp or BDO Office'
    },
    'caste-certificate': {
      portalName: 'Caste Certificate WB Portal',
      portalUrl: 'https://castcertificatewb.gov.in',
      department: 'Backward Classes Welfare Department, West Bengal',
      verificationStatus: 'verified',
      lastVerified: '2026-11-18',
      serviceCode: 'WB-BCW',
      offlineCenter: 'BDO Office or SDO Sub-Division Office'
    },
    'residence-certificate': {
      portalName: 'e-District Residential Certificate',
      portalUrl: 'https://edistrict.wb.gov.in',
      department: 'Department of Home & Hill Affairs, WB',
      verificationStatus: 'verified',
      lastVerified: '2026-11-18',
      serviceCode: 'WB-ED-DOM',
      offlineCenter: 'Duare Sarkar Camp or SDO Office'
    }
  },

  // Bihar
  BR: {
    'income-certificate': {
      portalName: 'RTPS Bihar (ServiceOnline)',
      portalUrl: 'https://serviceonline.bihar.gov.in',
      department: 'General Administration Department, Govt of Bihar',
      verificationStatus: 'verified',
      lastVerified: '2026-11-18',
      serviceCode: 'BR-RTPS-INC',
      offlineCenter: 'Block RTPS Counter (Prakhand Karyalay)'
    },
    'caste-certificate': {
      portalName: 'RTPS Bihar Jati Praman Patra',
      portalUrl: 'https://serviceonline.bihar.gov.in',
      department: 'General Administration Department, Bihar',
      verificationStatus: 'verified',
      lastVerified: '2026-11-18',
      serviceCode: 'BR-RTPS-CST',
      offlineCenter: 'Block RTPS Counter or Circle Officer (CO)'
    },
    'residence-certificate': {
      portalName: 'RTPS Bihar Niwas Praman Patra',
      portalUrl: 'https://serviceonline.bihar.gov.in',
      department: 'General Administration Department, Bihar',
      verificationStatus: 'verified',
      lastVerified: '2026-11-18',
      serviceCode: 'BR-RTPS-RES',
      offlineCenter: 'Prakhand / Anchal RTPS Counter'
    }
  },

  // Odisha
  OD: {
    'income-certificate': {
      portalName: 'Odisha One / e-District Odisha',
      portalUrl: 'https://edistrict.odisha.gov.in',
      department: 'Revenue & Disaster Management, Government of Odisha',
      verificationStatus: 'verified',
      lastVerified: '2026-11-18',
      serviceCode: 'OD-ED-INC',
      offlineCenter: 'Mo Seva Kendra or Tehsil Office'
    },
    'caste-certificate': {
      portalName: 'e-District Odisha Caste (SC/ST/SEBC)',
      portalUrl: 'https://edistrict.odisha.gov.in',
      department: 'ST & SC Development Department, Odisha',
      verificationStatus: 'verified',
      lastVerified: '2026-11-18',
      serviceCode: 'OD-ED-CST',
      offlineCenter: 'Mo Seva Kendra or Revenue Inspector (RI) Office'
    },
    'residence-certificate': {
      portalName: 'e-District Odisha Resident Certificate',
      portalUrl: 'https://edistrict.odisha.gov.in',
      department: 'Revenue & Disaster Management, Odisha',
      verificationStatus: 'verified',
      lastVerified: '2026-11-18',
      serviceCode: 'OD-ED-RES',
      offlineCenter: 'Mo Seva Kendra or Tehsildar Desk'
    }
  },

  // Punjab
  PB: {
    'income-certificate': {
      portalName: 'Connect Punjab (Sewa Kendra)',
      portalUrl: 'https://connect.punjab.gov.in',
      department: 'Department of Governance Reforms, Govt of Punjab',
      verificationStatus: 'verified',
      lastVerified: '2026-11-18',
      serviceCode: 'PB-SK-INC',
      offlineCenter: 'Nearest Sewa Kendra or call 1076 for Doorstep Delivery'
    },
    'caste-certificate': {
      portalName: 'Connect Punjab SC/BC Certificate',
      portalUrl: 'https://connect.punjab.gov.in',
      department: 'Social Justice, Empowerment & Minorities, Punjab',
      verificationStatus: 'verified',
      lastVerified: '2026-11-18',
      serviceCode: 'PB-SK-CST',
      offlineCenter: 'Sewa Kendra or SDM Office'
    },
    'residence-certificate': {
      portalName: 'Connect Punjab Residence / Domicile',
      portalUrl: 'https://connect.punjab.gov.in',
      department: 'Department of Governance Reforms, Punjab',
      verificationStatus: 'verified',
      lastVerified: '2026-11-18',
      serviceCode: 'PB-SK-DOM',
      offlineCenter: 'Sewa Kendra or Tehsildar Office'
    }
  },

  // Haryana
  HR: {
    'income-certificate': {
      portalName: 'Antyodaya Saral Haryana',
      portalUrl: 'https://saralharyana.gov.in',
      department: 'Citizen Resources Information Dept / Revenue, Haryana',
      verificationStatus: 'verified',
      lastVerified: '2026-11-18',
      serviceCode: 'HR-SRL-INC',
      offlineCenter: 'Saral Kendra (DC Office/SDM Office) or Antyodaya Kendra'
    },
    'caste-certificate': {
      portalName: 'Saral Haryana Caste Certificate',
      portalUrl: 'https://saralharyana.gov.in',
      department: 'Welfare of SCs and BCs Department, Haryana',
      verificationStatus: 'verified',
      lastVerified: '2026-11-18',
      serviceCode: 'HR-SRL-CST',
      offlineCenter: 'Saral Kendra or Tehsil Office'
    },
    'residence-certificate': {
      portalName: 'Saral Haryana Resident Certificate',
      portalUrl: 'https://saralharyana.gov.in',
      department: 'Revenue & Disaster Management, Haryana',
      verificationStatus: 'verified',
      lastVerified: '2026-11-18',
      serviceCode: 'HR-SRL-RES',
      offlineCenter: 'Saral Kendra or Tehsildar Desk'
    }
  },

  // Madhya Pradesh
  MP: {
    'income-certificate': {
      portalName: 'MP e-District (Lok Seva Kendra)',
      portalUrl: 'https://mpedistrict.gov.in',
      department: 'Public Service Management Department, MP',
      verificationStatus: 'verified',
      lastVerified: '2026-11-18',
      serviceCode: 'MP-ED-INC',
      offlineCenter: 'Nearest Lok Seva Kendra (LSK) or Tehsil Karyalay'
    },
    'caste-certificate': {
      portalName: 'MP e-District SC/ST/OBC Certificate',
      portalUrl: 'https://mpedistrict.gov.in',
      department: 'Tribal Affairs & Scheduled Caste Welfare, MP',
      verificationStatus: 'verified',
      lastVerified: '2026-11-18',
      serviceCode: 'MP-ED-CST',
      offlineCenter: 'Lok Seva Kendra or Sub-Divisional Officer (SDO)'
    },
    'residence-certificate': {
      portalName: 'MP e-District Mool Niwas (Domicile)',
      portalUrl: 'https://mpedistrict.gov.in',
      department: 'General Administration / Revenue, MP',
      verificationStatus: 'verified',
      lastVerified: '2026-11-18',
      serviceCode: 'MP-ED-DOM',
      offlineCenter: 'Lok Seva Kendra or Tehsildar Office'
    }
  }
};

/**
 * Returns state-specific portal override for a service, or fallback to national info
 */
export function getStateServicePortal(stateCode, serviceId) {
  if (!stateCode || !serviceId) return null;
  const statePortals = STATE_SPECIFIC_SERVICE_PORTALS[stateCode.toUpperCase()];
  if (statePortals && statePortals[serviceId]) {
    return statePortals[serviceId];
  }
  return null;
}
