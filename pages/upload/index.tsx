import { useState, ReactElement } from "react";
import SideBar from "@/components/sideBar";

export const PostExam = () => {
    
    const faculty_list = ["共通教育","法文学部","教育学部","医学部医学科","医学部保健学科","理学部","歯学部","工学部","農学部","水産学部","獣医学部"];
    
    const [titel, setTitle] = useState<string>("");
    const [subjectName, setSubjectName] = useState<string>("");
    const [faculty, setFaclty] = useState<string>("共通教育");
    const [discription, setDiscription] = useState<string>("");
    const [fielType, setFileType] = useState<string>("pdf");
    const [images, setImages] = useState<Array<File>>([]);
    const [pdf, setPDF] = useState<File>();

    const UploadExam = () => {

    }

    const selectImages = () => {

    }

    const selectPDF = (event:React.ChangeEvent<HTMLInputElement>) => {
        if(event.currentTarget.files  === null) return;
        console.log(event.currentTarget.files)
    }

    return(
        <>
        <main className="h-screen flex-1 bg-indigo-50">
            <h1 className="m-5 p-2">新規投稿</h1>
            <form className="w-full" onSubmit={UploadExam}>
                <input type="text" placeholder="記事タイトル" className="m-5 text-xl  p-2 w-5/6  rounded-xl border border-gray-300" required onChange={(e) => setTitle(e.target.value)}/>
                <div className="flex">
                    <input placeholder="科目名" className="m-5 text-xl p-2 w-2/3 rounded-xl border border-gray-300" required onChange={(e) => setSubjectName(e.target.value)}/>
                    <select placeholder="学部" name="faculty" className="m-5 p-2 rounded-xl border border-gray-300" required onChange={(e) => setFaclty(e.target.value)}>
                            {faculty_list.map((option, i) => (
                                <option value={option} key={i}>{option}</option>
                            ))}
                    </select>
                </div>
                <textarea rows={5} placeholder="試験の傾向など" className="m-5 p-2 w-5/6 rounded-xl border border-gray-300"  onChange={(e) => setDiscription(e.target.value)}/>
                <div className="flex ml-5 gap-x-3">
                    <input id="image" value=".png, .jpeg" type="radio" name="post_type" onChange={(e) => setFileType(e.target.value)} />
                    <label htmlFor="image" className="mr-5">画像</label>
                    <input id="pdf" value=".pdf" type="radio" name="post_type" onChange={(e) => setFileType(e.target.value)} />
                    <label htmlFor="pdf"  className="mr-5" >PDF</label>
                    <input id="none" value="" type="radio" name="post_type" onChange={(e) => setFileType(e.target.value)}/>
                    <label htmlFor="none" className="mr-5">なし</label>
                    { fielType &&  <label>選択<input type="file" className="hidden" accept={fielType} onChange={fielType === ".pdf" ? selectPDF:selectImages}/></label>}
                    <p> - ファイル形式はpdfまたは画像ファイルのどちらかしか選べません</p>
                </div>
                <div className="m-5">
                    <button>投稿</button>
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