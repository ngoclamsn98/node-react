import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import rootReducer from '../reducers';
import rootSaga from './index';


const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
    return {
        ...createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware))),
        runSaga: sagaMiddleware.run(rootSaga),
    };
};

export default configureStore;