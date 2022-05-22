import { FC } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const Page404: FC = ({}) => {
  return (
    <>
      <Head>
        <title>People of Star Wars | 404</title>
        <meta name="robots" content="noindex" />
      </Head>
      <div>
        You are outside of the galaxy, <Link href='/'>go back!</Link>
      </div>
    </>
  );
};

export default Page404;
