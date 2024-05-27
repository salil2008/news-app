import { createContext, useState, useContext, useEffect } from 'react';
import { Preferences, ReactChildrenInterface } from '../types';

// Define the context type
interface PreferencesContextType {
  preferences: Preferences;
  updatePreferences: (newPreferences: Preferences) => void;
}

// Initialize the context
export const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);

const getPreferences = (): Preferences => {
  const localStorageData = localStorage.getItem('preferences');
  return localStorageData
    ? JSON.parse(localStorageData)
    : {
        sources: [],
        categories: [],
        authors: [],
      };
};

// Define the provider component
const PreferencesProvider = ({ children }: ReactChildrenInterface) => {
  const [preferences, setPreferences] = useState<Preferences>(getPreferences());

  useEffect(() => {
    const savedPreferences = getPreferences();
    setPreferences(savedPreferences);
  }, []);

  const updatePreferences = (newPreferences: Preferences) => {
    setPreferences(newPreferences);
    localStorage.setItem('preferences', JSON.stringify(newPreferences));
  };

  return (
    <PreferencesContext.Provider value={{ preferences, updatePreferences }}>{children}</PreferencesContext.Provider>
  );
};

export default PreferencesProvider;

// Custom hook for consuming the context
export const usePreferences = (): PreferencesContextType => {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }
  return context;
};
