import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import AuthProvider from './Components/Context/AuthProvider';
import Apartments from './Components/Pages/Apartments/Apartments';
import BookApartment from './Components/Pages/BookApartment/BookApartment';
import Dashboard from './Components/Pages/Dashboard/Dashboard';
import ErrorPage from './Components/Pages/ErrorPage/ErrorPage';
import Home from './Components/Pages/Home/Home';
import SignIn from './Components/Pages/SignIn/SignIn';
import SignUp from './Components/Pages/SignUp/SignUp';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
// import { createMuiTheme, ThemeProvider } from '@material-ui/core'

// const theme = createMuiTheme({
//   palette: {
//     primary: {
//       main: '#3D777A'
//     }
//   }
// })
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
            <Route path="*">
              <ErrorPage />
            </Route>
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
