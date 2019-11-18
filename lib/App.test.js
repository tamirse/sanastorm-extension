var _jsxFileName = 'src\\App.test.js',
    _this = this;

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', function () {
  var div = document.createElement('div');
  ReactDOM.render(React.createElement(App, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    },
    __self: _this
  }), div);
  ReactDOM.unmountComponentAtNode(div);
});