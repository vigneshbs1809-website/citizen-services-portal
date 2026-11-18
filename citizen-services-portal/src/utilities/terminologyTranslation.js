import { terminologyData } from '../data/terminologyData';

/**
 * Retrieves reviewed multilingual translations for a government terminology entry
 * @param {Object|string} term - terminology object or term ID
 * @param {Function} t - i18next translation function
 */
export function getTerminologyTranslation(term, t) {
  if (!term) {
    return { official: '', simplified: '', example: '' };
  }

  const id = typeof term === 'string' ? term : term.id;
  const baseTerm = typeof term === 'string' ? terminologyData.find((item) => item.id === term) : term;

  if (!t) {
    return {
      official: baseTerm?.officialEn || '',
      simplified: baseTerm?.simplifiedEn || '',
      example: baseTerm?.exampleEn || '',
    };
  }

  const official = t(`terminology.terms.${id}.official`, {
    defaultValue: baseTerm?.officialEn || '',
  });

  const simplified = t(`terminology.terms.${id}.simplified`, {
    defaultValue: baseTerm?.simplifiedEn || '',
  });

  const example = t(`terminology.terms.${id}.example`, {
    defaultValue: baseTerm?.exampleEn || '',
  });

  return { official, simplified, example };
}
