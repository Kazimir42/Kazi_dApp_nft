import {BrowserRouter, Route, Routes} from "react-router-dom";
import './index.css';
import Whitelist from "./pages/Whitelist";
import Header from "./components/Header";


function App() {
  return (
      <div className="App">
        <Header />
        <BrowserRouter>
          <Routes>
            <Route path="/" exact element={<Whitelist />}/>
          </Routes>
        </BrowserRouter>
      </div>

  );
}

export default App;
