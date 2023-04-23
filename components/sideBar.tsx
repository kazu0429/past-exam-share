import { useRouter } from "next/router";
import { useState } from "react";
import { auth } from "@/firebase/firebase";
import { signOut } from "firebase/auth";

export const SideBar = () => {

    const [open, setOpen] = useState<boolean>(true);
    const router = useRouter();

    const Menus = [
        {title:"Home", url:"/home", svg:"M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"},
        {title:"User", url:"/user", svg:"M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"},
        {title:"Upload", url:"/upload",svg:"M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"}
        
    ];
    
    const logout = async() => {
        try{
            await signOut(auth);
            router.push("/signin");
        }catch(err){
            console.log(err);
        }
    }

    return(
        <>
            <div className={`${open ? "w-48" : "w-20"} p-5 pt-8 duration-300`}>
                <div className="relative">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`p-2 absolute cursor-pointer -right-9 rounded-full top-9 w-9 h-9 bg-white border-2 border-indigo-500 hover:border-indigo-800 ${!open && "rotate-180"}`} onClick={() => setOpen(!open)}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
                    </svg>
                </div>
                <div className="gap-x-4 items-center fixed">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="2 0 24 24" strokeWidth={1.5} stroke="currentColor" className="absolute left-2 cursor-pointer w-7 h-7 duration-500" onClick={() => router.push("/")}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                    </svg>
                    <h1 className={`ml-12 text-black origin-left font-medium text-xl duration-200  ${!open && "scale-0"}`}>Kadai</h1>
                </div>
                <ul className="pt-6 fixed">
                    {Menus.map((menu, i) => (
                        <li className={`${router.pathname === `${menu.url}` ? "text-indigo-600" : "text-gray-600"} flex rounded-md p-2 my-4 cursor-pointer text-md items-center gap-x-4 hover:text-indigo-600`} key={i}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ">
                                <path strokeLinecap="round" strokeLinejoin="round" d={`${menu.svg}`} />
                            </svg>
                            <span className={`absolut ${!open && "hidden"} origin-left duration-200`}>{menu.title}</span>
                        </li>
                    ))}
                    <hr />
                    <li className={`flex rounded-md p-2 mt-auto cursor-pointer text-md items-center gap-x-4 hover:text-indigo-600`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                        </svg>
                        <span className={`absolut ${!open && "hidden"} origin-left duration-200`} onClick={logout}>Logout</span>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default SideBar;