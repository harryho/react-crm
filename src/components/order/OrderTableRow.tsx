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

import { Label } from '../label';
import { Iconify } from '../iconify';
import * as service from "../../services/orderService";
import { useRouter } from '../../routes/hooks/use-router';
import { useDialogs } from '@toolpad/core';
// ----------------------------------------------------------------------

const OrderStatus: {[k:string]: string}= {
  "packing": "Packing",
  "shipping": "Shipping",
  "customs-clearance": "Customs Clearance",
  "delivered":  "Delivered"
}

type OrderTableRowProps = {
  row: Order;
  selected: boolean;
  onSelectRow: () => void;
  toggleNotice: (open: boolean) => void;
  onDialogConfirm: (message?: string) => Promise<boolean>;
};

export function OrderTableRow(
  {row, selected, onSelectRow, toggleNotice ,onDialogConfirm}: OrderTableRowProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);
  const [orderId, setOrderId] = useState("");
  const router = useRouter();

  
  const handleOpenPopover = useCallback(
    (event: React.MouseEvent<HTMLButtonElement> & TODO) => {
      setOpenPopover(event.currentTarget);
      setOrderId(event.currentTarget.value)
    }, [setOpenPopover, setOrderId]);

  const handleEditing = useCallback(() => {
    console.log(` openPopover id: ${orderId}`)
    setOpenPopover(null);
    router.push(`/edit-order/${orderId}`)//,{replace: true})
  }, [orderId, router]);

  const handleDelete = useCallback(async () => {
    console.log(` openPopover id: ${orderId}`)
    const deleteConfirmed = await  onDialogConfirm();
    if (deleteConfirmed) {
      service.deleteItemById(orderId)

      toggleNotice(true)
      setTimeout(() => {
        router.push('/orders')
        toggleNotice(false)
      }, 1000);

    }
    setOpenPopover(null);

  }, [orderId, router]);

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
        </TableCell>

        <TableCell component="th" scope="row">
          <Box gap={2} display="flex" alignItems="center">
            {/* <Avatar alt={row.id} src={row.avatarUrl} /> */}
            {row.orderId}
          </Box>
        </TableCell>

        <TableCell>{row.itemSummary}</TableCell>

        <TableCell>$ {row.totalPrice}</TableCell>
        {/* <TableCell>$ {row.discount}</TableCell> */}

        <TableCell> {row.promoteCode}</TableCell>
        <TableCell> {row.customer}</TableCell>

        <TableCell align="center">
          {row.isDelayed ? (
            <Iconify width={22} icon="solar:clock-circle-bold" sx={{ color: 'error.main' }} />
          ) : (
            '-'
          )}
        </TableCell>
        <TableCell>
          <Label color={(row.status === 'customs-clearance' && 'error') 
          || ( row.status === 'packing' && 'warning')
          || ( row.status === 'shipping' && 'info')   || 'success'}>
            {OrderStatus[row.status]}</Label>
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
