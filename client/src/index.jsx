import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger'; // eslint-disable-line import/no-extraneous-dependencies

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import startChat, { chatMiddleware } from './chat';
import rootReducer from './reducers';


const reduxDevTools = () => (
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
);

const middleware = [];
// const sagaMiddleware = createSagaMiddleware();

// middleware.push(sagaMiddleware);
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}
middleware.push(chatMiddleware);

// From online guide
const initialState = window.INITIAL_STATE; // <-- Probs dont need this
const store = createStore(
  rootReducer,
  initialState,
  reduxDevTools()(applyMiddleware(...middleware)),
);
startChat(store);

const Provided = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(<Provided />, document.getElementById('root'));
registerServiceWorker();
