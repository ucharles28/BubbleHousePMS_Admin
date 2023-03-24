import { ArrowLeft2, Call, DirectNotification, Flag, Notification, Profile2User, Send2, Star1 } from 'iconsax-react';
import { FiCheck, FiMoreHorizontal } from 'react-icons/fi';
import { forwardRef, Fragment, useEffect, useRef, useState } from 'react';
import { get, postData } from '../helpers/ApiRequest';
import Layout from '../components/Layout';
import { CircularProgress, Snackbar } from '@mui/material';
import { Tabs, Drawer } from 'antd';
import Link from 'next/link';
import { Menu, Transition, Popover } from "@headlessui/react";
import { useRouter } from 'next/router';
// import { Drawer } from 'antd';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import MuiAlert from '@mui/material/Alert';
import { format } from "date-fns";


function Notifications() {
    const Alert = forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const [connection, setConnection] = useState(null);
    const [messageText, setMessageText] = useState('');
    const [chats, setChats] = useState([]);
    const [messages, setMessages] = useState([]);
    const [currentChat, setCurrentChat] = useState();
    const [newMessage, setNewMessage] = useState();
    const [user, setUser] = useState();
    const [alertType, setAlertType] = useState('');
    const [alertMessage, setAlertMessage] = useState('');


    const showAlert = (alertMessage, alertType) => {
        setAlertMessage(alertMessage)
        setOpenAlert(true)
        setAlertType(alertType)
    }

    useEffect(() => {
        const userObj = JSON.parse(localStorage.getItem('user'))
        setUser(userObj)

        const connect = new HubConnectionBuilder()
            // .withUrl("https://localhost:7298/chat")
            .withUrl("https://bcloud.azurewebsites.net/chat")
            .withAutomaticReconnect([0, 2000, 10000, 30000, 450000, 60000])
            .build();
        connect.serverTimeoutInMilliseconds = 600000

        setConnection(connect);

        getAllManagers(userObj);
    }, []);

    useEffect(() => {
        if (newMessage) {
            if (currentChat) {
                if (currentChat.id === newMessage.chatId) {
                    setMessages((prev) => [...prev, newMessage])
                    setMessageText('')
                }
            }
            //Update chat
            var list = [...chats]
            setChats(list.map((chat) => {
                if (chat.id === newMessage.chatId) {
                    chat.lastMessageSent = newMessage.text
                }
                return chat
            }))
        }
    }, [newMessage]);

    useEffect(() => {
        if (connection) {
            connection
                .start()
                .then(async () => {
                    try {



                        // setChats(chatResponse.map((chat) => {
                        //     //Get abbrevated version of the customer's name
                        //     const splitName = chat.customer.fullName.split(' ')
                        //     chat.abbreviatedName = `${splitName[0].substring(0, 1).toUpperCase()}${splitName[1].substring(0, 1).toUpperCase()}`
                        //     return chat
                        // }))


                        //SignalR Subscriptions
                        // connection.on('ReceiveGetChats', (chatsResponse) => {
                        //     setChats(chatsResponse.map((chat) => {
                        //         //Get abbrevated version of the customer's name
                        //         const splitName = chat.customer.fullName.split(' ')
                        //         chat.abbreviatedName = `${splitName[0].substring(0, 1).toUpperCase()}${splitName[1].substring(0, 1).toUpperCase()}`
                        //         return chat
                        //     }))
                        //     //Subscribe chat 
                        //     for (let i = 0; i < chatsResponse.length; i++) {
                        //         connection.off(chatsResponse[i].id)
                        //         connection.on(chatsResponse[i].id, (message) => {
                        //             setNewMessage(message)
                        //         });
                        //     }
                        // });

                        var chatsResponse = await connection.invoke("GetChats", user.id);
                        setChats(chatsResponse.map((chat) => {
                            //Get abbrevated version of the customer's name
                            const splitName = chat.customer.fullName.split(' ')
                            chat.abbreviatedName = `${splitName[0].substring(0, 1).toUpperCase()}${splitName[1].substring(0, 1).toUpperCase()}`
                            return chat
                        }))
                        //Subscribe chat 
                        for (let i = 0; i < chatsResponse.length; i++) {
                            connection.off(chatsResponse[i].id)
                            connection.on(chatsResponse[i].id, (message) => {
                                setNewMessage(message)
                            });
                        }

                        // connection.on('ReceiveGetChatHistory', (messagesResponse) => {
                        //     debugger
                        //     setMessages(messagesResponse)
                        // });


                    } catch (err) {
                        console.error(err);
                    }


                })
                .catch((error) => console.log(error));
        }
    }, [connection]);

    const [openDialog, setOpenDialog] = useState(false);

    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const reassignChat = async (admin) => {
        debugger
        const req = {
            adminId: admin.id,
            chatId: currentChat.id
        }

        try {
            var chatId = await connection.invoke('ReAssignChat', req);
            let list = [...chats]

            list.splice(list.findIndex(function (chat) {
                return chat.id === chatId;
            }), 1);
            console.log(list)
            setChats(list)
            setMessages([])
            setCurrentChat('')
            setOpenDialog(false);
            showAlert('Chat has been reassigned successfully', 'success')
        }
        catch (e) {
            console.log(e);
        }
    };

    const sendMessage = async () => {
        if (!messageText) {
            return
        }

        const messageObj = {
            senderId: user.id,
            text: messageText,
            chatId: currentChat.id
        }

        try {
            await connection.send('SendMessage2', messageObj);
        }
        catch (e) {
            console.log(e);
        }

    };

    const handleClose = () => {
        setOpenDialog(false);
    };
    const { TabPane } = Tabs;

    const [openAlert, setOpenAlert] = useState(false);
    const [open, setOpen] = useState(false);
    const showDrawer = (chat) => {
        setOpen(true);
        selectChat(chat)
    };

    const selectChat = async (chat) => {
        setCurrentChat(chat)
        const messagesResponse = await connection.invoke("GetChatHistory", chat.id);
        setMessages(messagesResponse)
    };

    const onClose = () => {
        setOpen(false);
    };

    const { query } = useRouter();
    const id = query.id;

    const getAllManagers = async (userObj) => {
        const response = await get('User/GetAllAdmins')
        if (response.successful) {
            console.log(response.data)
            setAdmins(response.data)
        }
    }

    const [admins, setAdmins] = useState([]);
    const [selectedManager, setSelectedManager] = useState();
    const handleChange = (event) => {
        setSelectedManager(event.target.value)
    }


    return (
        <div className='min-h-screen font-poppins'>
            <Layout>
                <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={alertType} sx={{ width: '100%' }}>
                        {alertMessage}
                    </Alert>
                </Snackbar>
                <div className='w-full h-full py-6 flex flex-col gap-4'>

                    <p className='block w-full text-lg font-medium text-[#1A1A1A] leading-6'>
                        Messages
                    </p>

                    <div className="h-full w-full grid grid-cols-1 md:grid-cols-3">
                        <div className='col-span-1 py-1 h-full text-sm'>
                            <Tabs defaultActiveKey="all">
                                <TabPane tab="All" key="all">
                                    <div className='w-full flex flex-col items-start md:overflow-hidden md:h-screen md:scrollbar-thin md:scroll-smooth md:scrollbar-thumb-gray-300 md:scrollbar-rounded-full md:scrollbar-thumb-rounded-full'>

                                        {/* <div className="w-full">
                                                <div className="relative">
                                                    <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-4 h-4 text-gray-400">
                                                            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                                        </svg>
                                                    </span>
                                                    <input type="search" className="pl-8 w-full flex outline-none h-auto border-[1.5px] border-gray-200 bg-white rounded-lg p-2 font-normal placeholder:text-xs" name="search" placeholder="Search Messages.." />
                                                </div>
                                            </div> */}

                                        {chats.map((chat) => (<div key={chat.id} className='hidden md:flex flex-col w-full active:bg-white border-b border-gray-200 p-3 cursor-pointer'
                                            onClick={() => selectChat(chat)}>

                                            <div className='flex items-start justify-between w-full'>
                                                <div className='flex items-start gap-x-2'>
                                                    <div className='flex justify-center rounded-full tracking-wide relative items-center w-10 h-10 bg-blue-400 text-white text-sm font-semibold'>
                                                        <p>{chat.abbreviatedName}</p>
                                                    </div>
                                                    <p className='text-sm text-gray-600 font-semibold leading-4'>{chat.customer.fullName}</p>
                                                </div>

                                                <p className='text-xs text-gray-600 font-normal'>{format(new Date(chat.createdDate), 'dd MMM yyyy')}</p>
                                            </div>

                                            <div className='-mt-5 leading-6 flex flex-col ml-12'>
                                                <p className='text-xs text-gray-700 font-normal'>
                                                    {chat.lastMessageSent}
                                                </p>
                                            </div>

                                        </div>))}

                                        {chats.map((chat) => (<div
                                            key={chat.id}
                                            className='md:hidden flex flex-col w-full active:bg-white border-b border-gray-200 p-3 cursor-pointer'
                                            onClick={showDrawer}
                                        >

                                            <div className='flex items-start justify-between w-full'>
                                                <div className='flex items-start gap-x-2'>
                                                    <div className='flex justify-center rounded-full tracking-wide relative items-center w-10 h-10 bg-blue-400 text-white text-sm font-semibold'>
                                                        <p>{chat.abbreviatedName}</p>
                                                    </div>
                                                    <p className='text-sm text-gray-600 font-semibold leading-4'>{chat.customer.fullName}</p>
                                                </div>

                                                <p className='text-xs text-gray-600 font-normal'>{format(new Date(chat.createdDate), 'dd MMM yyyy')}</p>
                                            </div>

                                            <div className='-mt-5 leading-6 flex flex-col ml-12'>
                                                <p className='text-xs text-gray-700 font-normal'>
                                                    {chat.lastMessageSent}
                                                </p>
                                            </div>

                                        </div>))}

                                    </div>
                                </TabPane>
                                {/* <TabPane tab="Closed" key="close">
                                    Closed Message
                                </TabPane>
                                <TabPane tab="All" key="all">
                                    All Messages
                                </TabPane> */}
                            </Tabs>
                        </div>
                        <div className='md:block hidden col-span-2 bg-white border border-gray-50 drop-shadow-sm h-auto text-sm'>

                            <div className='bg-white drop-shadow-sm flex flex-col gap-y-3 w-full py-10 px-7 border-b'>
                                {currentChat && <p className='text-gray-800 font-semibold leading-6 text-lg'>{currentChat.customer.fullName}</p>}
                                <div className='flex items-center w-full justify-between'>

                                    <div className='flex gap-x-2 items-center'>
                                        <Flag variant='Bold' size={16} className='text-blue-400' />
                                        <p className='text-xs leading-5 font-normal text-gray-500'>Technical Problem</p>
                                    </div>

                                    <div className='flex items-center gap-x-2'>
                                        {/* <div className='cursor-pointer flex items-center gap-x-2 text-gray-500 rounded-md px-2 py-1 border border-[#E4E4E4] bg-gray-50 hover:bg-gray-100'>
                                            <FiCheck size={14} />
                                            <p className='text-xs font-normal leading-6'>Mark as Closed</p>
                                        </div> */}

                                        {/* When Message has been closed */}
                                        {/* <div className='flex items-center gap-x-2 text-[#1ee0ac] rounded-md px-2 py-1 border border-[#e6fcf6] bg-[#e6fcf6]'>
                                                <FiCheck size={14} />
                                                <p className='text-xs font-normal leading-6'>Closed</p>
                                            </div> */}
                                        {currentChat && <Popover as="div" className="relative inline-block">
                                            <div>
                                                <Popover.Button className='text-gray-500 p-1 border rounded-md hover:bg-gray-100' >
                                                    <FiMoreHorizontal size={20} />
                                                </Popover.Button>
                                            </div>
                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform scale-95"
                                                enterTo="transform scale-100"
                                                leave="transition ease-in duration=75"
                                                leaveFrom="transform scale-100"
                                                leaveTo="transform scale-95"
                                            >
                                                <Popover.Panel className="absolute right-0 w-48 z-50 mt-2 origin-top-right bg-white border border-[#E4E4E4] rounded-md shadow-lg">
                                                    <div className='flex flex-col w-full gap-y-3 px-1 py-2'>
                                                        <div
                                                            className='flex items-center gap-x-2 p-2 hover:bg-[#FFF7D8] hover:text-[#D4AA00] rounded-md text-xs font-normal text-gray-500 cursor-pointer'
                                                            onClick={handleClickOpen}
                                                        >
                                                            <Profile2User size={16} />
                                                            Assign To Member
                                                        </div>
                                                        {/* <div className='flex items-center gap-x-2 p-2 hover:bg-[#FFF7D8] hover:text-[#D4AA00] rounded-md text-xs font-normal text-gray-500 cursor-pointer'>
                                                            <FiCheck size={16} />
                                                            Mark as Closed
                                                        </div> */}
                                                    </div>
                                                </Popover.Panel>
                                            </Transition>
                                        </Popover>}
                                        <Dialog open={openDialog} onClose={handleClose}>
                                            <DialogTitle
                                                className='font-poppins'
                                                sx={{
                                                    padding: "16px",
                                                    fontSize: "1rem",
                                                    letterSpacing: "0rem",
                                                    fontWeight: "600",
                                                    width: "300px",
                                                    color: "#364a63",
                                                }}
                                            >
                                                Assign users to this message
                                            </DialogTitle>
                                            <DialogContent
                                                sx={{
                                                    padding: "0px 12px 16px 12px",
                                                }}
                                            >
                                                <DialogContentText>
                                                    {admins.map((admin) => (<div
                                                        className='flex gap-x-2 px-1 items-center border-b border-[#E4E4E4] py-2 cursor-pointer hover:bg-gray-50 hover:rounded-md'
                                                        key={admin.id}
                                                        onClick={(e) => reassignChat(admin)}
                                                    >
                                                        <img src='' className='w-9 h-9 border bg-blue-400 rounded-full object-cover' />
                                                        <p className='text-sm font-medium leading-6 text-gray-500'>{admin.fullName}</p>
                                                    </div>))}
                                                </DialogContentText>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                </div>
                            </div>

                            {currentChat && <div className='flex flex-col gap-y-10 p-7 overflow-hidden h-[85vh] scrollbar-thin scroll-smooth scrollbar-thumb-gray-300 scrollbar-rounded-full scrollbar-thumb-rounded-full'>

                                <div className='flex flex-col w-full'>
                                    {messages.map((message) => {
                                        if (message.senderId != user.id) {
                                            return (
                                                <div className='flex items-center mb-3 justify-between w-full gap-y-2'>
                                                    <div className='flex items-start gap-x-2'>
                                                        <div className='flex justify-center rounded-full tracking-wide relative items-center w-10 h-10 bg-blue-400 text-white text-sm font-semibold'>
                                                            <p>{currentChat.abbreviatedName}</p>
                                                        </div>
                                                        {/* <p className='text-sm text-gray-600 font-semibold leading-4'>Abu Ibn Ishtiak</p> */}
                                                        <p className='text-xs text-gray-700 font-normal leading-6 ml-12'>
                                                            {message.text}
                                                        </p>
                                                    </div>
                                                    <p className='text-xs text-gray-600 font-normal'>{format(new Date(message.createdDate), 'dd MMM yyyy')}</p>
                                                </div>
                                            )
                                        } else {
                                            return (
                                                <div className='flex items-center mb-3 justify-end w-full gap-y-2'>
                                                    <div className='flex justify-end items-start gap-x-2'>
                                                        {/* <div className='flex justify-center rounded-full tracking-wide relative items-center w-10 h-10 bg-blue-400 text-white text-sm font-semibold'>
                                                            <p>{currentChat.abbreviatedName}</p>
                                                        </div> */}
                                                        {/* <p className='text-sm text-gray-600 font-semibold leading-4'>Abu Ibn Ishtiak</p> */}
                                                        <p className='text-xs text-gray-700 font-normal leading-6 ml-12'>
                                                            {message.text}
                                                        </p>
                                                        <p className='text-xs text-gray-600 font-normal'>{format(new Date(message.createdDate), 'dd MMM yyyy')}</p>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    })}
                                </div>

                                <div className='flex items-start gap-x-3 justify-between w-full'>
                                    <div className='w-full flex flex-col gap-y-2'>
                                        <textarea
                                            value={messageText}
                                            onChange={(e) => setMessageText(e.target.value)}
                                            spellCheck='true'
                                            placeholder='Start Typing..'
                                            rows={4}
                                            className='w-full border border-[#666666]/50 placeholder:text-[#808080] text-xs font-normal p-3 pl-2 focus:outline-0 bg-transparent rounded-md'
                                        >
                                        </textarea>
                                        <div>
                                            <button
                                                type="button"
                                                onClick={sendMessage}
                                                className="text-white font-medium flex items-center px-3 py-2 rounded-md bg-[#1a1a1a]/50 text-xs leading-6 hover:bg-[#636363]"
                                            >
                                                Reply
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            </div>}

                        </div>
                        <Drawer
                            placement="right"
                            onClose={onClose}
                            closable={true}
                            open={open}
                            closeIcon={<ArrowLeft2 size={16} className='text-gray-600' />}
                            bodyStyle={{ padding: "0" }}
                            title={
                                <div className='flex items-center justify-end gap-x-2'>
                                    {/* <div className='cursor-pointer flex items-center gap-x-2 text-gray-500 rounded-md px-2 py-1 border border-[#E4E4E4] bg-gray-50 hover:bg-gray-100'>
                                        <FiCheck size={14} />
                                        <p className='text-xs font-normal leading-6'>Mark as Closed</p>
                                    </div> */}

                                    {/* When Message has been closed */}
                                    {/* <div className='flex items-center gap-x-2 text-[#1ee0ac] rounded-md px-2 py-1 border border-[#e6fcf6] bg-[#e6fcf6]'>
                                                <FiCheck size={14} />
                                                <p className='text-xs font-normal leading-6'>Closed</p>
                                            </div> */}
                                    <Popover as="div" className="relative inline-block">
                                        <div>
                                            <Popover.Button className='text-gray-500 p-1 border rounded-md hover:bg-gray-100' >
                                                <FiMoreHorizontal size={20} />
                                            </Popover.Button>
                                        </div>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform scale-95"
                                            enterTo="transform scale-100"
                                            leave="transition ease-in duration=75"
                                            leaveFrom="transform scale-100"
                                            leaveTo="transform scale-95"
                                        >
                                            <Popover.Panel className="absolute right-0 w-48 z-50 mt-2 origin-top-right bg-white border border-[#E4E4E4] rounded-md shadow-lg">
                                                <div className='flex flex-col w-full gap-y-3 px-1 py-2'>
                                                    <div
                                                        className='flex items-center gap-x-2 p-2 hover:bg-[#FFF7D8] hover:text-[#D4AA00] rounded-md text-xs font-normal text-gray-500 cursor-pointer'
                                                        onClick={handleClickOpen}
                                                    >
                                                        <Profile2User size={16} />
                                                        Assign To Member
                                                    </div>
                                                    {/* <div className='flex items-center gap-x-2 p-2 hover:bg-[#FFF7D8] hover:text-[#D4AA00] rounded-md text-xs font-normal text-gray-500 cursor-pointer'>
                                                        <FiCheck size={16} />
                                                        Mark as Closed
                                                    </div> */}
                                                </div>
                                            </Popover.Panel>
                                        </Transition>
                                    </Popover>
                                    <Dialog open={openDialog} onClose={handleClose}>
                                        <DialogTitle
                                            className='font-poppins'
                                            sx={{
                                                padding: "16px",
                                                fontSize: "1rem",
                                                letterSpacing: "0rem",
                                                fontWeight: "600",
                                                width: "300px",
                                                color: "#364a63",
                                            }}
                                        >
                                            Assign users to this message
                                        </DialogTitle>
                                        <DialogContent
                                            sx={{
                                                padding: "0px 12px 16px 12px",
                                            }}
                                        >
                                            <DialogContentText>
                                                {admins.map((admin) => (<div
                                                    key={admin.id}
                                                    onClick={(e) => reassignChat(admin)}
                                                    className='flex gap-x-2 px-1 items-center border-b border-[#E4E4E4] py-2 cursor-pointer hover:bg-gray-50 hover:rounded-md'
                                                >
                                                    <img src='' className='w-9 h-9 border bg-blue-400 rounded-full object-cover' />
                                                    <p className='text-sm font-medium leading-6 text-gray-500'>{admin.fullName}</p>
                                                </div>))}
                                            </DialogContentText>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            }
                        >
                            <div className='flex flex-col px-5 pb-5 gap-y-10 overflow-hidden h-screen scrollbar-thin scroll-smooth scrollbar-thumb-gray-300 scrollbar-rounded-full scrollbar-thumb-rounded-full'>

                                <div className='bg-white drop-shadow-sm flex flex-col gap-y-2 py-7 w-full border-b'>
                                    <div className='flex gap-x-2 items-center'>
                                        <Flag variant='Bold' size={16} className='text-blue-400' />
                                        <p className='text-xs leading-5 font-normal text-gray-500'>Technical Problem</p>
                                    </div>
                                </div>

                                {messages.map((message) => {
                                    if (message.senderId != user.id) {
                                        return (
                                            <div className='flex items-center mb-3 justify-between w-full gap-y-2'>
                                                <div className='flex items-start gap-x-2'>
                                                    <div className='flex justify-center rounded-full tracking-wide relative items-center w-10 h-10 bg-blue-400 text-white text-sm font-semibold'>
                                                        <p>{currentChat.abbreviatedName}</p>
                                                    </div>
                                                    {/* <p className='text-sm text-gray-600 font-semibold leading-4'>Abu Ibn Ishtiak</p> */}
                                                    <p className='text-xs text-gray-700 font-normal leading-6 ml-12'>
                                                        {message.text}
                                                    </p>
                                                </div>
                                                <p className='text-xs text-gray-600 font-normal'>{format(new Date(message.createdDate), 'dd MMM yyyy')}</p>
                                            </div>
                                        )
                                    } else {
                                        return (
                                            <div className='flex items-center mb-3 justify-end w-full gap-y-2'>
                                                <div className='flex justify-end items-start gap-x-2'>
                                                    {/* <div className='flex justify-center rounded-full tracking-wide relative items-center w-10 h-10 bg-blue-400 text-white text-sm font-semibold'>
                                                            <p>{currentChat.abbreviatedName}</p>
                                                        </div> */}
                                                    {/* <p className='text-sm text-gray-600 font-semibold leading-4'>Abu Ibn Ishtiak</p> */}
                                                    <p className='text-xs text-gray-700 font-normal leading-6 ml-12'>
                                                        {message.text}
                                                    </p>
                                                    <p className='text-xs text-gray-600 font-normal'>{format(new Date(message.createdDate), 'dd MMM yyyy')}</p>
                                                </div>
                                            </div>
                                        )
                                    }
                                })}

                                <div className='flex items-start gap-x-3 justify-between w-full'>
                                    <div className='w-full flex flex-col gap-y-2'>
                                        <textarea
                                            spellCheck='true'
                                            placeholder='Start Typing..'
                                            rows={4}
                                            value={messageText}
                                            onChange={(e) => setMessageText(e.target.value)}
                                            className='w-full border border-[#666666]/50 placeholder:text-[#808080] text-xs font-normal p-3 pl-2 focus:outline-0 bg-transparent rounded-md'
                                        >
                                        </textarea>
                                        <div>
                                            <button
                                                type="button"
                                                onClick={(e) => sendMessage()}
                                                className="text-white font-medium flex items-center px-3 py-2 rounded-md bg-[#1a1a1a]/50 text-xs leading-6 hover:bg-[#636363]"
                                            >
                                                Reply
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </Drawer>
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default Notifications;