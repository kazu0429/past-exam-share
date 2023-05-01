import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import Detail from './examDetail'
// import Data from pages/detail/detaDocument.json
import Data from './examDetail/detailDocuments.json'
const inter = Inter({ subsets: ['latin'] })
let booklink = "./pages/detail/detailDocuments.json"
const  data = Data

export default function Home() {
  return (
    <>
      <div>
        <h1>Hello, World!</h1>
        {/* <Link href="/examDetail">Go to detail page</Link>
         */}
          <Detail book={data} />
      </div>
    </>
  )
}
