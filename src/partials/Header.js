import {Link} from "react-router-dom";
import { useLocation } from "react-router-dom"
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import {useAuthValue} from "../context/AuthContext";
import StepButton from "../components/StepButton";


function Header() {
    const sampleLocation = useLocation();
    const {currentUser} = useAuthValue();

    return (
        <header className="py-4 absolute w-full">
            <div className="flex flex-row mx-auto container justify-between items-center">
                <Link to="/">
                    <img src="logo192.png" className="h-16" />
                </Link>
                <StepButton />
            </div>
        </header>
    )
}export default Header;