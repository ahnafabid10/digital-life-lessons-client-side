import React from 'react';
import { useAuth } from '../Hooks/useAuth';
import { Navigate,  useLocation} from 'react-router';
import LoadingPage from '../Pages/LoadingPage/LoadingPage';


const PrivateRoutes = ({children}) => {

    const location = useLocation();

    const {user} = useAuth();
    <LoadingPage></LoadingPage>

    if(!user){
        return <Navigate state={location.pathname} to="/login"></Navigate>
    }
    
    return children;
};

export default PrivateRoutes;