import pdfjsWorkerSrc from '../pdf-worker';
import { Document, Page, pdfjs } from 'react-pdf';
import { useEffect, useState } from 'react';
import { FirebaseError } from "firebase/app";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from '@/firebase/firebase';

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorkerSrc;


export const pdfViewer = (props:{fileType:string, pdf:string, id:string}) => {


    const [numPages, setNumPages] = useState<number>(1);
    const [fileURL, setFileURL] = useState<string>("")
    const fileType = props.fileType;
    const pdf = props.pdf;
    const id = props.id;


    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
    };
    
    

    useEffect(() => {
        (async () => {
            try {
                const urlRef = ref(storage, `${process.env.NEXT_PUBLIC_FIREBASE_IMAGE_PATH}/contens/${id}/${pdf}`);
                const url = await getDownloadURL(urlRef);
                console.log(url);
                setFileURL(url);
            } catch (err) {
                if (!(err instanceof FirebaseError)) {
                    console.log(err)
                }
            }
        })()
    }, [])

    return (
        <>
            {fileURL &&
            // react-pdfを使用してpdf表示できるようにする
            // 言語設定や表示を柔軟に行えないため、ifream使用
            // <div style={{ border: 'solid 1px gray', width: "100%",}}>
            //     <Document file={fileURL} onLoadSuccess={onDocumentLoadSuccess}>
            //         <div >
            //             <Page pageNumber={numPages}/>
            //         </div>
            //     </Document>
            // </div>
                <iframe src={fileURL} className='h-full w-full sm:h-[50vh] xl:w-[60vh]'/>
            }
        </>
    )
}

export default pdfViewer;