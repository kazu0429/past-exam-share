import Link from "next/link";
import { Exam } from "@/types/exam";
import { useState, ReactElement, ReactNode, useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase/firebase";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { User } from "@/types/user";

type Props = {
    exam:Exam;
    icon:ReactElement | null;
}

export const ExamCard = (props:Props) => {

    const { exam, icon } = props;
    const eid = exam.id as string;
    const user = useAuth() as User;
    const ref = useRef(true);
    const [ bookmark, setBookmark ] = useState<boolean>(false);
    const [ bookmarkList, setBookmarkList ] = useState<Array<string>>([]);

    useEffect(() => {
        if(ref.current){
            ref.current = false;
            return;
        }
        console.log("bookmarks : ", user.bookmarks);
        if(user.bookmarks.includes(eid)){
            setBookmark(true);
            bookmarkList.push(eid);
            setBookmarkList(bookmarkList);
        }
    },[])

    const updateBookmarkOfUser = async(eid:string) => {
        const userRef = doc(db, "users", user.id);
        try{
            if(bookmarkList.includes(eid)){
                const index = bookmarkList.indexOf(eid);
                await updateDoc(userRef, {
                    bookmarks: arrayRemove(eid)
                })
                setBookmark(false);
                bookmarkList.splice(index, 1);
                setBookmarkList(bookmarkList)
                // alert("ブックマークから削除しました。");
            }else{
                await updateDoc(userRef, {
                    bookmarks: arrayUnion(eid)
                })
                setBookmark(true);
                bookmarkList.push(eid);
                setBookmarkList(bookmarkList);
                alert("ブックマークに追加しました。");
            }
        }catch(err){
            console.log(err);
        }
        console.log()
    }

    return (
        <div className="m-5 p-2 bg-white border border-gray-300 rounded-xl hover:border-indigo-500">
            <div className="z-20 flex">
                <div className="group relative p-4">
                    {icon}
                </div>
                <div className="mr-auto mx-4 flex flex-col gap-y-1">
                    <Link href="/user" className="text-xl font-bold text-gray-800">{exam.title}</Link>
                    <p>科目名:{exam.subjectName}</p>
                    <p></p>
                    <p>投稿日 : {(new Date(exam.postedAt)).toLocaleString()}</p>
                </div>
                <div className="flex flex-col gap-y-3 z-0 top-0 right-0 relative">
                    <button onClick={() => updateBookmarkOfUser(exam.id as string)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 hover:stroke-2 ${bookmark && "fill-indigo-500"}`}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                        </svg>
                    </button>
                    {/* <button onClick={() => alert("いいね")}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                                </svg>
                                            </button> */}
                </div>
            </div>
        </div>
    )
}

export default ExamCard;