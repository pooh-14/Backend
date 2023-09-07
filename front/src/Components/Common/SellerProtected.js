import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext';

const SellerProtected = ({ children }) => {
    const { state } = useContext(AuthContext)
    const router = useNavigate();

    useEffect(() => {
        if (state?.user?.role != "Seller") {
            router('/')
        }
    }, [state])

    return state?.user?.role == "Seller" ? children : null;
}

export default SellerProtected