import React, { useContext } from 'react'
import UserContext from '../../contexts/userContext'
import { Navigate, Outlet } from 'react-router-dom'


function ProtectedRoutes({ requiredRole }) {
    const { currUser } = useContext(UserContext)
    
    if(!currUser){
        return <Navigate to={'/'} replace/>
    } 

    if (requiredRole && currUser.role !== requiredRole) {

        return <Navigate to={'/access-denied'} replace/>
    }
        return <Outlet/>
}
export default ProtectedRoutes