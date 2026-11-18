"""
Populate States, Districts and State Service Portals into SQLite Database
========================================================================
Seeds all 36 Indian States and Union Territories, their districts, and
state-specific e-governance service application portals into citizen_services.db.
"""

import os
import sqlite3
import json

DB_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "citizen_services.db")

STATES_DATA = [
  {"id": "AP", "state_code": "AP", "state_name": "Andhra Pradesh", "region_type": "state", "capital": "Amaravati", "official_website": "https://www.ap.gov.in", "service_portal": "AP Seva Portal (MeeSeva)", "service_portal_url": "https://onlineap.meeseva.gov.in", "portal_description": "Unified citizen gateway for income, caste, residence certificates, land records, and welfare pensions across Andhra Pradesh.", "helpline": "1902 / 1100", "verification_status": "verified", "last_verified": "2026-11-18", "source_url": "https://www.india.gov.in/directory/web-directory/state-uts"},
  {"id": "AR", "state_code": "AR", "state_name": "Arunachal Pradesh", "region_type": "state", "capital": "Itanagar", "official_website": "https://arunachalpradesh.gov.in", "service_portal": "ServicePlus Arunachal Pradesh", "service_portal_url": "https://eservice.arunachal.gov.in", "portal_description": "State portal for issuance of permanent residence, scheduled tribe certificates, and public service guarantees.", "helpline": "155250 / 0360-2212541", "verification_status": "verified", "last_verified": "2026-11-18", "source_url": "https://www.india.gov.in/directory/web-directory/state-uts"},
  {"id": "AS", "state_code": "AS", "state_name": "Assam", "region_type": "state", "capital": "Dispur", "official_website": "https://assam.gov.in", "service_portal": "Sewa Setu Assam", "service_portal_url": "https://sewasetu.assam.gov.in", "portal_description": "Over 500 state public services delivered under the Assam Right to Public Services Act (ARTPS).", "helpline": "1800-345-3574 / 1905", "verification_status": "verified", "last_verified": "2026-11-18", "source_url": "https://www.india.gov.in/directory/web-directory/state-uts"},
  {"id": "BR", "state_code": "BR", "state_name": "Bihar", "region_type": "state", "capital": "Patna", "official_website": "https://state.bihar.gov.in", "service_portal": "RTPS Bihar (Right to Public Services)", "service_portal_url": "https://serviceonline.bihar.gov.in", "portal_description": "Official Bihar portal for immediate digital delivery of residence, caste, and income certificates without counter queues.", "helpline": "1800-345-6284", "verification_status": "verified", "last_verified": "2026-11-18", "source_url": "https://www.india.gov.in/directory/web-directory/state-uts"},
  {"id": "CG", "state_code": "CG", "state_name": "Chhattisgarh", "region_type": "state", "capital": "Raipur", "official_website": "https://cgstate.gov.in", "service_portal": "e-District Chhattisgarh (Lok Seva Kendra)", "service_portal_url": "https://edistrict.cgstate.gov.in", "portal_description": "Single window delivery portal for citizen certificates, social security schemes, and revenue court cases.", "helpline": "0771-2533350 / 1100", "verification_status": "verified", "last_verified": "2026-11-18", "source_url": "https://www.india.gov.in/directory/web-directory/state-uts"},
  {"id": "GA", "state_code": "GA", "state_name": "Goa", "region_type": "state", "capital": "Panaji", "official_website": "https://www.goa.gov.in", "service_portal": "GoaOnline Services Portal", "service_portal_url": "https://goaonline.gov.in", "portal_description": "All-in-one digital portal offering certificates, utility payments, trade licenses, and Griha Aadhar welfare benefits.", "helpline": "1800-233-0201", "verification_status": "verified", "last_verified": "2026-11-18", "source_url": "https://www.india.gov.in/directory/web-directory/state-uts"},
  {"id": "GJ", "state_code": "GJ", "state_name": "Gujarat", "region_type": "state", "capital": "Gandhinagar", "official_website": "https://gujaratindia.gov.in", "service_portal": "Digital Gujarat Citizen Portal", "service_portal_url": "https://www.digitalgujarat.gov.in", "portal_description": "Integrated citizen service portal providing online applications for scholarships, caste & income certificates.", "helpline": "1800-233-5500", "verification_status": "verified", "last_verified": "2026-11-18", "source_url": "https://www.india.gov.in/directory/web-directory/state-uts"},
  {"id": "HR", "state_code": "HR", "state_name": "Haryana", "region_type": "state", "capital": "Chandigarh", "official_website": "https://haryana.gov.in", "service_portal": "Antyodaya Saral Haryana", "service_portal_url": "https://saralharyana.gov.in", "portal_description": "Unified e-service delivery platform for all citizen services linked directly with Parivar Pehchan Patra (PPP Family ID).", "helpline": "0172-3968400", "verification_status": "verified", "last_verified": "2026-11-18", "source_url": "https://www.india.gov.in/directory/web-directory/state-uts"},
  {"id": "HP", "state_code": "HP", "state_name": "Himachal Pradesh", "region_type": "state", "capital": "Shimla", "official_website": "https://himachal.nic.in", "service_portal": "e-District Himachal Pradesh", "service_portal_url": "https://edistrict.hp.gov.in", "portal_description": "Official citizen portal for revenue certificates, driving licenses, ration cards, and social welfare pensions in Himachal Pradesh.", "helpline": "1100", "verification_status": "verified", "last_verified": "2026-11-18", "source_url": "https://www.india.gov.in/directory/web-directory/state-uts"},
  {"id": "JH", "state_code": "JH", "state_name": "Jharkhand", "region_type": "state", "capital": "Ranchi", "official_website": "https://www.jharkhand.gov.in", "service_portal": "Jharsewa Citizen Services", "service_portal_url": "https://jharsewa.jharkhand.gov.in", "portal_description": "State portal providing online certificates, social welfare assistance, and public grievance redressal across all 24 districts.", "helpline": "1800-345-6538", "verification_status": "verified", "last_verified": "2026-11-18", "source_url": "https://www.india.gov.in/directory/web-directory/state-uts"},
  {"id": "KA", "state_code": "KA", "state_name": "Karnataka", "region_type": "state", "capital": "Bengaluru", "official_website": "https://www.karnataka.gov.in", "service_portal": "Seva Sindhu Citizen Portal", "service_portal_url": "https://sevasindhu.karnataka.gov.in", "portal_description": "Comprehensive Karnataka government citizen service gateway integrating Nadakacheri, Bangalore One, and Grama One services.", "helpline": "080-22230282 / 1902", "verification_status": "verified", "last_verified": "2026-11-18", "source_url": "https://www.india.gov.in/directory/web-directory/state-uts"},
  {"id": "KL", "state_code": "KL", "state_name": "Kerala", "region_type": "state", "capital": "Thiruvananthapuram", "official_website": "https://kerala.gov.in", "service_portal": "e-Sevanam Unified Service Portal", "service_portal_url": "https://esevanam.kerala.gov.in", "portal_description": "Single sign-on digital portal for all Kerala state department services, integrating with Akshaya Kendras and e-District Kerala.", "helpline": "155300 / 1800-425-1188", "verification_status": "verified", "last_verified": "2026-11-18", "source_url": "https://www.india.gov.in/directory/web-directory/state-uts"},
  {"id": "MP", "state_code": "MP", "state_name": "Madhya Pradesh", "region_type": "state", "capital": "Bhopal", "official_website": "https://mp.gov.in", "service_portal": "MP e-District (Lok Seva Guarantee)", "service_portal_url": "https://mpedistrict.gov.in", "portal_description": "Public Services Guarantee portal of Madhya Pradesh delivering statutory certificates and Samagra citizen database entitlements.", "helpline": "181", "verification_status": "verified", "last_verified": "2026-11-18", "source_url": "https://www.india.gov.in/directory/web-directory/state-uts"},
  {"id": "MH", "state_code": "MH", "state_name": "Maharashtra", "region_type": "state", "capital": "Mumbai", "official_website": "https://www.maharashtra.gov.in", "service_portal": "Aaple Sarkar Citizen Portal", "service_portal_url": "https://aaplesarkar.mahaonline.gov.in", "portal_description": "Right to Public Services portal of Maharashtra enabling paperless application for revenue, police verification, and civic services.", "helpline": "1800-120-8040", "verification_status": "verified", "last_verified": "2026-11-18", "source_url": "https://www.india.gov.in/directory/web-directory/state-uts"},
  {"id": "MN", "state_code": "MN", "state_name": "Manipur", "region_type": "state", "capital": "Imphal", "official_website": "https://manipur.gov.in", "service_portal": "e-District Manipur", "service_portal_url": "https://eservicesmanipur.gov.in", "portal_description": "Digital gateway providing certificates, scholarships, and tribal development schemes across Manipur.", "helpline": "0385-2451144", "verification_status": "verified", "last_verified": "2026-11-18", "source_url": "https://www.india.gov.in/directory/web-directory/state-uts"},
  {"id": "ML", "state_code": "ML", "state_name": "Meghalaya", "region_type": "state", "capital": "Shillong", "official_website": "https://meghalaya.gov.in", "service_portal": "e-District Meghalaya", "service_portal_url": "https://edistrict.meghalaya.gov.in", "portal_description": "Electronic citizen services for domicile, scheduled tribe certificates, and rural development assistance in Meghalaya.", "helpline": "1800-345-3644", "verification_status": "verified", "last_verified": "2026-11-18", "source_url": "https://www.india.gov.in/directory/web-directory/state-uts"},
  {"id": "MZ", "state_code": "MZ", "state_name": "Mizoram", "region_type": "state", "capital": "Aizawl", "official_website": "https://mizoram.gov.in", "service_portal": "e-District Mizoram", "service_portal_url": "https://edistrict.mizoram.gov.in", "portal_description": "Citizen service portal providing tribal certificates, income verification, and social pensions across Mizoram districts.", "helpline": "0389-2336010", "verification_status": "verified", "last_verified": "2026-11-18", "source_url": "https://www.india.gov.in/directory/web-directory/state-uts"},
  {"id": "NL", "state_code": "NL", "state_name": "Nagaland", "region_type": "state", "capital": "Kohima", "official_website": "https://nagaland.gov.in", "service_portal": "e-District Nagaland Portal", "service_portal_url": "https://edistrict.nagaland.gov.in", "portal_description": "Online government services for indigenous inhabitant certificates, scheduled tribe recognition, and educational scholarships.", "helpline": "0370-2270050", "verification_status": "verified", "last_verified": "2026-11-18", "source_url": "https://www.india.gov.in/directory/web-directory/state-uts"},
  {"id": "OD", "state_code": "OD", "state_name": "Odisha", "region_type": "state", "capital": "Bhubaneswar", "official_website": "https://odisha.gov.in", "service_portal": "Odisha One Unified Portal", "service_portal_url": "https://odishaone.gov.in", "portal_description": "Unified citizen service portal delivering revenue certificates, utility services, and Madhu Babu Pension.", "helpline": "1800-121-303030", "verification_status": "verified", "last_verified": "2026-11-18", "source_url": "https://www.india.gov.in/directory/web-directory/state-uts"},
  {"id": "PB", "state_code": "PB", "state_name": "Punjab", "region_type": "state", "capital": "Chandigarh", "official_website": "https://punjab.gov.in", "service_portal": "Connect Punjab (Sewa Kendra)", "service_portal_url": "https://connect.punjab.gov.in", "portal_description": "Doorstep and online public service delivery portal for certificates, social security pensions, and ration cards across Punjab.", "helpline": "1076 / 1100", "verification_status": "verified", "last_verified": "2026-11-18", "source_url": "https://www.india.gov.in/directory/web-directory/state-uts"},
  {"id": "RJ", "state_code": "RJ", "state_name": "Rajasthan", "region_type": "state", "capital": "Jaipur", "official_website": "https://rajasthan.gov.in", "service_portal": "e-Mitra Citizen Services Portal", "service_portal_url": "https://emitra.rajasthan.gov.in", "portal_description": "Over 600 citizen services accessible online through SSO ID and 80,000+ e-Mitra service centers across Rajasthan.", "helpline": "181", "verification_status": "verified", "last_verified": "2026-11-18", "source_url": "https://www.india.gov.in/directory/web-directory/state-uts"},
  {"id": "SK", "state_code": "SK", "state_name": "Sikkim", "region_type": "state", "capital": "Gangtok", "official_website": "https://sikkim.gov.in", "service_portal": "e-District Sikkim Portal", "service_portal_url": "https://edistrict.sikkim.gov.in", "portal_description": "Unified e-governance portal for Certificate of Identification, Sikkim Subject recognition, and welfare grants.", "helpline": "03592-202634", "verification_status": "verified", "last_verified": "2026-11-18", "source_url": "https://www.india.gov.in/directory/web-directory/state-uts"},
  {"id": "TN", "state_code": "TN", "state_name": "Tamil Nadu", "region_type": "state", "capital": "Chennai", "official_website": "https://www.tn.gov.in", "service_portal": "e-Sevai Portal (TNeGA)", "service_portal_url": "https://www.tnesevai.tn.gov.in", "portal_description": "Tamil Nadu e-Governance Agency platform for digital revenue certificates, Kalaignar Magalir Urimai Thittam, and welfare schemes.", "helpline": "1100 / 1800-425-6000", "verification_status": "verified", "last_verified": "2026-11-18", "source_url": "https://www.india.gov.in/directory/web-directory/state-uts"},
  {"id": "TS", "state_code": "TS", "state_name": "Telangana", "region_type": "state", "capital": "Hyderabad", "official_website": "https://www.telangana.gov.in", "service_portal": "MeeSeva Telangana Portal", "service_portal_url": "https://ts.meeseva.telangana.gov.in", "portal_description": "Telangana digital platform delivering over 300 government services including Dharani land records and Aasara welfare pensions.", "helpline": "1800-425-1110", "verification_status": "verified", "last_verified": "2026-11-18", "source_url": "https://www.india.gov.in/directory/web-directory/state-uts"},
  {"id": "TR", "state_code": "TR", "state_name": "Tripura", "region_type": "state", "capital": "Agartala", "official_website": "https://tripura.gov.in", "service_portal": "e-District Tripura Portal", "service_portal_url": "https://edistrict.tripura.gov.in", "portal_description": "Unified e-governance service delivery mechanism for certificates, revenue records, and welfare schemes in Tripura.", "helpline": "1905", "verification_status": "verified", "last_verified": "2026-11-18", "source_url": "https://www.india.gov.in/directory/web-directory/state-uts"},
  {"id": "UP", "state_code": "UP", "state_name": "Uttar Pradesh", "region_type": "state", "capital": "Lucknow", "official_website": "https://up.gov.in", "service_portal": "e-District Uttar Pradesh", "service_portal_url": "https://edistrict.up.gov.in", "portal_description": "Comprehensive citizen services portal for birth, death, caste, income, domicile certificates, and revenue court status across all 75 UP districts.", "helpline": "1076 / 0522-2304706", "verification_status": "verified", "last_verified": "2026-11-18", "source_url": "https://www.india.gov.in/directory/web-directory/state-uts"},
  {"id": "UK", "state_code": "UK", "state_name": "Uttarakhand", "region_type": "state", "capital": "Dehradun", "official_website": "https://uk.gov.in", "service_portal": "Apuni Sarkar Uttarakhand (e-District)", "service_portal_url": "https://eservices.uk.gov.in", "portal_description": "Citizen-centric platform providing online application and digital certificate download across Uttarakhand.", "helpline": "1905 / 1800-180-4025", "verification_status": "verified", "last_verified": "2026-11-18", "source_url": "https://www.india.gov.in/directory/web-directory/state-uts"},
  {"id": "WB", "state_code": "WB", "state_name": "West Bengal", "region_type": "state", "capital": "Kolkata", "official_website": "https://wb.gov.in", "service_portal": "e-District West Bengal & Duare Sarkar", "service_portal_url": "https://edistrict.wb.gov.in", "portal_description": "Citizen e-District portal delivering certificates, clearances, and doorstep flagship welfare schemes under Duare Sarkar.", "helpline": "1800-345-5555", "verification_status": "verified", "last_verified": "2026-11-18", "source_url": "https://www.india.gov.in/directory/web-directory/state-uts"},

  // 8 UTs
  {"id": "AN", "state_code": "AN", "state_name": "Andaman and Nicobar Islands", "region_type": "ut", "capital": "Port Blair", "official_website": "https://www.andaman.gov.in", "service_portal": "e-District Andaman & Nicobar", "service_portal_url": "https://edistrict.andaman.gov.in", "portal_description": "Citizen e-services for local certificate issuance, islander identification, and welfare pensions across the island territory.", "helpline": "03192-233372", "verification_status": "verified", "last_verified": "2026-11-18", "source_url": "https://www.india.gov.in/directory/web-directory/state-uts"},
  {"id": "CH", "state_code": "CH", "state_name": "Chandigarh", "region_type": "ut", "capital": "Chandigarh", "official_website": "https://chandigarh.gov.in", "service_portal": "e-District Chandigarh (Sampark)", "service_portal_url": "https://edistrict.chd.gov.in", "portal_description": "Citizen services portal integrating Chandigarh Sampark centers for revenue certificates and civic utilities.", "helpline": "1800-180-1725", "verification_status": "verified", "last_verified": "2026-11-18", "source_url": "https://www.india.gov.in/directory/web-directory/state-uts"},
  {"id": "DN", "state_code": "DN", "state_name": "Dadra and Nagar Haveli and Daman and Diu", "region_type": "ut", "capital": "Daman", "official_website": "https://ddd.gov.in", "service_portal": "e-District DNH & DD Portal", "service_portal_url": "https://edistrict.ddd.gov.in", "portal_description": "Integrated citizen services portal for domicile, caste, income certificates, and utility clearances across the merged UT.", "helpline": "1800-233-4000", "verification_status": "verified", "last_verified": "2026-11-18", "source_url": "https://www.india.gov.in/directory/web-directory/state-uts"},
  {"id": "DL", "state_code": "DL", "state_name": "Delhi", "region_type": "ut", "capital": "New Delhi", "official_website": "https://delhi.gov.in", "service_portal": "e-District Delhi Portal", "service_portal_url": "https://edistrict.delhigovt.nic.in", "portal_description": "Doorstep and online delivery of over 200 revenue, social welfare, transport, and municipal certificates in NCT of Delhi.", "helpline": "1076", "verification_status": "verified", "last_verified": "2026-11-18", "source_url": "https://www.india.gov.in/directory/web-directory/state-uts"},
  {"id": "JK", "state_code": "JK", "state_name": "Jammu and Kashmir", "region_type": "ut", "capital": "Srinagar / Jammu", "official_website": "https://jk.gov.in", "service_portal": "e-UNNAT Jammu and Kashmir", "service_portal_url": "https://eunnat.jk.gov.in", "portal_description": "Unified single-window portal offering over 400 digital services including Domicile Certificate and land passbooks.", "helpline": "1800-572-2327", "verification_status": "verified", "last_verified": "2026-11-18", "source_url": "https://www.india.gov.in/directory/web-directory/state-uts"},
  {"id": "LA", "state_code": "LA", "state_name": "Ladakh", "region_type": "ut", "capital": "Leh", "official_website": "https://ladakh.gov.in", "service_portal": "ServicePlus Ladakh (e-District)", "service_portal_url": "https://serviceonline.gov.in", "portal_description": "Citizen service platform for Resident Certificate of Ladakh, Scheduled Tribe certification, and high-altitude welfare assistance.", "helpline": "01982-255567", "verification_status": "verified", "last_verified": "2026-11-18", "source_url": "https://www.india.gov.in/directory/web-directory/state-uts"},
  {"id": "LD", "state_code": "LD", "state_name": "Lakshadweep", "region_type": "ut", "capital": "Kavaratti", "official_website": "https://lakshadweep.gov.in", "service_portal": "e-District Lakshadweep", "service_portal_url": "https://edistrict.lakshadweep.gov.in", "portal_description": "Island administration portal delivering native resident status, islander permits, and central subsidy linkages.", "helpline": "04896-262256", "verification_status": "verified", "last_verified": "2026-11-18", "source_url": "https://www.india.gov.in/directory/web-directory/state-uts"},
  {"id": "PY", "state_code": "PY", "state_name": "Puducherry", "region_type": "ut", "capital": "Puducherry", "official_website": "https://www.py.gov.in", "service_portal": "e-District Puducherry", "service_portal_url": "https://edistrict.py.gov.in", "portal_description": "Unified e-services for residence, nativity, caste certificates, and social welfare entitlements in Puducherry.", "helpline": "1800-425-1077", "verification_status": "verified", "last_verified": "2026-11-18", "source_url": "https://www.india.gov.in/directory/web-directory/state-uts"}
]

