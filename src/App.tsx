import { useEffect, useState } from "react";
import { Routes, Route } from "react-router";

import "./App.css";
import Error from "./views/Error/Error";
import Home from "./views/Home/Home";
import RepoPage from "./views/RepoPage/RepoPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/repo/:id" element={<RepoPage />} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
