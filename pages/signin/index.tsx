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
        <div className="flex h-screen w-screen flex-col items-center justify-center">
            <div className="flex flex-row items-center gap-x-2">
                <div className="text-2xl">
                    Kadai ShuShu
                </div>
            </div>
            <main className="relative m-10 h-1/2 rounded-2xl border border-gray-200 px-5 py-3 sm:w-2/5 md:w-1/3 lg:w-1/4">
                <h1 className="relative mb-4 flex justify-center text-2xl">Sign In!</h1>
                <div>
                    <form className="flex flex-col gap-y-6 px-5 py-3" onSubmit={handleSubmit}>
                        <input type="text" placeholder="Email" className="input_field" onChange={(e) => setEmail(e.target.value)} required/>
                        <input type="password" placeholder="Password" className="input_field" onChange={(e) => setPassword(e.target.value)} required/>
                        <button type="submit" className="rounded-lg border border-indigo-600 bg-indigo-500 p-2 text-white hover:bg-indigo-400 ">Sign in</button>
                    </form><hr/>
                </div>
                <div className="mt-6">
                <p>アカウントを持っていない方 <Link href="/signup" className="text-indigo-500">Sign Up</Link></p>
                </div>
            </main>
        </div>
        </>
    )
}

export default Signin;