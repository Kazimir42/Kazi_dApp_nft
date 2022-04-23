import {BrowserRouter, Route, Routes} from "react-router-dom";
import './index.css';
import Whitelist from "./pages/Whitelist";
import Header from "./partials/Header";


function App() {
  return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" exact element={<Whitelist />}/>
          </Routes>
        </BrowserRouter>
      </div>

  );
}

export default App;
