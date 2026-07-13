import { useLoaderData } from 'react-router';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

import type { Product } from '../types';
import { fetchProducts } from '../api/client';
import { useCart } from '../contexts/CartContext';
import { fnCurrency } from '../utils/format-number';
import { Iconify } from '../components/iconify';
import ButtonGenerator from '../components/controls/Button';
import { useRouter } from '../routes/hooks/use-router';

export function cartLoader() {
  return fetchProducts();
}

export default function CartView() {
  const products = useLoaderData() as Product[];
  const cart = useCart();
  const router = useRouter();

  const rows = cart.items.map((item) => {
    const product = products.find((p) => p.variants.some((v) => v.variantId === item.variantId));
    const variant = product?.variants.find((v) => v.variantId === item.variantId);
    return { item, product, variant };
  });

  const subtotal = rows.reduce((sum, { variant, item }) => sum + (variant?.price ?? 0) * item.qty, 0);

  return (
    <>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Cart
        </Typography>
        <ButtonGenerator text="Continue Shopping" color={"default" as any} onClick={() => router.push('/products')} />
      </Box>

      {rows.length === 0 ? (
        <Card sx={{ p: 5, textAlign: 'center' }}>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Your cart is empty.
          </Typography>
        </Card>
      ) : (
        <Card sx={{ p: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell>SKU</TableCell>
                <TableCell align="right">Unit Price</TableCell>
                <TableCell align="right">Qty</TableCell>
                <TableCell align="right">Line Total</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(({ item, product, variant }) => (
                <TableRow key={item.variantId}>
                  <TableCell>{product?.name ?? `Variant ${item.variantId}`}</TableCell>
                  <TableCell>{variant?.sku}</TableCell>
                  <TableCell align="right">{variant ? fnCurrency(variant.price) : '-'}</TableCell>
                  <TableCell align="right">
                    <TextField
                      type="number"
                      size="small"
                      value={item.qty}
                      onChange={(e) => cart.setQty(item.variantId, Number(e.target.value))}
                      sx={{ width: 80 }}
                      slotProps={{ htmlInput: { min: 1 } }}
                    />
                  </TableCell>
                  <TableCell align="right">{variant ? fnCurrency(variant.price * item.qty) : '-'}</TableCell>
                  <TableCell align="right">
                    <IconButton color="error" onClick={() => cart.removeItem(item.variantId)}>
                      <Iconify icon="solar:trash-bin-trash-bold" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Divider sx={{ my: 2 }} />
          <Stack spacing={1} alignItems="flex-end">
            <Typography variant="h6">Subtotal: {fnCurrency(subtotal)}</Typography>
            <ButtonGenerator text="Proceed to Checkout" onClick={() => router.push('/checkout')} />
          </Stack>
        </Card>
      )}
    </>
  );
}
