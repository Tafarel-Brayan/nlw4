import { useContext, useEffect, useState } from 'react'
import { ChallegerContext } from '../contexts/ChallengeContext';
import styles from './../styles/components/Countdown.module.css'

let countdownTimeout: NodeJS.Timeout;

export function Countdown() {

    const { startNewChallenge } = useContext(ChallegerContext)

    const initialTime = 0.1*60;
    const [time, setTime] = useState(initialTime);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = (time % 60);
    const [minLeft, minRight] = String(minutes).padStart(2, '0').split('');
    const [secLeft, secRight] = String(seconds).padStart(2, '0').split('');

    function startCountdown(){
        setIsActive(true);
    }

    function resetCountdown(){
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setTime(initialTime)
    }

    useEffect(()=>{
        if(isActive && time > 0){
            countdownTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000);
        }else if(isActive && time === 0){
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [isActive, time]);

    return(
        <div>
            <div className={styles.countdowContainer} >
                <div>
                    <span>{ minLeft }</span>
                    <span>{ minRight }</span>
                </div>
                <span>:</span>
                <div>
                    <span>{ secLeft }</span>
                    <span>{ secRight }</span>
                </div>

            </div>

            { 
                hasFinished ? (
                    <button disabled className={styles.countdownButton}>
                        Ciclo encerrado
                    </button>
                ) : (
                    <>
                        {
                            isActive ? (
                                <button onClick={resetCountdown} type="button" className={`${styles.countdownButton} ${styles.countdownButtonActive}`} >
                                    Abandonar ciclo
                                </button>) 
                            : (
                                <button onClick={startCountdown} type="button" className={styles.countdownButton} >
                                    Iniciar um ciclo
                                </button>
                            )
                        }
                    </>
                )
            }
        </div>

    )
}

// jornadainfinita