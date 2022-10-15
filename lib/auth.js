import React, { useState, useEffect, useContext, createContext } from "react";
import {
  getAuth,
  signInWithPopup,
  signOut,
  GithubAuthProvider,
} from "firebase/auth";
import app from "./firebase";

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const auth = getAuth();
  const provider = new GithubAuthProvider();

  const signinWithGitHub = () => {
    return signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
        return result.user;
      })
      .catch((error) => console.log(error));
  };

  const signout = () => {
    return signOut(getAuth())
      .then(() => setUser(false))
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const unsubscribe = getAuth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user.email);
      } else setUser(false);
    });

    return () => unsubscribe();
  }, []);

  return { signinWithGitHub, signout, user };
}
