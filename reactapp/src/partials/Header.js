import {Link} from "react-router-dom";
import { useLocation } from "react-router-dom"


function Header() {
    const sampleLocation = useLocation();
    console.log(sampleLocation.pathname)

    return (
        <div className=" bg-gray-200">
            {
                sampleLocation.pathname === '/'
                ?
                    <Link to="/admin">Admin</Link>
                    :
                    <Link to="/">Home</Link>
            }
        </div>
    )
}export default Header;