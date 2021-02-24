import Head from 'next/head';

import { CompletedChallengers } from "../components/CompletedChallengers";
import { ChallengerBox }        from "../components/ChallengerBox";
import { Countdown }            from "../components/Countdown";
import Profile                  from "../components/Profile";

import { ExperienceBar } from "./../components/ExperienceBar";
import styles from './../styles/pages/Home.module.css';


export default function Home() {
  return (
    <div className={styles.container} >
      <Head>
        <title>Início | move.it</title>
      </Head>
      <ExperienceBar />

      <section>
        <div>
          <Profile />
          <CompletedChallengers />
          <Countdown />
        </div>
        <div>
          <ChallengerBox />
        </div>
      </section>

    </div>
  )
}