import Image from 'next/image'

export default function Detail(props:any) {

    return (
        <div>
             <Image
            // className={styles.logo}
            src={props.book.book_img_link}
            alt="Next.js Logo"
            width={150}
            height={150}
            priority
          />
          <div >
            <h2>{props.book.book_title}</h2>
            <p>{props.book.author}</p>
          </div>

          <div>
            <h3>{props.book.headline1}</h3>
            <p>{props.book.content1}</p>
          </div>
          
          <div>
          <h3>{props.book.headline2}</h3>
            <p>{props.book.content2}</p>
          </div>


          <div>
            <h3>{props.book.detail_explanation_title}</h3>
            <p>{props.detail_explanation_content}</p>
          </div>

        </div>
    )
}


// 以下のようなフォーマットでデータを受け取る予定
// {
    
//   "book_img_link" : "https://lh3.googleusercontent.com/8v_oGMOj9bgohn50…fwAmDy1W_Y4oTtIacT2dhQzAqOy5H9Vg23Rq1oVnhUGtOynjY",
//   "book_title": "UX Desiner, GooglePay",
//   "book_author" : "Google Inc., Shanghai China", 
//   "headline1" : "Minimum qulifications.",
//   "content1" : "Bachelor's degree in Design, related field, or equvalent practical experience.",
//   "headline2" : "Prefferd qualifications.",
//   "content2" : "Strong collaboration and presentation skills.",
//   "detail_explanation_title" : "About the job",
//   "detail_explanation_content" : "At Google, we follow a simple but vital premise: Focus on th user and all ..."
  
// }