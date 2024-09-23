import "./App.css";
import { useState } from "react";
import { Route,Routes} from 'react-router-dom';
import SearchBooks from "./SearchBooks";
import ListBooks from "./ListBooks";

function App() {
  

  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={<ListBooks />} />
        <Route path="/search" element={<SearchBooks />} />
      </Routes>
    </div>
  );
}

export default App;
