import i18n from '../i18n/i18n.js';
import { serviceFullTranslations } from '../data/serviceFullTranslations.js';

export const serviceKeyMap = {
  'income-certificate': 'incomeCertificate',
  'caste-certificate': 'casteCertificate',
  'residence-certificate': 'residenceCertificate',
  'scholarship-guidance': 'scholarshipGuidance',
  'pension-guidance': 'pensionGuidance',
  'ration-card': 'rationCard',
  'ayushman-card': 'ayushmanCard',
  'pm-kisan': 'pmKisan',
};

export const categoryKeyMap = {
  'certificates': 'certificates',
  'identity': 'identity',
  'pension': 'pension',
  'education': 'education',
};

/**
 * Returns complete translated service fields (including questions, simpleSteps, targetGroup, etc.)
 * using active i18next language or explicitly provided lang code.
 */
export function getServiceTranslation(service, t, explicitLang = null) {
  if (!service) return {};

  let lang = explicitLang;

  // 1. Infallible language detection directly from t function using common.langCode
  if (!lang && typeof t === 'function') {
    try {
      const codeFromT = t('common.langCode', '');
      if (codeFromT && codeFromT !== 'common.langCode' && typeof codeFromT === 'string') {
        lang = codeFromT.slice(0, 2).toLowerCase();
      }
    } catch {
      // safe fallback
    }
  }

  // 2. Check if t is an i18next instance or options object
  if (!lang && t && typeof t === 'object') {
    if (t.i18n && (t.i18n.resolvedLanguage || t.i18n.language)) {
      lang = t.i18n.resolvedLanguage || t.i18n.language;
    } else if (t.resolvedLanguage || t.language || t.lng) {
      lang = t.resolvedLanguage || t.language || t.lng;
    }
  }

  // 3. Check active global i18n instance
  if (!lang && i18n) {
    lang = i18n.resolvedLanguage || i18n.language;
  }

  // 4. Check localStorage persistence
  if (!lang && typeof localStorage !== 'undefined') {
    lang = localStorage.getItem('i18nextLng');
  }

  // 5. Check root document lang attribute
  if (!lang && typeof document !== 'undefined' && document.documentElement?.lang) {
    lang = document.documentElement.lang;
  }

  const currentLang = (lang || 'en').slice(0, 2).toLowerCase();
  const serviceId = service.id || service.slug;

  const key = service.translationKey || serviceKeyMap[serviceId];
  const fullData = serviceFullTranslations[serviceId]?.[currentLang] || serviceFullTranslations[serviceId]?.['en'];

  if (fullData) {
    return {
      title: fullData.title,
      shortDescription: fullData.shortDescription,
      officialFee: fullData.officialFee,
      processingTime: fullData.processingTime,
      benefitAmount: fullData.benefitAmount,
      spokenSummary: fullData.spokenSummary,
      targetGroup: fullData.targetGroup,
      incomeLimit: fullData.incomeLimit,
      residenceRequirement: fullData.residenceRequirement,
      questions: fullData.questions || service.eligibilityCriteria?.questions || [],
      simpleSteps: fullData.simpleSteps || service.simpleSteps || [],
      requiredDocuments: fullData.requiredDocuments || service.requiredDocuments || [],
    };
  }

  if (!key || !t) {
    return {
      title: service.title,
      shortDescription: service.shortDescription,
      officialFee: service.officialFee,
      processingTime: service.processingTime,
      benefitAmount: service.benefitAmount,
      spokenSummary: service.spokenSummary,
      targetGroup: service.eligibilityCriteria?.targetGroup,
      incomeLimit: service.eligibilityCriteria?.incomeLimit,
      residenceRequirement: service.eligibilityCriteria?.residenceRequirement,
      questions: service.eligibilityCriteria?.questions || [],
      simpleSteps: service.simpleSteps || [],
      requiredDocuments: service.requiredDocuments || [],
    };
  }

  return {
    title: t(`services.${key}.title`, service.title),
    shortDescription: t(`services.${key}.shortDescription`, service.shortDescription),
    officialFee: t(`services.${key}.officialFee`, service.officialFee),
    processingTime: t(`services.${key}.processingTime`, service.processingTime),
    benefitAmount: t(`services.${key}.benefit`, service.benefitAmount),
    spokenSummary: t(`services.${key}.spokenSummary`, service.spokenSummary),
    targetGroup: service.eligibilityCriteria?.targetGroup,
    incomeLimit: service.eligibilityCriteria?.incomeLimit,
    residenceRequirement: service.eligibilityCriteria?.residenceRequirement,
    questions: service.eligibilityCriteria?.questions || [],
    simpleSteps: service.simpleSteps || [],
    requiredDocuments: service.requiredDocuments || [],
  };
}

/**
 * Returns translated category fields using active i18next translation
 */
export function getCategoryTranslation(category, t) {
  if (!category) return {};
  const key = categoryKeyMap[category.id];
  if (!key || !t) {
    return {
      title: category.title,
      description: category.description,
    };
  }
  return {
    title: t(`categories.${key}`, category.title),
    description: t(`categories.${key}Desc`, category.description),
  };
}
