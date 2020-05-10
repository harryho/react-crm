import React from 'react';
// import { render } from '@testing-library/react';
import {create, act} from 'react-test-renderer';
import App from './App';
import { Provider } from "react-redux";
// import configureStore from 'redux-mock-store';
import configureStore from "./store";

const mockStore = configureStore();

let store;
beforeEach(() => {
  store = mockStore
});

test('renders learn react link', () => {
  let app;
  act(() => {
    app = create(
    <Provider store={store}>
      <App />
    </Provider>
    );
  });

  expect(app.toJSON()).toMatchSnapshot();

});
