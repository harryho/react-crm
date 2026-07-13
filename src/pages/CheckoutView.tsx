import { useMemo, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';

import type { Product, User } from '../types';
import { fetchProducts, fetchUsers, createOrder } from '../api/client';
import { useCart } from '../contexts/CartContext';
import { fnCurrency } from '../utils/format-number';
import ButtonGenerator from '../components/controls/Button';

const SHIPPING_FLAT_FEE = 9.99;

export async function checkoutLoader() {
  const [products, users] = await Promise.all([fetchProducts(), fetchUsers()]);
  return { products, users };
}

export default function CheckoutView() {
  const { products, users } = useLoaderData() as { products: Product[]; users: User[] };
  const cart = useCart();
  const navigate = useNavigate();

  const [userId, setUserId] = useState<number | ''>(users[0]?.userId ?? '');
  const [placing, setPlacing] = useState(false);

  const selectedUser = users.find((u) => u.userId === userId);
  const defaultAddress = selectedUser?.addresses.find((a) => a.isDefaultShipping) ?? selectedUser?.addresses[0];

  const [shipTo, setShipTo] = useState({
    name: defaultAddress ? `${selectedUser?.firstName} ${selectedUser?.lastName}` : '',
    line1: defaultAddress?.line1 ?? '',
    city: defaultAddress?.city ?? '',
    region: defaultAddress?.region ?? '',
    postalCode: defaultAddress?.postalCode ?? '',
    countryCode: defaultAddress?.countryCode ?? '',
  });

  const handleUserChange = (id: number) => {
    setUserId(id);
    const user = users.find((u) => u.userId === id);
    const address = user?.addresses.find((a) => a.isDefaultShipping) ?? user?.addresses[0];
    setShipTo({
      name: user ? `${user.firstName} ${user.lastName}` : '',
      line1: address?.line1 ?? '',
      city: address?.city ?? '',
      region: address?.region ?? '',
      postalCode: address?.postalCode ?? '',
      countryCode: address?.countryCode ?? '',
    });
  };

  const rows = cart.items.map((item) => {
    const product = products.find((p) => p.variants.some((v) => v.variantId === item.variantId));
    const variant = product?.variants.find((v) => v.variantId === item.variantId);
    return { item, product, variant };
  });

  const subtotal = useMemo(
    () => rows.reduce((sum, { variant, item }) => sum + (variant?.price ?? 0) * item.qty, 0),
    [rows]
  );
  const grandTotal = subtotal + SHIPPING_FLAT_FEE;

  const canPlaceOrder = !!userId && rows.length > 0 && !placing;

  const handlePlaceOrder = async () => {
    if (!userId) return;
    setPlacing(true);
    const order = await createOrder({
      userId,
      items: cart.items,
      shipTo,
    });
    cart.clear();
    navigate(`/orders/${order.orderId}`, { replace: true });
  };

  return (
    <>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Checkout
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 7 }}>
          <Card sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Order Items
            </Typography>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell align="right">Unit Price</TableCell>
                  <TableCell align="right">Qty</TableCell>
                  <TableCell align="right">Line Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(({ item, product, variant }) => (
                  <TableRow key={item.variantId}>
                    <TableCell>{product?.name ?? `Variant ${item.variantId}`}</TableCell>
                    <TableCell align="right">{variant ? fnCurrency(variant.price) : '-'}</TableCell>
                    <TableCell align="right">{item.qty}</TableCell>
                    <TableCell align="right">{variant ? fnCurrency(variant.price * item.qty) : '-'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Divider sx={{ my: 2 }} />
            <Stack spacing={1} alignItems="flex-end">
              <Typography variant="body2">Subtotal: {fnCurrency(subtotal)}</Typography>
              <Typography variant="body2">Shipping: {fnCurrency(SHIPPING_FLAT_FEE)}</Typography>
              <Typography variant="subtitle1">Grand Total: {fnCurrency(grandTotal)}</Typography>
            </Stack>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 5 }}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Customer &amp; Shipping
            </Typography>
            <TextField
              select
              fullWidth
              label="Placing order for"
              value={userId}
              onChange={(e) => handleUserChange(Number(e.target.value))}
              sx={{ mb: 2 }}
            >
              {users.map((u) => (
                <MenuItem key={u.userId} value={u.userId}>
                  {u.firstName} {u.lastName} ({u.email})
                </MenuItem>
              ))}
            </TextField>

            <Stack spacing={2}>
              <TextField
                fullWidth
                label="Ship-to Name"
                value={shipTo.name}
                onChange={(e) => setShipTo({ ...shipTo, name: e.target.value })}
              />
              <TextField
                fullWidth
                label="Address Line 1"
                value={shipTo.line1}
                onChange={(e) => setShipTo({ ...shipTo, line1: e.target.value })}
              />
              <TextField
                fullWidth
                label="City"
                value={shipTo.city}
                onChange={(e) => setShipTo({ ...shipTo, city: e.target.value })}
              />
              <TextField
                fullWidth
                label="Postal Code"
                value={shipTo.postalCode}
                onChange={(e) => setShipTo({ ...shipTo, postalCode: e.target.value })}
              />
              <TextField
                fullWidth
                label="Country Code"
                value={shipTo.countryCode}
                onChange={(e) => setShipTo({ ...shipTo, countryCode: e.target.value })}
              />
            </Stack>

            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
              <ButtonGenerator text="Place Order" disabled={!canPlaceOrder} onClick={handlePlaceOrder} />
            </Box>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
