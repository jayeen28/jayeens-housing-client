import initializeAuthentication from "../Firebase/firebase.init";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";

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

    //USER SIGN OUT
    const userSignout = () => {
        signOut(auth)
            .then(res => setuser({}))
            .catch(error => seterror(error.message))
    }

    //USER OBSERVER 
    useEffect(() => {
        const unsubscribed = onAuthStateChanged(auth, (user) => {
            if (user) {
                setuser(user)
            }
            else {
                setuser({})
            }
            return () => unsubscribed;
        })
    }, [auth])
    console.log(user)
    return {
        userSignup,
        userSignin,
        userSignout,
        user,
        error,
    }
}
export default useFirebase;