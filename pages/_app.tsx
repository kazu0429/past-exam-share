import SideBar from '@/components/sideBar'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { NextPage } from 'next'
import { ReactElement, ReactNode } from 'react'
import "../styles/componets.css"
import { AuthProvider } from '@/context/AuthContext'
import UserGuard from '@/guards/userGuasd'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)
  return getLayout(
    <AuthProvider>
        <Component {...pageProps} />
    </AuthProvider>
  )
}
