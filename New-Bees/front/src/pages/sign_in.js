import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import 'antd/dist/antd.css';



function SignIn(){
    
    console.log('jason');

    return (

        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div >
            <Avatar >
                <LockOutlinedIcon />
            </Avatar>
            <Typography  component="h1" variant="h5">
                Sign In
            </Typography>
            <form noValidate>
                <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                />
                <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                />
                <Button
                fullWidth
                variant="contained"
                color="primary"
                
                >
                Sign In
                </Button>

            </form>
            </div>
        </Container>
      
     
    );
  };



  export default SignIn;