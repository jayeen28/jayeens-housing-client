import initializeAuthentication from "../Firebase/firebase.init";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";

//INITIALIZE AUTHENTICATION
initializeAuthentication();
const useFirebase = () => {
    const [user, setuser] = useState({});
    const [error, seterror] = useState('');
    const [isLoading, setisLoading] = useState(true);
    const [isAdminLoading, setisAdminLoading] = useState(true);
    const [isadmin, setisadmin] = useState(false);
    const [profileUpdate, setprofileUpdate] = useState(false);
    const auth = getAuth();

    //SEND USER DATA TO DATABASE
    const setCustomerToDb = (user) => {
        const { uid, displayName, email } = user;
        fetch('https://obscure-refuge-52189.herokuapp.com/users', {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ uid, displayName, email, role: 'customer' })
        })
    }

    //SIGN UP USER 
    const userSignup = (email, password, userName, history) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(res => {
                setuser(res.user);
                updateUserName(userName);
                res.user.displayName = userName;
                setCustomerToDb(res.user);
                seterror('');
                history.push('/');
            })
            .catch(error => seterror(error.message))
    }

    //UPDATE USER NAME
    const updateUserName = userName => {
        updateProfile(auth.currentUser, {
            displayName: userName
        })
            .catch(error => seterror(error.message))
            .finally(() => {
                setprofileUpdate(!profileUpdate);
            })
    }

    //UPDATE PROFILE IMAGE
    const updateUserProfileImage = imgUrl => {
        updateProfile(auth.currentUser, {
            photoURL: imgUrl || null,
        })
            .then(res => {
                seterror('');
            })
            .catch(error => seterror(error.message))
            .finally(() => {
                setisLoading(false);
                setprofileUpdate(!profileUpdate)
            })
    }
    // console.log(error)

    //SIGN IN USER
    const userSignin = (email, passoword, history, redirect_uri) => {
        setisLoading(true);
        signInWithEmailAndPassword(auth, email, passoword)
            .then(res => {
                setuser(res.user);
                seterror('');
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

    //CHECK IF LOGED IN USER ADMIN OR NOT
    useEffect(() => {
        if (user.uid) {
            fetch(`https://obscure-refuge-52189.herokuapp.com/users?uid=${user.uid}`)
                .then(res => res.json())
                .then(data => {
                    if (data?.role === 'admin') {
                        setisadmin(true)
                    }
                    else {
                        setisadmin(false);
                    }
                    setisAdminLoading(false)
                })
        }
    }, [user])
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
    }, [auth, profileUpdate]);
    // console.log(user)
    return {
        userSignup,
        userSignin,
        userSignout,
        updateUserProfileImage,
        setisLoading,
        updateUserName,
        isAdminLoading,
        isadmin,
        user,
        error,
        isLoading
    }
}
export default useFirebase;