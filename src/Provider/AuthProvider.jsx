import { createContext, useEffect, useState } from "react";
import { auth } from "../Firebase/Firebase.Init";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import useAxiosPublic from "../Hooks/useAxiosPublic";

export const AuthContext = createContext(null)
const AuthProvider = ({ children }) => {
    const axiosPublic = useAxiosPublic();
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)
    // console.log("user",user);

    const googleProvider = new GoogleAuthProvider()
    const signInWithGoogle = () => {
      setLoading(true)
      return signInWithPopup(auth, googleProvider)
    }
  
    const logOut = async () => {
      setLoading(true)
      return signOut(auth)
    }
  
    // onAuthStateChange
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        //   console.log('CurrentUser-->', currentUser.email);
          if (currentUser?.email) {
            setUser(currentUser);
            const userInfo = { email: currentUser?.email };
          axiosPublic.post(
          `/user/${userInfo}`,
          {
            name: currentUser?.displayName,
            image: currentUser?.photoURL,
            email: currentUser?.email,
          }
        )
          } else {
            setUser(currentUser);
          }
          setLoading(false);
        });
        return () => unsubscribe();
      }, []);
      
  
    const authInfo = {
      user,
      setUser,
      loading,
      setLoading,
      signInWithGoogle,
      logOut,
    }
    
    return (
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    )
};

export default AuthProvider;

