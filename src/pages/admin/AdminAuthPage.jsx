// import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
// import Form from "./Form";
import React, { useState } from 'react'

import { Formik } from 'formik'
import * as yup from "yup"
import { useTheme } from '@emotion/react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Box, Button, TextField, Typography, useMediaQuery } from '@mui/material'
import { setAdminLogin, setLogin } from 'state'
import { login } from 'api/admin'
import FlexBetween from 'components/common/FlexBetweeen'

const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required")
})


const initialValuesLogin = {
    email: "",
    password: "",
}

const AdminAuthPage = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px")
    const [error, setError] = useState("")

    const [pageType, setPageTpe] = useState("login");
    const { palette } = useTheme();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width: 600px)");


    const handleFormSubmit = async (values, onSubmitProps) => {
        const loggedIn = await login(values, onSubmitProps);
        console.log(loggedIn)
        if (!loggedIn.msg) {
            dispatch(
                setAdminLogin({
                    admin: loggedIn.admin,
                    adminToken: loggedIn.adminToken
                })
            );
            navigate('/')
        }else{
            setError(loggedIn.msg)
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
                    initialValues={initialValuesLogin}
                    validationSchema={loginSchema}
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
                                > Login
                                </Button>
                                <Typography
                                    onClick={() => {
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
                                </Typography>
                            </Box>
                        </form>
                    )}
                </Formik>
                <FlexBetween sx={{ 
                    justifyContent: "center",
                }}>
                
                </FlexBetween>
                <FlexBetween sx={{ 
                    justifyContent: "center",
                }}>
                
                </FlexBetween>
            </Box>
        </Box>
    )
}

export default AdminAuthPage;
