import {Link} from "react-router-dom";
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import {useAuthValue} from "../context/AuthContext";


function Footer() {
    const {currentUser} = useAuthValue();

    return(
        <footer className="bg-neutral-900 py-16 mt-auto">
            <div className="container mx-auto flex flex-row justify-between">

                    {currentUser
                        ?
                        <ul>
                            <li>
                                <Link to="/admin" className="ml-auto text-white">Admin</Link>
                            </li>
                            <li>
                                <a href="" className="text-white" onClick={() => signOut(auth)}>Sign Out</a>
                            </li>
                        </ul>
                        :
                        <ul>
                            <li>
                                <Link to="/login" className="ml-auto text-white">Login</Link>
                            </li>
                        </ul>
                    }
                    <ul>
                        <li>
                            <Link to="/" className="ml-auto text-white">Home</Link>
                        </li>
                    </ul>
            </div>
        </footer>
    )

}
export default Footer;