import {createContext, ReactNode, useEffect, useState} from 'react';
import Cookies from 'js-cookie';

import challenges from './../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

interface Challengeinterface{
    type: 'body' | 'eye',
    description: string,
    amount: number
}

interface ChallengesContextData {
    level:               number;
    currentExperience:   number;
    challengesCompleted: number;
    activeChallenge:     Challengeinterface;
    experienceNextLevel: number;
    levelUp:            () => void;
    startNewChallenge:  () => void;
    resetChallenge:     () => void;
    completedChallenge: () => void;
    closeLevelUpModal:  () => void;
}

interface ChallengerProviderProps{
    children: ReactNode;
    level:number,
    currentExperience:number,
    challengesCompleted:number
}

export const ChallegerContext = createContext({} as ChallengesContextData);

export function ChallengerProvider({children, ...rest}:ChallengerProviderProps){

    const [level, setLevel]                             = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience]     = useState(rest.currentExperience ?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);
    const [activeChallenge, setActiveChallenge]         = useState(null);
    const [isLevelUpModalOpen, setIsLevelUpModalOpen]   = useState(false);

    const experienceNextLevel = Math.pow( (level + 1) * 4, 2 );

    /**Quando passamos o array de dependencia vazio
     * o UseEffect é executado uma única vez, quando o componente é exibido pela primeira vez
     */
    useEffect( ()  => {
        /** Pedir permissão para o usuário receber notificação */
        Notification.requestPermission();
    }, [])

    useEffect(
        ()=>{
            Cookies.set("level", String(level));
            Cookies.set("currentExperience", String(currentExperience));
            Cookies.set("challengesCompleted", String(challengesCompleted));
        },
        [level, currentExperience, challengesCompleted]
    )

    function levelUp(){
        setLevel( level + 1 );
        setIsLevelUpModalOpen(true);
    }

    function closeLevelUpModal(){
        setIsLevelUpModalOpen(false);
    }

    function startNewChallenge() {
        
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];
        
        setActiveChallenge(challenge);
        
        new Audio('/notification.mp3');
        
        if(Notification.permission === 'granted'){

            new Notification('Novo Desafio ', {
                body: `Valendo ${challenge.amount}xp!`
            })
        }

    }

    function resetChallenge(){
        setActiveChallenge(null)
    }

    function completedChallenge(){

        if(!activeChallenge){
            return
        }

        const  { amount } = activeChallenge;
        let finalExperience = currentExperience + amount;

        if (finalExperience >= experienceNextLevel){
            finalExperience = finalExperience - experienceNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);

        setActiveChallenge(null)

        setChallengesCompleted(challengesCompleted + 1);

    }

    return(
        <ChallegerContext.Provider
          value={{
              level,
              currentExperience,
              challengesCompleted,
              experienceNextLevel,
              activeChallenge,
              levelUp,
              startNewChallenge,
              resetChallenge,
              completedChallenge,
              closeLevelUpModal
        }} >
            {children}
            { isLevelUpModalOpen && <LevelUpModal/> }

        </ChallegerContext.Provider>
    )

}