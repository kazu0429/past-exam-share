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
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getPostListData} from "@/utils/getPostData";
import { reverse } from "dns";


export const Home = (props:InferGetServerSidePropsType<typeof getServerSideProps>) => {

    const [orderBy, setOrderBy] = useState<number>(1);
    const [searchResult, setSearchResult] = useState<Array<Exam>>([]);
    const [bookmarkList, setBookMarkList] = useState<string[]>([]);

    const user = useAuth() as User;
    const postList = props.getPostData;
    const [sortedPostList, setSortedPostList] = useState<Array<Exam>>(postList);

    
    useEffect(() => {
        let exams:any = [];
        (async () => {
            try {
                const bookRef = doc(db, "users", user.id);
                const snapshot = await getDoc(bookRef);
                const bookmarks = snapshot.get("bookmarks");
                setBookMarkList(bookmarks);
                sortPostList(postList);
            }catch (err) {
                console.log(err)
            }
        })()
    },[orderBy, searchResult])

    const handleData = (examList:Array<Exam>):void =>{
        if(!!examList){
            setSearchResult(examList);
        }else{
            setSearchResult([]);
            console.log("該当する科目はありません");
        }
    }

    const sortPostList = (postList:Array<Exam>) => {
        setSortedPostList(postList.reverse());
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
                                <select className="mr-5 rounded-xl border border-gray-500 px-5" onChange={(e) => setOrderBy(parseInt(e.target.value))}>
                                    <option value={1}>降順</option>
                                    <option value={0}>昇順</option>
                                </select>
                        </div>
                        <div className="exam_filed">
                            {searchResult.length ? (searchResult.map((exam:any, i) =>
                                <ExamCard exam={exam} icon={<RenderIcon userid={exam.createUserid} url={exam.url} />} key={exam.id} canRemove={false} isbookmark={bookmarkList.includes(exam.id)}/>
                            )):
                            (sortedPostList.map((exam:any) => (
                                <ExamCard exam={exam} icon={<RenderIcon userid={exam.createUserid} url={exam.url} />} key={exam.id} canRemove={false} isbookmark={bookmarkList.includes(exam.id)}/>
                            )))}
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
        <div className="flex h-full w-full">
            <SideBar />
            {page}
        </div>
        // </UserGuard>
    )
}

export const getServerSideProps:GetServerSideProps = async() =>{
    try{
        const postList = await getPostListData();
        return {
            props:{getPostData:postList},
        }
    }catch(err){
        console.log(`Error: ${JSON.stringify(err)}`)
        return {
            redirect:{
                destination: '/home',
                permanent: false,
            }
        }
    }
}


export default Home;