import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute({ currentUser }) {

    return currentUser ? <Outlet /> : <Navigate to="/login" />;

}
export default PrivateRoute;