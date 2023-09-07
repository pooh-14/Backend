import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';

const Navbar = () => {

    const { state, dispatch } = useContext(AuthContext);
    const router = useNavigate()


    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' , border:"3px solid black"}}>
            <div style={{ width: "50%", display: 'flex', justifyContent: 'space-around' }}>
                <img onClick={()=>router('/')} style={{width:"10%"}} src='https://thumbs.dreamstime.com/z/grocery-store-vector-icon-shop-symbol-retail-concept-graphic-design-logo-web-site-social-media-mobile-app-ui-illustration-142680951.jpg?w=768'/>

                {state?.user?.role != "Seller" && <h4>Mens</h4>}
                {state?.user?.role != "Seller" && <h4>Women</h4>}
                {state?.user?.role != "Seller" && <h4>Kids</h4>}
                {/* seller */}
                {state?.user?.role == "Seller" && <h4 onClick={() => router("/addproduct")}>Add Product</h4>}
                {state?.user?.role == "Seller" && <h4 onClick={() => router("/yourproduct")}>Your Products</h4>}


            </div>
            <div style={{ width: "20%", display: 'flex', justifyContent: 'space-around' }}>
                {state?.user?.name? <>
                    {state?.user?.role == "Buyer" && <h4 onClick={() => router('/cart')}>Cart</h4>}
                    <h4 onClick={() => router('/profile')}>Profile</h4>
                    <h4 onClick={() => dispatch({ type: 'LOGOUT' })}>Logout</h4>
                </> : <h4 onClick={() => router('/login')}>Login/Register</h4>}
            </div>
        </div>
    )
}

export default Navbar