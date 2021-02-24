import { useEffect, useState } from 'react'
import { setTimeout } from 'timers';
import styles from './../styles/components/Countdown.module.css'

export default () => {

    const [active, setActive] = useState(false);
    const [time, setTime] = useState(25*60);
    const minutes = Math.floor(time / 60);
    const seconds = (time % 60);
    const [minLeft, minRight] = String(minutes).padStart(2, '0').split('');
    const [secLeft, secRight] = String(seconds).padStart(2, '0').split('');

    function startCountdown(){
        setActive(true);
    }

    useEffect(()=>{
        if(active && time > 0){
            setTimeout(() => {
                setTime(time - 1);
            }, 1000);
        }
    }, [active, time]);

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

            <button
                onClick={startCountdown}
                type="button"
                className={styles.countdownButton}
            >
                Iniciar um ciclo
            </button>
        </div>

    )
}

// jornadainfinita