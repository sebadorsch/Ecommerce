import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { check_authenticated, load_user, refresh } from "../../redux/actions/auth";

import { connect } from "react-redux";

import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import {useEffect} from "react";

export const Layout = (props) => {

  useEffect(() => {
      refresh()
      check_authenticated()
      load_user()
    }, []);

  return(
    <div>
      <Navbar/>
      <ToastContainer autoClose={5000}/>
      {props.children}
      <Footer/>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return(
    dispatch(
      refresh(),
      check_authenticated(),
      load_user()))
};

export default connect(null, mapDispatchToProps) (Layout)
