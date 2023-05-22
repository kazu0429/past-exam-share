import { useAuth } from "@/context/AuthContext";
import { User } from "@/types/user";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";

type Props = {
    children:((user:User)=>ReactNode) | ReactNode;
};

export const UserGuard = ({children}:Props) => {
    
    const user = useAuth();
    const router = useRouter();

    const [loading, setLoading] = useState<boolean>(false);

    // if (user === null && router.pathname !== '/') {
    //     router.push('/');
    //     return null;
    // }


    if (user === null) {
        router.push('/signin');
        return null;
    }
    
    if (user === undefined) {
        return <p>ローディング中...</p>;
    }

    if(typeof children === 'function'){
        return <>{children(user)}</>;
    }else{
        return <>{children}</>;
    }
}

export default UserGuard;