import type { BoxProps } from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import InputLabel from '@mui/material/InputLabel';

import { RouterLink } from '../../routes/components';

import { Iconify } from '../iconify';


// ----------------------------------------------------------------------

type Props = BoxProps & {
  totalItems: number;
};

export function CartIcon({ totalItems, sx, ref, ...other }: Props) {
  const theme = useTheme();
  return (
    <Box
    // <InputLabel
      // component={RouterLink}
      // href="#"
      sx={{
        right: 0,
        top: 112,
        zIndex: 999,
        display: 'flex',
        cursor: 'pointer',
        position: 'fixed',
        color: 'text.primary',
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 16,
        bgcolor: 'background.paper',
        padding: (theme:TODO) => theme.spacing(1, 3, 1, 2),
        boxShadow: (theme:TODO) => theme.shadows['5'],
        transition: (theme:TODO) => theme.transitions.create(['opacity']),
        '&:hover': { opacity: 0.72 },
        ...sx,
      }}
      {...other}
    >
      <Badge showZero badgeContent={totalItems} color="error" max={99}>
        <Iconify icon="solar:cart-3-bold" width={24} />
      </Badge>
    </Box>
  );
}
