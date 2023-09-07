import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';

const AuthProtected = ({ children }) => {
    const { state } = useContext(AuthContext)
    const router = useNavigate();

    useEffect(() => {
        if (!state?.user?.name) {
            router('/login')
        }
    }, [state])

    return state?.user?.name ? children : null;
}

export default AuthProtected