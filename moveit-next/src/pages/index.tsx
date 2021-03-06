import Head from 'next/head';
import { GetServerSideProps } from 'next'

import { ChallengerProvider }   from '../contexts/ChallengeContext';
import { CompletedChallengers } from "../components/CompletedChallengers";
import { ChallengerBox }        from "../components/ChallengerBox";
import { CountdownProvider }    from '../contexts/CountdownContext';
import { Countdown }            from "../components/Countdown";
import Profile                  from "../components/Profile";

import { ExperienceBar } from "./../components/ExperienceBar";
import styles from './../styles/pages/Home.module.css';

interface HomeProps{
  level:number,
  currentExperience:number,
  challengesCompleted:number
}
export default function Home(props:HomeProps) {
  return (

    <ChallengerProvider
     level={props.level}
     currentExperience={props.currentExperience}
     challengesCompleted={props.challengesCompleted}>
      
      <div className={styles.container} >

        <Head>
          <title>Início | move.it</title>
        </Head>

        <ExperienceBar />

        <CountdownProvider>
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
        </CountdownProvider>

      </div>
    </ChallengerProvider>
  )
}

export const getServerSideProps:GetServerSideProps = async (ctx) => {

  const { level, currentExperience, challengesCompleted } = ctx.req.cookies

  return { 
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted)
    }
   }

}