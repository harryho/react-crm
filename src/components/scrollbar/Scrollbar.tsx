import { forwardRef } from 'react';
import SimpleBar from 'simplebar-react';

import Box from '@mui/material/Box';

import { scrollbarClasses } from './classes';

import type { ScrollbarProps } from './types';

// ----------------------------------------------------------------------

export const Scrollbar = forwardRef<HTMLDivElement, ScrollbarProps>(
  ({ slotProps, children, fillContent, sx, ...other }, ref) => (
    // `component={SimpleBar}` below is commented out, so this renders a
    // plain Box/div - SimpleBar is imported but never actually used for
    // scrolling. `scrollableNodeProps`/`clickOnTrack` are SimpleBar-only
    // props with nowhere to go but the DOM, which is the actual (harmless
    // but real) source of the "React does not recognize the ... prop on a
    // DOM element" console warnings seen throughout this app - not a
    // simplebar-react library bug. Re-enabling `component={SimpleBar}`
    // would fix this properly; left as a follow-up rather than changed
    // here since it's outside this task's scope.
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    <Box
    // component ={SimpleBar as TODO}
      scrollableNodeProps={{ ref }}
      clickOnTrack={false}
      className={scrollbarClasses.root}
      // place
      sx={{
        minWidth: 0,
        minHeight: 0,
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        '& .simplebar-placeholder': {display: 'none'},
        // '& .simplebar-wrapper': slotProps?.wrapper as React.CSSProperties,
        // '& .simplebar-content-wrapper': slotProps?.contentWrapper as React.CSSProperties,
        // '& .simplebar-content': {
        //   ...(fillContent && {
        //     minHeight: 1,
        //     display: 'flex',
        //     flex: '1 1 auto',
        //     flexDirection: 'column',
        //   }),
        //   ...slotProps?.content,
        // } as React.CSSProperties,
        ...sx,
      }}
      {...other}
    >
      {children}
    </Box>
  )
);
