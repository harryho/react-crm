import { _agents, _roles , _guid} from '../_mock';

export const roleArray = () => [
  { id: "1", title: 'Sales Leader' },
  { id: "2", title: 'Hr Manager' },
  { id: "3", title: 'Sales Agent' },
  { id: "4", title: 'Sales Operator' },
  { id: "5", title: 'Sales Manager' },
  { id: "6", title: 'Project Manager' },
  { id: "7", title: 'Business Analyst' },
  { id: "9", title: 'Product Designer' },
  { id: "10", title: 'Market Manager' },
  { id: "11", title: 'General Manager' }
]


const KEYS = {
  items: "agents",
  itemId: "agentId"
};

export function init() {
  console.log(_agents)
  localStorage.setItem(KEYS.items, JSON.stringify(_agents));
}


export function addItem(data: TODO) {
  let items = getAllItems();
  data["id"] = generateItemId(items.length);
  items.push(data);
  localStorage.setItem(KEYS.items, JSON.stringify(items));
}

export function generateItemId(totalCount: number) {
  return `${_guid}${(totalCount+1)}`;
}

export function updateItem(data: TODO) {
  let items = getAllItems() as TODO;
  let index = items.findIndex((a: TODO) => a.id === data.id);
  items[index] = data;
  localStorage.setItem(KEYS.items, JSON.stringify(items));
}




export function getAllItems() {
  if (localStorage.getItem(KEYS.items) === null) {
    localStorage.setItem(KEYS.items, JSON.stringify([]));
  }
  const es = localStorage.getItem(KEYS.items);
  return JSON.parse(es ? es : "");
}


export function getItemById(id: string | number) {
  if (localStorage.getItem(KEYS.items) === null) {
    localStorage.setItem(KEYS.items, JSON.stringify([]));
  }
  const us = localStorage.getItem(KEYS.items);
  const ul = JSON.parse(us ? us : "");
  return ul.find((u: TODO) => u.id === id);
}

export function deleteItemById(id: string | number) {
  if (localStorage.getItem(KEYS.items) === null) {
    localStorage.setItem(KEYS.items, JSON.stringify([]));
  }
  const _items = localStorage.getItem(KEYS.items);
  const items = JSON.parse(_items ? _items : "");
  const index = items.findIndex((u: TODO) => u.id === id);
  items.splice(index,1)
  localStorage.setItem(KEYS.items, JSON.stringify(items));
}



export function getItemsByPageNumber(
  pageNumber: number, pageSize: number = 10 ) {
  if (localStorage.getItem(KEYS.items) === null) {
    localStorage.setItem(KEYS.items, JSON.stringify([]));
  }
  const es = localStorage.getItem(KEYS.items);
  const products = JSON.parse(es ? es : "");

  console.log( ` pageNumber ${pageNumber} `)
  const start = (pageNumber -1)* pageSize;
  const end = start + pageSize
  return products.slice( start, end);
}