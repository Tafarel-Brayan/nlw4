import { useContext } from 'react';
import { ChallegerContext } from '../contexts/ChallengeContext';
import styles from './../styles/components/ChallengerBox.module.css';

export function ChallengerBox(){
    const { activeChallenge, resetChallenge } = useContext(ChallegerContext);

    return(
        <div className={styles.challengerBoxContainer}>

            {
                activeChallenge ? 
                (
                    <div className={styles.challengerActive} >
                        <header>Ganhe {activeChallenge.amount} xp</header>
                        <main>
                            <img src={ `icons/${activeChallenge.type}.svg` } alt="body"/>
                            <strong>Novo Desafio</strong>
                            <p>{activeChallenge.description}</p>
                        </main>

                        <footer>
                            <button type="button" onClick={resetChallenge}  className={styles.challengerFailBuntton}>Falhei</button>
                            <button type="button" className={styles.challengerSuccededButton}>Completei</button>
                        </footer>

                    </div>
                )
                :
                (
                    <div className={styles.challengerNotActive}>
                        <strong>Finalize um ciclo para receber um desafio</strong>
                        <p>
                            <img src="icons/level-up.svg" alt="level-up"/>
                            Avance de level completando desafios
                        </p>
                    </div>
                )
            }

            
        </div>
    )
}