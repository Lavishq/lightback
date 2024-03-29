import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useAuth } from "../lib/auth";

export default function Home() {
  const auth = useAuth();
  console.log(auth);

  return (
    <div className={styles.container}>
      <Head>
        <title>light back</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>lightback</h1>
        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>pages/index.js</code>
        </p>
        <button onClick={(e) => auth.signinWithGitHub()}>Sign In</button>
        <div>{auth?.user}</div>
        {auth?.user && (
          <button onClick={(e) => auth.signout()}>Sign Out</button>
        )}
      </main>

      <footer className={styles.footer}>
        <a
          href=""
          // target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
