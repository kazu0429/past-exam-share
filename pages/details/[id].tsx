import { ReactElement } from "react";
import SideBar from "@/components/sideBar";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { Exam } from "@/types/exam";


export const Details = ({exam}:InferGetServerSidePropsType<typeof getServerSideProps>) =>{

    const {
        id
    } = JSON.parse(exam);

    return (
        <>
        <article className="flex-1 bg-indigo-50">
        {id}
            詳細画面
        </article>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    const query = context.query;
    const id = query.id as string;
    
    try{
        const docRef = doc(db, 'exams', id);
        const snapshot = await getDoc(docRef);
        const exam = JSON.stringify(snapshot.data());
        return {
            props: { exam }
        };
    }catch (err){
        console.log(`Error: ${JSON.stringify(err)}`)
        return {
            redirect: {
                    destination: '/home',
                    permanent: false,
            },
        }
    }
}

Details.getLayout = function getLayout(page: ReactElement) {
    return (
        // userGuard : 未認証ユーザーのリダイレクトを防ぐ
        // <UserGuard>
        <div className="flex w-full h-full fixed">
            <SideBar />
            {page}
        </div>
        // </UserGuard>
    )
}

export default Details