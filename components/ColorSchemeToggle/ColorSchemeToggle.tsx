import { FC, useEffect, useState } from 'react';
import { getFromStorage, saveToStorage } from '../../utils/storage';

export enum Modes {
  light = 'light',
  dark = 'dark',
}

const STORAGE_KEY = 'SWAPI-COLOR_MODE';

const ColorSchemeToggle: FC = () => {
  const getSystemScheme = () => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? Modes.dark
      : Modes.dark;
  };

  const [colorMode, setColorMode] = useState(Modes.dark);

  useEffect(() => {
    const savedMode = getFromStorage(STORAGE_KEY);
    if (savedMode) {
      setColorMode(savedMode);
    } else {
      const systemMode = getSystemScheme();
      setColorMode(systemMode);
    }
  }, []);

  useEffect(() => {
    document.body.dataset.scheme = colorMode;
  }, [colorMode]);

  const getOpositeMode = (mode: Modes) =>
    mode === Modes.dark ? Modes.light : Modes.dark;

  const toggleColorScheme = () => {
    const newMode = getOpositeMode(colorMode);
    saveToStorage(STORAGE_KEY, newMode);
    setColorMode(newMode);
  };

  return (
    <button
      type='button'
      onClick={toggleColorScheme}
      aria-label={`apply ${getOpositeMode(colorMode)} color scheme`}
    >
      come to the {getOpositeMode(colorMode)} side
    </button>
  );
};

export default ColorSchemeToggle;
