import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from "react-redux";
import configureStore from './sagas/configStore';

ReactDOM.render(
  <Provider store={configureStore()}>
    <BrowserRouter>
      <Switch>
        <Route path="/" component={()=><h1>Home </h1>} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);