import Image from 'next/image'
// import styles from '@/styles/Home.module.css'
import { Stint_Ultra_Condensed } from 'next/font/google'
export default function Detail(props:any) {

  const ptag = "font-normal text-gray-700 dark:text-gray-400 pb-7"
  const h3tag = "font-bold h3tag "
    return (
      // <style jsx>{`
      //   p {
      //       display: grid;
      //       place-items: center;
      //   },
      //   `}
      // </style> 
        <div className='container mt-20 ml-10'>
          <div className='text-center'>
            <Image
              className='flex  mx-auto mt-10'
              src={props.book.book_img_link}
              alt="Next.js Logo"
              width={150}
              height={150}
              // priority
            />
          
              <h1 className='font-bold text-blue-800 text-4xl pt-6 pb-2'>{props.book.book_title}</h1>
              <p className='font-normal text-gray-800 pb-8'>{props.book.book_author}</p>
           
          </div>
             

          <div>
            <h3 className={h3tag}>{props.book.headline1}</h3>
            <p className={ptag}>{props.book.content1}</p>
          </div>
          
          <div>
          <h3 className={h3tag}>{props.book.headline2}</h3>
            <p className={ptag}>{props.book.content2}</p>
          </div>


          <div>
            <h3 className={h3tag}>{props.book.detail_explanation_title}</h3>
            <p className={ptag}>{props.book.detail_explanation_content}</p>
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