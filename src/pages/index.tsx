import { GetServerSideProps } from "next";
import {useEffect, useState} from "react";
import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import Cookies from "js-cookie";

import styles from "../styles/pages/Home.module.css";

import { ChallengeBox } from "../components/ChallengeBox";

import Head from "next/head";
import { CountdownProvider } from "../contexts/CountdownContext";
import { ChallengesProvider } from "../contexts/ChallengesContext";
 
interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  darkTheme: boolean;
}

export default function Home(props: HomeProps) {
  const [darkTheme, setDark] = useState(props.darkTheme);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    Cookies.set("darkTheme", String(darkTheme));

    const html = window.document.querySelector("html");

    if (darkTheme === true && counter === 0 ) {
        html.classList.toggle('dark-mode');
        setDark(true)
        setCounter(1);
      } else if (darkTheme === false && counter === 0){
        setDark(false);
        setCounter(1);
      }
  }, [darkTheme])

  function darkMode() {
    const html = document.querySelector("html");

    if (darkTheme) {
      html.classList.toggle('dark-mode');
      setDark(false);
    } else{
      html.classList.toggle('dark-mode');
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
            {darkTheme ? <img src="light.png" className={styles.headerImg}/> : <img src="/dark.png" className={styles.headerImg}/> }
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
  const {level, currentExperience, challengesCompleted, darkTheme } = ctx.req.cookies
  
  return{
    props: {
      level: Number(level ?? 1),
      currentExperience: Number(currentExperience ?? 0),
      challengesCompleted: Number(challengesCompleted ?? 0),
      darkTheme: Boolean(darkTheme ?? false)

    }
  }
} 