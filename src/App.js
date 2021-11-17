import React, { Component } from 'react';
//React是default export。所以可以直接import， {Component}不是default export，所以要加{}
//假如一个module中有多个class，必须有一个是default export
import './App.css';
import TodoApp from './components/todo/TodoApp';
import './bootstrap.css';



class App extends Component {
  render() {
    return (
      <div className="App"> 
      <TodoApp/> 
      </div>
    );
  }
}



export default App;
