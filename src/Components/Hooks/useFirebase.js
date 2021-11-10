import initializeAuthentication from "../Firebase/firebase.init";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

//INITIALIZE AUTHENTICATION
initializeAuthentication();
const useFirebase = () => {
    const [user, setuser] = useState({});
    const [error, seterror] = useState('');
    const auth = getAuth();

    //SIGN UP USER 
    const userSignup = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(res => setuser(res.user))
            .catch(error => seterror(error.message))
    }
    console.log(user)
    return {
        userSignup,
        user,
        error,
    }
}
export default useFirebase;