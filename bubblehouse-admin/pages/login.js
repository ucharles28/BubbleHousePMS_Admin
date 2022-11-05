import { Checkbox, FormControlLabel, TextField, Button } from '@mui/material'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Login() {
    return (
        <div className='grid grid-cols-3'>
            <div className='h-full col-span-2 bg-black'>
                <span>hello</span>
            </div>
            <div className='h-full px-2 bg-white'>
                <div className='flex grid-row-3 justify-center items-center'>
                <div className='grid'>
                    <div className='grid grid-rows-2'>
                        <span className='text-2xl'>Welcome to BCloud!👋</span>
                        <span className='text-sm'>Please sign-in to your account and start the adventure</span>
                    </div>
                    <div className='grid grid-rows-3'>
                        <TextField id="outlined-basic" size='small' className='justify-end' label="Email" variant="outlined" />
                        <TextField id="outlined-basic" size='small' label="Password" variant="outlined" />
                        <FormControlLabel control={<Checkbox size='30'/>} label="Remember me" />
                    </div>
                    <Button variant="contained">Login</Button>
                </div>
                </div>
                

            </div>
        </div>
    )
}