SAMPLE_DISTRICTS = [
  # Karnataka
  ("ka-bengaluru-urban", "KA", "Bengaluru Urban", "https://bengaluruurban.nic.in", "verified"),
  ("ka-bengaluru-rural", "KA", "Bengaluru Rural", "https://bengalururural.nic.in", "verified"),
  ("ka-mysuru", "KA", "Mysuru", "https://mysore.nic.in", "verified"),
  ("ka-belagavi", "KA", "Belagavi", "https://belagavi.nic.in", "verified"),
  ("ka-kalaburagi", "KA", "Kalaburagi", "https://kalaburagi.nic.in", "verified"),
  ("ka-dharwad", "KA", "Dharwad (Hubballi)", "https://dharwad.nic.in", "verified"),
  ("ka-dakshina-kannada", "KA", "Dakshina Kannada (Mangaluru)", "https://dk.nic.in", "verified"),
  ("ka-shivamogga", "KA", "Shivamogga", "https://shimoga.nic.in", "verified"),
  ("ka-tumakuru", "KA", "Tumakuru", "https://tumkur.nic.in", "verified"),
  ("ka-udupi", "KA", "Udupi", "https://udupi.nic.in", "verified"),

  # Tamil Nadu
  ("tn-chennai", "TN", "Chennai", "https://chennai.nic.in", "verified"),
  ("tn-coimbatore", "TN", "Coimbatore", "https://coimbatore.nic.in", "verified"),
  ("tn-madurai", "TN", "Madurai", "https://madurai.nic.in", "verified"),
  ("tn-trichy", "TN", "Tiruchirappalli", "https://tiruchirappalli.nic.in", "verified"),
  ("tn-salem", "TN", "Salem", "https://salem.nic.in", "verified"),
  ("tn-tirunelveli", "TN", "Tirunelveli", "https://tirunelveli.nic.in", "verified"),
  ("tn-kanchipuram", "TN", "Kanchipuram", "https://kancheepuram.nic.in", "verified"),

  # Telangana
  ("ts-hyderabad", "TS", "Hyderabad", "https://hyderabad.telangana.gov.in", "verified"),
  ("ts-medchal", "TS", "Medchal-Malkajgiri", "https://medchal.telangana.gov.in", "verified"),
  ("ts-rangareddy", "TS", "Ranga Reddy", "https://rangareddy.telangana.gov.in", "verified"),
  ("ts-warangal", "TS", "Warangal", "https://warangal.telangana.gov.in", "verified"),
  ("ts-karimnagar", "TS", "Karimnagar", "https://karimnagar.telangana.gov.in", "verified"),

  # Andhra Pradesh
  ("ap-visakhapatnam", "AP", "Visakhapatnam", "https://visakhapatnam.ap.gov.in", "verified"),
  ("ap-vijayawada", "AP", "NTR (Vijayawada)", "https://ntr.ap.gov.in", "verified"),
  ("ap-guntur", "AP", "Guntur", "https://guntur.ap.gov.in", "verified"),
  ("ap-tirupati", "AP", "Tirupati", "https://tirupati.ap.gov.in", "verified"),
  ("ap-kurnool", "AP", "Kurnool", "https://kurnool.ap.gov.in", "verified"),

  # Kerala
  ("kl-trivandrum", "KL", "Thiruvananthapuram", "https://trivandrum.nic.in", "verified"),
  ("kl-ernakulam", "KL", "Ernakulam (Kochi)", "https://ernakulam.nic.in", "verified"),
  ("kl-kozhikode", "KL", "Kozhikode", "https://kozhikode.nic.in", "verified"),
  ("kl-thrissur", "KL", "Thrissur", "https://thrissur.nic.in", "verified"),
  ("kl-malappuram", "KL", "Malappuram", "https://malappuram.nic.in", "verified"),

  # Maharashtra
  ("mh-mumbai", "MH", "Mumbai City", "https://mumbaicity.gov.in", "verified"),
  ("mh-pune", "MH", "Pune", "https://pune.gov.in", "verified"),
  ("mh-nagpur", "MH", "Nagpur", "https://nagpur.gov.in", "verified"),
  ("mh-thane", "MH", "Thane", "https://thane.nic.in", "verified"),
  ("mh-nashik", "MH", "Nashik", "https://nashik.gov.in", "verified"),

  # Uttar Pradesh
  ("up-lucknow", "UP", "Lucknow", "https://lucknow.nic.in", "verified"),
  ("up-kanpur", "UP", "Kanpur Nagar", "https://kanpurnagar.nic.in", "verified"),
  ("up-varanasi", "UP", "Varanasi", "https://varanasi.nic.in", "verified"),
  ("up-noida", "UP", "Gautam Buddha Nagar (Noida)", "https://gbnagar.nic.in", "verified"),
  ("up-prayagraj", "UP", "Prayagraj", "https://prayagraj.nic.in", "verified"),

  # Delhi
  ("dl-new-delhi", "DL", "New Delhi", "https://dcnewdelhi.delhigovt.nic.in", "verified"),
  ("dl-central", "DL", "Central Delhi", "https://dccentral.delhigovt.nic.in", "verified"),
  ("dl-south", "DL", "South Delhi", "https://dcsouth.delhigovt.nic.in", "verified"),
  ("dl-west", "DL", "West Delhi", "https://dcwest.delhigovt.nic.in", "verified")
]

