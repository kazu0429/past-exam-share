import { useState, ReactElement, FormEvent } from "react";
import SideBar from "@/components/sideBar";
import { useAuth } from "@/context/AuthContext";
import { Exam } from "@/types/exam";
import { User } from "@/types/user";
import { doc, addDoc, setDoc, updateDoc, collection, serverTimestamp, arrayUnion} from "firebase/firestore";
import { db, storage } from "@/firebase/firebase";
import { ref, uploadBytesResumable } from "firebase/storage";
import { MouseEvent } from "react";

export const PostExam = () => {

    const user = useAuth() as User;
    
    const faculty_list = ["共通教育","法文学部","教育学部","医学部医学科","医学部保健学科","理学部","歯学部","工学部","農学部","水産学部","獣医学部"];
    
    const [title, setTitle] = useState<string>("");
    const [subjectName, setSubjectName] = useState<string>("");
    const [faculty, setFaclty] = useState<string>("共通教育");
    const [discription, setDiscription] = useState<string>("");
    const [fielType, setFileType] = useState<string>("");
    const [images, setImages] = useState<Array<File>>([]);
    const [pdf, setPDF] = useState<File>();

    const [isCheck, setisCheck] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(false);

    const UploadExam = async(event:FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(!isCheck){
            alert("承諾を得てから投稿してくだいさい。");
            return;
        }
        const uploadContent: Exam = {
            title: title,
            faculty: faculty,
            subjectName: subjectName,
            discription: discription,
            fileType: fielType,
            images: images ? images?.map((elm) => (elm.name)):[""],
            pdf: pdf ? pdf.name: "",
            postedAt: Date.now(),
            postedTimestamp: serverTimestamp(),
            editedAt: Date.now(),
            editedTimestamp: serverTimestamp(),
            createUserid: user.id,
            editableUserid: [user.id],
        } 

        try{
            const addContentRef = collection(db, 'exams');
            const addContent = await addDoc(addContentRef, uploadContent); // firestoreに登録
            const examid = addContent.id;
            if(fielType === '.pdf'){
                {pdf && uploadToStorage(pdf, examid);}
            }else{
                images.forEach((elm) => {
                    {elm && uploadToStorage(elm, examid);}
                })
            }
            addUserPostedExam(examid);
            const examRef =  doc(db, 'exams', examid);
            await setDoc(examRef, {eid:examid}, { merge: true })
            alert("アップロード完了！")
        }catch(err){
            console.log(err);
        }
    }

    const uploadToStorage = (elm:File, eid:string) => {
        const storageref = ref(storage, `contens/${eid}/${elm.name}`);
        const uploadFile = uploadBytesResumable(storageref, elm, {contentType:elm.type});
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

    const addUserPostedExam = async (examId:string) => {
        const userRef = doc(db, "users", user.id);
        try{
            await updateDoc(userRef, {
                postedExams: arrayUnion(examId)
            })
        }catch(err){
            console.log(err);
        }
    }

    const selectImages = (event:React.ChangeEvent<HTMLInputElement>) => {
        if(event.currentTarget.files  === null) return;
        if(images.length < 4){
            const imageFile = event.currentTarget.files[0];
            console.log(imageFile);
            setImages([...images, imageFile]);
        }else{
            alert("画像は最大4枚まで登録できます");
        }
    }


    const selectPDF = (event:React.ChangeEvent<HTMLInputElement>) => {
        if(event.currentTarget.files  === null) return;
        console.log(event.currentTarget.files[0])
        setPDF(event.currentTarget.files[0]);
    }

    const removefromSelectImages = (e:MouseEvent<HTMLButtonElement>, title:string) =>{
        e.preventDefault();
        const tmpImageArray = images.filter((url) => {
            return url.name != title
        })
        setImages(tmpImageArray);
    }

    return(
        <>
        <main className="flex-1 bg-indigo-50">
            <h1 className="m-5 p-2 text-xl">新規投稿</h1>
            <form className="w-full" onSubmit={UploadExam}>
                <input type="text" placeholder="記事タイトル" className="m-5 text-xl  p-2 w-5/6  rounded-xl border border-gray-300" onChange={(e) => setTitle(e.target.value)} required/>
                <div className="flex">
                    <input placeholder="科目名" className="m-5 text-xl p-2 w-2/3 rounded-xl border border-gray-300" onChange={(e) => setSubjectName(e.target.value)} required/>
                    <select placeholder="学部" name="faculty" className="m-5 p-2 rounded-xl border border-gray-300" required onChange={(e) => setFaclty(e.target.value)}>
                            {faculty_list.map((option, i) => (
                                <option value={option} key={i}>{option}</option>
                            ))}
                    </select>
                </div>
                <textarea rows={5} placeholder="試験の傾向など" className="m-5 p-2 w-5/6 rounded-xl border border-gray-300"  onChange={(e) => setDiscription(e.target.value)}/>
                <div className="items-center flex ml-5 gap-x-3 flex-wrap">
                    <input id="image" value=".png, .jpeg" type="radio" name="post_type" onChange={(e) => setFileType(e.target.value)} />
                    <label htmlFor="image" className="mr-5">画像</label>
                    <input id="pdf" value=".pdf" type="radio" name="post_type" onChange={(e) => setFileType(e.target.value)} />
                    <label htmlFor="pdf"  className="mr-5" >PDF</label>
                    <input id="none" value="" type="radio" name="post_type" onChange={(e) => setFileType(e.target.value)}/>
                    <label htmlFor="none" className="mr-5">なし</label>
                    { fielType &&  <label className="button">選択<input type="file" className="hidden" accept={fielType}  onChange={fielType === ".pdf" ? selectPDF:selectImages} required/></label>}
                    <p> - ファイル形式はpdfまたは画像ファイルのどちらかしか選べません</p>
                </div>
                <div className="m-5">
                    {fielType === ".pdf" ? 
                        <p>{pdf?.name}</p>:images.map((image, i) => (
                            <p key={i} className="items-center flex ml-5 gap-x-3 ">{image.name}
                                <button className="mx-2" onClick={(e) => removefromSelectImages(e, image.name)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </button>
                            </p>
                        ))
                    }
                </div>
                <div className="m-5 flex gap-x-4">
                    <input type="checkbox" name="check" onChange={() => setisCheck(!isCheck)}/>
                    <span >上記の投稿内容は著作権的に了承を得ていますか？</span>
                </div>
                <div className="m-5">
                    <button className="button">投稿</button>
                </div>
            </form>
        </main>
        </>
    )
}

PostExam.getLayout = function getLayout(page: ReactElement) {
    return (
        <div className="flex">
        <SideBar/>{page}
        </div>
    )
}

export default PostExam;