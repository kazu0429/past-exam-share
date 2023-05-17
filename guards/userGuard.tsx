import { useAuth } from "@/context/AuthContext";
import { User } from "@/types/user";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";

type Props = {
    children:((user:User)=>ReactNode) | ReactNode;
};

export const UserGuard = ({children}:Props) => {
    
    const user = useAuth();
    let router = useRouter();

    // useEffect(() => {
    //     if (router.isReady) {
    //         if(user === null){
    //             router.push("/signin");
    //             return;
    //         }
    //     }
    // },[router.isReady])

    if (user === null && router.pathname !== '/') {
        // router.push('/signin');
        return null;
    }

    if (user === null) {
        router.push('/signin');
        return null;
    }
    
    if (user === undefined || !user) {
        return <p>ローディング中...</p>;
    }

    if(typeof children === 'function'){
        return <>{children(user)}</>;
    }else{
        return <>{children}</>;
    }
}

export default UserGuard;