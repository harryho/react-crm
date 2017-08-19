// const BASE_URL = 'http://localhost:3001/api'
const BASE_URL = 'http://localhost:5354/'

function callApi(endpoint, authenticated, method, data ) {
  
  let token = localStorage.getItem('token') || null;
  let config = {};
  
  if(authenticated) {
    if(token) {
      if (config['headers']){
          config['headers'] = config['headers'] ;
          config['headers'].Authorization = `Bearer ${token}`;
      } else {
          config['headers'] = { 
            'Authorization': `Bearer ${token}` ,
            'Content-Type':'application/json'};
          // headers: { 'Content-Type':'application/x-www-form-urlencoded' },
      }
    } else
      throw "No token saved!";
    
    if (method){
        config['method'] = method;
    }

    if (data) {
        config['body'] = JSON.stringify(data);
    }
  }

  
  // return fetch(BASE_URL + endpoint, config)
  //   .then(response =>
  //     response.text()
  //     .then(text => ({ text, response }))
  //   ).then(({ text, response }) => {
  //     if (!response.ok) {
  //       return Promise.reject(text)
  //     }
  //     return text
  //   }).catch(err => console.log(err));


  return fetch(BASE_URL + endpoint, config)
    .then(response =>
       response && response.ok?
          response.text()
            .then(text => ({ text, response }))
      :  { response }
    ).then(({ text, response }) => {       
      if (!response || !response.ok ||  !text ){
        return Promise.reject(response) 
      }       
      return text
    });

}

export const CALL_API = Symbol('Call API')

/* eslint-disable */
export default store => next => action => {
  
  const callAPI = action[CALL_API];
  
  // So the middleware doesn't get applied to every single action
  if (typeof callAPI === 'undefined') {
    // Reset type action
    if (action.type)
      return next({type:action.type})
    return next(action)
  }
  
  let { endpoint, types, authenticated, method, data, filters } = callAPI;
  
  
  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState());
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }
  
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }


  const [ requestType, successType, errorType ] = types
  
  // Passing the authenticated boolean back in our data will let us distinguish between normal and secret quotes
  return callApi(endpoint, authenticated, method, data ).then(
    response =>
          next({
              response,
              authenticated,
              filters:filters,              
              type: successType,  
            })  
    ,
    error => next({
      error: error, 
      type: errorType
    })
  )
}