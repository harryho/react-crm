import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import type { Product } from '../../types';
import { fnCurrency } from '../../utils/format-number';
import { Label } from '../label';
import { Iconify } from '../iconify';

// ----------------------------------------------------------------------

type ProductItemProps = {
  product: Product;
  onClick?: () => void;
  onAddToCart?: () => void;
};

export function ProductItem({ product, onClick, onAddToCart }: ProductItemProps) {
  const coverUrl = product.images[0]?.url;
  const totalStock = product.variants.reduce((sum, v) => sum + v.quantityOnHand, 0);
  const prices = product.variants.map((v) => v.price);
  const minPrice = prices.length ? Math.min(...prices) : 0;
  const maxPrice = prices.length ? Math.max(...prices) : 0;
  const canAddToCart = !!onAddToCart && product.isActive && totalStock > 0;

  const renderStatus = (
    <Label
      variant="outlined"
      color={product.isActive ? 'success' : 'default'}
      sx={{
        zIndex: 9,
        top: 16,
        right: 16,
        position: 'absolute',
        textTransform: 'uppercase',
      }}
    >
      {product.isActive ? 'Active' : 'Inactive'}
    </Label>
  );

  const renderImg = coverUrl ? (
    <Box
      component="img"
      alt={product.name}
      src={coverUrl}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
      }}
    />
  ) : (
    <Box
      sx={{
        top: 0,
        width: 1,
        height: 1,
        position: 'absolute',
        bgcolor: 'background.neutral',
      }}
    />
  );

  const renderPrice = (
    <Typography variant="subtitle1">
      {minPrice === maxPrice ? fnCurrency(minPrice) : `${fnCurrency(minPrice)} - ${fnCurrency(maxPrice)}`}
    </Typography>
  );

  return (
    <Card sx={{ borderRadius: '1.2em', cursor: onClick ? 'pointer' : undefined }} onClick={onClick}>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {renderStatus}
        {renderImg}
      </Box>

      <Stack spacing={1} sx={{ p: 3 }}>
        <Typography variant="subtitle2" noWrap>
          {product.name}
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {product.categoryName}
        </Typography>

        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="caption" sx={{ color: 'text.disabled' }}>
            {totalStock} in stock
          </Typography>
          {renderPrice}
        </Box>

        {onAddToCart && (
          <Tooltip title={canAddToCart ? 'Add to cart' : 'Out of stock'}>
            <span>
              <IconButton
                color="primary"
                disabled={!canAddToCart}
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart();
                }}
              >
                <Iconify icon="solar:cart-plus-bold" />
              </IconButton>
            </span>
          </Tooltip>
        )}
      </Stack>
    </Card>
  );
}
