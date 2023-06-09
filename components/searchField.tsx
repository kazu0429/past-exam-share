import { db } from "@/firebase/firebase";
import { Exam } from "@/types/exam";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";
import { FormEvent } from "react";


interface Props{
    onData:(exmas:Array<Exam>) => void,
}

export const SearchField = ({onData}:Props) => {

    const [searchWord, setSearchWord] = useState<string>("");

    const searchDocument = async(value:string, event:FormEvent<HTMLElement>)=> {
        event.preventDefault();
        console.log(value);
        if(!!value){
            let result:any = [];
            try{
                const documentRef = collection(db, "exams");
                const p = query(documentRef, where('subjectName', "==", value));
                const snapshot = await getDocs(p);
                snapshot.forEach((doc) => {
                        result.push({ id: doc.id, ...doc.data() });
                })
                onData(result);
                if (!result.length){
                    alert("該当する科目は見つかりませんでした。");
                    onData([]);
                }
                return;
            }catch(err){
                console.log(err);
            }
        }
        onData([]);
    }

    return (
        <form onSubmit={(e) => searchDocument(searchWord, e)}>
            <div className="relative mx-5 my-10">
                <input className="z-20 block w-full rounded-2xl p-3 text-left" placeholder="Search subjectname..." onChange={(e) => setSearchWord(e.target.value)}/>
                <button type="submit" className="absolute right-0 top-0 rounded-r-2xl border border-indigo-500 bg-indigo-500 p-3 pl-4 text-white hover:bg-indigo-800 ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 26 26" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </button>
            </div>
        </form>
    )
}

export default SearchField;