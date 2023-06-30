import { Exam } from "@/types/exam";
import { db, storage } from "@/firebase/firebase";
import { doc, deleteDoc, updateDoc, arrayRemove } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import { ref, listAll, deleteObject } from "firebase/storage";

type Props = {
    isModal:boolean,
    onClose:()=>void,
    exam:Exam
}

const RemoveExamModal = ({isModal, onClose ,exam}:Props) => {


    if(!isModal) return null;

    const user = useAuth();

    const removeExamfromfirebase = async() => {
        const eid = exam.id as string;
        try{
            const docRef = doc(db, 'exams', eid);
            await deleteDoc(docRef);
            alert("削除完了");
            removePostExamfromUser();
            removeImagefromStorage();
            onClose();
        }catch(err){
            console.log(err);
        }
    }

    // storageからも削除
    const removeImagefromStorage = () => {
        const storageRef = ref(storage, `contens/${exam.id}`);
        listAll(storageRef).then((ref) => {
            ref.items.forEach((itemRef) => {
                deleteObject(itemRef).then(()=>{
                    console.log("削除完了");
                }).catch((err) => {
                    console.log(err);
                })
            })
        })
    }

    const removePostExamfromUser = async() => {
        const uid = user?.id as string;
        try{
            const userRef = doc(db, 'users', uid);
            await updateDoc(userRef,{
                postedExams:arrayRemove(exam.id)
            })
        }catch(err){
            console.log(err);
        }
    }

    return (
        <>
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-600/25 px-4">
            <div className="relative w-1/2 p-4  md:h-auto">
                <div className="relative rounded-lg bg-indigo-100 p-6 shadow ">
                    <p className="rounded-lg border border-gray-500 bg-white p-2"><span className="text-xl font-bold text-gray-800"> {exam.title} </span>を本当に削除しますか？</p>
                    <div className="mt-4 flex flex-row justify-between">
                            <button type="submit" className="button" onClick={removeExamfromfirebase}>削除</button>
                            <button className="button" onClick={onClose}>閉じる</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default RemoveExamModal;