import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";

export const Layout = (props) => {
  return(
    <div>
      <Navbar/>
      <ToastContainer autoClose={5000}/>
      {props.children}
      <Footer/>
    </div>
  )
}