STATE_PORTALS_SEED = [
  ("KA", "income-certificate", "Nadakacheri (Atalji Janasnehi Kendra)", "https://nadakacheri.karnataka.gov.in", "Official Karnataka income certification portal under Atalji Janasnehi Kendra", "Revenue Department", "Grama One / Bangalore One / Nadakacheri Counter", "https://services.india.gov.in", "verified", "2026-11-18"),
  ("KA", "caste-certificate", "Nadakacheri / Seva Sindhu", "https://nadakacheri.karnataka.gov.in", "Scheduled Caste, ST and Backward Classes certificate issuance", "Social Welfare Department, Karnataka", "Grama One / Karnataka One Counter", "https://services.india.gov.in", "verified", "2026-11-18"),
  ("KA", "residence-certificate", "Nadakacheri Domicile Portal", "https://nadakacheri.karnataka.gov.in", "Verification and certificate for domicile in Karnataka", "Revenue Department, Karnataka", "Nadakacheri Front Desk", "https://services.india.gov.in", "verified", "2026-11-18"),
  ("KA", "ration-card", "Ahara Karnataka Food & Civil Supplies", "https://ahara.kar.nic.in", "Online ration card management, amendment, and e-PDS services", "Food, Civil Supplies & Consumer Affairs", "Fair Price Shop or Taluk Office", "https://services.india.gov.in", "verified", "2026-11-18"),
  ("KA", "pension-guidance", "SSP Karnataka Pension Portal", "https://ssp.karnataka.gov.in", "Social Security Pensions (Sandhya Suraksha, Old Age, Disability)", "Directorate of Social Security, Karnataka", "Taluk Tahsildar Desk", "https://services.india.gov.in", "verified", "2026-11-18"),

  ("TN", "income-certificate", "e-Sevai Citizen Portal (TNeGA)", "https://www.tnesevai.tn.gov.in", "Official Tamil Nadu e-Sevai revenue certificate application", "Revenue & Disaster Management, TN", "Nearest Arasu e-Sevai Centre", "https://services.india.gov.in", "verified", "2026-11-18"),
  ("TN", "caste-certificate", "e-Sevai Community Certificate", "https://www.tnesevai.tn.gov.in", "Community certificate issued under Revenue Administration", "Adi Dravidar and Tribal Welfare Dept", "Arasu e-Sevai Centre / VAO Office", "https://services.india.gov.in", "verified", "2026-11-18"),
  ("TN", "residence-certificate", "e-Sevai Nativity / Residence", "https://www.tnesevai.tn.gov.in", "Nativity and Residence certificate issuance in Tamil Nadu", "Revenue & Disaster Management, TN", "Arasu e-Sevai Centre", "https://services.india.gov.in", "verified", "2026-11-18"),
  ("TN", "ration-card", "TNPDS Smart Card Portal", "https://www.tnpds.gov.in", "Smart Family Card application, member inclusion and address update", "Civil Supplies & Consumer Protection, TN", "Taluk Supply Office (TSO)", "https://services.india.gov.in", "verified", "2026-11-18"),

  ("KL", "income-certificate", "e-District Kerala", "https://edistrict.kerala.gov.in", "Official revenue income certificate delivery portal", "Revenue Department, Kerala", "Nearest Akshaya Kendra or Village Office", "https://services.india.gov.in", "verified", "2026-11-18"),
  ("KL", "caste-certificate", "e-District Community Certificate", "https://edistrict.kerala.gov.in", "Official community and non-creamy layer certificates", "Revenue & SC/ST Development, Kerala", "Akshaya Kendra / Village Office", "https://services.india.gov.in", "verified", "2026-11-18"),
  ("KL", "residence-certificate", "e-District Nativity Portal", "https://edistrict.kerala.gov.in", "Official Nativity certificate delivery", "Revenue Department, Kerala", "Akshaya Kendra", "https://services.india.gov.in", "verified", "2026-11-18"),

  ("TS", "income-certificate", "MeeSeva Telangana", "https://ts.meeseva.telangana.gov.in", "Official digital income certificate application", "Revenue Department, Telangana", "Nearest MeeSeva Center", "https://services.india.gov.in", "verified", "2026-11-18"),
  ("TS", "caste-certificate", "MeeSeva Integrated Certificate", "https://ts.meeseva.telangana.gov.in", "Integrated Caste, Nativity, and Date of Birth certificate", "Revenue Department, Telangana", "MeeSeva Center / Tahsildar Desk", "https://services.india.gov.in", "verified", "2026-11-18"),

  ("AP", "income-certificate", "AP Seva Portal (MeeSeva AP)", "https://onlineap.meeseva.gov.in", "Official income certificate portal under AP Seva", "Revenue Department, AP", "Grama / Ward Sachivalayam", "https://services.india.gov.in", "verified", "2026-11-18"),
  ("AP", "caste-certificate", "AP Seva Integrated Caste", "https://onlineap.meeseva.gov.in", "Official integrated caste and residence certificate", "Social Welfare & Revenue, AP", "Grama / Ward Sachivalayam", "https://services.india.gov.in", "verified", "2026-11-18"),

  ("MH", "income-certificate", "Aaple Sarkar Maharashtra", "https://aaplesarkar.mahaonline.gov.in", "Right to Services online income certification", "Revenue & Forest Department, Maharashtra", "Maha e-Seva Kendra or Tahsildar Office", "https://services.india.gov.in", "verified", "2026-11-18"),
  ("MH", "caste-certificate", "Aaple Sarkar Caste Certificate", "https://aaplesarkar.mahaonline.gov.in", "Statutory caste and validity certification", "Social Justice Department, Maharashtra", "Sub-Divisional Officer (SDO) Desk", "https://services.india.gov.in", "verified", "2026-11-18"),

  ("UP", "income-certificate", "e-District Uttar Pradesh", "https://edistrict.up.gov.in", "Aay Praman Patra online delivery", "Board of Revenue, Uttar Pradesh", "Nearest Jan Seva Kendra (CSC) / Tehsil", "https://services.india.gov.in", "verified", "2026-11-18"),
  ("UP", "caste-certificate", "e-District UP Caste Certificate", "https://edistrict.up.gov.in", "Jati Praman Patra online delivery", "Social Welfare Department, UP", "Jan Seva Kendra / Tehsil Office", "https://services.india.gov.in", "verified", "2026-11-18"),

  ("DL", "income-certificate", "e-District Delhi", "https://edistrict.delhigovt.nic.in", "Official Delhi income certificate with doorstep delivery option", "Revenue Department, GNCTD", "Call 1076 or visit SDM Office", "https://services.india.gov.in", "verified", "2026-11-18")
]


