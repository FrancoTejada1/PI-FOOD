import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/landingPage.jsx";
import HomePage from "./components/HomePage/homePage.jsx";
import DetailsPage from "./components/DetailsPage/detailsPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/recipes' exact element={<HomePage/>}/>
          <Route path='/recipes/:id' exact element={<DetailsPage/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
