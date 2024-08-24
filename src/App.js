// src/App.js
import React from 'react';
import { TodoWrapper } from './components/TodoWrapper';

function App() {
  return (
    <div className="container">
      <div className="row">
        <div className="col s12 m8 l6 offset-m2 offset-l3">
          <h1 className="center-align white-text">Get Things Done!</h1>
          <TodoWrapper />
        </div>
      </div>
    </div>
  );
}

export default App;
