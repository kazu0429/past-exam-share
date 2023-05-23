import { storage } from "@/firebase/firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { useState } from "react";

export const RenderIcon = (props:{userId:string}) => {
    
    const [ icon, setIcon ] = useState<string>("");
    const [ isIcon, setIsIcon ] = useState<boolean>(false);

    const uid = props.userId;
    const iconRef = ref(storage, `${process.env.NEXT_PUBLIC_FIREBASE_IMAGE_PATH}/profileicons/${uid}/icon.png`);

    getDownloadURL(iconRef).then((iconURL) => {
        setIcon(iconURL);
        setIsIcon(true);
    }).catch((err) => console.log(err));

    return (
        <div className="hover:scale-110 drop-shadow-md">
            {isIcon ?
                <div className="w-20 border border-gray rounded-full ">
                    <img src={icon} className="z-0"/>
                </div>
                :
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-20 h-20 fill-indigo-500">
                    <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                </svg>
            }
        </div>
    )
}

export default RenderIcon;