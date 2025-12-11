import React from 'react';
import { useAuth } from '../Hooks/useAuth';
import { Navigate} from 'react-router';
import LoadingPage from '../Pages/LoadingPage/LoadingPage';


const PrivateRoutes = ({children}) => {

    const {user} = useAuth();
    <LoadingPage></LoadingPage>

    if(!user){
        return <Navigate to="/login"></Navigate>
    }
    
    return children;
};

export default PrivateRoutes;