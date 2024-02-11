import Autorization from "./autorization/Autorization.jsx";
import { PageOne, PageTwo } from "./Pages.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./main/Main.jsx";
import Test_t from "./main/Test_t.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="one" element={<PageOne />} />
        <Route path="two" element={<PageTwo />} />
        <Route path="*" element={<Autorization />} />
        <Route path="xx" element={<Test_t />} />
        <Route path="main" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
