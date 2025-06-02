import { useState, useCallback, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';

import * as productService from "../services/productService";

import { ProductItem } from '../components/product/ProductItem';
import { ProductSort } from '../components/product/ProductSort';
import { CartIcon } from '../components/product/CartIcon';
import { FiltersProps, ProductFilters } from '../components/product/ProductFilters';

// import type { FiltersProps } from '../product-filters';

// ----------------------------------------------------------------------

const GENDER_OPTIONS = [
  { value: 'men', label: 'Men' },
  { value: 'women', label: 'Women' },
  { value: 'kids', label: 'Kids' },
];

const CATEGORY_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'shoes', label: 'Shoes' },
  { value: 'apparel', label: 'Apparel' },
  { value: 'accessories', label: 'Accessories' },
];

const RATING_OPTIONS = ['up4Star', 'up3Star', 'up2Star', 'up1Star'];

const PRICE_OPTIONS = [
  { value: 'below', label: 'Below $25' },
  { value: 'between', label: 'Between $25 - $75' },
  { value: 'above', label: 'Above $75' },
];

const COLOR_OPTIONS = [
  '#00AB55',
  '#000000',
  '#FFFFFF',
  '#FFC0CB',
  '#FF4842',
  '#1890FF',
  '#94D82D',
  '#FFC107',
];

const defaultFilters = {
  price: '',
  gender: [GENDER_OPTIONS[0].value],
  colors: [COLOR_OPTIONS[4]],
  rating: RATING_OPTIONS[0],
  category: CATEGORY_OPTIONS[0].value,
};

const ROWS_PER_PAGE = 10; // Assuming default page size used by service

function ProductsView() {
  const [sortBy, setSortBy] = useState('featured');
  const [openFilter, setOpenFilter] = useState(false);
  const [filters, setFilters] = useState<FiltersProps>(defaultFilters);

  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<TODO[]>([]); // Initialize with empty array
  const [count, setCount] = useState(0); // Initialize count to 0
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // productService.getItemsByPageNumber now returns { items: [], total: 0 }
        const result = await productService.getItemsByPageNumber(page, ROWS_PER_PAGE);
        setProducts(result.items);
        setCount(result.total);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to load products.");
        setProducts([]); // Clear products on error
        setCount(0); // Reset count on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [page]); // Re-run effect when page changes

  const handlePageChange = useCallback((
    event: React.ChangeEvent<unknown>, newPage: number
  )=>{
    setPage(newPage); // Only update page state, useEffect will fetch data
  },[]);

  const handleOpenFilter = useCallback(() => {
    setOpenFilter(true);
  }, []);

  const handleCloseFilter = useCallback(() => {
    console.log(filters)
    setOpenFilter(false);
  }, []);

  const handleSort = useCallback((newSort: string) => {
    setSortBy(newSort);
  }, []);

  const handleSetFilters = useCallback((updateState: Partial<FiltersProps>) => {
    setFilters((prevValue) => ({ ...prevValue, ...updateState }));
  }, []);

  const canReset = Object.keys(filters).some(
    (key) =>
      filters[key as keyof FiltersProps] !==
      defaultFilters[key as keyof FiltersProps]
  );

  return (

    <>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4"  flexGrow={1} sx={{ mb: 5 }}>
          Products
        </Typography>

        <Box gap={1} display="flex" flexShrink={0} sx={{ my: 1 }}>
          <ProductFilters
            canReset={canReset}
            filters={filters}
            onSetFilters={handleSetFilters}
            openFilter={openFilter}
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter}
            onResetFilter={() => setFilters(defaultFilters)}
            options={{
              genders: GENDER_OPTIONS,
              categories: CATEGORY_OPTIONS,
              ratings: RATING_OPTIONS,
              price: PRICE_OPTIONS,
              colors: COLOR_OPTIONS,
            }}
          />

          <ProductSort
            sortBy={sortBy}
            onSort={handleSort}
            options={[
              { value: 'featured', label: 'Featured' },
              { value: 'newest', label: 'Newest' },
              { value: 'priceDesc', label: 'Price: High-Low' },
              { value: 'priceAsc', label: 'Price: Low-High' },
            ]}
          />
        </Box>
      </Box>

      <CartIcon totalItems={8} />

      {isLoading && <Typography sx={{ textAlign: 'center', my: 5 }}>Loading products...</Typography>}
      {error && <Typography color="error" sx={{ textAlign: 'center', my: 5 }}>{error}</Typography>}

      {!isLoading && !error && (
        <Grid container spacing={3}>
          {products.map((product:TODO) => (
            <Grid key={product.id} size={{ xs: 12, sm: 6, md: 3 }}>
              <ProductItem product={product} />
            </Grid>
          ))}
        </Grid>
      )}

      {!isLoading && !error && products.length === 0 && (
        <Typography sx={{ textAlign: 'center', my: 5 }}>No products found.</Typography>
      )}

      <Pagination
        count={Math.ceil(count / ROWS_PER_PAGE)}
        color="primary"
        sx={{ mt: 8, display: 'flex', justifyContent: 'center' }}
        page={page}
        onChange={handlePageChange}
        disabled={isLoading || !!error}
      />
    </>
  );
}

export default ProductsView;
