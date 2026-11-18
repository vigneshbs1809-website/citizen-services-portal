import { servicesData } from '../data/servicesData.js';
import { getServiceTranslation } from './serviceTranslation.js';

/**
 * Normalizes a text string for fuzzy multilingual comparison
 */
export function normalizeQuery(str) {
  if (!str) return '';
  return str
    .toString()
    .trim()
    .toLowerCase()
    .normalize('NFC')
    .replace(/[\s\-_]+/g, ' ');
}

/**
 * Performs multilingual search across all services and keyword mappings
 * @param {string} query - user input query in any language
 * @param {string} category - optional category filter ('all' or specific id)
 * @param {function} t - i18next translation function
 * @returns {Array} matching services sorted by relevance score
 */
export function searchServices(query = '', category = 'all', t = null) {
  const normQuery = normalizeQuery(query);
  const tokens = normQuery ? normQuery.split(' ').filter(Boolean) : [];

  return servicesData
    .filter((service) => {
      // 1. Check category match
      if (category && category !== 'all' && service.category !== category) {
        return false;
      }
      if (!normQuery) return true;

      // 2. Multilingual Keyword Match across all 6 languages
      const allKeywords = Object.values(service.multilingualKeywords || {})
        .flat()
        .map(normalizeQuery);

      const hasKeywordMatch = allKeywords.some((kw) =>
        kw.includes(normQuery) || tokens.some((token) => kw.includes(token))
      );
      if (hasKeywordMatch) return true;

      // 3. Translated title and description match in active language
      const translated = getServiceTranslation(service, t);
      const transTitle = normalizeQuery(translated.title);
      const transDesc = normalizeQuery(translated.shortDescription);
      const transFee = normalizeQuery(translated.officialFee);

      if (
        transTitle.includes(normQuery) ||
        transDesc.includes(normQuery) ||
        transFee.includes(normQuery) ||
        tokens.some((token) => transTitle.includes(token))
      ) {
        return true;
      }

      // 4. Default english title, documents, and benefit match
      const defaultTitle = normalizeQuery(service.title);
      const defaultDesc = normalizeQuery(service.shortDescription);
      const docsMatch = service.requiredDocuments?.some((doc) =>
        normalizeQuery(doc).includes(normQuery)
      );

      return (
        defaultTitle.includes(normQuery) ||
        defaultDesc.includes(normQuery) ||
        docsMatch ||
        tokens.some((token) => defaultTitle.includes(token))
      );
    })
    .map((service) => {
      if (!normQuery) return { service, score: 0 };

      // Compute relevance score
      let score = 0;
      const translated = getServiceTranslation(service, t);
      const transTitle = normalizeQuery(translated.title);
      const defaultTitle = normalizeQuery(service.title);

      // Exact title match
      if (transTitle === normQuery || defaultTitle === normQuery) {
        score += 100;
      } else if (transTitle.startsWith(normQuery) || defaultTitle.startsWith(normQuery)) {
        score += 75;
      } else if (transTitle.includes(normQuery) || defaultTitle.includes(normQuery)) {
        score += 50;
      }

      // Keyword matches
      const allKeywords = Object.values(service.multilingualKeywords || {})
        .flat()
        .map(normalizeQuery);

      if (allKeywords.includes(normQuery)) {
        score += 80;
      } else if (allKeywords.some((kw) => kw.startsWith(normQuery))) {
        score += 60;
      } else if (allKeywords.some((kw) => kw.includes(normQuery))) {
        score += 40;
      }

      return { service, score };
    })
    .sort((a, b) => b.score - a.score)
    .map((item) => item.service);
}

/**
 * Returns top suggested services for live autocomplete dropdowns
 */
export function getSearchSuggestions(query = '', limit = 5, t = null) {
  if (!query || !query.trim()) return [];
  const results = searchServices(query, 'all', t);
  return results.slice(0, limit);
}
