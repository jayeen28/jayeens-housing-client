import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import AuthProvider from './Components/Context/AuthProvider';
import Apartments from './Components/Pages/Apartments/Apartments';
import BookApartment from './Components/Pages/BookApartment/BookApartment';
import Dashboard from './Components/Pages/Dashboard/Dashboard';
import ErrorPage from './Components/Pages/ErrorPage/ErrorPage';
import Home from './Components/Pages/Home/Home';
import ProfilePage from './Components/Pages/ProfilePage/ProfilePage';
import VoiceCommand from './Components/Pages/Shared/VoiceCommand/VoiceCommand';
import SignIn from './Components/Pages/SignIn/SignIn';
import SignUp from './Components/Pages/SignUp/SignUp';
import ThankyouPage from './Components/Pages/ThankyouPage/ThankyouPage';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/apartments">
              <Apartments />
            </Route>
            <Route path="/signin">
              <SignIn />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
            <PrivateRoute path="/apartment/book/:id">
              <BookApartment />
            </PrivateRoute>
            <PrivateRoute path="/dashboard">
              <Dashboard />
            </PrivateRoute>
            <PrivateRoute path="/profile/:userName">
              <ProfilePage />
            </PrivateRoute>
            <Route path="/thankyou">
              <ThankyouPage />
            </Route>
            <Route path="*">
              <ErrorPage />
            </Route>
          </Switch>
          <VoiceCommand />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
