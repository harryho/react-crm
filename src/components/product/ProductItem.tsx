import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { fnCurrency } from '../../utils/format-number';

import { Label } from '../label';
// import Label from '@mui/material/InputLabel';
import { ColorPreview } from '../color-utils';

// ----------------------------------------------------------------------

export type ProductItemProps = {
  id: string;
  name: string;
  price: number;
  status: string;
  coverUrl: string;
  colors: string[];
  priceSale: number | null;
};

export function ProductItem({ product }: { product: ProductItemProps }) {
  const renderStatus = (
    <Label
      // component="span"
      variant="outlined"
      color={(product.status === 'sale' && 'error') || 'info'}
      sx={{
        zIndex: 9,
        top: 16,
        right: 16,
        position: 'absolute',
        textTransform: 'uppercase',
      }}
    >
      {product.status}
    </Label>
  );

  const renderImg = (
    <Box
      component="img"
      alt={product.name}
      src={product.coverUrl}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
      }}
    />
  );

  const renderPrice = (
    <Typography variant="subtitle1">
      <Typography
        component="span"
        variant="body1"
        sx={{
          color: 'text.disabled',
          textDecoration: 'line-through',
        }}
      >
        {product.priceSale && fnCurrency(product.priceSale)}
      </Typography>
      &nbsp;
      {fnCurrency(product.price)}
    </Typography>
  );

  return (
    <Card sx={{borderRadius: '1.2em'}}>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {product.status && renderStatus}

        {renderImg}
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
          {product.name}
        </Link>

        <Box display="flex" alignItems="center" justifyContent="space-between">
          <ColorPreview colors={product.colors} />
          {renderPrice}
        </Box>
      </Stack>
    </Card>
  );
}
