import {BrowserRouter, Route, Routes} from "react-router-dom";
import './index.css';
import 'tailwindcss/base.css'
import 'tailwindcss/components.css'
import 'tailwindcss/utilities.css'
import Whitelist from "./pages/Whitelist";
import Admin from "./pages/Admin";
import Header from "./partials/Header";
import Welcome from "./pages/Welcome";
import Presale from "./pages/Presale";
import Sale from "./pages/Sale";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" exact element={<Welcome />}/>
                    <Route path="/whitelist" exact element={<Whitelist />}/>
                    <Route path="/presale" exact element={<Presale />}/>
                    <Route path="/sale" exact element={<Sale />}/>
                    <Route path="/admin" element={<Admin />} />
                </Routes>
            </BrowserRouter>
        </div>

    );
}
export default App;
