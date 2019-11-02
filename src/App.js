import React, { Suspense, lazy, useState, useMemo, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import { UserContext } from './UserContext';

import IwashNavBar from './js/components/Navbar/Navbar';
import Footer from './js/components/Footer/Footer';
import NotFound from './js/components/NotFound/NotFound';


const Home = lazy(() => import('./js/views/Home/Home'));
const LoggedHome = lazy(() => import('./js/views/LoggedHome/LoggedHome'));
const Login = lazy(() => import('./js/views/Login/Login'));
const Register = lazy(() => import('./js/views/Register/Register'));
const Washers = lazy(() => import('./js/views/Washers/Washers'));
const Wallet = lazy(() => import('./js/views/Wallet/Wallet'));
const Checkout = lazy(() => import('./js/views/Checkout/Checkout'));
const CurrentWash = lazy(() => import('./js/views/CurrentWash/CurrentWash'));

const Rasp = lazy(() => import('./js/views/Rasp/Rasp'));

function App() {

  const [washersData, setWashersData] = useState();
  const [dryersData, setDryersData] = useState();
  
  const [user, setUser] = useState(null);
  const [Auth, setAuth] = useState(null);
  let tokenAuth = localStorage.getItem('token');

  useEffect(() => {
    fetch('http://0.0.0.0:3000/washers')
      .then(res => res.json())
      .then(res => setWashersData(res))
      .catch(error => console.log('error: ', error) );
  },[])

  useEffect(() => {
    fetch('http://0.0.0.0:3000/dryers')
      .then(res => res.json())
      .then(res => setDryersData(res))
      .catch(error => console.log('error: ', error) );
  },[])


  const providerValue = useMemo(() => ({ user, setUser, Auth, setAuth, washersData, dryersData }), [user, setUser, Auth, setAuth, washersData, dryersData]);

  return (
    <Router>
      <UserContext.Provider value={providerValue}>
        <Suspense fallback={<div>Loading...</div>}>
          <IwashNavBar/>
            <Switch>
              {!tokenAuth ? <Route exact path="/" component={Home} /> : <Route exact path="/" component={LoggedHome}/> }
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/washers/:WID" component={Washers} />
              <Route path="/wallet" component={Wallet} />
              <Route path="/checkout" component={Checkout} />
              <Route path="/current-wash" component={CurrentWash} />
              <Route path="/rasp" component={Rasp} />
              <Route render={() => <NotFound/>} />
            </Switch>
          <Footer/>
        </Suspense>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
