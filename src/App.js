import Navbar from "./components/UI/Navbar/Navbar";
import "./App.css";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { fetchMenuDataNight } from "./components/store/menu-actions";
import { setCart } from "./components/store/cart-actions";
import { useEffect, useState, lazy, Suspense} from "react";
import Loading from "./components/UI/Loading/Loading";
import AnimatedRoutes from "./components/logic/AnimatedRoutes";
import UserID from "./components/hooks/userid";
import Footer from "./components/UI/Footer/Footer";
import Swal from "sweetalert2";

const AdminIndex = lazy(() => import("./components/admin/AdminIndex"));
const WorkerIndex = lazy(() => import("./components/AcceptRejectOrder/AcceptRejectOrder"));

export default function App() {
  const [userID, setUserID] = useState(null);
  const [cookie, setCookie] = useState(Cookies.get('cookie'));

  const existingCookie = Cookies.get('cart'); // cookie testing
  const menuItems = useSelector((state) => state.menu.menuItems); // menu items which are fetched from redux array
  const [test, setTest] = useState(false); // test 
  const dispatch = useDispatch(); // dispatch function of redux 


  const checkCookie = () => {
    if (cookie !== "1")
      Swal.fire({
        title: 'This website uses cookies',
        text: 'By continuing to use this website you agree to our use of cookies. We only use these for the functionality of the website and we do not collect or share any information with third parties.',
        icon: 'info',
        confirmButtonText: 'OK',
        heightAuto: false,
      }).then((result) => {
        if (result.isConfirmed)
          Cookies.set('cookie', 1, { expires: 1 });
        setCookie(1);
      });
  }

  useEffect(() => {
    try {
      const options = {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        
        
      }

      fetch('/api/auth/validate', options).then(res => {
        res.json().then(data => {
          if (typeof data !== "undefined")
            if (data.userID) {
              setUserID(data.userID);
            }
        })
      });
    } catch (error) { }

    checkCookie();
  }, [])

  // this use effect fetches the menu data for the night menu
  useEffect(() => {
    dispatch(fetchMenuDataNight()); // dispatch menu-action in menu-actions.js
    setTest(true); // um i think this is needed for the cookie to work correctly
  }, [dispatch])

  // this use effect will run when the menuItems array gets updated which means after the useEffect above runs
  useEffect(() => {
    if (test) {
      if (!existingCookie) { // if cookie doesnt exist set it to an empty array
        const correctArray = [];
        Cookies.set('cart', JSON.stringify(correctArray), { expires: 300, sameSite: 'strict' })
      }
      else {
        const cartItems = JSON.parse(existingCookie); // this is the array containing what the user had last time and its in his cookie
        const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0); // this gets the total quantity of the cart based on his items
        dispatch(setCart({ cartItems, totalQuantity, menuItems }));
      }
    }
  }, [existingCookie, dispatch, menuItems]); // menu items needed because this has to run again when the fetch happens

  /* return <AcceptRejectOrder /> */

  return (
    <>
    <UserID.Provider value={{ userID, setUserID }}>
      {!(userID === 1 || userID === 2) && <>
        
          <Navbar />
          <div className="content">
            <Suspense fallback={<Loading />}>
              <AnimatedRoutes />
            </Suspense>
          </div>
          <Footer />
        
      </>
      }

      {(userID === 1) && <>
        <Suspense fallback={<Loading />}>
          <AdminIndex />
        </Suspense>
      </>}
      {(userID === 2) && <>
        <Suspense fallback={<Loading />}>
          <WorkerIndex />
        </Suspense>
      </>}
      </UserID.Provider>
    </>
  );
} 
