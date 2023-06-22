import React from 'react'
import { useNavigate } from 'react-router';
import UserID from '../hooks/userid';
import { useDispatch } from 'react-redux';
import { cartActions } from '../store/cart-slice';
import Cookies from 'js-cookie';

export default function Logout() {
    const navigate = useNavigate();
    const { setUserID } = React.useContext(UserID);
    const dispatch = useDispatch();
        
    try {
        const options ={
          method: 'POST',
          credentials: 'include',
          mode: 'cors',
          
          
        }

        fetch('/api/auth/logout', options).then(()=>{
            setUserID(null);
            Cookies.remove('address');
            dispatch(cartActions.replaceCart({items: [], totalQuantity: 0}));
      });
        
      } catch(error){
        console.log(error);
      }
      navigate("/");
    
}
