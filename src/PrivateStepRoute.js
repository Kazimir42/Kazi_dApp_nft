import { Navigate, Outlet } from "react-router-dom";

function PrivateStepRoute({ currentStep }) {

    return currentStep ? <Outlet /> : <Navigate to="/login" />;

}
export default PrivateStepRoute;