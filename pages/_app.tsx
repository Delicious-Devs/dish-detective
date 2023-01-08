import '~styles/globals.css'
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
        <Component {...pageProps} />
      </ConfigProvider>
    </div>
  )
}
