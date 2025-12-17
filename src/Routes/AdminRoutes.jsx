import React from 'react';
import { useAuth } from '../Hooks/useAuth';
import LoadingPage from '../Pages/LoadingPage/LoadingPage';
import useRole from '../Hooks/useRole';
import Forbidden from '../Components/Forbidden/Forbidden';

const AdminRoutes = ({children}) => {
    const { loading} = useAuth()
    const {role, roleLoading} = useRole()

    if(loading || roleLoading){
        <LoadingPage></LoadingPage>
    }

    if(role !== ' admin'){
        return <Forbidden></Forbidden>
    }

    return children
};

export default AdminRoutes;