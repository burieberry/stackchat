import './index.scss';
// using style-loader, sass-loader and css-loader, webpack allows us import scss, compiles it into css, and then injects a <style> tag onto the DOM (see webpack.config.js)

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Main } from './components';
import store, { gotMessagesFromServer } from './store';

const unsubscribe = store.subscribe(function() {
  console.log('-------------------------');
  console.log('State changed!!', store.getState());
});

store.dispatch(gotMessagesFromServer([{ author: 'Milton', content: 'Hey @channel'}]));
store.dispatch(gotMessagesFromServer([{ author: 'Marcy', content: 'Anybody @here want ice cream?'}]));

unsubscribe();

store.dispatch(gotMessagesFromServer([{ author: 'Astro', content: 'To infinity and beyond!'}]));

ReactDOM.render(
  <Router>
    <Main />
  </Router>,
  document.getElementById('app')
);
