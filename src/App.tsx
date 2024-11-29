import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {Main} from "./Main/Main";
import { Login } from './pages/Login';
import { Navbar } from './Navbar/Navbar';
import { CreatePost } from './CreatePost/createPost';
import "./App.css";


function App() {
  return (
    <div className='App'>
           <Router>
            <Navbar/>
            <Routes>
              <Route path="/" element={<Main/>}></Route>
              <Route path='/login' element={<Login/>}></Route>
              <Route path='/createPost' element={<CreatePost/>}></Route>
            </Routes>
           </Router>
    </div>
  );
}

export default App;
