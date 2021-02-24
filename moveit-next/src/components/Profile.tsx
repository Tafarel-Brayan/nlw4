import styles from './../styles/components/Profile.module.css'

export default () => {
    return(
        <div className={styles.profileContainer} >
            <img src="https://github.com/Tafarel-Brayan.png" alt="Tafarel-Brayan"/>
            <div>
                <strong>Tafarel Brayan</strong>
                <p>
                    <img src="icons/level.svg" alt="level"/>
                    Level 1
                </p>
            </div>
        </div>
    )
}