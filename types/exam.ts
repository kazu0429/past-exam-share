import { Timestamp } from "firebase/firestore";

export type Exam = {
    id:string;
    titie:string;
    faculty:string;
    subjectName:string;
    discription?:string;
    fileType:string;
    images?:Array<string>;
    pdf?:string;
    postedAt:number;
    postedTimestamp:Timestamp;
    editedAt:number;
    editedTimestamp:Timestamp;
    createUserid:string;
    editableUserid:Array<string>;
}