import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="id">
      <Head>
        <meta name="description" content="Temukan destinasi Jakarta terbaik sesuai mood, budget, dan kondisi kamu hari ini." />
        <meta property="og:title" content="Jakarta Destination Guide" />
        <meta property="og:description" content="Kuis interaktif rekomendasi destinasi Jakarta" />
        <meta name="theme-color" content="#E2491A" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
