import { useState, FormEvent } from "react";
import Link from "next/link";
import { auth } from "@/firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";

export const Signup = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmationPassword, setComfirmatinPassword] = useState<string>("");
    const [isCorrect, setIsCorrect] = useState<boolean>(false);
    const [signup, setSignup] = useState<boolean>(false);


    const handleSubmit = async(e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSignup(true);
        setIsCorrect(false);
        if(!availableEmail(email)) return;
        if(password === confirmationPassword && password.length >= 8){
            setIsCorrect(true);
            try{
                const userCredential = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                )
                setEmail('');
                setPassword('');
            }catch(err){
                if (err instanceof FirebaseError) {
                    console.log(err)
                    if(err.code == "auth/email-already-in-use"){
                        alert("すでに登録されているメールアドレスです。")
                    }
                }
            }
        }
    }

    const availableEmail = (email:string) =>{
        const regex = /^k\d{7}@kadai\.jp$/;
        if(email){
            console.log(regex.test(email));
            return regex.test(email);
        }
        return false;
    }

    return(
        <>
        <div className="h-screen w-screen flex flex-col justify-center items-center">
            <main className="h-3/5 lg:w-1/4 md:w-1/3 sm:w-2/5 m-10 px-5 py-3 rounded-2xl relative border border-gray-200">
                <h1 className="text-2xl mb-4 flex justify-center relative">Sign Up</h1>
                <div>
                    <form className="flex flex-col gap-y-6 px-5 py-3" onSubmit={handleSubmit}>
                        <input type="text" placeholder="Email" className="text-sm  px-4 py-3 rounded-lg bg-gray-200 focus:bg-gray-100 border border-gray-200" onChange={(e) => setEmail(e.target.value)}/>
                        <input type="password" placeholder="Password" className="text-sm  px-4 py-3 rounded-lg bg-gray-200 focus:bg-gray-100 border border-gray-200" onChange={(e) => setPassword(e.target.value)}/>
                        <input type="password" placeholder="Confirmation Password" className="text-sm  px-4 py-3 rounded-lg bg-gray-200 focus:bg-gray-100 border border-gray-200" onChange={(e) => setComfirmatinPassword(e.target.value)}/>
                        <button type="submit" className="p-2 text-white bg-indigo-500 rounded-lg border border-indigo-600 hover:bg-indigo-400 ">Sign up</button>
                        {signup && !isCorrect &&<p>間違っているよ</p>}
                    </form><hr/>
                </div>
                <div className="mt-6">
                <p>アカウントを持っている方 <Link href="/signin" className="text-indigo-500">Sign In</Link></p>
                </div>
                
            </main>
        </div>
        </>
    )
}

export default Signup;