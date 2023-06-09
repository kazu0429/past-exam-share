import { db ,storage } from "@/firebase/firebase";
import { User } from "@/types/user";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable } from "firebase/storage";
import { useState, FormEvent } from "react";
import { serverTimestamp } from "firebase/firestore";

type Props = {
    isModal:boolean,
    onClose:() => void,
    user:User,
}

export const UserContentsModal = ({isModal, onClose, user}:Props) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [newName, setNewName] = useState<string>(user.name);
    const [newProfileIcon, setNewProfileIcon] = useState<File | null>(null);
    if(!isModal) return null;

    const uploadToStorage = (icon:File, uid:string) => {
        const storageRef = ref(storage);
        const iconPath = `profileicons/${uid}/icon.png`;
        const updateRef = ref(storageRef, iconPath)
        const uploadFile = uploadBytesResumable(updateRef, icon, {contentType:icon.type});
        uploadFile.on('state_changed', (snapshot) => {
            setLoading(true);
        },
        (err) => {
            console.log(err)
        },
        () => {
            setLoading(false);
        })
    }

    const handleSubmit = async(e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(newName, newProfileIcon);
        const uid = user.id;
        const userRef = doc(db, 'users', uid);
        try{
            await updateDoc(userRef,
                {
                    name:newName,
                    updatedAt:Date.now(),
                    updatedTimestamp:serverTimestamp(),
                })
            if(newProfileIcon !== null){
                uploadToStorage(newProfileIcon, uid);
            }
            alert("変更完了");
        }catch(err){
            console.log(err)
        }
    }

    const isProfileIcon = (event:React.ChangeEvent<HTMLInputElement>) => {
        if(event.currentTarget.files  === null) return;
        console.log(event.currentTarget.files[0])
        setNewProfileIcon(event.currentTarget.files[0]);
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-600/25 p-4">
            <div className="relative w-1/2 p-4  md:h-auto">
                <div className="relative rounded-lg bg-indigo-100 p-4 shadow ">
                    <h1 className="text-lg font-bold">基本情報</h1>
                    <form className="mt-5" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-y-3 rounded-lg border border-gray-500 bg-indigo-50 p-2">
                        ユーザー名<input defaultValue={user.name} type="text" className="rounded-lg border p-2 hover:border-indigo-500" onChange={(e) => setNewName(e.target.value)}/>
                        プロフィール画像<label className="button text-center">選択<input type="file" className="hidden" accept=".png" required onChange={isProfileIcon}/></label>
                        </div>
                        <div className="m-5 flex flex-row justify-between">
                            <button type="submit" className="button">変更</button>
                            <button className="button" onClick={onClose}>閉じる</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UserContentsModal;