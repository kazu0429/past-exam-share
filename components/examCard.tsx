import Link from "next/link";
import { Exam } from "@/types/exam";
import { useState, ReactElement,useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase/firebase";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { User } from "@/types/user";
import BookMark from "@/pages/bookmark";




type Props = {
    exam:Exam;
    icon:ReactElement | null;
    canRemove:boolean;
    isbookmark:boolean;
}

export const ExamCard = (props:Props) => {

    const { exam, icon ,canRemove, isbookmark } = props;
    // let bookmark = isbookmark
    const eid = exam.id as string;
    const user = useAuth() as User;
    const ref = useRef(true);

    const [bookmark, setBookmark] = useState<boolean>(props.isbookmark);

    useEffect(() => {
        if(ref.current){
            ref.current = false;
            return;
        }
    },[])

    const bookmarkCountView = (num: number) => {
        if (num < 1000) {
            return num.toString();
        } else if (num < 1000000) {
            const thousandsCount = Math.floor(num / 1000);
            return thousandsCount.toString() + "k";
        } else {
            const millionsCount = Math.floor(num / 1000000);
            return millionsCount.toString() + "m";
        }
    }


    const updateBookmarkOfUser = async() => {
        const userRef = doc(db, "users", user.id);
        try{
            if(bookmark){
                await updateDoc(userRef, {
                    bookmarks: arrayRemove(eid)
                })
                // alert("ブックマークから削除しました。");
            }else{
                await updateDoc(userRef, {
                    bookmarks: arrayUnion(eid)
                })
                alert("ブックマークに追加しました。");
            }
            setBookmark(!bookmark)
        }catch(err){
            console.log(err);
        }
    }

    return (
        <div className="m-5 rounded-xl border border-gray-300 bg-white p-2 hover:border-indigo-500">
            <div className="z-20 flex">
                <div className="group relative p-4">
                    {icon}
                </div>
                <div className="mx-4 mr-auto flex flex-col gap-y-1">
                    <Link as={`./details/${eid}`} href={{pathname:`./details/[id]`,query:{id:eid}}} className="text-xl font-bold text-gray-800">{exam.title}</Link>
                    <p>科目名:{exam.subjectName}</p>
                    <p>投稿日 : {(new Date(exam.postedAt)).toLocaleString()}</p>
                </div>
                <div className="relative right-0 top-0 z-0 flex flex-col gap-y-3">
                    {!canRemove && 
                    (<div className="flex flex-col items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`h-6 w-6`}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                        </svg>
                        <div className="text-sm">
                            {bookmarkCountView(exam.booknum)}
                        </div>
                    </div>)}
                </div>
            </div>
        </div>
    )
}

export default ExamCard;