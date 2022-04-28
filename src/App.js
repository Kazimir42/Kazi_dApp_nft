import {BrowserRouter, Route, Routes} from "react-router-dom";
import {useState, useEffect} from 'react'
import './index.css';
import Whitelist from "./pages/Whitelist";
import Admin from "./pages/Admin";
import Header from "./partials/Header";
import Welcome from "./pages/Welcome";
import Presale from "./pages/Presale";
import Sale from "./pages/Sale";
import Login from "./pages/Login";
import {AuthProvider} from "./context/AuthContext";
import {auth} from './firebase'
import {onAuthStateChanged} from 'firebase/auth'
import PrivateRoute from './PrivateRoute'
import Footer from "./partials/Footer";
import {StepProvider} from "./context/StepContext";

function App() {
    const [currentUser, setCurrentUser] = useState(null)
    const [currentStep, setCurrentStep] = useState('null')

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
        })
        setCurrentStep('Before')
    }, [])

    return (
        <div className="min-h-screen flex flex-col">
            <BrowserRouter>
                <StepProvider value={{currentStep}}>
                    <AuthProvider value={{currentUser}}>
                        <Header />
                        <Routes>
                            <Route path="/" exact element={<Welcome />}/>
                            <Route path="/whitelist" exact element={<Whitelist />}/>
                            <Route path="/presale" exact element={<Presale />}/>
                            <Route path="/sale" exact element={<Sale />}/>
                            <Route path="/login" element={<Login />} />
                            <Route element={<PrivateRoute currentUser={currentUser} />}>
                                <Route path="/admin" element={<Admin />} />
                            </Route>
                        </Routes>
                        <Footer />
                    </AuthProvider>
                </StepProvider>
            </BrowserRouter>
        </div>

    );
}
export default App;
