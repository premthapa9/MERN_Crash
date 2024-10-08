import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CreatePage from "./pages/CreatePage";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className=" relative md:container md:mx-auto">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </div>
  );
};

export default App;
