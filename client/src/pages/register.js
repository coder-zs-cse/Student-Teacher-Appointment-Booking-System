import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios'
import { json, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useState } from 'react';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Teacher Mentorship
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

function Register() {
  const [role, setRole] = useState('');
  const [speciality, setSpeciality] = useState('');

  const handleChange = (event) => {
    setRole(event.target.value);
    if (event.target.value !== 'teacher') {
      setSpeciality('');
    }
  };



  const navigate = useNavigate()
  const handleSubmit = async (event) => {
    event.preventDefault(); // prevents default form submission
    const formData = new FormData(event.currentTarget); // currentTarget is the DOM element that triggered the event
    const data = {...Object.fromEntries(formData.entries())};
    try{
      // console.log(data);
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/user/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
      const responseData = await response.json()
      if(responseData.success){
        toast.success('User created successfully')
        toast('Redirecting to login page')
        navigate('/login')
      }
      else{
        toast.error(responseData.message)
      }
    }
    catch(error){
      toast.error('Something went wrong')
    }
    // // console.log(responseData);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Signup
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate >
            <TextField
              margin="dense"
              required
              fullWidth
              id="name"
              label="Full Name"
              name="name"
              autoComplete="Name"
              autoFocus
            />
            <TextField
              margin="dense"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
            <TextField
              margin="dense"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <InputLabel id="role-select-label" required className='mt-3'>Role</InputLabel>
            <Select
              labelId="role-select-label"
              id="role-select"
              name="role"
              value={role}
              required
              fullWidth
              onChange={handleChange}
              sx={{ height: '40px'}}
            >
              <MenuItem value="student">Student</MenuItem>
              <MenuItem value="teacher">Teacher</MenuItem>
            </Select>
            
            {role === 'teacher' && (
              <TextField
                margin="dense"
                required
                fullWidth

                id="speciality"
                label="Speciality"
                name="speciality"
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
                sx={{ mt: 2 }}
              />
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign-up 
            </Button>
            <Grid item>
                <Link href="/login" variant="body2">
                  {"Already have an account? Sign in"}
                </Link>
            </Grid>
            
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}


export {Register}

// function Login(){
//   return (
//       <div>
//           Login page
//       </div>
//   )
// }

// export { Login }

// function Register(){
//     return (
//         <div>
//             Register Now
//         </div>
//     )
// }

// export {Register}


