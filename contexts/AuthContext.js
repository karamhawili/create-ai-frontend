import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase/firebase";
import firebase from "firebase/compat/app";
import { useRouter } from "next/router";
import {
  handleLoginFirestore,
  handleLogoutFirestore,
} from "../firebase/firebaseFunctions";

const AuthContext = React.createContext();

// access auth context
export const useAuth = () => {
  // console.log('rendering useAuth')
  return useContext(AuthContext);
};

// auth provider
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const signup = (email, password) =>
    auth.createUserWithEmailAndPassword(email, password);

  const login = (email, password) =>
    auth.signInWithEmailAndPassword(email, password);

  const logout = async () => {
    await handleLogoutFirestore(currentUser.uid);
    auth.signOut();
  };

  const resetPassword = (email) => auth.sendPasswordResetEmail(email);

  const updatePassword = (password) => currentUser.updatePassword(password);

  const signInWithGoogle = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(googleProvider).then(
      async (result) => {
        let user = result.user;
        // add user to users collection
        await handleLoginFirestore(user?.uid, user?.email);
        router.push("/platform/home?uid=" + user?.uid);
      },
      (error) => {
        console.log("Error signing in with google", error.message);
        alert("Error signing in with google");
      }
    );
  };

  useEffect(() => {
    //whenever the user is created, the setCurrentUser is called
    // only run it when component is mount (runs once)
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      console.log("On Auth state changed, current user", user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    logout,
    signup,
    resetPassword,
    signInWithGoogle,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
