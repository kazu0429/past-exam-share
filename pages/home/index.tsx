import SideBar from "@/components/sideBar";
import { ReactElement, useEffect, useState } from "react";
import UserGuard from "@/guards/userGuard";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { useRef } from "react";
import { Exam } from "@/types/exam";
import { ExamCard } from "@/components/examCard";
import SearchField from "@/components/searchField";
import { OrderByDirection } from "firebase/firestore";
import RenderIcon from "@/components/renderProfileIcon";
import { useAuth } from "@/context/AuthContext";


export const Home = () => {

    const ref = useRef(true);
    const [ examList, setExamList ] = useState<Array<Exam>>([]);
    const [orderNum, setOrderNum] = useState<number>(0);
    const order:Array<OrderByDirection> = ["desc", "asc"];

    const user = useAuth();
    console.log(user);

    let exams:any = [];
    useEffect(() => {
        if (ref.current) {
            ref.current = false;
            return;
        }
        const docRef = collection(db, "exams");
        const q = query(docRef, orderBy("postedAt", order[orderNum]));
        getDocs(q).then((snapshot) => {
            snapshot.docs.forEach((doc) => {
                console.log(doc.data());
                exams.push({ id: doc.id, ...doc.data() })
            })
        setExamList(exams);
        }).catch((err) => (
            console.log(err)
        ))
    },[orderNum])

    return (
        <>
            <article className="flex-1 bg-indigo-50">
                <div>
                    <SearchField/>
                </div>
                <div>
                    <main className="mt-16">
                        <div className="flex">
                            <p className="ml-5">過去問一覧</p>
                            <p className="ml-auto mr-4">Sort</p>
                                <select className="mr-5 px-5 rounded-xl border border-gray-500" onChange={() => setOrderNum(orderNum^1)}>
                                    <option>降順</option>
                                    <option>昇順</option>
                                </select>
                        </div>
                        <div className="my-6 py-2 overflow-y-scroll h-96">
                            {examList.map((exam, i) =>
                                <ExamCard exam={exam} icon={<RenderIcon userId={exam.createUserid} />} key={exam.id} />
                            )}
                        </div>
                    </main>
                    <div className="m-5">
                        <button className="px-3 py-1 text-white bg-indigo-500 border border-indigo-500 hover:bg-indigo-800 rounded-xl">次へ</button>
                    </div>
                </div>
            </article>
        </>
    )
}

Home.getLayout = function getLayout(page: ReactElement) {
    return (
        // userGuard : 未認証ユーザーのリダイレクトを防ぐ
        // <UserGuard>
            <div className="flex">
                <SideBar/>{page}
            </div>
        // </UserGuard>
    )
}

export default Home;