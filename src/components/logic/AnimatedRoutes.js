import React from "react";
import { Route, Routes } from "react-router-dom";
import { useLocation } from "react-router";
import { AnimatePresence } from "framer-motion";
import DayMenu from "../Menu/DayMenu/Menu/DayMenu";
import NightMenu from "../Menu/NightMenu/Menu/NightMenu";
import AboutUs from "../UI/AboutUs/AboutUs";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Cart from "../Cart/Cart";
import Logout from "../Login/Logout";
import NightItemDetails from "../Menu/NightMenu/ItemDetails/NightItemDetails";
import ForgotPassword from "../Login/ForgotPassword";
import Guest from "../Login/Guest";
import ContactUs from "../UI/ContactUs/ContactUs";
import AlterChooseRestaurant from "../UI/Alternatives/AlterChooseRestaurant/AlterChooseRestaurant"
import Signup from "../Login/Signup";
import AwaitConfirmation from "../AwaitConfirmation/AwaitConfirmation";
import Checkout from "../Cart/Checkout";
import FAQ from "../FAQ/FAQ";
import Tac from "../Tac/Tac";
import PrivPolicy from "../privpolicy/PrivPolicy";

export default function AnimatedRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<AlterChooseRestaurant />} />
                <Route path="/chooserestaurant" element={<AlterChooseRestaurant/>}/>
                <Route path="/aboutus" element={<AboutUs/>} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />}/>
                <Route path='/menu' element={<DayMenu />} />
                <Route path='/nightmenu' element={<NightMenu />} />
                <Route path="/item/:id" element={<NightItemDetails />} />
                <Route path="/myaccount" element={<Profile />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/forgotPassword" element={<ForgotPassword/>}></Route>
                <Route path="/guest" element={<Guest/>}></Route>
                <Route path="/signup" element = {<Signup/>}/>
                <Route path='/confirmation' element={<AwaitConfirmation/>}/>
                <Route path='/checkout' element={<Checkout/>}/>
                <Route path='/faq' element={<FAQ/>}/>
                <Route path='/terms' element={<Tac/>}/>
                <Route path='/privacy' element={<PrivPolicy/>}/>
            </Routes>
        </AnimatePresence>
    )
}

//<Route path='/nightmenu' element={<NightMenu />} />