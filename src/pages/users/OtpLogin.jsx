import React, { useEffect, useState } from 'react'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { setLogin } from 'state';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDERID,
    appId: process.env.REACT_APP_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function OtpLogin() {
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px")
    const isNonMobile = useMediaQuery("(min-width: 600px)");
    const dispatch = useDispatch();
    const [number, setNumber] = useState("");
    const [otp, setOtp] = useState("")
    const [error, setError] = useState("");
    const [flag, setFlag] = useState(false);
    const [confirmObj, setConfirmObj] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const theme = useTheme();


    const setUpRecaptcha = async (number) => {
        const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container',
            {},
            auth);
        recaptchaVerifier.render();
        return signInWithPhoneNumber(auth, number, recaptchaVerifier)
    }

    const getOtp = async (e) => {
        e.preventDefault();
        setError("");
        if (number === "" || number === undefined) return setError("please enter a valid phone number");
        try {
            const response = await setUpRecaptcha(number);
            console.log(response);
            setConfirmObj(response);
            setFlag(true);
        } catch (error) {
            setError(error.message)
        }
        console.log(number)
    }

    const verifyOtp = async (e) => {
        e.preventDefault();
        console.log(otp);
        if (otp === "" || otp === null) return;
        try {
            const { data } = await axios.post("http://localhost:4000/auth/otplogin", {
                ...number,
            },
                {
                    withCredentials: true
                });
            console.log(data);
            if (data) {
                console.log('data');
                console.log(data);
                console.log('data');

                if (data.errors) {
                    const { phoneNumber } = data.errors;
                    if (phoneNumber) { console.log("phone number error") }

                    console.log(data.error);
                } else {
                    await confirmObj.confirm(otp);
                    dispatch(
                        setLogin({
                            user: data.user,
                            token: data.token
                        })
                    );
                    navigate('/')
                }
            }

        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <Box>
            <Box width="100%"
                backgroundColor={theme.palette.background.alt}
                p="1rem 6%"
                textAlign="center"
            >
                <Typography
                    fontWeight="bold"
                    fontSize="clamp(1rem, 2rem, 2.25rem)"
                    color="primary"
                >MovieMania
                </Typography>
            </Box>
            <Box width={isNonMobileScreens ? "50%" : "93%"}
                p="2rem"
                m="2rem auto"
                borderRadius="1.5rem"
                backgroundColor={theme.palette.background.alt}
            >

                <h2>Otp Signup</h2>
                <Box>
                    <form onSubmit={(e) => { getOtp(e) }}
                        style={{ display: !flag ? "block" : "none" }}
                    >
                        <div>
                            <PhoneInput
                                defaultCountry='IN'
                                placeholder="Enter phone number"
                                value={number}
                                onChange={setNumber} />

                            <div id='recaptcha-container'></div>
                        </div>
                        <Button onClick={() => navigate('/auth')} style={{ margin: "15px" }}>Cancel</Button>
                        <Button type='submit'>Send Otp</Button>

                    </form>

                </Box>
                <form onSubmit={(e) => { verifyOtp(e) }}
                    style={{ display: flag ? "block" : "none" }}
                >
                    <div>
                        <input type="text" onChange={(e) => setOtp(e.target.value)} placeholder="Enter otp" />
                    </div>
                    <Button onClick={() => navigate('/login')} style={{ margin: "15px" }}>Cancel</Button>
                    <Button type='submit'>Verify Otp</Button>

                </form>
            </Box>
        </Box>
    )
}

export default OtpLogin