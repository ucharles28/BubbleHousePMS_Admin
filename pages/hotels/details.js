import { Checkbox, FormControlLabel, TextField, Button, Card, CardContent, FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@mui/material'
import { ArrowLeft2, SidebarRight } from 'iconsax-react'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import Layout from '../../components/Layout'
import Sidebar from '../../components/SideBar'
import { get, postData } from '../../helpers/ApiRequest';

function HotelDetails() {
    const { query } = useRouter();
    const id = query.id;

    const getAllManagers = async () => {
        const response = await get('User/GetAllManagers')
        if (response.successful) {
            setManagers(response.data)
        }
    }

    const getHotelById = async () => {
        // setIsLoading(true)
        const response = await get(`Hotel/${id}`)
        if (response.successful) {
            console.log(response.data)
            setHotelName(response.data.name)
            setDescription(response.data.description)
            setEmail(response.data.email)
            setPhone(response.data.phoneNumber)
            setAltPhone(response.data.altPhoneNumber)
            setNumberOfRooms(response.data.numberOfRooms)
            setSelectedManager(response.data.managerId)
            setHotelImageSrc(response.data.imageUrl)
            setCity(response.data.city)
            setAddress(response.data.address.line)
            setIsFeatured(response.data.isFeatured ? "Yes" : "No")
            console.log(selectedManager)
        } else {

        }
        // setIsLoading(false)
    }

    const saveHotel = async () => {
        setIsLoading(true)
        const formData = new FormData()
        formData.append("Name", hotelName)
        formData.append("Description", description)
        formData.append("Address", address)
        formData.append("Email", email)
        formData.append("PhoneNumber", phone)
        formData.append("AltPhoneNumber", altPhone)
        formData.append("ImageFile", hotelImageFile)
        formData.append("NumberOfRooms", numberOfRooms ? numberOfRooms : 0)
        formData.append("ManagerId", selectedManager)
        formData.append("Longitude", longitude ? longitude : 0)
        formData.append("Latitude", latitude ? latitude : 0)
        formData.append("IsFeatured", isFeatured === "Yes")
        formData.append("HotelId", id)

        const response = await postData('Hotel/Update', formData)
        if (response.successful) {
            alert('hotel update successfully')
        } else {
            alert(response.data)
        }
        setIsLoading(false)
    }

    const handleClick = () => {
        // 👇️ open file input box on click of other element
        inputRef.current.click();
    };

    const handleChange = (event) => {
        setSelectedManager(event.target.value)
    }

    const clearImage = (event) => {
        setHotelImageFile('')
        setHotelImageSrc('')
    }

    const handleFileChange = e => {
        setHotelImageFile(e.target.files[0])
        const reader = new FileReader();
        reader.onload = function (e) {
            setHotelImageSrc(e.target.result);
        };
        reader.readAsDataURL(e.target.files[0]);
    };

    const loadScript = (url, callback) => {
        console.log('got here')

        let script = document.createElement("script");
        script.type = "text/javascript";

        if (script.readyState) {
            script.onreadystatechange = function () {
                if (script.readyState === "loaded" || script.readyState === "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {
            script.onload = () => callback();
        }

        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    };

    function handleScriptLoad(updateAddress, inputRef) {
        console.log('got here')
        autoCompleteRef.current = new window.google.maps.places.Autocomplete(
            textboxRef.current,
            { types: ["address"], componentRestrictions: { country: "ng" } }
        );
        autoCompleteRef.current.setFields(["address_components", "formatted_address", "geometry"]);
        autoCompleteRef.current.addListener("place_changed", () =>
            handlePlaceSelect(updateAddress)
        );
    }

    async function handlePlaceSelect(updateAddress) {
        const addressObject = autoCompleteRef.current.getPlace();
        console.log(addressObject)
        setLatitude(addressObject.geometry.location.lat())
        setLongitude(addressObject.geometry.location.lng())
        const query = addressObject.formatted_address;
        updateAddress(query);
    }

    useEffect(() => {
        getAllManagers();
        if (id) {
            getHotelById()
        }
        loadScript(
            `https://maps.googleapis.com/maps/api/js?key=AIzaSyB8QN-9BQ2Gto1h0GfSOG78AzL-qHhDyPg&libraries=places`,
            () => handleScriptLoad(setAddress, inputRef)
        );
    }, [id])

    const goBack = () => {
        router.back()
    }

    //states
    const router = useRouter()
    const autoCompleteRef = useRef(null);
    const textboxRef = useRef(null);
    const inputRef = useRef(null);
    const [hotelName, setHotelName] = useState('');
    const [description, setDescription] = useState('');
    const [longitude, setLongitude] = useState();
    const [latitude, setLatitude] = useState();
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [altPhone, setAltPhone] = useState('');
    const [numberOfRooms, setNumberOfRooms] = useState('');
    const [managers, setManagers] = useState([]);
    const [selectedManager, setSelectedManager] = useState();
    const [hotelImageFile, setHotelImageFile] = useState();
    const [hotelImageSrc, setHotelImageSrc] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isFeatured, setIsFeatured] = useState('No');

    return (
        <div className='h-screen font-poppins'>
            <Layout>

                <div className='w-full h-full py-6 flex flex-col gap-4'>
                    <div className='flex justify-between w-full'>
                        <p className='w-full block text-xl font-medium text-[#1A1A1A] leading-8'>
                            Hotel Details
                        </p>

                        <div onClick={goBack} className="px-2 py-1 rounded-lg flex items-center cursor-pointer bg-white hover:bg-[#f9f9f9] border-2 border-[#E4E4E4] text-gray-600 hover:text-gray-800">
                            <ArrowLeft2 size={17} />
                            <span className="text-sm font-medium leading-6">Back</span>
                        </div>
                    </div>

                    <div className='bg-white border border-[#E4E4E4] shadow rounded-lg w-full overflow-auto p-4 py-5'>
                        <div className="flex md:flex-row flex-col items-center gap-3 w-full h-full">

                            <div className='item md:w-1/3 w-full md:h-screen h-full'>
                                <div className='flex flex-col gap-4 items-center'>

                                    <div className="rounded-lg h-36 w-36 bg-[#1A1A1A]/25 flex items-center">

                                        {!hotelImageSrc ? <span className='flex items-center justify-center m-auto'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M5.74 16c.11-.49-.09-1.19-.44-1.54l-2.43-2.43c-.76-.76-1.06-1.57-.84-2.27.23-.7.94-1.18 2-1.36l3.12-.52c.45-.08 1-.48 1.21-.89l1.72-3.45C10.58 2.55 11.26 2 12 2s1.42.55 1.92 1.54l1.72 3.45c.13.26.4.51.69.68L5.56 18.44c-.14.14-.38.01-.34-.19L5.74 16ZM18.7 14.462c-.36.36-.56 1.05-.44 1.54l.69 3.01c.29 1.25.11 2.19-.51 2.64a1.5 1.5 0 0 1-.9.27c-.51 0-1.11-.19-1.77-.58l-2.93-1.74c-.46-.27-1.22-.27-1.68 0l-2.93 1.74c-1.11.65-2.06.76-2.67.31-.23-.17-.4-.4-.51-.7l12.16-12.16c.46-.46 1.11-.67 1.74-.56l1.01.17c1.06.18 1.77.66 2 1.36.22.7-.08 1.51-.84 2.27l-2.42 2.43Z" fill="#666666"></path></svg>
                                        </span> :
                                            <img src={hotelImageSrc} className='rounded-lg h-36 w-36 bg-[#1A1A1A]/25 object-cover' />}
                                    </div>

                                    <input
                                        style={{ display: 'none' }}
                                        ref={inputRef}
                                        type="file"
                                        onChange={handleFileChange}
                                    />

                                    <button
                                        type="button"
                                        className="text-white font-medium flex items-center py-[7px] px-[22px] rounded-[5px] bg-[#666666] text-sm leading-6 uppercase hover:bg-[#1A1A1A]/50"
                                        onClick={handleClick}
                                    >
                                        Upload photo
                                    </button>

                                    <button
                                        type="button"
                                        className="text-[#666666] font-medium flex items-center py-[7px] px-[22px] rounded-[5px] border-[#666666] border-[1.2px] text-sm leading-6 uppercase hover:bg-[#666666] hover:text-white"
                                        onClick={clearImage}
                                    >
                                        Reset
                                    </button>

                                    <span className="text-xs leading-5 font-normal">
                                        Allow JPEG, GIF, or PNG. Max size of 800KB
                                    </span>
                                </div>
                            </div>

                            <div className='item w-full h-full'>
                                <div className='flex flex-col gap-4 w-full'>
                                    <TextField className='w-full' id="outlined-basic" label="Hotel Name" variant="outlined"
                                        value={hotelName} onChange={(e) => setHotelName(e.target.value)} />

                                    <TextField className='w-full' id="outlined-basic" label="Description" multiline rows={3} variant="outlined"
                                        value={description} onChange={(e) => setDescription(e.target.value)} />

                                    {/* <TextField className='w-full' id="outlined-basic" label="Address" variant="outlined"
                                            value={address} onChange={(e) => setAddress(e.target.value)} /> */}
                                    <input type="text"
                                        value={address}
                                        onChange={event => setAddress(event.target.value)} ref={textboxRef} className='w-full border-2 text-md p-3 rounded focus:border-blue-400' placeholder='Enter address...' />

                                    <TextField className='w-full' id="outlined-basic" label="State/City" variant="outlined"
                                        value={city} onChange={(e) => setCity(e.target.value)} />

                                    <TextField className='w-full' id="outlined-basic" label="Email Address" variant="outlined"
                                        value={email} onChange={(e) => setEmail(e.target.value)} />

                                    <TextField className='w-full' id="outlined-basic" label="Phone Number" variant="outlined"
                                        value={phone} onChange={(e) => setPhone(e.target.value)} />

                                    <TextField className='w-full' id="outlined-basic" label="Alternative Phone Number" variant="outlined"
                                        value={altPhone} onChange={(e) => setAltPhone(e.target.value)} />

                                    <TextField className='w-full' type="number" id="outlined-basic" label="Number of Rooms" variant="outlined"
                                        value={numberOfRooms} onChange={(e) => setNumberOfRooms(e.target.value)} />

                                    <FormControl fullWidth>
                                        <InputLabel id="Manager Assigned">Manager Assigned</InputLabel>
                                        <Select
                                            labelId="Manager Assigned"
                                            id="outlined-basic"
                                            value={selectedManager}
                                            onChange={handleChange}
                                        >
                                            {managers.map((manager) => <MenuItem value={manager.id}>{manager.fullName}</MenuItem>)}
                                        </Select>
                                    </FormControl>

                                    <FormControl fullWidth>
                                        <InputLabel id="Is Featured?">Is Featured?</InputLabel>
                                        <Select
                                            labelId="Is Featured?"
                                            id="outlined-basic"
                                            value={isFeatured}
                                            onChange={(event) => setIsFeatured(event.target.value)}
                                        >
                                            <MenuItem value="Yes">Yes</MenuItem>
                                            <MenuItem value="No">No</MenuItem>
                                        </Select>
                                    </FormControl>

                                    <div className="flex items-center w-full gap-4">
                                        <button
                                            type="button"
                                            className="text-white font-medium flex items-center py-2 px-5 rounded-md bg-[#666666] text-sm leading-6 uppercase hover:bg-[#1A1A1A]/50"
                                            onClick={saveHotel}
                                            disabled={!hotelName || !description || !address || !email || !phone || !numberOfRooms || !selectedManager}
                                        >
                                            {isLoading ? <CircularProgress size={20} color="inherit" /> : 'Save Changes'}
                                        </button>

                                        <button
                                            type="button"
                                            className="text-[#666666] font-medium flex items-center py-2 px-5 rounded-md border-[#666666] border-[1.2px] text-sm leading-6 uppercase hover:bg-[#666666] hover:text-white"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>

            </Layout >
        </div >
    )
}

export default HotelDetails;