import { useContext } from 'react';
import { ChallegerContext } from '../contexts/ChallengeContext';
import styles from './../styles/components/ExperienceBar.module.css';

export function ExperienceBar(){

    const { currentExperience, experienceNextLevel }  = useContext(ChallegerContext);
    const percentToNextLevel = Math.round(currentExperience * 100) / experienceNextLevel;

    return(
        <header className={styles.experienceBar} >
            <span>0 xp</span>
            <div>
                <div style={{ width: `${percentToNextLevel}%` }}  />
                <span className={styles.currentExperience} style={{ left: `${percentToNextLevel}%` }}  >{currentExperience} xp</span>
            </div>
            <span>{experienceNextLevel} xp</span>
        </header>
    )
}