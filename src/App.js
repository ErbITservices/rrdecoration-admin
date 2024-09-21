import Home from "./pages/Home";
import {Navigate, Route, Routes, Outlet, useLocation} from "react-router-dom"
import './App.css'
import Login from "./pages/Login";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import SlideBar from "./components/SlideBar";
import UserPage from "./pages/UserPage";
import Users from "./pages/Users";
import { logoutUser } from "./redux/userRedux";
import jwt_decode from 'jwt-decode'
import Products from "./pages/Products";
import { useState } from "react";
import MessageComponent from "./components/MesageComponent";
import { useEffect } from "react";
import Orders from "./pages/Orders";
import Invoice from "./pages/Invoice";
import Annoucment from "./pages/Annoucment";
import Ticket from "./pages/Ticket";
import Addserviceorder from "./components/Addserviceorder";
import AllComplains from "./pages/AllComplains";
import Librery from "./pages/Librery";
import Renewrequest from "./pages/Renewrequest";

function IsLogedin() {
  const user = useSelector(state => state.user.currentUser)
  return user ? <Navigate to={"/"}/> : <Outlet/>
}

function PrivateRoute() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.currentUser)

  if(!user?.accessToken) return <Navigate to="/login" />

  try {
    const decoded = jwt_decode(user.accessToken)
    if (decoded.exp * 1000 < Date.now()) {
      dispatch(logoutUser())
      return <Navigate to="/login"/>
    }
  } catch (err) {
    console.log(err)
    dispatch(logoutUser())
    return <Navigate to="/login"/>
  }
  return <Outlet/>
}


function App() {
  const user = useSelector(state => state.user.currentUser)
  const [isSlideBarOpen, setisSlideBarOpen] = useState(false)

  const location = useLocation()
  useEffect(() => {
    setisSlideBarOpen(false)
  },[location.pathname])
  
  return (
    <>
      {user && (
        <Navbar setSideBar={setisSlideBarOpen} isOpen={isSlideBarOpen} />
      )}
      <div style={{ height: "100vh" }}>
        {user && <SlideBar isOpen={isSlideBarOpen} />}
        <Routes>
          <Route element={<IsLogedin />}>
            <Route path="/login" element={<Login />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/user" element={<Users />} />
            <Route path="/Ticket" element={<Ticket />} />
            <Route path="/AllLaibrary" element={<Librery />} />
            <Route path="/Renewrequest" element={<Renewrequest />} />
            <Route path="/AllComplains" element={<AllComplains />} />
            <Route path="/Addserviceorder" element={<Addserviceorder />} />
            <Route path="/user/:id" element={<UserPage />} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/order/:id" element={<Invoice />} />
            <Route path="announcment" element={<Annoucment />} />
          </Route>
        </Routes>
        <MessageComponent />
      </div>
    </>
  );
}

export default App;
