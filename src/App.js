import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import './App.scss'

import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Search from "./pages/Search/Search";
import Popular from "./pages/Popular/Popular";
import TopRated from "./pages/TopRated/TopRated";
import Favorite from "./pages/Favorite/Favorite";
import SingleMovie from "./pages/SingleMovie/SingleMovie";
import Person from "./pages/Person/Person";

import { AppProvider } from "./context";

function App() {
  return (
    <AppProvider>
      <Router>
    <div>
        <Navbar />
        <Routes>
          <Route exact="true" path="/" element={<Home/>}></Route>
          <Route path="/search" element={<Search/>}></Route>
          <Route path="/popular" element={<Popular/>}></Route>
          <Route path="/top_rated" element={<TopRated/>}></Route>
          <Route path="/favorite" element={<Favorite/>}></Route>
          <Route path="/movie/:id" element={<SingleMovie/>} />
          <Route path="/person/:id" element={<Person/>} />
        </Routes>
    </div>
      </Router>
    </AppProvider>
    
  );
}

export default App;
