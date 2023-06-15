import SideBar from "@/components/sideBar";
import { ReactElement, useEffect, useState } from "react";
import UserGuard from "@/guards/userGuard";
import { collection, getDocs, orderBy, query, doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { useRef } from "react";
import { Exam } from "@/types/exam";
import { ExamCard } from "@/components/examCard";
import SearchField from "@/components/searchField";
import { OrderByDirection } from "firebase/firestore";
import RenderIcon from "@/components/renderProfileIcon";
import { useAuth } from "@/context/AuthContext";
import { User } from "@/types/user";


export const Home = () => {

    const ref = useRef(true);
    const [ examList, setExamList ] = useState<Array<Exam>>([]);
    const [orderNum, setOrderNum] = useState<number>(0);
    const [searchResult, setSearchResult] = useState<Array<Exam>>([]);
    const [bookmarkList, setBookMarkList] = useState<string[]>([]);
    const order:Array<OrderByDirection> = ["desc", "asc"];

    const user = useAuth() as User;

    
    useEffect(() => {
        if (ref.current) {
            ref.current = false;
            return;
        }
        let exams:any = [];
        (async () => {
            try {
                const bookRef = doc(db, "users", user.id);
                const snapshot = await getDoc(bookRef);
                const bookmarks = snapshot.get("bookmarks");
                setBookMarkList(bookmarks);

                const docRef = collection(db, "exams");
                const q = query(docRef, orderBy("postedAt", order[orderNum]));
                const examlist = await getDocs(q)
                examlist.docs.forEach((doc) => {
                        // console.log(doc.data());
                        exams.push({ id: doc.id, ...doc.data() })
                })
                setExamList(exams);
            }catch (err) {
                console.log(err)
            }
        })()
    },[orderNum, searchResult, user])

    const handleData = (examList:Array<Exam>):void =>{
        if(!!examList){
            setSearchResult(examList);
        }else{
            setSearchResult([]);
            console.log("該当する科目はありません");
        }
    }

    return (
        <>
            <article className="flex-1 bg-indigo-50">
                <div>
                    <SearchField onData={handleData}/>
                </div>
                <div>
                    <main className="mt-16">
                        <div className="flex">
                            <p className="ml-5">投稿一覧</p>
                            <p className="ml-auto mr-4">Sort</p>
                                <select className="mr-5 px-5 rounded-xl border border-gray-500" onChange={() => setOrderNum(orderNum^1)}>
                                    <option>降順</option>
                                    <option>昇順</option>
                                </select>
                        </div>
                        <div className="exam_filed">
                            {searchResult.length ? (searchResult.map((exam, i) =>
                                <ExamCard exam={exam} icon={<RenderIcon userid={exam.createUserid} />} key={exam.id} canRemove={false} bookmarks={bookmarkList}/>
                            )):
                            (examList.map((exam, i) =>
                                <ExamCard exam={exam} icon={<RenderIcon userid={exam.createUserid} />} key={exam.id} canRemove={false} bookmarks={bookmarkList}/>
                            ))}
                        </div>
                    </main>
                </div>
            </article>
        </>
    )
}

Home.getLayout = function getLayout(page: ReactElement) {
    return (
        // userGuard : 未認証ユーザーのリダイレクトを防ぐ
        // <UserGuard>
        <div className="flex w-full h-full fixed">
            <SideBar />
            {page}
        </div>
        // </UserGuard>
    )
}

export default Home;