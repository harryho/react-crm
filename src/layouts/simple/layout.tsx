import type { Theme, SxProps, Breakpoint } from '@mui/material/styles';

import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';


import { Logo } from '../../components/logo';

import { Main, CompactContent } from './main';

// ----------------------------------------------------------------------

export type SimpleLayoutProps = {
  sx?: SxProps<Theme>;
  children: React.ReactNode;
  header?: {
    sx?: SxProps<Theme>;
  };
  content?: {
    compact?: boolean;
  };
};

export function SimpleLayout({ sx, children, header, content }: SimpleLayoutProps) {
  const layoutQuery: Breakpoint = 'lg';

  return (
   <Main>
      {content?.compact ? (
        <CompactContent layoutQuery={layoutQuery}>{children}</CompactContent>
      ) : (
        children
      )}
    </Main>
  );
}
