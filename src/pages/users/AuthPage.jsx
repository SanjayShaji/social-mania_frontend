// import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
// import Form from "./Form";
import React, { useState } from 'react'

import { Formik } from 'formik'
import * as yup from "yup"
import { useTheme } from '@emotion/react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Box, Button, TextField, Typography, useMediaQuery } from '@mui/material'
import { setError, setLogin } from 'state'
import { login, register } from 'api/users'
import FlexBetween from 'components/common/FlexBetweeen'

const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    phoneNumber: yup.string().required("required"),
    password: yup.string().required("required")
})

const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required")
})

const initialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
}

const initialValuesLogin = {
    email: "",
    password: "",
}

const AuthPage = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px")
    const [error, setError] = useState("")
    // const error = useSelector((state)=> state.error)
    const [pageType, setPageTpe] = useState("login");
    const { palette } = useTheme();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width: 600px)");
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";

    const handleFormSubmit = async (values, onSubmitProps) => {
        if (isLogin) {
            const loggedIn = await login(values, onSubmitProps);
            console.log(loggedIn.msg)
            if (!loggedIn.msg) {
                dispatch(
                    setLogin({
                        user: loggedIn.user,
                        token: loggedIn.token
                    })
                );
                navigate('/')
            }else{
                setError(loggedIn.msg)

            }
        };

        if (isRegister) {
            const savedUser = await register(values, onSubmitProps)
            if (savedUser) {
                setPageTpe("login")
            }
        }
    };
    
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
                <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
                    Welcome to MovieMania
                </Typography>
                <Typography sx={{textAlign: "center", color: 'red'}}>{error}</Typography>
                {/* <Form/> */}
                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
                    validationSchema={isLogin ? loginSchema : registerSchema}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleBlur,
                        handleChange,
                        handleSubmit,
                        setFieldValue,
                        resetForm
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <Box display="grid" gap="30px" gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                sx={{
                                    "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }
                                }}
                            >
                                {isRegister && (
                                    <>
                                        <TextField
                                            label="First Name"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.firstName}
                                            name="firstName"
                                            error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                                            helperText={touched.firstName && errors.firstName}
                                            sx={{ gridColumn: "span 2" }}
                                        />

                                        <TextField
                                            label="Last Name"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.lastName}
                                            name="lastName"
                                            error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                                            helperText={touched.lastName && errors.lastName}
                                            sx={{ gridColumn: "span 2" }}
                                        />

                                        <TextField
                                            label="Phone Number"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.phoneNumber}
                                            name="phoneNumber"
                                            error={Boolean(touched.phoneNumber) && Boolean(errors.phoneNumber)}
                                            helperText={touched.phoneNumber && errors.phoneNumber}
                                            sx={{ gridColumn: "span 4" }}
                                        />
                                    </>
                                )}

                                <TextField
                                    label="Email"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.email}
                                    name="email"
                                    error={Boolean(touched.email) && Boolean(errors.email)}
                                    helperText={touched.email && errors.email}
                                    sx={{ gridColumn: "span 4" }}
                                />
                                <TextField
                                    label="Password"
                                    type="password"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.password}
                                    name="password"
                                    error={Boolean(touched.password) && Boolean(errors.password)}
                                    helperText={touched.password && errors.password}
                                    sx={{ gridColumn: "span 4" }}
                                />
                            </Box>

                            <Box>
                                <Button
                                    fullWidth
                                    type='submit'
                                    sx={{
                                        m: "2rem 0",
                                        p: "1rem",
                                        backgroundColor: palette.primary.main,
                                        color: "black"
                                    }}
                                >
                                    {isLogin ? "LOGIN" : "REGISTER"}
                                </Button>
                                <Typography
                                    onClick={() => {
                                        setPageTpe(isLogin ? "register" : "login");
                                        resetForm();
                                    }}
                                    sx={{
                                        textDecoration: "underline",
                                        color: palette.primary.main,
                                        "&:hover": {
                                            cursor: "pointer",
                                            color: palette.primary.dark
                                        }
                                    }}
                                >
                                    {isLogin ? "Don't have an account? sign up here"
                                        : "Already have an account? Login here"}
                                </Typography>
                            </Box>
                        </form>
                    )}
                </Formik>
                <FlexBetween sx={{ 
                    justifyContent: "center",
                }}>
                <Typography>OR</Typography>
                
                </FlexBetween>
                <FlexBetween sx={{ 
                    justifyContent: "center",
                }}>
                <Button
                fullWidth
                type='submit'
                onClick={()=> navigate('/otpAuth')}
                sx={{
                    m: "2rem 0",
                    p: "1rem",
                    backgroundColor: palette.primary.main,
                    color: "black"
                }}>Otp Login</Button>
                
                </FlexBetween>
            </Box>
        </Box>
    )
}

export default AuthPage;
