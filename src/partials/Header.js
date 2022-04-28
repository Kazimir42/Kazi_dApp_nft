import {Link} from "react-router-dom";
import { useLocation } from "react-router-dom"
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import {useAuthValue} from "../context/AuthContext";


function Header() {
    const sampleLocation = useLocation();
    const {currentUser} = useAuthValue();

    return (
        <header className="bg-gray-200 py-4">
            <div className="flex flex-row mx-auto container">
                <div className="bg-red-200 h-fit px-4 py-2 text-xl font-bold uppercase ml-auto">Mint now</div>
            </div>
        </header>
    )
}export default Header;