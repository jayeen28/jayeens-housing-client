import initializeAuthentication from "../Firebase/firebase.init";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
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

    //SIGN IN USER
    const userSignin = (email, passoword) => {
        signInWithEmailAndPassword(auth, email, passoword)
            .then(res => setuser(res.user))
            .catch(error => seterror(error.message));
    }
    console.log(user)
    return {
        userSignup,
        userSignin,
        user,
        error,
    }
}
export default useFirebase;