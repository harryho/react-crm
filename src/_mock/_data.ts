import {
  _id,
  _price,
  _times,
  _company,
  _boolean,
  _fullName,
  _taskNames,
  _postTitles,
  _description,
  _productNames,
  _orderId,
  _location,
  _email,
  _mobile,
  _roles,
  _promoCode,
  _address
} from './_mock';

// ----------------------------------------------------------------------

export const _myAccount = {
  displayName: 'Harry Ho',
  email: 'Harry.Ho@test.com',
  photoURL: '/assets/images/avatar/avatar-25.webp',
};

// ----------------------------------------------------------------------

export const _agents = [...Array(24)].map((_, index) => {
  const fullname = _fullName(index)
  const location = _location(index)
  return {
    id: _id(index),
    name: fullname,
    firstName: fullname.split(' ')[0],
    lastName: fullname.split(' ')[1],
    company: _company(index),
    mobile: _mobile(index),
    email: _email(index),
    city: location.split(',')[0],
    state: location.split(',')[1],
    isVerified: true,
    avatarUrl: `/assets/images/avatar/avatar-${index + 1}.webp`,
    status: index % 8 ? 'active' : 'locked',
    role: _roles[index] || 'Sales Agent',
  }
});

// ----------------------------------------------------------------------
export const _customers = [...Array(12)].map((_, index) => {

  const fullname = _fullName(20 - index)
  const location = _location(20 - index)
  return {
    id: _id(index),
    name: fullname,
    // company: _company(index),
    firstName: fullname.split(' ')[0],
    lastName: fullname.split(' ')[1],
    email: _email(index),
    mobile: _mobile(index),
    phone: _mobile(12 - index),
    city: location.split(',')[0],
    state: location.split(',')[1],
    country: location.split(',')[2],
    hasItemInShoppingCart: index % 4 == 0 ? true : false,
    avatarUrl: `/assets/images/customer/avatar-${index + 1}.png`,
    membership: index % 4 ? 'vip' : 'standard',
  }
});

// ----------------------------------------------------------------------

export const _posts = [...Array(26)].map((_, index) => ({
  id: _id(index),
  title: _postTitles(index),
  description: _description(index),
  coverUrl: `/assets/images/cover/cover-${index + 1}.webp`,
  totalViews: 8829,
  totalComments: 7977,
  totalShares: 8556,
  totalFavorites: 8870,
  postedAt: _times(index),
  author: {
    name: _fullName(index),
    avatarUrl: `/assets/images/avatar/avatar-${index + 1}.webp`,
  },
}));

// ----------------------------------------------------------------------

const COLORS = [
  '#00AB55',
  '#000000',
  '#FFFFFF',
  '#FFC0CB',
  '#FF4842',
  '#1890FF',
  '#94D82D',
  '#FFC107',
];

export const _products = [...Array(31)].map((_, index) => {
  const setIndex = index + 1;

  return {
    id: _id(index),
    price: _price(index),
    name: _productNames(index),
    priceSale: setIndex % 3 ? _price(index)*((100 -setIndex % 3)/100 ): _price(index),
    coverUrl: `/assets/images/product/product-${setIndex}.webp`,
    colors:
      (setIndex === 1 && COLORS.slice(0, 2)) ||
      (setIndex === 2 && COLORS.slice(1, 3)) ||
      (setIndex === 3 && COLORS.slice(2, 4)) ||
      (setIndex === 4 && COLORS.slice(3, 6)) ||
      (setIndex === 23 && COLORS.slice(4, 6)) ||
      (setIndex === 24 && COLORS.slice(5, 6)) ||
      COLORS,
    status:
      ([1, 3, 5, 10, 30].includes(setIndex) && 'sale')
      || ([4, 8, 12, 15, 17, 18, 20, 22, 28].includes(setIndex) && 'new') || '',
    category: ''
  };
});

export const _orders = [...Array(24)].map((_, index) => {
  const setIndex = index + 1;
  const address = _address()
  // `${_streetData(
  //   index)} ${_location(26 - index)}`
  return {
    id: _id(index),
    orderId: _orderId(index),
    totalPrice: _price(index) || _price(index - 10),
    itemSummary: _productNames(index),
    discount: setIndex % 3 ? setIndex : 0,
    promoteCode: setIndex % 3 == 0 ? _promoCode() : '',
    shippingAddress: address,
    billingAddress: address,
    customer: _fullName(index),

    // colors:
    //   (setIndex === 1 && COLORS.slice(0, 2)) ||
    //   (setIndex === 2 && COLORS.slice(1, 3)) ||
    //   (setIndex === 3 && COLORS.slice(2, 4)) ||
    //   (setIndex === 4 && COLORS.slice(3, 6)) ||
    //   (setIndex === 23 && COLORS.slice(4, 6)) ||
    //   (setIndex === 24 && COLORS.slice(5, 6)) ||
    //   COLORS,
    isDelayed: index % 3 == 0 ? true : false,
    status:
      ([1, 3, 5].includes(setIndex) && 'packing')
      || ([2, 11, 14, 16, 21, 23].includes(setIndex) && 'shipping')
      || ([4, 8, 12].includes(setIndex) && 'delivered')
      || 'customs-clearance',
  };
});

// ----------------------------------------------------------------------

export const _langs = [
  {
    value: 'en',
    label: 'English',
    icon: '/assets/icons/flags/ic-flag-en.svg',
  },
  {
    value: 'de',
    label: 'German',
    icon: '/assets/icons/flags/ic-flag-de.svg',
  },
  {
    value: 'fr',
    label: 'French',
    icon: '/assets/icons/flags/ic-flag-fr.svg',
  },
];

// ----------------------------------------------------------------------

export const _timeline = [...Array(5)].map((_, index) => ({
  id: _id(index),
  title: [
    '1983, orders, $4220',
    '12 Invoices have been paid',
    'Order #37745 from September',
    'New order placed #XF-2356',
    'New order placed #XF-2346',
  ][index],
  type: `order${index + 1}`,
  time: _times(index),
}));

// ----------------------------------------------------------------------

export const _tasks = [...Array(5)].map((_, index) => ({
  id: _id(index),
  name: _taskNames(index),
}));

// ----------------------------------------------------------------------

export const _notifications = [
  {
    id: _id(1),
    title: 'Your order is placed',
    description: 'waiting for shipping',
    avatarUrl: null,
    type: 'order-placed',
    postedAt: _times(1),
    isUnRead: true,
  },
  {
    id: _id(2),
    title: _fullName(2),
    description: 'answered to your comment on the Minimal',
    avatarUrl: '/assets/images/avatar/avatar-2.webp',
    type: 'friend-interactive',
    postedAt: _times(2),
    isUnRead: true,
  },
  {
    id: _id(3),
    title: 'You have new message',
    description: '5 unread messages',
    avatarUrl: null,
    type: 'chat-message',
    postedAt: _times(3),
    isUnRead: false,
  },
  {
    id: _id(4),
    title: 'You have new mail',
    description: 'sent from Guido Padberg',
    avatarUrl: null,
    type: 'mail',
    postedAt: _times(4),
    isUnRead: false,
  },
  {
    id: _id(5),
    title: 'Delivery processing',
    description: 'Your order is being shipped',
    avatarUrl: null,
    type: 'order-shipped',
    postedAt: _times(5),
    isUnRead: false,
  },
];
// function _address(): any {
//   throw new Error('Function not implemented.');
// }

// function _streetData(arg0: number) {
//   throw new Error('Function not implemented.');
// }

