import { createStore } from 'redux'
import rootReducers from './reducers';

const store = createStore(rootReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__ || compose;

// const store = createStore(rootReducers, composeEnhancers(applyMiddleware(thunk)));

// export default store;