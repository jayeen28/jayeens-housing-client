import React, { useEffect } from 'react';
import { faMicrophoneAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import './VoiceCommand.css';

const VoiceCommand = () => {
    const { transcript, listening } = useSpeechRecognition();
    let history = useHistory();
    const pageUrls = {
        home: '/',
        apartments: '/apartments',
        signin: '/signin',
        signup: '/signup',
        dashboard: '/dashboard',
    }
    useEffect(() => {
        if (!listening && transcript !== '') {
            const matchedRoute = Object.keys(pageUrls).find(key => {
                if (transcript.includes(key)) {
                    return pageUrls[key];
                }
            });
            history.push(matchedRoute)

        }
    }, [listening, pageUrls, transcript]);

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return null;
    }
    return (
        <div className='takeVoiceBtnWrapper'>
            <Button title={listening ? transcript : ''} variant='contained' className="takeVoiceBtn" onClick={listening ? SpeechRecognition.stopListening : SpeechRecognition.startListening} style={{ cursor: 'pointer', color: `${listening ? '#D01818' : 'white'}` }}><FontAwesomeIcon icon={faMicrophoneAlt} /></Button>
        </div>
    );
};

export default VoiceCommand;