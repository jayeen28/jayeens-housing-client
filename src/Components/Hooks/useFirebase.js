import initializeAuthentication from "../Firebase/firebase.init";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";

//INITIALIZE AUTHENTICATION
initializeAuthentication();
const useFirebase = () => {
    const [user, setuser] = useState({});
    const [error, seterror] = useState('');
    const [isLoading, setisLoading] = useState(true);
    const auth = getAuth();

    //SEND USER DATA TO DATABASE
    const setCustomerToDb = (user) => {
        const { uid, displayName, email } = user;
        fetch(' https://obscure-refuge-52189.herokuapp.com/users', {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ uid, displayName, email, role: 'customer' })
        })
            .then(res => res.json())
            .then(data => console.log(data));
    }


    //SIGN UP USER 
    const userSignup = (email, password, userName) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(res => {
                setuser(res.user);
                updateUserName(userName);
                res.user.displayName = userName;
                setCustomerToDb(res.user)
            })
            .catch(error => seterror(error.message))
    }

    //UPDATE USER NAME AFTER SINGUP
    const updateUserName = userName => {
        updateProfile(auth.currentUser, {
            displayName: userName
        })
            .catch(error => seterror(error.message))
    }
    //SIGN IN USER
    const userSignin = (email, passoword, history, redirect_uri) => {
        setisLoading(true);
        signInWithEmailAndPassword(auth, email, passoword)
            .then(res => {
                setuser(res.user);
                history.push(redirect_uri);
            })
            .catch(error => seterror(error.message))
            .finally(setisLoading(false));
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
            setisLoading(true);
            if (user) {
                setuser(user)
            }
            else {
                setuser({})
            }
            setisLoading(false)
            return () => unsubscribed;
        })
    }, [auth])
    return {
        userSignup,
        userSignin,
        userSignout,
        user,
        error,
        isLoading
    }
}
export default useFirebase;