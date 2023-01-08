import '~styles/globals.css'
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import { ConfigProvider } from 'antd'
import type { AppProps } from 'next/app'
import AppLogo from '~assets/app-logo.png'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={inter.className}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#f59e0b',
          },
        }}
      >
        <Head>
          <meta name="description" content="Find your next meal with ease." />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="og:image" content="/banner.png" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <header className="appHeader">
          <Image
            src={AppLogo}
            fill
            alt="Delicious Devs"
            style={{ objectFit: 'contain' }}
          />
        </header>
        <div id="appContainer">
          <Component {...pageProps} />
        </div>
      </ConfigProvider>
    </div>
  )
}
