import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashobard';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import Profiles from './components/profiles/Profiles';
import PrivateRoute from './components/routing/PrivateRoute';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Exams from './components/exams/Exams';
import Exam from './components/exams/Exam';
import FormicSh from './components/exams/FormicSh';

import { loadUser } from './actions/auth';


import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { Fragment, useEffect } from 'react';

import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';

if(localStorage.token){
  setAuthToken(localStorage.token);
}

const App = () => {
useEffect(() => {
  store.dispatch(loadUser());
}, [])
return(
<Provider store={ store }>
  <Router>
  <Fragment>
    <Navbar />
    <Route exact path='/' component={ Landing } />
    <section className="container">
      <Alert />
      <Switch>
       <Route exact path='/register' component={ Register } />
       <Route exact path='/login' component={ Login } />
       <Route exact path='/profiles' component={ Profiles } />
       <Route exact path='/profile/:id' component={ Profile } />
       <Route exact path='/formic' component={ FormicSh } />


       <PrivateRoute exact path='/dashboard' component={ Dashboard } />
       <PrivateRoute exact path='/create-profile' component={ CreateProfile } />
       <PrivateRoute exact path='/edit-profile' component={ EditProfile } />
       <PrivateRoute exact path='/add-experience' component={ AddExperience } />
       <PrivateRoute exact path='/add-education' component={ AddEducation } />
       <PrivateRoute exact path='/posts' component={ Posts } />
       <PrivateRoute exact path='/exams' component={ Exams } />
       <PrivateRoute exact path='/exam/:id' component={ Exam } />

      </Switch>
    </section>

  </Fragment>
  </Router>
</Provider>
  )};

export default App;
