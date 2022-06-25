/* eslint-disable camelcase */
import {
  Avatar, Button, Typography, Paper, Grid, Container
} from '@material-ui/core';
// import { GoogleLogin } from 'react-google-login'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AUTH } from '../../constants/actionTypes';
import Input from './Input';
import useStyles from './styles';
import { signin, signup } from '../../actions/auth';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
};

const Auth = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signup(formData, navigate));
    } else {
      dispatch(signin(formData, navigate));
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleShowPassword = () => {
    setShowPassword((prev) => (!prev));
  };
  const switchMode = () => {
    setIsSignup((prev) => (!prev));
    setShowPassword(false);
  };
  const googleSuccess = async (res) => {
    const result = res.credential ? jwt_decode(res.credential) : null;
    const token = res.credential ? res.credential : null;
    console.log(res, result);
    try {
      dispatch({
        type: AUTH,
        data: { result, token }
      });
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailure = (err) => {
    console.log(err, 'Google logIn failure');
  };

  return (
    <GoogleOAuthProvider clientId="83075589481-3r68rlc16v877077k23047j65a6tsisr.apps.googleusercontent.com">
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5">{ isSignup ? 'Sign In' : 'Sign Up'}</Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {
                            isSignup && (
                            <>
                              <Input
                                name="firstName"
                                label="First name"
                                handleChange={handleChange}
                                autoFocus
                                half
                              />
                              <Input
                                name="lastName"
                                label="Last name"
                                handleChange={handleChange}
                                autoFocus
                                half
                              />
                            </>
                            )
                            }
              <Input
                name="email"
                label="Email Address"
                type="email"
                handleChange={handleChange}
              />
              <Input
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                handleChange={handleChange}
                handleShowPassword={handleShowPassword}
              />
              {isSignup && <Input name="confirmPassword" label="Repeat password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} />}
            </Grid>
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
              {isSignup ? 'Sign Up' : 'Sign In'}
            </Button>
            <GoogleLogin
                            // render={(renderProps) => (
                            //     <Button
                            //         className={classes.googleButton}
                            //         color="primary"
                            //         fullWidth
                            //         onClick={renderProps.onClick}
                            //         disabled={renderProps.disabled}
                            //         startIcon={<Icon />}
                            //         variant="contained"
                            //     >Google Sign In</Button>
                            // )}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
            />
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button onClick={switchMode}>
                  {isSignup ? 'Already have an account? Sign In' : 'Sign Up'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </GoogleOAuthProvider>
  );
};

export default Auth;
