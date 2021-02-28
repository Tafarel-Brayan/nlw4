import { useContext } from 'react';
import { ChallegerContext } from '../contexts/ChallengeContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from './../styles/components/ChallengerBox.module.css';

export function ChallengerBox(){

    const { activeChallenge, resetChallenge, completedChallenge } = useContext(ChallegerContext);
    const { resetCountdown } =  useContext(CountdownContext)

    function handleChallengeSucceeded(){
        completedChallenge();
        resetCountdown();
    }

    function handleChallengeFailed(){
        resetChallenge();
        resetCountdown();
    }

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
                            <button 
                                type="button"
                                onClick={handleChallengeFailed}
                                className={styles.challengerFailBuntton}>
                                    Falhei
                            </button>
                           
                            <button
                                type="button"
                                onClick={ handleChallengeSucceeded }
                                className={styles.challengerSuccededButton}>
                                    Completei
                            </button>
                            
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