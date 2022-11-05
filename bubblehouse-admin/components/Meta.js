import Head from 'next/head';
import { useRouter } from 'next/router';

const Meta = ( pageMeta ) => {
  const router = useRouter();

  const meta = {
    title: 'Bcloud',
    description: 'Bcloud.',
    type: 'website',
    ... pageMeta,
  };

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta property='og:url' content={`https://localhost:7777${router.asPath}`} />
        <meta property='og:url' content={`https://test.africanvo.com${router.asPath}`} />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Voice Over Marketplace" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
      </Head>
    </>
  )
}

export default Meta;
