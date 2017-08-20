import { 
  LOAD_CATEGORYS_REQUEST, LOAD_CATEGORYS_SUCCESS, LOAD_CATEGORYS_FAILURE,
  LOAD_PRODUCTS_REQUEST, LOAD_PRODUCTS_SUCCESS, LOAD_PRODUCTS_FAILURE,
  
   GET_PRODUCT_REQUEST,  GET_PRODUCT_SUCCESS,  GET_PRODUCT_FAILURE,
  UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS, UPDATE_PRODUCT_FAILURE,
  ADD_PRODUCT_REQUEST, ADD_PRODUCT_SUCCESS, ADD_PRODUCT_FAILURE,
  DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAILURE,

} from '../constants';

export function productReducer (state={
  isFetching: false,
  productList: [],
  categoryList: [],
  isAuthenticated: localStorage.getItem('token') ? true : false,
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {},
  updateSuccess: false,
  addSuccess: false,
  deleteSuccess: false,
  errorMessage:null
}, action){
  switch (action.type) {
    case LOAD_CATEGORYS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        filters: action.filters
      })
    case LOAD_CATEGORYS_SUCCESS:

      return Object.assign({}, state, {
        isFetching: false,
        categoryList: JSON.parse(action.response).filter( (e) => {
          if (action.filters){
          if (action.filters.product)
            return ( e.product.indexOf(action.filters.product)> -1 )
          }          
          return true;
        }),
        authenticated: action.authenticated || false,
        updateSuccess: false,
        addSuccess: false,
        deleteSuccess: false,
        errorMessage: null,
      })
    case LOAD_CATEGORYS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.message
      })
    case LOAD_PRODUCTS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        filters: action.filters
      })
    case LOAD_PRODUCTS_SUCCESS:

      return Object.assign({}, state, {
        isFetching: false,
        productList: JSON.parse(action.response).filter( (e) => {
          if (action.filters){
          if (action.filters.product)
            return ( e.product.indexOf(action.filters.product)> -1 )
          }          
          return true;
        }),
        authenticated: action.authenticated || false,
        updateSuccess: false,
        addSuccess: false,
        deleteSuccess: false,
        errorMessage: null,
      })
    case LOAD_PRODUCTS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.message
      })
  
    case  GET_PRODUCT_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        authenticated: action.authenticated || false
      })
    case  GET_PRODUCT_SUCCESS:

      return Object.assign({}, state, {
        isFetching: false,
        product: JSON.parse(action.response), 
        authenticated: action.authenticated || false
      })
    case  GET_PRODUCT_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.message
      })

    case UPDATE_PRODUCT_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case UPDATE_PRODUCT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        // product:{},
        // product: product,
        updateSuccess: true,
        authenticated: action.authenticated || false
      })
    case UPDATE_PRODUCT_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        product:{},
        errorMessage: action.error.statusText || action.error.status,
        updateSuccess: false
      })
    case ADD_PRODUCT_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case ADD_PRODUCT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        addSuccess: true,
        authenticated: action.authenticated || false
      });
    case ADD_PRODUCT_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.error.statusText || action.error.status,
        addSuccess: false
      });
    case DELETE_PRODUCT_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case DELETE_PRODUCT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        // product: product,
        deleteSuccess: true,
        action:action,
        authenticated: action.authenticated || false
      });
    case DELETE_PRODUCT_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,       
        deleteSuccess: false,
        errorMessage: action.error.statusText || action.error.status,
      });
    default:
      return state
  }
}
