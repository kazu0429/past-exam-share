import { useState, FormEvent } from "react";
import Link from "next/link";
import { auth } from "@/firebase/firebase";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { useRouter } from "next/router";

export const Signup = () => {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmationPassword, setComfirmatinPassword] = useState<string>("");
    const [isCorrect, setIsCorrect] = useState<boolean>(true);
    const [signup, setSignup] = useState<boolean>(false);
    const [sendEmail, setSendEmail] = useState<boolean>();
    const router = useRouter();

    const handleSubmit = async(e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!availableEmail(email)){
            setSignup(true);
            return;
        }
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
        }else{
            setIsCorrect(false);
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
        <div className="flex h-screen w-screen flex-col items-center justify-center">
            <div className="text-2xl">
                Kadai ShuShu
            </div>
            <main className="relative m-10 h-[65vh] rounded-2xl border border-gray-200 px-4 pb-8 pt-4 sm:w-2/5 md:w-1/3 lg:w-1/4">
                <h1 className="relative mb-4 flex justify-center text-2xl">Sign Up!</h1>
                <div>
                    <form className="flex flex-col gap-y-6 px-5 py-3" onSubmit={handleSubmit}>
                        <div className="group relative">
                            <span className={`tooltip`}>鹿児島大学のEmailで登録してください</span>
                            <input type="text" placeholder="Email" className={`input_field ${signup && "border-red-300"}`} onChange={(e) => setEmail(e.target.value)}  required/>
                        </div>
                        <span className="group relative">
                            <span className="tooltip">英数字8文字以上</span>
                            <input type="password" placeholder="Password" className={`input_field ${!isCorrect && "border-red-300"}`} onChange={(e) => setPassword(e.target.value)} required/>
                        </span>
                        <input type="password" placeholder="Confirmation Password" className={`input_field ${!isCorrect && "border-red-300"}`} onChange={(e) => setComfirmatinPassword(e.target.value)} required/>
                        <button type="submit" className="rounded-lg border border-indigo-600 bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-400 ">Sign up</button>
                    </form><hr/>
                    <div className="mt-4 flex justify-center">
                        <p>アカウントを持っている方 <Link href="/signin" className="text-indigo-500">Sign In</Link></p>
                    </div>
                </div>
                {/* メール認証実装時に使用予定 */}
                {/* {sendEmail && <p>メールを送信しました。</p>}  */}
            </main>
            <div className="group relative flex flex-row items-center gap-x-1">
                <span className="tooltip w-[40vh]">
                    このサイトは鹿大生限定の授業情報共有サイトです✨<br/>
                    履修登録前や過去の授業内容について知りたい事があるときに、参考にできるものが少しでもあればと思い開発に至りました。<br/>
                    投稿は有志となりますので、あなたの経験や知識を共有していただけると幸いです。<br/>
                    注意事項：当サービスでは不適切な内容や誤情報を多く含んだ投稿はお控え頂くようお願い致します。<br/>
                    また、鹿大生以外の方の利用も原則禁止となります。
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#6366f1" className="h-6 w-6 border-gray-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                </svg>
                <div className="text-sm text-indigo-500">
                    このサイトについて
                </div>
            </div>
        </div>
        </>
    )
}

export default Signup;