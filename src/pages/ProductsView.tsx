import { useMemo, useState } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import { useLoaderData } from 'react-router';

import type { Product, Category } from '../types';
import { fetchProducts, fetchCategories } from '../api/client';
import { Iconify } from '../components/iconify';
import { ProductItem } from '../components/product/ProductItem';
import { CartIcon } from '../components/product/CartIcon';
import { RouterLink } from '../routes/components/RouterLink';
import { useRouter } from '../routes/hooks/use-router';

// ----------------------------------------------------------------------

const PAGE_SIZE = 8;

export async function productsLoader() {
  const [products, categories] = await Promise.all([fetchProducts(), fetchCategories()]);
  return { products, categories };
}

export default function ProductsView() {
  const { products, categories } = useLoaderData() as { products: Product[]; categories: Category[] };
  const router = useRouter();

  const [categoryId, setCategoryId] = useState<number | 'all'>('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let result = products;
    if (categoryId !== 'all') {
      result = result.filter((p) => p.categoryId === categoryId);
    }
    if (search) {
      result = result.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
    }
    return result;
  }, [products, categoryId, search]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Products
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Iconify icon="mingcute:add-line" />}
          component={RouterLink} href="/product-form"
        >
          New product
        </Button>
      </Box>

      <Box gap={2} display="flex" flexWrap="wrap" sx={{ mb: 3 }}>
        <TextField
          select
          label="Category"
          value={categoryId}
          onChange={(e) => {
            setCategoryId(e.target.value === 'all' ? 'all' : Number(e.target.value));
            setPage(1);
          }}
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="all">All categories</MenuItem>
          {categories.map((c) => (
            <MenuItem key={c.categoryId} value={c.categoryId}>
              {c.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Search products"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          sx={{ minWidth: 240 }}
        />
      </Box>

      {/* Hardcoded placeholder - there is no real cart state anywhere in this
          app yet (see docs/uplift-analysis.md, M4: cart/checkout). Replace
          with a real count once cart state exists. */}
      <CartIcon totalItems={8} />

      <Grid container spacing={3}>
        {pageItems.map((product) => (
          <Grid key={product.productId} size={{ xs: 12, sm: 6, md: 3 }}>
            <ProductItem product={product} onClick={() => router.push(`/edit-product/${product.productId}`)} />
          </Grid>
        ))}
      </Grid>

      <Pagination
        count={pageCount}
        color="primary"
        sx={{ mt: 8, mx: 'auto' }}
        page={page}
        onChange={(_event, newPage) => setPage(newPage)}
      />
    </>
  );
}
