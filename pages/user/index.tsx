import { ReactElement, useEffect, useRef, useState } from "react";
import SideBar from "@/components/sideBar";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import { User } from "@/types/user";
import ExamCard from "@/components/examCard";
import RenderIcon from "@/components/renderProfileIcon";
import { Exam } from "@/types/exam";
import { collection, where, query, getDocs, orderBy} from "firebase/firestore";
import { db } from "@/firebase/firebase";
import UserContentsModal from "@/components/userContentsModal";
import RemoveExamModal from "@/components/removeExamModal";

export const UserDisp = () => {
    
    const user = useAuth() as User;
    const ref = useRef(true);
    const [ myPostedExams, setMyPostedExams ] = useState<Array<Exam>>([]);
    const [ editModal, openEditModal ] = useState<boolean>(false);
    const [ removeExam, setRemoveExam ] = useState<Exam>();
    const [ removeModal, setRemoveModal] = useState<boolean>(false);

    useEffect(() => {
        if(ref.current){
            ref.current = false;
            return;
        }
        if(user === null) {
            return;
        }
        let result:any = [];
        (async () => {
            try{
                const examRef = collection(db, "exams");
                const q = query(examRef, where('editableUserid', "array-contains-any", [user.id]),orderBy('postedAt', 'desc'));
                const snapshot = await getDocs(q);
                snapshot.forEach((doc) => {
                    if(doc.exists()){
                        result.push(doc.data());
                    }
                })
                // console.log("exams",result);
            }catch(err){
                console.log(err);
            }
            setMyPostedExams(result);
        })()
    },[user])

    const openShowModal = (removeExam:Exam) => {
        setRemoveModal(true);
        setRemoveExam(removeExam);
    }

    return (
        <>
        {user !== null && 
            <div className="flex-1 bg-indigo-50">
                <div className="m-5">
                    <h1 className="my-3 text-xl">プロフィール</h1>
                    <div className=" my-3 flex">
                        <h3 className="text-lg font-bold">基本情報</h3>
                        <button className="button m-auto" onClick={() => openEditModal(true)}>編集</button>
                    </div>
                    <div className="flex flex-row gap-x-3">
                        <RenderIcon userid={user.id}/>
                        <div className="grid grid-cols-2 gap-4 rounded-md bg-indigo-100 p-3 md:w-1/2">
                            <span className="pr-4 text-gray-600">ユーザー名</span>{user.name}
                            <span className="pr-4 text-gray-600">E-Mail</span> {user.email}
                        </div>
                    </div>
                    <div className="mt-5">
                        <h2>過去の投稿一覧</h2>
                            <div className="exam_filed">
                                {myPostedExams.length ? myPostedExams.map((exam, i) => (
                                    <div className="relative" key={exam.id} >
                                        <ExamCard exam={exam} icon={<RenderIcon userid={exam.createUserid} />} canRemove={true} isbookmark={false} />
                                        <button className="absolute inset-y-0 right-1 my-4 flex pr-6" onClick={(e) => openShowModal(exam)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>
                                        </button>
                                    </div>
                                )) :
                                    <div className="m-20 flex flex-col items-center gap-y-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                        </svg>
                                        <p>投稿はありません</p>
                                    </div>
                                }
                            </div>
                    </div>
                </div>
                <UserContentsModal isModal={editModal} onClose={() => openEditModal(false)} user={user}/>
                <RemoveExamModal isModal={removeModal} onClose={() => setRemoveModal(false)} exam={removeExam as Exam}/>
            </div>
        }
        </>
    )
}

UserDisp.getLayout = function getLayout(page: ReactElement) {
    return (
        // <UserGuard>
            <div className="flex">
                <SideBar/>{page}
            </div>
        // </UserGuard>
    )
}

export default UserDisp
;