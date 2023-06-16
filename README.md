## Kadai shushu
鹿児島大学に在学する学生限定の授業情報共有サイトです。<br>
現在履修している科目や履修していた科目についての情報を共有できます。<br>
履修登録や講義期間の悩みを少しでも解決したいと思い、開発に至りました。<br>

Webブラウザからの使用を想定しています。下に幾つかの画面ページにイメージを載せます。
|画面ページ|画面イメージ|
|:-:|:-:|
|サインアップ|<img width="662" alt="image" src="https://github.com/kazu0429/past-exam-share/assets/75778286/619417f4-a59d-44a8-b499-a7423004a485">|
|ホーム|<img width="1260" alt="image" src="https://github.com/kazu0429/past-exam-share/assets/75778286/4ba8a3ef-0b1f-44d5-9df3-2cfd7162e49e">|
|マイページ|<img width="1125" alt="image" src="https://github.com/kazu0429/past-exam-share/assets/75778286/cfc84b5d-29ff-4766-aced-3d7455fee8d7">|



## URL
まだデプロイはしていません。

## 使用技術
- Firebase
  - Authentication
  - Hosting
  - Cloud Firestore
  - Storage
- Next.js 13.3.0
- React.js 18.2.0
- TypeScript
- Tailwind
- Github Actions（デプロイ後に実装予定）

## 機能一覧
- サインアップ機能、サインイン機能（by email and pw）
- プロフィール情報変更
- 投稿機能
  - 授業情報記載
  - 画像orPDF投稿
- ブックマーク機能
-  過去の自分の投稿閲覧
  - 自分の投稿削除
- 科目名検索
