declare module "*.svg" {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
};

declare module "*.png";

declare type TODO = any

declare module "@emotion/styled" {
  import { CreateStyled } from '@emotion/styled/types/index';

  import { MyTheme } from '../../src/myTheme';
  export * from '@emotion/styled/types/index';
  const customStyled: CreateStyled<MyTheme>;
  export default customStyled;
}

declare type  Customer = {
  id: string;
  name: string;
  firstName?: string;
  lastName?: string;
  email: string;
  shippingAddress?: string;
  billingAddress?: string;
  city?: string;
  state?: string;
  country?: string;
  mobile: string;
  phone: string;
  credit?: string;
  avatarUrl?: string;
  hasItemInShoppingCart: boolean;
  membership: string;
}

declare type Agent = {
  id: string;
  name: string;
  firstName?: string;
  lastName?: string;
  role: string;
  status: string;
  company: string;
  email: string;
  mobile: string;
  avatarUrl?: string;
  isVerified: boolean;
  city?: string;
  state?: string;

}

declare type Order = {
  id: string;
  orderId: string;
  itemSummary: string;
  customer: string;
  totalPrice: string;
  status: string;
  discount: string;
  promoteCode? : string;
  couponCode?: string;

  avatarUrl?: string;
  isDelayed: boolean;
  shippingAddress: string;
  billingAddress?: string;
};

