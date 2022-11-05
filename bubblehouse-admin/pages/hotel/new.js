import { Checkbox, FormControlLabel, TextField, Button, Card, CardContent } from '@mui/material'
import { SidebarRight } from 'iconsax-react'
import Sidebar from '../../components/SideBar'


function SideBar() {

    return (
        <div className='font-poppins'>
            <Sidebar />
            <div className='ml-64 mt-3'>
                <Card>
                    <CardContent>
                        <div className='border-b-[1px] border-[#3a354125] text-lg font-medium leading-7'><span>Add Hotel</span></div>
                        <div className="flex space-x-5 justify-between my-4">
                            <div className='item w-2/6 h-full'>
                                <div className='flex flex-col items-center'>
                                    <div className="rounded-lg h-36 w-36 bg-[#1A1A1A]/25 flex items-center">
                                        <span className='flex items-center justify-center m-auto'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M5.74 16c.11-.49-.09-1.19-.44-1.54l-2.43-2.43c-.76-.76-1.06-1.57-.84-2.27.23-.7.94-1.18 2-1.36l3.12-.52c.45-.08 1-.48 1.21-.89l1.72-3.45C10.58 2.55 11.26 2 12 2s1.42.55 1.92 1.54l1.72 3.45c.13.26.4.51.69.68L5.56 18.44c-.14.14-.38.01-.34-.19L5.74 16ZM18.7 14.462c-.36.36-.56 1.05-.44 1.54l.69 3.01c.29 1.25.11 2.19-.51 2.64a1.5 1.5 0 0 1-.9.27c-.51 0-1.11-.19-1.77-.58l-2.93-1.74c-.46-.27-1.22-.27-1.68 0l-2.93 1.74c-1.11.65-2.06.76-2.67.31-.23-.17-.4-.4-.51-.7l12.16-12.16c.46-.46 1.11-.67 1.74-.56l1.01.17c1.06.18 1.77.66 2 1.36.22.7-.08 1.51-.84 2.27l-2.42 2.43Z" fill="#666666"></path></svg>
                                        </span>
                                        {/* <img src="https://i.ibb.co/X5LP2MZ/avatar.png" className='rounded-lg h-36 w-36 bg-[#1A1A1A]/25 object-cover' /> */}
                                    </div>

                                    {/* <div className='grid overflow-hidden grid-cols-3 h-auto items-center gap-3 mt-5'>

                                        <div className="box rounded-lg h-14 w-14 bg-[#1A1A1A]/25 flex items-center">
                                            <span className='flex items-center justify-center m-auto'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M5.74 16c.11-.49-.09-1.19-.44-1.54l-2.43-2.43c-.76-.76-1.06-1.57-.84-2.27.23-.7.94-1.18 2-1.36l3.12-.52c.45-.08 1-.48 1.21-.89l1.72-3.45C10.58 2.55 11.26 2 12 2s1.42.55 1.92 1.54l1.72 3.45c.13.26.4.51.69.68L5.56 18.44c-.14.14-.38.01-.34-.19L5.74 16ZM18.7 14.462c-.36.36-.56 1.05-.44 1.54l.69 3.01c.29 1.25.11 2.19-.51 2.64a1.5 1.5 0 0 1-.9.27c-.51 0-1.11-.19-1.77-.58l-2.93-1.74c-.46-.27-1.22-.27-1.68 0l-2.93 1.74c-1.11.65-2.06.76-2.67.31-.23-.17-.4-.4-.51-.7l12.16-12.16c.46-.46 1.11-.67 1.74-.56l1.01.17c1.06.18 1.77.66 2 1.36.22.7-.08 1.51-.84 2.27l-2.42 2.43Z" fill="#666666"></path></svg>
                                            </span>
                                            <img src="https://i.ibb.co/X5LP2MZ/avatar.png" className='rounded-lg h-14 w-14 object-cover' />
                                        </div>

                                        <div className="box rounded-lg h-14 w-14 bg-[#1A1A1A]/25 flex items-center">
                                            <span className='flex items-center justify-center m-auto'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M5.74 16c.11-.49-.09-1.19-.44-1.54l-2.43-2.43c-.76-.76-1.06-1.57-.84-2.27.23-.7.94-1.18 2-1.36l3.12-.52c.45-.08 1-.48 1.21-.89l1.72-3.45C10.58 2.55 11.26 2 12 2s1.42.55 1.92 1.54l1.72 3.45c.13.26.4.51.69.68L5.56 18.44c-.14.14-.38.01-.34-.19L5.74 16ZM18.7 14.462c-.36.36-.56 1.05-.44 1.54l.69 3.01c.29 1.25.11 2.19-.51 2.64a1.5 1.5 0 0 1-.9.27c-.51 0-1.11-.19-1.77-.58l-2.93-1.74c-.46-.27-1.22-.27-1.68 0l-2.93 1.74c-1.11.65-2.06.76-2.67.31-.23-.17-.4-.4-.51-.7l12.16-12.16c.46-.46 1.11-.67 1.74-.56l1.01.17c1.06.18 1.77.66 2 1.36.22.7-.08 1.51-.84 2.27l-2.42 2.43Z" fill="#666666"></path></svg>
                                            </span>
                                            <img src="https://i.ibb.co/X5LP2MZ/avatar.png" className='rounded-lg h-14 w-14 object-cover' />
                                        </div>

                                        <div className="box rounded-lg h-14 w-14 bg-[#1A1A1A]/25 flex items-center">
                                            <span className='flex items-center justify-center m-auto'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M5.74 16c.11-.49-.09-1.19-.44-1.54l-2.43-2.43c-.76-.76-1.06-1.57-.84-2.27.23-.7.94-1.18 2-1.36l3.12-.52c.45-.08 1-.48 1.21-.89l1.72-3.45C10.58 2.55 11.26 2 12 2s1.42.55 1.92 1.54l1.72 3.45c.13.26.4.51.69.68L5.56 18.44c-.14.14-.38.01-.34-.19L5.74 16ZM18.7 14.462c-.36.36-.56 1.05-.44 1.54l.69 3.01c.29 1.25.11 2.19-.51 2.64a1.5 1.5 0 0 1-.9.27c-.51 0-1.11-.19-1.77-.58l-2.93-1.74c-.46-.27-1.22-.27-1.68 0l-2.93 1.74c-1.11.65-2.06.76-2.67.31-.23-.17-.4-.4-.51-.7l12.16-12.16c.46-.46 1.11-.67 1.74-.56l1.01.17c1.06.18 1.77.66 2 1.36.22.7-.08 1.51-.84 2.27l-2.42 2.43Z" fill="#666666"></path></svg>
                                            </span>
                                            <img src="https://i.ibb.co/X5LP2MZ/avatar.png" className='rounded-lg h-14 w-14 object-cover' />
                                        </div>

                                    </div> */}

                                    <div className="mt-5 flex justify-center">
                                        <button
                                            type="button"
                                            className="text-white font-medium flex items-center py-[7px] px-[22px] rounded-[5px] bg-[#666666] text-sm leading-6 uppercase hover:bg-[#1A1A1A]/50"
                                        >
                                            Upload photo
                                        </button>
                                    </div>
                                    <div className="mt-4 flex justify-center">
                                        <button
                                            type="button"
                                            className="text-[#666666] font-medium flex items-center py-[7px] px-[22px] rounded-[5px] border-[#666666] border-[1.2px] text-sm leading-6 uppercase hover:bg-[#666666] hover:text-white"
                                        >
                                            Reset
                                        </button>
                                    </div>
                                    <span className="text-xs leading-5 font-normal mt-4">Allow JPEG, GIF, or PNG. Max size of 800KB</span>
                                </div>
                            </div>
                            <div className='item w-full h-full'>
                                <div className='flex flex-col space-y-4 w-full'>
                                    <div className='item w-full h-full'>
                                        <TextField className='w-full' id="outlined-basic" label="Hotel Name" variant="outlined" />
                                    </div>
                                    <div className='item w-full h-full'>
                                        <TextField className='w-full' id="outlined-basic" label="Description" multiline rows={3} variant="outlined" />
                                    </div>
                                    <div className='item w-full h-full'>
                                        <TextField className='w-full' id="outlined-basic" label="Address" variant="outlined" />
                                    </div>
                                    <div className='item w-full h-full'>
                                        <TextField className='w-full' id="outlined-basic" label="State/City" variant="outlined" />
                                    </div>
                                    <div className='item w-full h-full'>
                                        <TextField className='w-full' id="outlined-basic" label="Email Address" variant="outlined" />
                                    </div>
                                    <div className='item w-full h-full'>
                                        <TextField className='w-full' id="outlined-basic" label="Phone Number" variant="outlined" />
                                    </div>
                                    <div className='item w-full h-full'>
                                        <TextField className='w-full' id="outlined-basic" label="Alternative Phone Number" variant="outlined" />
                                    </div>
                                    <div className='item w-full h-full'>
                                        <TextField className='w-full' id="outlined-basic" label="Number of Rooms" variant="outlined" />
                                    </div>
                                    <div className='item w-full h-full'>
                                        <TextField className='w-full' id="outlined-basic" label="Manager Assigned" variant="outlined" />
                                    </div>

                                    <div className="mt-6 flex justify-start space-x-4">
                                        <button
                                            type="button"
                                            className="text-white font-medium flex items-center py-[7px] px-[22px] rounded-[5px] bg-[#666666] text-sm leading-6 uppercase hover:bg-[#1A1A1A]/50"
                                        >
                                            Save Change
                                        </button>
                                        <button
                                            type="button"
                                            className="text-[#666666] font-medium flex items-center py-[7px] px-[22px] rounded-[5px] border-[#666666] border-[1.2px] text-sm leading-6 uppercase hover:bg-[#666666] hover:text-white"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </CardContent>
                </Card>

            </div>
        </div>
    )
}

export default SideBar;