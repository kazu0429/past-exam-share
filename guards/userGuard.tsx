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
    const isReady = router.isReady;

    const [loading, setLoading] = useState<boolean>(false);

    /*
    修正予定箇所 routerがインスタンスでないエラーが発生
    今後 未認証ユーザによる不正なリダイレクトを防ぐ機能として追加予定
    */
    useEffect(() =>{
        if(isReady){
            setLoading(true)
        }
    },[isReady])

    if (user === null && router.pathname !== '/signin') {
        console.log("login?");
        router.push('/');
        return null;
    }


    if(user === null){
        router.push('/signin');
        return null;
    }

    if (!loading || !user) {
        return <p>ローディング中...</p>;
    }

    if(typeof children === 'function'){
        return <>{children(user)}</>;
    }else{
        return <>{children}</>;
    }
}

export default UserGuard;