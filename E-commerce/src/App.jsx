import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import { Toaster } from "react-hot-toast";
import HomePage from './Components/HomePage'
import Cart from "./Components/Cart";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export default App;
