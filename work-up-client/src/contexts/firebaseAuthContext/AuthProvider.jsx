import React, { useEffect, useState } from "react";
import { FirebaseAuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../../../firebase.config";
import axios from "axios";

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [initialUser, setInitialUser] = useState(null);


  const googleProvider=new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  // creating user with email and pass
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };


    // creating user with google
    const createUserGoogle=()=>{
        setLoading(true);
        return signInWithPopup(auth,googleProvider);
    }


    // creating user with github 
    const createUserGithub=()=>{
        setLoading(true);
        return signInWithPopup(auth,githubProvider);
    }

  //sing in with user
  const signinUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //get current user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setInitialUser(currentUser);
      console.log(currentUser);
      if(currentUser?.email){
        const userData = {email:currentUser.email};
        axios.post("http://localhost:3000/jwt",userData,{
          withCredentials:true,
        })
        .then(res=>console.log(res.data))
        .catch(err=>console.log(err));
      }
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  //sign out user 
  const signOutUser = ()=>{
    setLoading(true);
    return signOut(auth)
  }
  const userInfo = {
    loading,
    initialUser,
    createUser,
    createUserGoogle,
    createUserGithub,
    signinUser,
    signOutUser,
  };
  return (
    <FirebaseAuthContext.Provider value={userInfo}>
      {children}
    </FirebaseAuthContext.Provider>
  );
};

export default AuthProvider;
