import { GetServerSideProps } from "next";
import {useState} from "react";
import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";

import styles from "../styles/pages/Home.module.css";

import { ChallengeBox } from "../components/ChallengeBox";

import Head from "next/head";
import { CountdownProvider } from "../contexts/CountdownContext";
import { ChallengesProvider } from "../contexts/ChallengesContext";
 
interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Home(props: HomeProps) {
  const [dark, setDark] = useState(false);

  function darkMode() {
    const html = document.querySelector('html');
    
    html.classList.toggle('dark-mode');

    if (dark) {
      setDark(false);
    } else {
      setDark(true);
    }
  }

  return (
    <ChallengesProvider 
    level={props.level}
    currentExperience={props.currentExperience}
    challengesCompleted={props.challengesCompleted}
    >

        <div className={styles.header}>
          <img src="logo-full.svg" alt=""/>
          <button type="button" id="switch" className={styles.darkMode} onClick={darkMode}
          > 
            {dark ? <img src="light.png" className={styles.headerImg}/> : <img src="/dark.png" className={styles.headerImg}/> }
          </button>
        </div>

      <div className={styles.container}>
        <Head>
          <title>Início | Move.it</title>
        </Head>

        <ExperienceBar />
        

      <CountdownProvider>
        <section>
            <div >
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>

            <div>
              <ChallengeBox />
            </div>
        </section>
      </CountdownProvider>
        
      </div>
    </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async(ctx) => {
  const {level, currentExperience, challengesCompleted} = ctx.req.cookies

  return{
    props: {
      level: Number(level ?? 1),
      currentExperience: Number(currentExperience ?? 0),
      challengesCompleted: Number(challengesCompleted ?? 0),
    }
  }
} 