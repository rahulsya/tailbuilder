import '@/styles/globals.css';
import type { AppProps } from 'next/app';

import Layout from '@/components/Layout';
import { inter } from '@/utils/fonts';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${inter.variable} font-sans bg-white min-h-screen`}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </main>
  );
}
