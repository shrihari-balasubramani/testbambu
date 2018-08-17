import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './containers/AppContainer';
import './main.scss'
class TestBambu extends React.Component{
  render() {
    return <AppContainer />
  }
};

ReactDOM.render(
  <TestBambu />,
  document.getElementById('root')
);



