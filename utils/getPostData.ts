import admin from "@/firebase/nodeApp";
import axios from "axios";


export const GetPostData = async(id:string) => {

    try{
        const db = admin.firestore();
        const postCollection = db.collection('exams');
        const postDoc = await postCollection.doc(id).get();

        if (!postDoc.exists) {
            return null;
        }
    // console.log(postDoc.data());
      // 取得したデータを返す
    return JSON.parse(JSON.stringify(postDoc.data()));
    }catch(err){
        return null;
    }
    
}

export const GetPostUserIcon = async(id:string) => {

    try{
        const bucket = admin.storage().bucket();
        const file = bucket.file(`profileicons/${id}/icon.png`);
        const [url] = await file.getSignedUrl({
            action: 'read',
            expires: Date.now() + 60 * 60 * 1000 // 有効期限を設定（1時間）
        });
        if(!url){
            return null;
        }
        const response = await axios.head(url);
        if (response.status !== 200) {
            // アクセスできない場合の処理
            console.log('URL is not accessible:', url);
            return null;
        }
        return JSON.parse(JSON.stringify(url));
    }catch(err){
        console.log(err);
        return null;
    }
    
}

export const GetFileData = async (id:string) => {
    try{
        const bucket = admin.storage().bucket();
        const [files] = await bucket.getFiles({prefix:`contens/${id}/`});
        let urls = [];
        for(var i  = 0; i<files.length;i++){
            urls.push(await files[i].getSignedUrl({
                action: 'read',
                expires: Date.now() + 60 * 60 * 1000 // 有効期限を設定（1時間）
            }))
        }
        if(!urls){
            return null;
        }
        return JSON.parse(JSON.stringify(urls.map((url) => url[0])));
    }catch(err){
        console.log(err);
        return null;
    }
}

export const getPostListData = async() => {

    try{
        const db = admin.firestore();
        const postCollection = db.collection('exams').orderBy("postedAt", "desc");
        const snapshot = await postCollection.get();
        const result = await Promise.all(snapshot.docs.map(async(doc) => {
            return {
                url:await GetPostUserIcon(doc.data().createUserid),
                ...doc.data()
            }
        }))
        return JSON.parse(JSON.stringify(result));
    }catch(err){
        console.log(err)
        return null;
    }
}



