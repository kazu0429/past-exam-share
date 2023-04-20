import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export const Signin = () => {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const router = useRouter();

    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(email, password);
        router.push("/home");
    }

    return(
        <>
        <div className="h-screen w-screen flex flex-col justify-center items-center">
            <main className="h-2/4 lg:w-1/4 md:w-1/3 sm:w-2/5 m-10 px-5 py-3 rounded-2xl relative border border-gray-200">
                <h1 className="text-2xl mb-4 flex justify-center relative">Sign In</h1>
                <div>
                    <form className="flex flex-col gap-y-6 px-5 py-3" onClick={handleSubmit}>
                        <input type="text" placeholder="Email" className="text-sm  px-4 py-3 rounded-lg bg-gray-200 focus:bg-gray-100 border border-gray-200" onChange={(e) => setEmail(e.target.value)}/>
                        <input type="password" placeholder="Password" className="text-sm  px-4 py-3 rounded-lg bg-gray-200 focus:bg-gray-100 border border-gray-200" onChange={(e) => setPassword(e.target.value)}/>
                        <button type="submit" className="p-2 text-white bg-indigo-500 rounded-lg border border-indigo-600 hover:bg-indigo-400 ">Sign in</button>
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