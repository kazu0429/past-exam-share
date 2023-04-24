import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { auth } from "@/firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";

export const Signin = () => {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const router = useRouter();

    const handleSubmit = async(e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            await signInWithEmailAndPassword(auth, email, password);
            router.push("/home");
            setEmail("");
            setPassword("");
        }catch(err){
            if (err instanceof FirebaseError) {
                console.log(err);
            }
        }
    }

    return(
        <>
        <div className="h-screen w-screen flex flex-col justify-center items-center">
            <main className="h-96 lg:w-1/4 md:w-1/3 sm:w-2/5 m-10 px-5 py-3 rounded-2xl relative border border-gray-200">
                <h1 className="text-2xl mb-4 flex justify-center relative">Sign In</h1>
                <div>
                    <form className="flex flex-col gap-y-6 px-5 py-3" onSubmit={handleSubmit}>
                        <input type="text" placeholder="Email" className="input_field" onChange={(e) => setEmail(e.target.value)} required/>
                        <input type="password" placeholder="Password" className="input_field" onChange={(e) => setPassword(e.target.value)} required/>
                        <button type="submit" className="p-2 text-white bg-indigo-500 rounded-lg border border-indigo-600 hover:bg-indigo-400 ">Sign in</button>
                    </form><hr/>
                </div>
                <div className="mt-6">
                <p>アカウントを持っていない方 <Link href="/signup" className="text-indigo-500">Sign Up</Link></p>
                <p>パスワードを忘れてしまった方 </p>
                </div>
                
            </main>
        </div>
        </>
    )
}

export default Signin;