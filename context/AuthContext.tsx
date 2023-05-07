import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { User } from "@/types/user";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/firebase/firebase";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

// コンテクスト用の型を定義
type UserContextType = User | null | undefined;

const AuthContext = createContext<UserContextType>(null);

export const AuthProvider = ({children}:{children:ReactNode}) => {
    const [user, setUser] = useState<UserContextType>(null);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async(user) => {
            if(user){
                const ref = doc(db, `users/${user.uid}`);
                const snap = await getDoc(ref);

                if(snap.exists()){
                    const appUser = snap.data() as User;
                    setUser(appUser);
                }else{
                    const appUser:User={
                        id:user.uid,
                        name:"anonymous",
                        email:user.email!,
                        photoURL:user.photoURL!,
                        createdAt: Date.now(),
                        createdTimestamp:serverTimestamp(),
                        updatedAt:Date.now(),
                        updatedTimestamp:serverTimestamp(),
                        postedExams:[],
                        bookmark:[]
                    };
                    setDoc(ref, appUser).then(() => {
                        setUser(appUser);
                    })
                }
            }else{
                setUser(null);
            }
            return unsubscribe;
        })
    },[])
    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);