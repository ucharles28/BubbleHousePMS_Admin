import { Checkbox, TextField, Button, InputAdornment, Chip, Box, OutlinedInput, Card, CardContent, FormControl, InputLabel, Select, MenuItem, Snackbar, CircularProgress } from '@mui/material'
import { SidebarRight } from 'iconsax-react'
import { forwardRef, useEffect, useRef, useState } from 'react'
import Sidebar from '../../components/SideBar'
import { get, postData } from '../../helpers/ApiRequest'
import MuiAlert from '@mui/material/Alert';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function NewRoomType() {

    useEffect(() => {
        getHotels()
        getAmenities()
        getComplements()
    }, [])

    const Alert = forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const getHotels = async () => {
        const response = await get('Hotel')
        if (response.successful) {
            setHotels(response.data)
        }
    }

    const getAmenities = async () => {
        const response = await get('Amenity')
        if (response.successful) {
            setAmenities(response.data)
        }
    }

    const getComplements = async () => {
        const response = await get('Complement')
        if (response.successful) {
            setComplements(response.data)
        }
    }
    const isFile = input => 'File' in window && input instanceof File;
    const saveRoomType = async () => {
        debugger
        setIsLoading(true)
        const formData = new FormData()
        formData.append("Name", roomName)
        formData.append("Description", description)
        formData.append("TotalChildren", totalChild)
        formData.append("TotalAdult", totalAdult)
        formData.append("NumberOfRooms", numberOfRooms)
        formData.append("Price", price)
        formData.append("HotelId", selectedHotel)

        selectedAmenities.map((amenity, index) => {
            formData.append(`AmenityIds[${index}]`, amenity.id)
        })
        
        selectedComplements.map((complements, index) => {
            formData.append(`ComplimentIds[${index}]`, complements.id)
        })

        console.log(roomImageFiles.length)
        
        roomImageFiles.map((file, index) => {
            formData.append(`RoomImages`, file)
        })

        const response = await postData('RoomType', formData)
        if (response.successful) {
            showAlert('Saved successfully', 'success')
        } else {
            showAlert(response.data, 'error')
        }
        setIsLoading(false)
    }

    const handleClick = () => {
        // 👇️ open file input box on click of other element
        inputRef.current.click();
    };

    const handleAmenityChange = (event) => {

        setSelectedManager(event.target.value)
    }

    const clearImage = (event) => {
        setMainImageSrc('')
        setRoomImageFiles([])
        setRoomImagesSrc([])
    }

    const handleFileChange = e => {
        const files = e.target.files
        let list = [...roomImageFiles]
        list.push(...files);
        setRoomImageFiles(list)
        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();
            reader.onload = function (e) {
                debugger
                if (!mainImageSrc) {
                    setMainImageSrc(e.target.result);
                } else {
                    list = [...rooomImagesSrc]
                    list.push(e.target.result)
                    setRoomImagesSrc(list)
                }
            };
            reader.readAsDataURL(files[i]);
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };


    const showAlert = (alertMessage, alertType) => {
        setAlertMessage(alertMessage)
        setOpen(true)
        setAlertType(alertType)
    }

    //states
    const inputRef = useRef(null);
    const [roomName, setRoomName] = useState('');
    const [totalChild, setTotalChild] = useState('');
    const [hotels, setHotels] = useState([]);
    const [amenities, setAmenities] = useState([]);
    const [selectedAmenities, setSelectedAmenities] = useState([]);
    const [complements, setComplements] = useState([]);
    const [selectedComplements, setSelectedComplements] = useState([]);
    const [description, setDescription] = useState('');
    const [totalAdult, setTotalAdult] = useState('');
    const [numberOfRooms, setNumberOfRooms] = useState();
    const [price, setPrice] = useState();
    const [mainImageSrc, setMainImageSrc] = useState();
    const [rooomImagesSrc, setRoomImagesSrc] = useState([]);
    const [roomImageFiles, setRoomImageFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [alertType, setAlertType] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [selectedHotel, setSelectedHotel] = useState('');


    return (
        <div className='font-poppins'>
            <Sidebar />
            <div className='ml-64 mt-3'>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={alertType} sx={{ width: '100%' }}>
                        {alertMessage}
                    </Alert>
                </Snackbar>
                <Card>
                    <CardContent>

                        <div className='border-b-[1px] border-[#3a354125] text-lg font-medium leading-7'><span>Add Room Type</span></div>
                        <div className="flex space-x-5 justify-between my-4">
                            <div className='item w-2/6 h-full'>
                                <div className='flex flex-col items-center'>
                                    <div className="rounded-lg h-36 w-36 bg-[#1A1A1A]/25 flex items-center">

                                        {!mainImageSrc ? <span className='flex items-center justify-center m-auto'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M5.74 16c.11-.49-.09-1.19-.44-1.54l-2.43-2.43c-.76-.76-1.06-1.57-.84-2.27.23-.7.94-1.18 2-1.36l3.12-.52c.45-.08 1-.48 1.21-.89l1.72-3.45C10.58 2.55 11.26 2 12 2s1.42.55 1.92 1.54l1.72 3.45c.13.26.4.51.69.68L5.56 18.44c-.14.14-.38.01-.34-.19L5.74 16ZM18.7 14.462c-.36.36-.56 1.05-.44 1.54l.69 3.01c.29 1.25.11 2.19-.51 2.64a1.5 1.5 0 0 1-.9.27c-.51 0-1.11-.19-1.77-.58l-2.93-1.74c-.46-.27-1.22-.27-1.68 0l-2.93 1.74c-1.11.65-2.06.76-2.67.31-.23-.17-.4-.4-.51-.7l12.16-12.16c.46-.46 1.11-.67 1.74-.56l1.01.17c1.06.18 1.77.66 2 1.36.22.7-.08 1.51-.84 2.27l-2.42 2.43Z" fill="#666666"></path></svg>
                                        </span> :
                                            <img src={mainImageSrc} className='rounded-lg h-36 w-36 bg-[#1A1A1A]/25 object-cover' />}
                                    </div>

                                    <div className='grid overflow-hidden grid-cols-3 h-auto items-center gap-3 mt-5'>

                                        {rooomImagesSrc.map((imageSrc) => (<div className="box rounded-lg h-14 w-14 bg-[#1A1A1A]/25 flex items-center">
                                            <img src={imageSrc} className='rounded-lg h-14 w-14 object-cover' />
                                        </div>))}

                                    </div>
                                    <input
                                        style={{ display: 'none' }}
                                        ref={inputRef}
                                        type="file"
                                        accept="image/*"
                                        multiple="multiple"
                                        onChange={handleFileChange}
                                    />

                                    <div className="mt-5 flex justify-center">
                                        <button
                                            type="button"
                                            className="text-white font-medium flex items-center py-[7px] px-[22px] rounded-[5px] bg-[#666666] text-sm leading-6 uppercase hover:bg-[#1A1A1A]/50"
                                            onClick={handleClick}
                                        >
                                            Upload photo
                                        </button>
                                    </div>
                                    <div className="mt-4 flex justify-center">
                                        <button
                                            type="button"
                                            className="text-[#666666] font-medium flex items-center py-[7px] px-[22px] rounded-[5px] border-[#666666] border-[1.2px] text-sm leading-6 uppercase hover:bg-[#666666] hover:text-white"
                                            onClick={clearImage}
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
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Hotel</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={selectedHotel}
                                                onChange={(e) => setSelectedHotel(e.target.value)}
                                            >
                                                {hotels.map((hotel) => <MenuItem value={hotel.id}>{hotel.name}</MenuItem>)}
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div className='item w-full h-full'>
                                        <TextField className='w-full' id="outlined-basic" label="Room Type" variant="outlined"
                                            value={roomName} onChange={(e) => setRoomName(e.target.value)} />
                                    </div>
                                    <div className='item w-full h-full'>
                                        <TextField className='w-full' id="outlined-basic" label="Description" variant="outlined"
                                            value={description} multiline onChange={(e) => setDescription(e.target.value)} />
                                    </div>
                                    <div className='item w-full h-full'>
                                        <TextField className='w-full' id="outlined-basic" label="Total Adult" variant="outlined"
                                            value={totalAdult} type="number" onChange={(e) => setTotalAdult(e.target.value)} />
                                    </div>
                                    <div className='item w-full h-full'>
                                        <TextField className='w-full' type="number" id="outlined-basic" label="Total Child" variant="outlined"
                                            value={totalChild} onChange={(e) => setTotalChild(e.target.value)} />
                                    </div>
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-amount"
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                            type='number'
                                            startAdornment={<InputAdornment position="start">₦</InputAdornment>}
                                            label="Amount"
                                        />
                                    </FormControl>
                                    <div className='item w-full h-full'>
                                        <TextField className='w-full' type="number" id="outlined-basic" label="Number of Rooms" variant="outlined"
                                            value={numberOfRooms} onChange={(e) => setNumberOfRooms(e.target.value)} />
                                    </div>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-multiple-chip-label">Amenities</InputLabel>
                                        <Select
                                            labelId="demo-multiple-chip-label"
                                            id="demo-multiple-chip"
                                            multiple
                                            value={selectedAmenities}
                                            onChange={(e) => setSelectedAmenities(e.target.value)}
                                            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                            renderValue={(selected) => (
                                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                    {selected.map((value) => (
                                                        <Chip key={value.title} label={value.title} />
                                                    ))}
                                                </Box>
                                            )}
                                            MenuProps={MenuProps}
                                        >
                                            {amenities.map((amenity) => (
                                                <MenuItem
                                                    key={amenity.id}
                                                    value={amenity}
                                                >
                                                    {amenity.title}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-multiple-chip-label">Complements</InputLabel>
                                        <Select
                                            labelId="demo-multiple-chip-label"
                                            id="demo-multiple-chip"
                                            multiple
                                            value={selectedComplements}
                                            onChange={(e) => setSelectedComplements(e.target.value)}
                                            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                            renderValue={(selected) => (
                                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                    {selected.map((value) => (
                                                        <Chip key={value.title} label={value.title} />
                                                    ))}
                                                </Box>
                                            )}
                                            MenuProps={MenuProps}
                                        >
                                            {complements.map((amenity) => (
                                                <MenuItem
                                                    key={amenity.id}
                                                    value={amenity}
                                                >
                                                    {amenity.title}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                    <div className="mt-6 flex justify-start space-x-4">
                                        {!isLoading ? <button
                                            type="button"
                                            className="text-white font-medium flex items-center py-[7px] px-[22px] rounded-[5px] bg-[#666666] text-sm leading-6 uppercase hover:bg-[#1A1A1A]/50"
                                            onClick={saveRoomType}
                                        >
                                            Save Change
                                        </button> :
                                            <CircularProgress color="inherit" />}
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

export default NewRoomType;