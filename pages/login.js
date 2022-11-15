import { Checkbox, FormControlLabel, TextField, Button, CircularProgress, Snackbar, MuiAlert } from '@mui/material'
import { useRouter } from 'next/router';
import { forwardRef, useState } from 'react';
import { post } from '../helpers/ApiRequest';
import styles from '../styles/Home.module.css';
import Image from "next/image";
import { logo } from "../public/logo.png";

export default function Login() {

    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [alertMessage, setAlertMessage] = useState('');

    const Alert = forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    const handleLogin = async () => {
        setIsLoading(true)
        const request = {
            email,
            password
        }
        const response = await post('Auth/User/SignIn', request)
        if (response.successful) {
            router.push('dashboard')
        } else {
            alert(response.data)
        }
        setIsLoading(false)
    }

    const showAlert = (alertMessage) => {
        setAlertMessage(alertMessage)
        setOpen(true)
    }
    return (
        <div className='h-screen font-poppins'>
            {/* <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        {alertMessage}
                    </Alert>
                </Snackbar> */}
            <div className='flex space-x-3 w-full h-full'>

                {/* Background Image and Overlay */}
                <div className='item w-full h-full bg-[url(https://interiordesign.net/wp-content/uploads/2021/03/Interior-Design-Ace-Hotel-Kyoto-Kengo-Kuma-Associates-Commune-Design-idx210201_kk01.jpg)] object-fill'>
                    <div className='w-full h-full flex bg-gradient-to-t from-[#1a1a1a]/80 to-[#1a1a1a]/10'>
                        {/* <div className='text-sm font-normal leading-6 text-white fixed bottom-0 left-0 w-full p-8'>
                            <p>Copyright Bcloud © 2022</p>
                        </div> */}
                    </div>
                </div>

                {/* Input Field */}
                <div className='item w-3/6 h-full bg-white'>
                    <div className='flex justify-center items-center p-7 w-full h-full'>
                        <div className='m-0'>

                            <div className="block">
                                <Image src="/logo.png" width={120} height={120} className="mb-10 m-auto" />
                                <p className='block text-xl leading-8 font-medium text-[#1a1a1a}/90'>Welcome to BCloud! &#128075;</p>
                                <span className='block text-sm leading-5 font-normal text-[#1a1a1a]/70'>Please sign-in to your account and start the adventure</span>
                            </div>

                            <div className='flex flex-col mt-6 space-y-4 text-[#1a1a1a}'>
                                <TextField id="outlined-basic" value={email} onChange={(e) => setEmail(e.target.value)} className='w-full' InputProps={{ sx: { height: 56 } }} label="Email" variant="outlined" />
                                <TextField id="outlined-basic" type={'password'} value={password} onChange={(e) => setPassword(e.target.value)} className='w-full' InputProps={{ sx: { height: 56 } }} label="Password" variant="outlined" />
                            </div>
                            <div className='flex justify-between items-center'>
                                <FormControlLabel control={<Checkbox size='small' />} label="Remember me" className='text-[12px]' />
                                <p className='text-xs leading-6 font-normal text-[#1a1a1a]/50'>Forgot password?</p>
                            </div>
                            {isLoading ? <div className='flex justify-center'><CircularProgress /></div> :
                                <button
                                    type="button"
                                    className="mt-7 w-full text-center justify-center font-medium flex items-center py-2 rounded-[5px] text-sm leading-6 uppercase bg-[#F5C400] hover:bg-[#ffcc00] text-[#1a1a1a]" onClick={handleLogin}>Login</button>}

                            <div className='text-sm font-normal leading-6 w-full text-center mt-10'>
                                <p>Copyright Bcloud © 2022</p>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}
