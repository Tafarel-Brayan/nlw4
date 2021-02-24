import { useContext } from 'react';
import { ChallegerContext } from '../contexts/ChallengeContext';
import styles from './../styles/components/CompletedChallengers.module.css';

export function CompletedChallengers(){

    const { challengesCompleted } = useContext(ChallegerContext)

    return(
        <div className={styles.completedChallengersContainer} >
            <span>Desafios Completos</span>
            <span> { String(challengesCompleted).padStart(2, '0') } </span>
        </div>
    )
}