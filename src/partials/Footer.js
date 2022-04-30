import {Link} from "react-router-dom";
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import {useAuthValue} from "../context/AuthContext";


function Footer() {
    const {currentUser} = useAuthValue();

    return(
        <footer className="py-16 mt-auto bg-dark-background">
            <div className="container mx-auto flex flex-row justify-between text-lg">

                    {currentUser
                        ?
                        <ul>
                            <li>
                                <Link to="/admin" className="ml-auto text-white hover:text-primary duration-200">Admin</Link>
                            </li>
                            <li>
                                <a href="" className="text-white hover:text-primary duration-200" onClick={() => signOut(auth)}>Sign Out</a>
                            </li>
                        </ul>
                        :
                        <ul>
                            <li>
                                <Link to="/login" className="ml-auto text-white hover:text-primary duration-200">Login</Link>
                            </li>
                        </ul>
                    }
                    <ul>
                        <li>
                            <Link to="/" className="ml-auto text-white hover:text-primary duration-200">Home</Link>
                        </li>
                    </ul>
            </div>
        </footer>
    )

}
export default Footer;