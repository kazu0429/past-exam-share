import SideBar from "@/components/sideBar";
import { ReactElement, cache, useEffect, useState } from "react";
import UserGuard from "@/guards/userGuard";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { useRef } from "react";
import { Exam } from "@/types/exam";
import { ExamCard } from "@/components/examCard";
import { OrderByDirection } from "firebase/firestore";
import RenderIcon from "@/components/renderProfileIcon";
import { useAuth } from "@/context/AuthContext";
import { User } from "@/types/user";


export const BookMark = () => {

    const ref = useRef(true);
    const user = useAuth() as User;
    const [examList, setExamList] = useState<Array<Exam>>([]);
    const [orderNum, setOrderNum] = useState<number>(0);
    const order:Array<OrderByDirection> = ["desc", "asc"];

    useEffect(() => {
        if (ref.current) {
            ref.current = false;
            return;
        }
        let exams: any = [];
        const bookmarks = user.bookmarks as string[];
        (async() => {
            try{
                if (bookmarks.length > 0) {
                    console.log("bookmarks : ", bookmarks);
                    const docRef = collection(db, "exams");
                    // 制限を重ねる場合、firebaseの方で複合インデックスを作成しなければいけない
                    const q = query(docRef, where("id", "in", bookmarks), orderBy("postedAt", order[orderNum]));
                    const snapshot = await getDocs(q);
                    snapshot.docs.forEach((doc) => {
                            console.log("doc.data : ", doc.data())
                            exams.push({ id: doc.id, ...doc.data() })
                    })
                }
                setExamList(exams);
            }catch(err){
                console.log(err);
            }
        })()
    },[orderNum])

    return (
        <>
            <article className="flex-1 bg-indigo-50">
                {/* <div>
                    <SearchField onData={}/>
                </div> */}
                <div>
                    <main className="mt-16">
                        <div className="flex">
                            <p className="ml-5">ブックマーク</p>
                            <p className="ml-auto mr-4">Sort</p>
                                <select className="mr-5 px-5 rounded-xl border border-gray-500" onChange={() => setOrderNum(orderNum^1)}>
                                    <option>降順</option>
                                    <option>昇順</option>
                                </select>
                        </div>
                        <div className="exam_filed">
                            {examList.length ? examList.map((exam, i) =>
                                <ExamCard exam={exam} icon={<RenderIcon userId={exam.createUserid} />} key={exam.id} canRemove={false} />
                            ) : <div className="m-20 flex flex-col gap-y-4 items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l1.664 1.664M21 21l-1.5-1.5m-5.485-1.242L12 17.25 4.5 21V8.742m.164-4.078a2.15 2.15 0 011.743-1.342 48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185V19.5M4.664 4.664L19.5 19.5" />
                                    </svg>
                                    <p>ブックマークはありません</p>
                                </div>
                            }
                        </div>
                    </main>
                </div>
            </article>
        </>
    )
}

BookMark.getLayout = function getLayout(page: ReactElement) {
    return (
        // <UserGuard>
            <div className="flex">
                <SideBar/>{page}
            </div>
        // </UserGuard>
    )
}

export default BookMark;