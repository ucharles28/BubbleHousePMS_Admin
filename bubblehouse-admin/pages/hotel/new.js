import { Checkbox, FormControlLabel, TextField, Button, Card, CardContent } from '@mui/material'
import Sidebar from '../../components/SideBar'


export default function SideBar() {
    return (
        <>
            <Sidebar />
            <div className='ml-64 mt-4 p-'>
                <Card clas>
                    <CardContent>
                        <h3 className='border-b '>Add hotel</h3>
                        <div className="flex justify-between pt-11">
                            <div className='w-1/4'>
                                <div className='flex flex-col items-center'>
                                    <span className="rounded-lg h-24 w-24 bg-red-500">
                                        {/* <img src={profileImageSrc} className='h-24 w-24 rounded-full object-cover' /> */}
                                    </span>
                                    <div className="mt-3 flex justify-center">
                                        <button
                                            type="button"
                                            className="text-purple-1000 hover:text-white font-semibold flex items-center border-2 border-gray-150 py-2.5 px-3 rounded-md hover:bg-purple-600"
                                        >
                                            <span className="pl-0 text-base uppercase">Add Photo</span>
                                        </button>
                                    </div>
                                    <div className="mt-3 flex justify-center">
                                        <button
                                            type="button"
                                            className="text-purple-1000 hover:text-white font-semibold flex items-center border-2 border-gray-150 py-2.5 px-3 rounded-md hover:bg-purple-600"
                                        >
                                            <span className="text-base uppercase">Reset</span>
                                        </button>
                                    </div>
                                    <span className="text-sm">Allow JPEG, GIF, or PNG. Max size of 800KB</span>
                                </div>

                            </div>
                            <div className='w-3/4 flex flex-col'>
                                <div>
                                    <TextField className='mt-3 mb-6' id="outlined-basic" label="Hotel Name"  variant="outlined" />
                                </div>
                                <div className='mt-3'>
                                <TextField id="outlined-basic" label="Description"
                                multiline variant="outlined" />
                                </div>
                                <div className='mt-3'>
                                <TextField id="outlined-basic" label="Address" variant="outlined" />
                                </div>
                                <div className='mt-3'>
                                <TextField id="outlined-basic" label="State/City" variant="outlined" />
                                </div>
                                <div className='mt-3'>
                                <TextField id="outlined-basic" label="Email Address" variant="outlined" />
                                </div>
                                <div className='mt-3'>
                                <TextField id="outlined-basic" label="Phone Number" variant="outlined" />
                                </div>
                                <div className='mt-3'>
                                <TextField id="outlined-basic" label="Alternative Phone Number" variant="outlined" />
                                </div>
                                <div className='mt-3'>
                                <TextField id="outlined-basic" label="Number of Rooms" variant="outlined" />
                                </div>

                                
                            </div>
                        </div>
                    </CardContent>
                </Card>

            </div>
        </>
    )
}
