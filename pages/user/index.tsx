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

export const UserDisp = () => {
    
    const user = useAuth() as User;
    const ref = useRef(true);
    const [ myPostedExams, setMyPostedExams ] = useState<Array<Exam>>([]);
    const [ editModal, openEditModal ] = useState<boolean>(false);

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
                console.log("exams",result);
            }catch(err){
                console.log(err);
            }
            setMyPostedExams(result);
        })()
    },[])

    return (
        <>
        {user !== null && 
            <div className="flex-1 bg-indigo-50">
                <div className="m-5">
                    <h1 className="my-3 text-xl">プロフィール</h1>
                    <div className="md:w-1/2 my-3 flex">
                        <h3 className="text-lg font-bold">基本情報</h3>
                        <button className="right-0 m-auto button" onClick={() => openEditModal(true)}>編集</button>
                    </div>
                    <div className="md:w-1/2 grid grid-cols-2 gap-4 p-3 bg-indigo-100 rounded-md">
                        <span className="text-gray-600 pr-4">ユーザー名</span>{user.name}
                        <span className="text-gray-600 pr-4">E-Mail</span> {user.email}
                    </div>
                    <div className="mt-5">
                        <h2>過去の投稿</h2>
                        <div className="exam_filed">
                        {myPostedExams.map((exam, i) => (
                            <ExamCard exam={exam} icon={<RenderIcon userId={exam.createUserid} />} key={i} />
                        ))}
                        </div>
                    </div>
                </div>
                <UserContentsModal isModal={editModal} onClose={() => openEditModal(false)} user={user}/>
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