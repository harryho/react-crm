export interface Entity {
  id: number;
  text?: string;
  value?: number;
}

export interface Category extends Entity {
  categoryName: string;
  parentId: string;
}

export interface UserInfo extends Entity {
  messages: string[];
  notifications: string[];
  tasks: string[];
}

export interface User extends Entity {
  firstname: string;
  lastname: string;
  email: string;
  avatar?: string;
  mobile: string;
  homephone?: string;
  workphone?: string;
}

export interface Customer extends User {
  membership: boolean;
  rewards: number;
  orders?: string[];
  orderAmount: number;
}

export interface Address extends Entity {
  address: string;
  city: string;
  zipcode: string;
  country: string;
}

export interface Order extends Entity {
  reference: string;
  customerId: number;
  customer: Customer;
  customerName: string;
  products: Product[];
  amount: number;
  quantity: number;
  orderDate: string;
  shippedDate: string;
  shipAddress: Address;
}

export interface Product extends Entity {
  productName: string;
  categoryId: string;
  unitInStock: string;
  unitPrice: number;
  category: Category;
  categoryName?: string;
}

// export interface State {
//   items: Entity[],
//   pagination: Pagination,
//   loading: boolean,
//   mode: string,
//   snackbar: boolean,
//   notice: string,
//   customer: Customer,
//   orders: Order[],
//   orderList: Order[],
// }

export type SearchFilter = {
  equals?: TODO;
  contains?: TODO;
  startsWith?: TODO;
  endsWith?: TODO;
  lessThan?: TODO;
  greaterThan?: TODO;
  lessThanOrEqual?: TODO;
  greaterThanOrEqual?: TODO;
  between?: TODO;
  filters?: TODO;
};

export class CustomerModel implements Customer {
  constructor(
    firstname: string,
    lastname: string,
    email: string,
    avatar: string,
    mobile: string,
    membership: boolean,
    rewards: number
  ) {
    this.id = 0;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.mobile = mobile;
    this.membership = membership;
    this.rewards = rewards;
    this.orderAmount = 0;
  }
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  avatar: string;
  mobile: string;

  membership: boolean;
  rewards: number;
  orders?: string[];
  orderAmount: number;
}

export class OrderModel implements Order {
  constructor(
    reference: string,
    customerId: number,
    customer: Customer,
    customerName: string,
    products: Product[],
    amount: number,
    quantity: number,
    orderDate: string,
    shippedDate: string,
    shipAddress: Address
  ) {
    this.id = 0;
    this.reference = reference;
    this.customerId = customerId;
    this.customer = customer;
    this.customerName = customerName;
    this.amount = amount;
    this.quantity = quantity;
    this.orderDate = orderDate;
    this.shippedDate = shippedDate;
    this.shipAddress = shipAddress;
  }
  id: number;
  reference: string;
  customerId: number;
  customer: Customer;
  customerName: string;
  products: Product[];
  amount: number;
  quantity: number;
  orderDate: string;
  shippedDate: string;
  shipAddress: Address;
}

export class ProductModel implements Product {
  constructor(
    productName: string,
    categoryId: string,
    unitInStock: string,
    unitPrice: number,
    category: Category,
    categoryName?: string
  ) {
    this.id = 0;
    this.productName = productName;
    this.categoryId = categoryId;
    this.unitInStock = unitInStock;
    this.unitPrice = unitPrice;
    this.category = category;
    this.categoryName = categoryName;
  }
  id: number;
  productName: string;
  categoryId: string;
  unitInStock: string;
  unitPrice: number;
  category: Category;
  categoryName?: string;
}
