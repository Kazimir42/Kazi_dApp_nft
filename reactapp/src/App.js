import {BrowserRouter, Route, Routes} from "react-router-dom";
import './index.css';
import 'tailwindcss/base.css'
import 'tailwindcss/components.css'
import 'tailwindcss/utilities.css'
import Whitelist from "./pages/Whitelist";
import Admin from "./pages/Admin";
import Header from "./partials/Header";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" exact element={<Whitelist/>}/>
                    <Route path="/admin" element={<Admin />} />
                </Routes>
            </BrowserRouter>
        </div>

    );
}
export default App;
