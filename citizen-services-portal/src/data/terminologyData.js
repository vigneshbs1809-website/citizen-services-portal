/**
 * Official Government Terminology Dataset
 * Contains core legal, documentation, financial, and procedural terms with reviewed plain-language translations.
 */

export const terminologyCategories = [
  { id: 'all', labelKey: 'terminology.categoryAll', defaultLabel: 'All Terms' },
  { id: 'documents', labelKey: 'terminology.categoryDocuments', defaultLabel: 'Paperwork & Proofs' },
  { id: 'legal', labelKey: 'terminology.categoryLegal', defaultLabel: 'Legal & Verification' },
  { id: 'financial', labelKey: 'terminology.categoryFinancial', defaultLabel: 'Income & Subsidies' },
  { id: 'rights', labelKey: 'terminology.categoryRights', defaultLabel: 'Citizen Rights & Appeals' },
];

export const terminologyData = [
  {
    id: 'prescribed-documents',
    category: 'documents',
    officialEn: 'The applicant shall submit the prescribed documents.',
    simplifiedEn: 'Give the required documents when you apply.',
    exampleEn: 'When applying for an Income Certificate, bring your Aadhaar card and salary slip or village patwari report.',
    relatedServiceIds: ['income-certificate', 'caste-certificate', 'residence-certificate', 'ration-card'],
  },
  {
    id: 'statutory-affidavit',
    category: 'legal',
    officialEn: 'A statutory affidavit executed before a judicial magistrate or notary public.',
    simplifiedEn: 'A written statement of truth stamped by an authorized legal officer.',
    exampleEn: 'If your name is spelled differently on two old documents, you sign a ₹20 stamp paper statement before a notary.',
    relatedServiceIds: ['income-certificate', 'caste-certificate', 'pension-guidance'],
  },
  {
    id: 'gazetted-officer-attestation',
    category: 'legal',
    officialEn: 'True copies duly attested by a Gazetted Officer of the Central or State Government.',
    simplifiedEn: 'Photocopies signed and stamped by an authorized government official.',
    exampleEn: 'A government school principal, tehsildar, or civil surgeon stamps their official seal on your photocopy to confirm it is genuine.',
    relatedServiceIds: ['caste-certificate', 'scholarship-guidance'],
  },
  {
    id: 'domicile-certificate',
    category: 'documents',
    officialEn: 'Proof of continuous residence within the territorial jurisdiction of the State.',
    simplifiedEn: 'A certificate proving you have lived in this state for the required years.',
    exampleEn: 'Submitted when applying for local state college quotas, ration card transfers, or rural welfare subsidies.',
    relatedServiceIds: ['residence-certificate', 'scholarship-guidance'],
  },
  {
    id: 'direct-benefit-transfer',
    category: 'financial',
    officialEn: 'Disbursement of welfare subsidies exclusively through Direct Benefit Transfer (DBT) to Aadhaar-linked bank accounts.',
    simplifiedEn: 'Government money sent directly into your bank account with no middleman.',
    exampleEn: 'Your ₹6,000 PM-Kisan installment or monthly pension arrives straight into your bank passbook without cash handling.',
    relatedServiceIds: ['pm-kisan', 'pension-guidance', 'scholarship-guidance'],
  },
  {
    id: 'income-ceiling',
    category: 'financial',
    officialEn: 'Aggregate family annual gross income from all sources must not exceed the prescribed ceiling limit.',
    simplifiedEn: 'Total family earnings in a year must be lower than the cutoff limit.',
    exampleEn: 'For college fee reimbursement or subsidy ration cards, your entire household earnings must be under ₹1,50,000 per year.',
    relatedServiceIds: ['income-certificate', 'scholarship-guidance', 'ration-card', 'ayushman-card'],
  },
  {
    id: 'self-attestation',
    category: 'documents',
    officialEn: 'Documents must be self-attested with the signature of the declarant.',
    simplifiedEn: 'Sign your own name and write the date on each photocopy.',
    exampleEn: 'You do not need to pay an agent; simply write "Self-Attested" with your signature on your Aadhaar photocopy.',
    relatedServiceIds: ['income-certificate', 'caste-certificate', 'ration-card'],
  },
  {
    id: 'grievance-redressal',
    category: 'rights',
    officialEn: 'Appellate authority for grievance redressal against non-compliance with the statutory Citizen\'s Charter.',
    simplifiedEn: 'The government officer you report to if your service is delayed or someone asks for a bribe.',
    exampleEn: 'If your caste certificate is not delivered within 21 working days, you file an appeal to the Sub-Divisional Magistrate.',
    relatedServiceIds: ['income-certificate', 'caste-certificate', 'pension-guidance'],
  },
  {
    id: 'biometric-authentication',
    category: 'legal',
    officialEn: 'Biometric electronic Know Your Customer (e-KYC) deduplication and verification.',
    simplifiedEn: 'Checking your fingerprints or eye scan on the device to prove your identity.',
    exampleEn: 'Placing your thumb on the scanner at the fair price ration shop to receive your monthly grains.',
    relatedServiceIds: ['ration-card', 'ayushman-card', 'pm-kisan'],
  },
  {
    id: 'encumbrance-certificate',
    category: 'documents',
    officialEn: 'Certificate of Non-Encumbrance verifying free and unencumbered title on immovable property.',
    simplifiedEn: 'A paper showing land or a house has no unpaid bank loans or legal disputes.',
    exampleEn: 'Checking with the sub-registrar office that a plot is legally clean before purchase or building loan sanction.',
    relatedServiceIds: ['residence-certificate', 'pm-kisan'],
  },
];
