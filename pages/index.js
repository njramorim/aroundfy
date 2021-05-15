import Head from "next/head";
import { signOut, useSession, getSession, providers } from "next-auth/client";
import { getCurrentTrack } from "../services/api";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [session, loading] = useSession();

  return (
    <div className={styles.container}>
      <Head>
        <title>aroundfy</title>
        <meta name="description" content="" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <main className={styles.main}>
        {session && (
          <>
            Signed in as {session.user.email} <br />
            <button onClick={getCurrentTrack}>musica</button>
            <button onClick={signOut}>Sign out</button>
          </>
        )}
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { req, res } = context;
  const session = await getSession({ req });

  if (!session) {
    res.writeHead(302, {
      Location: "/signin",
    });
    res.end();
  }

  return {
    props: {
      session,
      providers: await providers(context),
    },
  };
}
