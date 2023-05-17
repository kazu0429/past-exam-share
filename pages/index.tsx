import { Inter } from 'next/font/google'
import { GetServerSideProps } from 'next'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
        <div>
          <h1>Hello, World!</h1>
        </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      permanent: false, // 永続的なリダイレクトかどうか
      destination: '/signin', // リダイレクト先
    },
  }
}
