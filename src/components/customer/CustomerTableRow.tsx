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
import * as service from "../../services/customerService";
import { Label } from '../label';
import { Iconify } from '../iconify';
import { useRouter } from '../../routes/hooks/use-router';
import { useDialogs } from '@toolpad/core/useDialogs';

// ----------------------------------------------------------------------


type CustomerTableRowProps = {
  row: Customer;
  selected: boolean;
  onSelectRow: () => void;
  toggleNotice: (open: boolean) => void;
  onDialogConfirm: (message?: string) => Promise<boolean>;
};

export function CustomerTableRow({
   row, selected, onSelectRow, toggleNotice, onDialogConfirm }: CustomerTableRowProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);
  const [customerId, setCustomerId] = useState("");
  const router = useRouter();

  const handleOpenPopover = useCallback(
    (event: React.MouseEvent<HTMLButtonElement> & TODO) => {
      setOpenPopover(event.currentTarget);
      setCustomerId(event.currentTarget.value)
    }, [setOpenPopover, setCustomerId]);

  const handleEditing = useCallback(() => {
    console.log(` openPopover id: ${customerId}`)
    setOpenPopover(null);
    router.push(`/edit-customer/${customerId}`)//,{replace: true})
  }, [customerId, router]);

  const handleDelete = useCallback(async () => {
    console.log(` openPopover id: ${customerId}`)
    const deleteConfirmed = await  onDialogConfirm();
    if (deleteConfirmed) {
      service.deleteItemById(customerId as TODO)

      toggleNotice(true)
      setTimeout(() => {
        router.push('/customers')
        toggleNotice(false)
      }, 1000);
    }
    setOpenPopover(null);

  }, [customerId, router]);


  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
        </TableCell>

        <TableCell component="th" scope="row">
          <Box gap={2} display="flex" alignItems="center">
            <Avatar alt={row.name} src={row.avatarUrl} />
            {row.name}
          </Box>
        </TableCell>

        {/* <TableCell>{row.company}</TableCell> */}

        <TableCell>{row.email}</TableCell>
        <TableCell>{row.mobile}</TableCell>
        <TableCell>{row.phone}</TableCell>
        {/* <TableCell>{row.billingAddress}</TableCell> */}
        <TableCell align="center">
          {row.hasItemInShoppingCart ? (
            <Iconify width={22} icon="solar:check-circle-bold" sx={{ color: 'success.main' }} />
          ) : (
            '-'
          )}
        </TableCell>
        <TableCell>
          <Label color={(row.membership === 'vip' && 'warning') || 'info'}>{row.membership.toUpperCase()}</Label>
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenPopover} value={row.id}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleEditing}
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
