import { forwardRef } from 'react';
import SimpleBar from 'simplebar-react';

import Box from '@mui/material/Box';

import { scrollbarClasses } from './classes';

import type { ScrollbarProps } from './types';

// ----------------------------------------------------------------------

export const Scrollbar = forwardRef<HTMLDivElement, ScrollbarProps>(
  ({ slotProps, children, fillContent, sx, ...other }, ref) => (
    // ponytail: `component={SimpleBar}` is commented out so this renders a plain Box; the `scrollableNodeProps`/`clickOnTrack` props are SimpleBar-only and are the source of the "React does not recognize the ... prop on a DOM element" console warnings. Re-enable SimpleBar to fix.
    <Box
      scrollableNodeProps={{ ref }}
      clickOnTrack={false}
      className={scrollbarClasses.root}
      sx={{
        minWidth: 0,
        minHeight: 0,
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        '& .simplebar-placeholder': {display: 'none'},
        ...sx,
      }}
      {...other}
    >
      {children}
    </Box>
  )
);
