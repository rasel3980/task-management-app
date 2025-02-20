import { createContext, useEffect, useState } from "react";
import { auth } from "../Firebase/Firebase.Init";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";

export const AuthContext = createContext(null)
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const googleProvider = new GoogleAuthProvider()
    const signInWithGoogle = () => {
      setLoading(true)
      return signInWithPopup(auth, googleProvider)
    }
  
    const logOut = async () => {
      setLoading(true)
      return signOut(auth)
    }
  
    const updateUserProfile = (name, photo) => {
      return updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
      })
    }
  
    // onAuthStateChange
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async currentUser => {
        console.log('CurrentUser-->', currentUser?.email)
        if (currentUser?.email) {
          setUser(currentUser)
          // save user info in db
        //   await axios.post(
        //     `${import.meta.env.VITE_API_URL}/users/${currentUser?.email}`,
        //     {
        //       name: currentUser?.displayName,
        //       image: currentUser?.photoURL,
        //       email: currentUser?.email,
        //     }
        //   )
        } else {
          setUser(currentUser)
        }
        setLoading(false)
      })
      return () => {
        return unsubscribe()
      }
    }, [])
  
    const authInfo = {
      user,
      setUser,
      loading,
      setLoading,
      signInWithGoogle,
      logOut,
      updateUserProfile,
    }
  
    return (
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    )
};

export default AuthProvider;

