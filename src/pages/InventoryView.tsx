import { useMemo, useState } from 'react';
import { useLoaderData } from 'react-router';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import TableContainer from '@mui/material/TableContainer';

import type { Product } from '../types';
import { fetchProducts } from '../api/client';
import { Label } from '../components/label';
import { fnCurrency } from '../utils/format-number';

const LOW_STOCK_THRESHOLD = 10;

export async function inventoryLoader() {
  return fetchProducts();
}

type InventoryRow = {
  productId: number;
  productName: string;
  categoryName: string;
  variantId: number;
  sku: string;
  variantName: string;
  price: number;
  quantityOnHand: number;
};

export default function InventoryView() {
  const products = useLoaderData() as Product[];
  const [search, setSearch] = useState('');

  const rows: InventoryRow[] = useMemo(
    () =>
      products.flatMap((product) =>
        product.variants.map((variant) => ({
          productId: product.productId,
          productName: product.name,
          categoryName: product.categoryName,
          variantId: variant.variantId,
          sku: variant.sku,
          variantName: variant.name,
          price: variant.price,
          quantityOnHand: variant.quantityOnHand,
        }))
      ),
    [products]
  );

  const filtered = rows.filter(
    (row) =>
      !search ||
      row.productName.toLowerCase().includes(search.toLowerCase()) ||
      row.sku.toLowerCase().includes(search.toLowerCase())
  );

  const totalUnits = filtered.reduce((sum, row) => sum + row.quantityOnHand, 0);
  const lowStockCount = filtered.filter((row) => row.quantityOnHand < LOW_STOCK_THRESHOLD).length;

  return (
    <>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Inventory
        </Typography>
      </Box>

      <Box gap={3} display="flex" flexWrap="wrap" sx={{ mb: 3 }}>
        <Card sx={{ p: 2, minWidth: 160 }}>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Total SKUs
          </Typography>
          <Typography variant="h5">{filtered.length}</Typography>
        </Card>
        <Card sx={{ p: 2, minWidth: 160 }}>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Units on Hand
          </Typography>
          <Typography variant="h5">{totalUnits}</Typography>
        </Card>
        <Card sx={{ p: 2, minWidth: 160 }}>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Low Stock (&lt; {LOW_STOCK_THRESHOLD})
          </Typography>
          <Typography variant="h5" sx={{ color: lowStockCount > 0 ? 'error.main' : 'inherit' }}>
            {lowStockCount}
          </Typography>
        </Card>
      </Box>

      <Card sx={{ p: 3 }}>
        <TextField
          label="Search by product name or SKU"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ mb: 2, minWidth: 280 }}
        />

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>SKU</TableCell>
                <TableCell>Variant</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Qty on Hand</TableCell>
                <TableCell>Stock Level</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((row) => (
                <TableRow key={row.variantId} hover>
                  <TableCell>{row.productName}</TableCell>
                  <TableCell>{row.categoryName}</TableCell>
                  <TableCell>{row.sku}</TableCell>
                  <TableCell>{row.variantName}</TableCell>
                  <TableCell align="right">{fnCurrency(row.price)}</TableCell>
                  <TableCell align="right">{row.quantityOnHand}</TableCell>
                  <TableCell>
                    <Label color={row.quantityOnHand === 0 ? 'error' : row.quantityOnHand < LOW_STOCK_THRESHOLD ? 'warning' : 'success'}>
                      {row.quantityOnHand === 0 ? 'OUT OF STOCK' : row.quantityOnHand < LOW_STOCK_THRESHOLD ? 'LOW' : 'OK'}
                    </Label>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </>
  );
}
