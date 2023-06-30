import { ReactElement, useEffect, useState } from "react";
import SideBar from "@/components/sideBar";
import { db, storage } from "@/firebase/firebase";
import { doc, updateDoc, arrayRemove, arrayUnion, getDoc } from "firebase/firestore";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { GetFileData, GetPostData, GetPostUserIcon } from "../../utils/getPostData";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/splide/css'; 
import { useAuth } from "@/context/AuthContext";
import { User } from "@/types/user";
import dynamic from "next/dynamic";
import { MouseEvent } from "react";
import { getDownloadURL, listAll, ref } from "firebase/storage";



export const Details = ({postData}:InferGetServerSidePropsType<typeof getServerSideProps>) =>{

    const {
        id,
        title,
        subjectName,
        discription,
        faculty,
        fileType,
        postedAt,
        pdf,
        images,
        booknum,
    } = postData.data;

    const icon = postData.icon;
    const urls = postData.urls;
    const user = useAuth() as User;

    const PDFViewer = dynamic(() => import("../../components/pdfViewer"), {
        ssr: false
    });
    
    const [ bookmark, setBookmark ] = useState<boolean>(false);

    useEffect(() => {
        (async() => {
            try{
                if(user){
                    const bookRef = doc(db, "users", user.id);
                    const snapshot = await getDoc(bookRef);
                    const bookmarks = snapshot.get("bookmarks");
                    if(bookmarks.includes(id)){
                        setBookmark(true);
                    }
                }
            }catch(err){
                console.log(err);
            }
        })()
    },[])


    const updateBookmarkOfUser = async() => {
        const userRef = doc(db, "users", user.id);
        const postRef = doc(db, "exams", id);
        try{
            if(bookmark){
                await updateDoc(userRef, {
                    bookmarks: arrayRemove(id)
                })
                await updateDoc(postRef,{
                    booknum:booknum-1
                })
                setBookmark(false);
                alert("ブックマークから削除しました。");
            }else{
                await updateDoc(userRef, {
                    bookmarks: arrayUnion(id)
                })
                await updateDoc(postRef,{
                    booknum:booknum+1
                })
                setBookmark(true);
                alert("ブックマークに追加しました。");
            }
        }catch(err){
            console.log(err);
        }
    }

    const downloadFile = async(e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try{
            const downloadRef = ref(storage, `contens/${id}`);
            const documentList = await listAll(downloadRef);
            documentList.items.forEach((fileRef) => {
                getDownloadURL(fileRef).then((url) => {
                    const xhr = new XMLHttpRequest();
                    xhr.responseType = 'blob';
                    xhr.onload = (event) => {
                        const blob = xhr.response;
                        const blobUrl = URL.createObjectURL(blob)
                        const link = document.createElement('a')
                        link.href = blobUrl
                        link.download = fileRef.name
                        link.click()
                        console.log(blob)
                    };
                    xhr.open('GET', url);
                    xhr.send();
                })
            })
        }catch(err){
            console.log(err)
        }
        

    }

    return (
        <>
            <article className="flex-1 bg-indigo-50">
                <div className="m-4 flex flex-col gap-y-4 pl-4">
                    <div className="flex flex-row ">
                        <div className="ml-6 w-[150px] flex-wrap border border-gray-400">
                            <img src={icon} className="ms:w-[100px] w-[150px]" />
                        </div>
                    </div>
                    <div className="ml-6">
                        詳細画面
                    </div>
                    <div className={`flex flex-col justify-around gap-4 sm:flex-col md:flex-row`}>
                        <div className="flex flex-col gap-y-6 rounded-lg border border-indigo-800 bg-indigo-100 p-3 sm:w-full md:w-2/5">
                            <div className="flex flex-row gap-x-4">
                            <div className="w-full rounded-xl border border-gray-500 bg-white p-2 text-xl ">
                                {title}
                            </div>
                                <div className="group relative m-auto ">
                                    <span className="tooltip right-0 whitespace-nowrap before:left-3/4">投稿を保存</span>
                                    <button onClick={updateBookmarkOfUser}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`h-6 w-6 hover:stroke-2 ${bookmark && "fill-indigo-500"}`}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className="flex-row gap-x-4 text-lg">
                                <p>{faculty}</p>
                                <p>{subjectName}</p>
                            </div>
                            <div className="h-2/3 whitespace-pre-wrap break-words rounded border border-gray-500 bg-white p-2">
                                {discription}
                            </div>
                            
                            <div className="flex flex-row items-center justify-between">
                                <div>
                                    投稿日 : {(new Date(postedAt)).toLocaleString()}
                                </div>
                                <div>
                                    <div className="group relative">
                                        <span className="tooltip">資料を保存</span>
                                        <button className="button" onClick={(e) => downloadFile(e)}>
                                            ダウンロード
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        { fileType === ".pdf" ? (
                            <div>
                                <PDFViewer fileType={fileType} pdf={pdf} id={id}/>
                            </div>
                        ):(
                            <div className="rounded-xl border border-indigo-800 bg-indigo-100 py-3">
                            <Splide
                                aria-label="投稿画像一覧"
                                options={{
                                    mediaQuery:'max',
                                    rewind:true,
                                    perPage:1,
                                    padding: "5rem",
                                    width:"85vh",
                                    gap:"1rem",
                                    breakpoints: {
                                        768: {
                                            padding: "5rem",
                                            direction: 'ttb', // 画面幅が768px以上の場合、縦スライドに切り替える
                                            height:"50%",
                                        }
                                    }
                                }}
                            >
                                {urls.map((url: string, i:number) => (
                                        <SplideSlide key={i} className="inline">
                                            <img className="block h-full w-full object-cover" src={url}/>
                                        </SplideSlide>
                                ))}
                            </Splide>
                        </div>
                        )
                        }
                    </div>
                </div>
            </article>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    const query = context.query;
    const eid = query.id as string;
    
    try{
        const postData = await GetPostData(eid);
        const postUserId = postData.createUserid;
        const iconURL = await GetPostUserIcon(postUserId);
        const fileURL = await GetFileData(eid);

        return {
            props: { postData :{data:postData, icon:iconURL, urls:fileURL}}
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
        <div className="flex h-full w-full">
            <SideBar />
            {page}
        </div>
    )
}

export default Details