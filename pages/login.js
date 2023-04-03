import { CircularProgress } from '@mui/material'
import { useRouter } from 'next/router';
import { forwardRef, useState } from 'react';
import { post } from '../helpers/ApiRequest';
import styles from '../styles/Home.module.css';
import Image from "next/image";
import logo from "../public/logo.png";
import Cookies from 'universal-cookie';

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
            localStorage.setItem('token', response.data.token);
            localStorage.setItem(
                'tokenExpiry',
                JSON.stringify(response.data.tokenExpiryDate)
            );
            localStorage.setItem('user', JSON.stringify(response.data));
            var date = new Date();
            date.setDate(date.getDate() + 30)
            const cookies = new Cookies();
            path: '/',
            cookies.set('bcloudCookie', response.data.token, {
                expires: date
            });
            router.push('/')
        } else {
            alert(response.data)
        }
        setIsLoading(false)
    }

    const showAlert = (alertMessage) => {
        setAlertMessage(alertMessage)
        setOpen(true)
    }

    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className='h-screen font-poppins'>
            <div className='grid grid-rows-3 md:p-10 p-2 mx-auto w-full h-full bg-[#f8f8fb]'>

                <div className='row-span-2 flex flex-col justify-center p-4 space-y-5 m-auto bg-white rounded-md drop-shadow-sm md:w-[25%] w-full h-auto'>

                    <div className="block">
                        <Image src={logo} width={100} height={100} className="mb-2 m-auto" />
                        <p className='block text-base leading-6 font-medium text-gray-800'>Welcome Back !</p>
                        <span className='block text-xs leading-5 font-normal text-gray-500'>Sign in to continue to Bcloud.</span>
                    </div>

                    <div className='flex flex-col gap-3'>

                        <div className="flex flex-col space-y-1" >
                            <label className='text-xs font-medium leading-5 text-gray-700'>Email address</label>
                            <input
                                type="email"
                                placeholder="Enter email address"
                                className='border border-gray-300 p-1 pl-2 text-xs text-gray-700 rounded-sm leading-5 placeholder:text-xs focus:outline-0'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col space-y-1" >
                            <label className='text-xs font-medium leading-5 text-gray-700'>Password</label>
                            <input
                                type="password"
                                placeholder="Enter password"
                                className='border border-gray-300 p-1 pl-2 text-xs text-gray-700 rounded-sm leading-5 placeholder:text-xs focus:outline-0'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className='flex items-center space-x-1' >
                            <input
                                type="checkbox"
                                className='text-xs h-[10px] w-[10px] border leading-5 font-normal text-gray-700'
                                id='check'
                                label='Remember me'
                            />
                            <label className='text-[10px] font-normal leading-5 text-gray-700 cursor-pointer' htmlFor="check">Remember me</label>
                        </div>

                        <div className='flex flex-row w-full mt-3'>
                            <button
                                type="button"
                                className="w-full bg-[#F5C400] hover:bg-[#ffcc00] text-gray-800 rounded-sm text-[13px] font-normal leading-5 p-1.5 flex justify-center" onClick={handleLogin}>
                                {isLoading ? <CircularProgress size={20} color="inherit" /> : 'Log In'}
                            </button>
                        </div>
                    </div>

                    {/* <div className='flex flex-col mt-6 space-y-4 text-[#1a1a1a}'>
                        <TextField id="outlined-basic" value={email} onChange={(e) => setEmail(e.target.value)} className='w-full' InputProps={{ sx: { height: 56 } }} label="Email" variant="outlined" />
                        <TextField id="outlined-basic" type={'password'} value={password} onChange={(e) => setPassword(e.target.value)} className='w-full' InputProps={{ sx: { height: 56 } }} label="Password" variant="outlined" />
                    </div>
                    <div className='flex justify-between items-center'>
                        <FormControlLabel control={<Checkbox size='small' />} label="Remember me" className='text-[12px]' InputProps={{ sx: { fontSize: '12px' } }} />
                        <p className='text-xs leading-6 font-normal text-[#636363]'>Forgot password?</p>
                    </div>
                    <button
                        type="button"
                        className="mt-7 w-full text-center justify-center font-medium flex items-center py-2 rounded-[5px] text-sm leading-6 uppercase bg-[#F5C400] hover:bg-[#ffcc00] text-[#1a1a1a]" onClick={handleLogin}>
                        {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
                    </button> */}

                    {/* </div> */}
                </div>

                <div className='row-span-1 text-xs font-normal leading-6 w-full text-center text-gray-600'>
                    <p>© 2023 Bcloud.</p>
                </div>

            </div>
        </div>
    )
}
