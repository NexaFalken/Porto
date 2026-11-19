
import { useCallback, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'falkenrath-theme';
const SWITCH_DURATION_MS = 650;

function readInitialTheme(): Theme {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (stored === 'light' || stored === 'dark') {
    return stored;
  }

  return window.matchMedia('(prefers-color-scheme: light)').matches
    ? 'light'
    : 'dark';
}

export function useTheme(initialTemporaryTheme: Theme | null = null) {
  const [storedTheme, setStoredTheme] = useState<Theme>(readInitialTheme);
  const [temporaryTheme, setTemporaryTheme] = useState<Theme | null>(
    initialTemporaryTheme,
  );

  const theme = temporaryTheme ?? storedTheme;

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Only the user's actual preference is persisted.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, storedTheme);
  }, [storedTheme]);

  const toggleTheme = useCallback(() => {
    // Prevent theme changes while the temporary opening theme is active.
    if (temporaryTheme !== null) return;

    const root = document.documentElement;

    root.setAttribute('data-theme-switching', '');

    window.setTimeout(() => {
      root.removeAttribute('data-theme-switching');
    }, SWITCH_DURATION_MS);

    setStoredTheme((current) =>
      current === 'dark' ? 'light' : 'dark',
    );
  }, [temporaryTheme]);

  return {
    theme,
    toggleTheme,
    setTemporaryTheme,
  };
}
