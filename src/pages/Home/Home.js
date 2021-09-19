import { useState } from 'react';
import styles from './Home.module.css';

const myApiKey = "cd9d83f2-5049-4b75-ac99-d4afc4844bda";

const Home = () => {

    const [word, setWord] = useState('');
    const [dataNotFound, setDataNotFound] = useState('')
    const [defination, setDefination] = useState('')
    const [spanElement, setSpanElement] = useState([])
    const [audio, setAudio] = useState('');


    const wordSet = (e) => {
        setWord((e.target.value).toUpperCase());
    }

    const submit = () => {
        if (word === '') {
            alert('No any word found!')
        }
        setDataNotFound('')
        setDefination('')
        setSpanElement([])
        gotData(word);
    }

    async function gotData(word) {
        const response = await fetch(
            `https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${myApiKey}`
        );
        const data = await response.json();

        if (!data.length) {
            setDataNotFound("No any result found");
            return;
        }

        if (typeof data[0] === 'string') {
            setSpanElement(data);
            setDataNotFound('Did you mean?');
            return;
        }

        setDefination(data[0].shortdef[0]);

        let audio = data[0].hwi.prs[0].sound.audio;
        if (audio) {
            soundAudio(audio);
        }

    }
    const soundAudio = (audio) => {
        let subAudio = audio.charAt(0);
        let soundSrc = `https://media.merriam-webster.com/soundc11/${subAudio}/${audio}.wav?kay=${myApiKey}`;
        setAudio(soundSrc);
    }

    return (
        <div className={styles.container}>
            <div className={styles.homeWrap}>

                <h2>If will search, you will find!</h2>

                <div className={styles.inputWrap}>
                    <input type="text" placeholder='Find meaning of any word!' value={word} onChange={wordSet} />
                    <button onClick={submit}>Search</button>
                </div>

                <div className={styles.data}>
                    <p className={styles.def}>{defination}</p>

                    <div className={styles.audio}>
                        <audio src={audio} controls={true}></audio>
                    </div>

                    <div className={styles.wordNotFound}>{dataNotFound}</div>

                    <div className={styles.suggest}>
                        {
                            spanElement.map((ele, index) => {
                                return (
                                    <span key={index} className={styles.suggetionBox}>{ele}</span>
                                )
                            })
                        }
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Home
