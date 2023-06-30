import { FieldValue  } from "firebase/firestore";

export type Exam = {
    id?:string;
    title:string;
    faculty:string;
    subjectName:string;
    discription?:string;
    fileType:string;
    images?:Array<string>;
    pdf?:string;
    postedAt:number;
    postedTimestamp:FieldValue;
    editedAt:number;
    editedTimestamp:FieldValue;
    createUserid:string;
    editableUserid:Array<string>;
    url?:string;
    booknum:number;
}