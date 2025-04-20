import type { Theme } from '@mui/material/styles';

import { extendTheme } from '@mui/material/styles';

import { shadows, typography, components, colorSchemes, customShadows } from './core';

// ----------------------------------------------------------------------

export function createTheme2(): Theme {
  const initialTheme = {
    colorSchemes,
    shadows: shadows(),
    customShadows: customShadows(),
    shape: { borderRadius: 8 },
    components,
    typography,
    cssVarPrefix: '',
    shouldSkipGeneratingVar,
  };

  const theme = extendTheme(initialTheme);
  console.log(theme)
  return theme;
}

// ----------------------------------------------------------------------

export function shouldSkipGeneratingVar(keys: string[], value: string | number): boolean {
  const skipGlobalKeys = [
    'mixins',
    'overlays',
    'direction',
    'typography',
    'breakpoints',
    'transitions',
    'cssVarPrefix',
    'unstable_sxConfig',
  ];

  const skipPaletteKeys: {
    [key: string]: string[];
  } = {
    global: ['tonalOffset', 'dividerChannel', 'contrastThreshold'],
    grey: ['A100', 'A200', 'A400', 'A700'],
    text: ['icon'],
  };

  const isPaletteKey = keys[0] === 'palette';

  if (isPaletteKey) {
    const paletteType = keys[1];
    const skipKeys = skipPaletteKeys[paletteType] || skipPaletteKeys.global;

    return keys.some((key) => skipKeys?.includes(key));
  }

  return keys.some((key) => skipGlobalKeys?.includes(key));
}
