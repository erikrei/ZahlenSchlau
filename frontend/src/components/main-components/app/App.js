import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./App.css";

import Dashboard from "../dashboard/Dashboard";
import Learning from "../learning/Learning";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/learning">
          <Route path="addition" element={<Learning operation="addition" />} />
          <Route path="subtraction" element={<Learning operation="subtraction" />} />
          <Route path="multiplication" element={<Learning operation="multiplication" />} />
          <Route path="division" element={<Learning operation="division" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
