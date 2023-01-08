import '~styles/globals.css'
import Head from 'next/head'
import { Inter } from '@next/font/google'
import { ConfigProvider } from 'antd'
import type { AppProps } from 'next/app'

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
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
      </ConfigProvider>
    </div>
  )
}
