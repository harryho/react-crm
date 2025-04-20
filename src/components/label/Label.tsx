import { forwardRef } from 'react';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import type { BoxProps } from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import { varAlpha, stylesMode } from '../../theme/styles';
import { InputLabel } from '@mui/material';
import { InputRounded } from '@mui/icons-material';


// ----------------------------------------------------------------------
export const labelClasses = { root: 'mnl__label__root', icon: 'mnl__label__icon' };

export type LabelColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'info'
  | 'success'
  | 'warning'
  | 'error';

export type LabelVariant = 'filled' | 'outlined' | 'soft' | 'inverted';

export interface LabelProps extends BoxProps {
  color?: LabelColor;
  variant?: LabelVariant;
  endIcon?: React.ReactElement | null;
  startIcon?: React.ReactElement | null;
}

const labelStyle = (theme: TODO, onwerState: TODO) => {

  const {
    color,
    variant
  } = onwerState;

  const defaultColor = {
    ...(color === 'default' && {
      /**
       * @variant filled
       */
      ...(variant === 'filled' && {
        color: theme.vars.palette.common.white,
        backgroundColor: theme.vars.palette.text.primary,
        [stylesMode.dark]: { color: theme.vars.palette.grey[800] },
      }),
      /**
       * @variant outlined
       */
      ...(variant === 'outlined' && {
        backgroundColor: 'transparent',
        color: theme.vars.palette.text.primary,
        border: `2px solid ${theme.vars.palette.text.primary}`,
      }),
      /**
       * @variant soft
       */
      ...(variant === 'soft' && {
        color: theme.vars.palette.text.secondary,
        backgroundColor: varAlpha(theme.vars.palette.grey['500Channel'], 0.16),
      }),
      /**
       * @variant inverted
       */
      ...(variant === 'inverted' && {
        color: theme.vars.palette.grey[800],
        backgroundColor: theme.vars.palette.grey[300],
        [stylesMode.dark]: { color: theme.vars.palette.grey[800] },
      }),
    }),
  };

  const styleColors = {
    ...(color !== 'default' && {
      /**
       * @variant filled
       */
      ...(variant === 'filled' && {
        color: theme.vars.palette[color].contrastText,
        backgroundColor: theme.vars.palette[color].main,
      }),
      /**
       * @variant outlined
       */
      ...(variant === 'outlined' && {
        backgroundColor: 'transparent',
        color: theme.vars.palette[color].main,
        border: `2px solid ${theme.vars.palette[color].main}`,
      }),
      /**
       * @variant soft
       */
      ...(variant === 'soft' && {
        color: theme.vars.palette[color].dark,
        backgroundColor: varAlpha(theme.vars.palette[color].mainChannel, 0.16),
        [stylesMode.dark]: { color: theme.vars.palette[color].light },
      }),
      /**
       * @variant inverted
       */
      ...(variant === 'inverted' && {
        color: theme.vars.palette[color].darker,
        backgroundColor: theme.vars.palette[color].lighter,
      }),
    }),
  };

  return {
    height: 24,
    minWidth: 24,
    lineHeight: 0,
    cursor: 'default',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    display: 'inline-flex',
    justifyContent: 'center',
    padding: theme.spacing(0, 0.75),
    fontSize: theme.typography.pxToRem(12),
    fontWeight: theme.typography.fontWeightBold,
    borderRadius: theme.shape.borderRadius * 0.75,
    transition: theme.transitions.create('all', {
      duration: theme.transitions.duration.shorter,
    }),
    ...defaultColor,
    ...styleColors,
  };
};



export const Label = forwardRef<HTMLSpanElement, LabelProps>(
  (
    { children, color = 'default', variant = 'soft', startIcon, endIcon, sx, className, ...other },
    ref
  ) => {
    const theme = useTheme();

    const iconStyles = {
      width: 16,
      height: 16,
      '& svg, img': {
        width: 1,
        height: 1,
        objectFit: 'cover',
      },
    };
    const lblStyle = labelStyle(theme, { color, variant });
    console.log(lblStyle)

    return (
      <InputLabel
        ref={ref}
        component="span"
        className={labelClasses.root.concat(className ? ` ${className}` : '')}
        // ownerState={{ color, variant }}
        sx={{ ...(startIcon && { pl: 0.75 }), ...(endIcon && { pr: 0.75 }), ...sx, ...lblStyle }}
      >
        {startIcon && (
          <Box component="span" className={labelClasses.icon} sx={{ mr: 0.75, ...iconStyles }}>
            {startIcon}
          </Box>
        )}

        {typeof children === 'string' ? sentenceCase(children) : children}

        {endIcon && (
          <Box component="span" className={labelClasses.icon} sx={{ ml: 0.75, ...iconStyles }}>
            {endIcon}
          </Box>
        )}
      </InputLabel>
    );
  }
);

// ----------------------------------------------------------------------

function sentenceCase(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
