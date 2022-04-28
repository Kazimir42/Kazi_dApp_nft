import {Link} from "react-router-dom";
import { useLocation } from "react-router-dom"
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'


function Header() {
    const sampleLocation = useLocation();

    return (
        <div className=" bg-gray-200">
            {
                sampleLocation.pathname === '/'
                ?
                    <Link to="/admin">Admin</Link>
                    :
                    <Link to="/">Home</Link>
            }
            <span onClick={() => signOut(auth)}>Sign Out</span>

        </div>
    )
}export default Header;