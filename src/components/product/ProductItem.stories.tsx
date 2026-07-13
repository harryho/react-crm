import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import type { Product } from '../../types';
import { ProductItem } from './ProductItem';

const baseProduct: Product = {
  productId: 1,
  categoryId: 1,
  categoryName: 'Beverages',
  name: 'Sample Roast Coffee Beans',
  slug: 'sample-roast-coffee-beans',
  description: 'A sample product for Storybook.',
  isActive: true,
  images: [{ url: 'https://picsum.photos/seed/storybook-product/600/400', altText: 'Coffee beans', sortOrder: 0 }],
  variants: [
    { variantId: 1, sku: 'SKU-0001', name: 'Default', price: 14.99, currency: 'USD', isActive: true, quantityOnHand: 42 },
  ],
};

const meta: Meta<typeof ProductItem> = {
  component: ProductItem,
  title: 'Product/ProductItem',
  args: {
    onClick: fn(),
    onAddToCart: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof ProductItem>;

export const Default: Story = {
  args: { product: baseProduct },
};

export const MultipleVariants: Story = {
  args: {
    product: {
      ...baseProduct,
      name: 'T-Shirt (Multiple Sizes)',
      variants: [
        { variantId: 2, sku: 'SKU-0002-S', name: 'Small', price: 19.99, currency: 'USD', isActive: true, quantityOnHand: 20 },
        { variantId: 3, sku: 'SKU-0002-L', name: 'Large', price: 24.99, currency: 'USD', isActive: true, quantityOnHand: 15 },
      ],
    },
  },
};

export const OutOfStock: Story = {
  args: {
    product: {
      ...baseProduct,
      name: 'Sold Out Item',
      variants: [{ ...baseProduct.variants[0], quantityOnHand: 0 }],
    },
  },
};

export const Inactive: Story = {
  args: {
    product: { ...baseProduct, name: 'Discontinued Item', isActive: false },
  },
};

export const NoAddToCartAction: Story = {
  args: {
    product: baseProduct,
    onAddToCart: undefined,
  },
};
