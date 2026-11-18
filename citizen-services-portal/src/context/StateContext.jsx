import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { STATES_AND_UTS, getStateByCode } from '../data/statesData';
import { getDistrictsForState } from '../data/districtsData';
import { STATE_SPECIFIC_SERVICE_PORTALS, getStateServicePortal } from '../data/statePortalsData';
import { getStatesApi, getStateDetailsApi } from '../services/api';

const STORAGE_STATE_KEY = 'citizen_selected_state';
const STORAGE_DISTRICT_KEY = 'citizen_selected_district';
const STORAGE_NATIONAL_ONLY_KEY = 'citizen_national_only';
const STORAGE_RECENT_SERVICES_KEY = 'citizen_recent_services';
const STORAGE_FAVOURITES_KEY = 'citizen_favourite_services';

const StateContext = createContext(null);

export function StateProvider({ children }) {
  // 1. Selected State
  const [selectedState, setSelectedState] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_STATE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.code) {
          // Re-hydrate with full dataset
          return getStateByCode(parsed.code) || parsed;
        }
      }
    } catch (_) {}
    return null;
  });

  // 2. Selected District
  const [selectedDistrict, setSelectedDistrict] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_DISTRICT_KEY);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch (_) {}
    return null;
  });

  // 3. National-only flag (if user clicked 'Skip' or 'All India')
  const [isNationalOnly, setIsNationalOnly] = useState(() => {
    return localStorage.getItem(STORAGE_NATIONAL_ONLY_KEY) === 'true';
  });

  // 4. Scheme Filter: 'all' | 'central' | 'state'
  const [filterMode, setFilterMode] = useState('all');

  // 5. States Master List (with remote API sync & local fallback)
  const [statesList, setStatesList] = useState(STATES_AND_UTS);

  // 6. Recently viewed services (max 6)
  const [recentServices, setRecentServices] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_RECENT_SERVICES_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (_) {
      return [];
    }
  });

  // 7. Favourite services IDs set
  const [favouriteIds, setFavouriteIds] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_FAVOURITES_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (_) {
      return [];
    }
  });

  // Sync states from API on mount
  useEffect(() => {
    let isMounted = true;
    getStatesApi().then((data) => {
      if (isMounted && Array.isArray(data) && data.length >= 36) {
        setStatesList(data);
      }
    });
    return () => { isMounted = false; };
  }, []);

  // Save selected state
  const selectState = useCallback((stateInput) => {
    let stateObj = null;
    if (typeof stateInput === 'string') {
      stateObj = getStateByCode(stateInput) || statesList.find((s) => s.code.toLowerCase() === stateInput.toLowerCase());
    } else if (stateInput && stateInput.code) {
      stateObj = getStateByCode(stateInput.code) || stateInput;
    }

    setSelectedState(stateObj);
    setIsNationalOnly(false);
    setSelectedDistrict(null); // Reset district when state changes

    try {
      if (stateObj) {
        localStorage.setItem(STORAGE_STATE_KEY, JSON.stringify({ code: stateObj.code, name: stateObj.name }));
        localStorage.removeItem(STORAGE_NATIONAL_ONLY_KEY);
        localStorage.removeItem(STORAGE_DISTRICT_KEY);
      } else {
        localStorage.removeItem(STORAGE_STATE_KEY);
      }
    } catch (_) {}
  }, [statesList]);

  // Save selected district
  const selectDistrict = useCallback((districtInput) => {
    let distObj = null;
    if (typeof districtInput === 'string') {
      const allDists = selectedState ? getDistrictsForState(selectedState.code) : [];
      distObj = allDists.find((d) => d.id === districtInput || d.name.toLowerCase() === districtInput.toLowerCase()) || {
        id: districtInput,
        name: districtInput,
      };
    } else {
      distObj = districtInput;
    }

    setSelectedDistrict(distObj);
    try {
      if (distObj) {
        localStorage.setItem(STORAGE_DISTRICT_KEY, JSON.stringify(distObj));
      } else {
        localStorage.removeItem(STORAGE_DISTRICT_KEY);
      }
    } catch (_) {}
  }, [selectedState]);

  // Clear state selection (switch to national / all India)
  const clearState = useCallback(() => {
    setSelectedState(null);
    setSelectedDistrict(null);
    setIsNationalOnly(true);
    try {
      localStorage.removeItem(STORAGE_STATE_KEY);
      localStorage.removeItem(STORAGE_DISTRICT_KEY);
      localStorage.setItem(STORAGE_NATIONAL_ONLY_KEY, 'true');
    } catch (_) {}
  }, []);

  // Clear district only
  const clearDistrict = useCallback(() => {
    setSelectedDistrict(null);
    try {
      localStorage.removeItem(STORAGE_DISTRICT_KEY);
    } catch (_) {}
  }, []);

  // Districts for currently selected state
  const districtsList = useMemo(() => {
    if (!selectedState) return [];
    return getDistrictsForState(selectedState.code);
  }, [selectedState]);

  // Portals mapping for currently selected state
  const statePortals = useMemo(() => {
    if (!selectedState) return {};
    return STATE_SPECIFIC_SERVICE_PORTALS[selectedState.code] || {};
  }, [selectedState]);

  // Add recent service
  const addRecentService = useCallback((service) => {
    if (!service || !service.id) return;
    setRecentServices((prev) => {
      const filtered = prev.filter((s) => s.id !== service.id);
      const updated = [
        {
          id: service.id,
          title: service.title,
          category: service.category,
          officialFee: service.officialFee,
          processingTime: service.processingTime,
          timestamp: Date.now(),
        },
        ...filtered,
      ].slice(0, 6);

      try {
        localStorage.setItem(STORAGE_RECENT_SERVICES_KEY, JSON.stringify(updated));
      } catch (_) {}

      return updated;
    });
  }, []);

  // Toggle Favourite
  const toggleFavourite = useCallback((serviceId) => {
    if (!serviceId) return;
    setFavouriteIds((prev) => {
      const exists = prev.includes(serviceId);
      const updated = exists ? prev.filter((id) => id !== serviceId) : [...prev, serviceId];
      try {
        localStorage.setItem(STORAGE_FAVOURITES_KEY, JSON.stringify(updated));
      } catch (_) {}
      return updated;
    });
  }, []);

  const isFavourite = useCallback((serviceId) => {
    return favouriteIds.includes(serviceId);
  }, [favouriteIds]);

  const value = {
    selectedState,
    selectedDistrict,
    isNationalOnly,
    statesList,
    districtsList,
    statePortals,
    filterMode,
    recentServices,
    favouriteIds,
    selectState,
    selectDistrict,
    clearState,
    clearDistrict,
    setFilterMode,
    addRecentService,
    toggleFavourite,
    isFavourite,
    getStateServicePortal: (serviceId) => {
      if (!selectedState) return null;
      return getStateServicePortal(selectedState.code, serviceId);
    },
  };

  return <StateContext.Provider value={value}>{children}</StateContext.Provider>;
}

export function useStateContext() {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error('useStateContext must be used within a StateProvider');
  }
  return context;
}
