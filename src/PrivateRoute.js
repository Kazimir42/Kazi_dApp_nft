import { Navigate, Outlet } from "react-router-dom";
import {useAuthValue} from './context/AuthContext'

function PrivateRoute({ currentUser }) {


    return currentUser ? <Outlet /> : <Navigate to="/" />;


}
export default PrivateRoute;