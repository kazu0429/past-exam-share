import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Home from './home'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Component {...pageProps} />
  ) 
}
