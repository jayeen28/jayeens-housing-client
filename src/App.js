import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Apartments from './Components/Apartments/Apartments';
import AuthProvider from './Components/Context/AuthProvider';
import BookApartment from './Components/Pages/BookApartment/BookApartment';
import Home from './Components/Pages/Home/Home';
import Footer from './Components/Pages/Shared/Footer/Footer';
import Header from './Components/Pages/Shared/Header/Header';
import SignIn from './Components/Pages/SignIn/SignIn';
import SignUp from './Components/Pages/SignUp/SignUp';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Header />
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
            <Route path="/apartment/book/:id">
              <BookApartment />
            </Route>
          </Switch>
          <Footer />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
