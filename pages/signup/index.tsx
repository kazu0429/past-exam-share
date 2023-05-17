import { useState, FormEvent } from "react";
import Link from "next/link";
import { auth } from "@/firebase/firebase";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";

export const Signup = () => {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmationPassword, setComfirmatinPassword] = useState<string>("");
    const [isCorrect, setIsCorrect] = useState<boolean>(false);
    const [signup, setSignup] = useState<boolean>(false);
    const [sendEmail, setSendEmail] = useState<boolean>();
    const router = useRouter();

    const handleSubmit = async(e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSignup(true);
        setIsCorrect(false);
        // if(!availableEmail(email)) return; メール送信のため、一時的にコメント
        if(password === confirmationPassword && password.length >= 8){
            setIsCorrect(true);
            try{
                const userCredential = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                )
                await sendEmailVerification(userCredential.user);
                setSendEmail(true);
                router.push("/home");
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
                        <span className="relative group">
                            <span className="tooltip">鹿児島大学のメールアドレスを入力してください</span>
                            <input type="text" placeholder="Email" className="input_field" onChange={(e) => setEmail(e.target.value)} required/>
                        </span>
                        <span className="relative group">
                            <span className="tooltip">英数字8文字以上</span>
                            <input type="password" placeholder="Password" className="input_field" onChange={(e) => setPassword(e.target.value)} required/>
                        </span>
                        <input type="password" placeholder="Confirmation Password" className="input_field" onChange={(e) => setComfirmatinPassword(e.target.value)} required/>
                        <button type="submit" className="px-4 py-2 text-white bg-indigo-500 rounded-lg border border-indigo-600 hover:bg-indigo-400 ">Sign up</button>
                        {signup && !isCorrect &&<p>鹿児島大学のメールアドレスではありません</p>}
                    </form><hr/>
                </div>
                <div className="mt-6">
                <p>アカウントを持っている方 <Link href="/signin" className="text-indigo-500">Sign In</Link></p>
                </div>
                {sendEmail && <p>メールを送信しました。</p>}
            </main>
        </div>
        </>
    )
}

export default Signup;