import {Provider} from 'react-redux';
import store from './store';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Home from './Pages/Home/Home'
import Error404 from './Errors/Error404'

import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login"
import Activation from "./Pages/Activation/Activation"
import ResetPassword from "./Pages/ResetPassword/ResetPassword";


function App(){
  return(
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='*' element={ <Error404/> }/>

          <Route exact path='/' element={ <Home/> }/>
          <Route exact path='/register' element={ <Register/> }/>
          <Route exact path='/login' element={ <Login/> }/>
          <Route exact path='/activate/:uid/:token' element={ <Activation/> }/>
          <Route exact path='/reset_password' element={ <ResetPassword/> }/>



        </Routes>
      </Router>
    </Provider>
  );
}

export default App;