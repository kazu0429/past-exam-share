import { FieldValue  } from "firebase/firestore";

export type User = {
    id:string;
    name:string;
    email:string;
    photoURL:string;
    createdAt:number;
    createdTimestamp:FieldValue;
    updatedAt:number;
    updatedTimestamp:FieldValue;
    postExams:Array<string>;
    bookmark:Array<string>;
}