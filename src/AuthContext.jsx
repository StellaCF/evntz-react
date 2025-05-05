import { createContext, useContext, useEffect, useState } from "react";
import { auth,db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    const [userDetails, setUserDetails] = useState(null)

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setLoading(true);
            if(currentUser){
                setUser(currentUser);

                try{
                    const userDoc = await getDoc(doc(db, "users", currentUser.uid))
                    if(userDoc.exists()){
                        setUserDetails(userDoc.data())
                    }else{
                        console.error('User document does not exist in firestore')
                        setUserDetails(null)
                    }
                }catch(error){
                    console.error('Error fetching user details', error)
                    setUserDetails(null)

                }
            }else{
                setUser(null)
                setUserDetails(null)
            }
            setLoading(false)
        })
        return unsubscribe
    },[])

    return(
        <AuthContext.Provider value={{user,userDetails}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)