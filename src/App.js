import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Todo from './features/todos/Todo';
import TodoId from './features/todos/TodoId';
import { Login } from './features/auth/Login';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
            <Route path="/" element={<Todo />} />
            <Route path="/todos/:id" element={<TodoId />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
