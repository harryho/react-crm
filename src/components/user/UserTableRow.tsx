import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuList from '@mui/material/MenuList';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';

import type { User } from '../../types';
import { Label } from '../label';
import { Iconify } from '../iconify';
import { useRouter } from '../../routes/hooks/use-router';

// ----------------------------------------------------------------------

type UserTableRowProps = {
  row: User & { name: string };
  selected: boolean;
  onSelectRow: () => void;
  onDeleteRow: (userId: number) => void;
};

export function UserTableRow({ row, selected, onSelectRow, onDeleteRow }: UserTableRowProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);
  const router = useRouter();

  const handleOpenPopover = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setOpenPopover(event.currentTarget);
    },
    []
  );

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  const handleEditing = useCallback(() => {
    setOpenPopover(null);
    router.push(`/edit-user/${row.userId}`);
  }, [row.userId, router]);

  const handleDelete = useCallback(() => {
    setOpenPopover(null);
    onDeleteRow(row.userId);
  }, [row.userId, onDeleteRow]);

  const defaultAddress = row.addresses.find((a) => a.isDefaultShipping) ?? row.addresses[0];

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
        </TableCell>

        <TableCell component="th" scope="row">
          <Box gap={2} display="flex" alignItems="center">
            <Avatar alt={row.name}>{row.firstName.charAt(0)}</Avatar>
            {row.name}
          </Box>
        </TableCell>

        <TableCell>{row.email}</TableCell>
        <TableCell>{row.phone ?? '-'}</TableCell>
        <TableCell>{row.companyName ?? '-'}</TableCell>
        <TableCell>{defaultAddress ? `${defaultAddress.city}, ${defaultAddress.countryCode}` : '-'}</TableCell>
        <TableCell>
          <Label color={row.isActive ? 'success' : 'default'}>{row.isActive ? 'ACTIVE' : 'INACTIVE'}</Label>
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuList
          disablePadding
          sx={{
            p: 0.5,
            gap: 0.5,
            width: 140,
            display: 'flex',
            flexDirection: 'column',
            [`& .${menuItemClasses.root}`]: {
              px: 1,
              gap: 2,
              borderRadius: 0.75,
              [`&.${menuItemClasses.selected}`]: { bgcolor: 'action.selected' },
            },
          }}
        >
          <MenuItem onClick={handleEditing}>
            <Iconify icon="solar:pen-bold" />
            Edit
          </MenuItem>

          <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>
        </MenuList>
      </Popover>
    </>
  );
}
