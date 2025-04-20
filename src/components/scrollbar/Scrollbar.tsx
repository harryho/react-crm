import { forwardRef } from 'react';
import SimpleBar from 'simplebar-react';

import Box from '@mui/material/Box';

import { scrollbarClasses } from './classes';

import type { ScrollbarProps } from './types';

// ----------------------------------------------------------------------

export const Scrollbar = forwardRef<HTMLDivElement, ScrollbarProps>(
  ({ slotProps, children, fillContent, sx, ...other }, ref) => (
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
