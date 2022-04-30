import {BrowserRouter, Route, Routes} from "react-router-dom";
import {useState, useEffect} from 'react'
import './index.css';
import Whitelist from "./pages/Whitelist";
import Admin from "./pages/Admin";
import Header from "./partials/Header";
import Home from "./pages/Home";
import Presale from "./pages/Presale";
import Sale from "./pages/Sale";
import Login from "./pages/Login";
import {AuthProvider} from "./context/AuthContext";
import {auth, db} from './firebase'
import {onAuthStateChanged} from 'firebase/auth'
import PrivateRoute from './PrivateRoute'
import Footer from "./partials/Footer";
import {StepProvider} from "./context/StepContext";
import {collection, query, where, getDocs, setDoc, doc , getDoc } from "firebase/firestore";

function App() {
    const [currentUser, setCurrentUser] = useState(null)
    const [currentStep, setCurrentStep] = useState(null)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
        })
        getStep();
    }, [])

    //get step in DB and save the current step in context
    async function getStep() {

        let response = await getDoc(doc(db, 'steps', 'eyZMZF6NREwvHwMLsDJb'))
        response = response.data();

        for (const [key, value] of Object.entries(response)) {
            if (value === true){
                setCurrentStep(key)
            }
        }




    }

    return (
        <div className="min-h-screen flex flex-col">
            <BrowserRouter>
                <StepProvider value={{currentStep}}>
                    <AuthProvider value={{currentUser}}>
                        <Header />
                        <Routes>
                            <Route path="/" exact element={<Home />}/>
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