def populate():
    print(f"Connecting to {DB_FILE}...")
    conn = sqlite3.connect(DB_FILE)
    conn.execute("PRAGMA foreign_keys = ON")
    cursor = conn.cursor()

    # 1. Create states table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS states (
            id TEXT PRIMARY KEY,
            state_name TEXT NOT NULL,
            state_code TEXT NOT NULL UNIQUE,
            region_type TEXT NOT NULL,
            capital TEXT NOT NULL,
            official_website TEXT NOT NULL,
            service_portal TEXT NOT NULL,
            service_portal_url TEXT NOT NULL,
            portal_description TEXT,
            helpline TEXT,
            verification_status TEXT DEFAULT 'verified',
            last_verified TEXT NOT NULL,
            source_url TEXT NOT NULL
        )
    """)
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_states_region_type ON states(region_type)")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_states_code ON states(state_code)")

    # 2. Create districts table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS districts (
            id TEXT PRIMARY KEY,
            state_id TEXT NOT NULL,
            district_name TEXT NOT NULL,
            official_website TEXT,
            verification_status TEXT DEFAULT 'verified',
            FOREIGN KEY (state_id) REFERENCES states(id) ON DELETE CASCADE
        )
    """)
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_districts_state ON districts(state_id)")

    # 3. Create state_service_portals table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS state_service_portals (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            state_id TEXT NOT NULL,
            service_id TEXT NOT NULL,
            portal_name TEXT NOT NULL,
            portal_url TEXT NOT NULL,
            description TEXT,
            department TEXT,
            offline_center TEXT,
            source_url TEXT,
            verification_status TEXT DEFAULT 'verified',
            last_verified TEXT NOT NULL,
            FOREIGN KEY (state_id) REFERENCES states(id) ON DELETE CASCADE,
            FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE,
            UNIQUE(state_id, service_id)
        )
    """)
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_ssp_state_svc ON state_service_portals(state_id, service_id)")

    # 4. Insert / Update States (36 total)
    for s in STATES_DATA:
        cursor.execute("""
            INSERT OR REPLACE INTO states (
                id, state_name, state_code, region_type, capital,
                official_website, service_portal, service_portal_url,
                portal_description, helpline, verification_status,
                last_verified, source_url
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            s["id"], s["state_name"], s["state_code"], s["region_type"], s["capital"],
            s["official_website"], s["service_portal"], s["service_portal_url"],
            s["portal_description"], s["helpline"], s["verification_status"],
            s["last_verified"], s["source_url"]
        ))

    # 5. Insert / Update Districts
    for d in SAMPLE_DISTRICTS:
        cursor.execute("""
            INSERT OR REPLACE INTO districts (
                id, state_id, district_name, official_website, verification_status
            ) VALUES (?, ?, ?, ?, ?)
        """, d)

    # 6. Insert / Update State Service Portals
    for sp in STATE_PORTALS_SEED:
        cursor.execute("""
            INSERT OR REPLACE INTO state_service_portals (
                state_id, service_id, portal_name, portal_url,
                description, department, offline_center, source_url,
                verification_status, last_verified
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, sp)

    conn.commit()

    cursor.execute("SELECT COUNT(*) AS c FROM states")
    s_cnt = cursor.fetchone()[0]
    cursor.execute("SELECT COUNT(*) AS c FROM districts")
    d_cnt = cursor.fetchone()[0]
    cursor.execute("SELECT COUNT(*) AS c FROM state_service_portals")
    p_cnt = cursor.fetchone()[0]

    print(f"Database successfully populated:")
    print(f"  - States & UTs: {s_cnt}")
    print(f"  - Districts: {d_cnt}")
    print(f"  - State Portals: {p_cnt}")

    conn.close()

if __name__ == "__main__":
    populate()

