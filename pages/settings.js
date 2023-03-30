import { Alert, CircularProgress, Snackbar } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import Layout from '../components/Layout';
import { post, postData } from '../helpers/ApiRequest';

function Settings() {
  const [open, setOpen] = useState(false);
  const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileButtonIsLoading, setProfileButtonIsLoading] = useState(false);
  const [notifButtonIsLoading, setNotifButtonIsLoading] = useState(false);
  const [userImageFile, setUserImageFile] = useState();
  const [userImageSrc, setUserImageSrc] = useState();
  const [user, setUser] = useState();
  const inputRef = useRef(null);


  useEffect(() => {
    const userObj = JSON.parse(localStorage.getItem('user'))
    setUserImageSrc(userObj.profileImageUrl)
    const splitStr = userObj.fullName.split(' ')
    setUserImageSrc(userObj.profileImageUrl)
    setFirstName(splitStr[0])
    setEmail(userObj.email)
    setLastName(splitStr.length > 1 ? splitStr[1] : '')
    setUser(userObj)
  }, [])

  const handleClick = () => {
    // 👇️ open file input box on click of other element
    inputRef.current.click();
  };

  const handleFileChange = e => {
    setUserImageFile(e.target.files[0])
    const reader = new FileReader();
    reader.onload = function (e) {
      setUserImageSrc(e.target.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleUpdateProfile = async () => {
    setProfileButtonIsLoading(true)
    const formData = new FormData()
    formData.append("FullName", `${firstName} ${lastName}`)
    formData.append("Email", email)
    formData.append("ProfileImage", userImageFile)
    formData.append("UserId", user.id)

    const response = await postData('User/UpdateProfile', formData)
    if (response.successful) {
      user.email = response.data.email
      user.fullName = response.data.fullName
      user.profileImageUrl = response.data.profileImageUrl
      localStorage.setItem('user', JSON.stringify(user))
      showAlert('Profile saved successfully', 'success')
    } else {
      showAlert(response.data, 'error')
    }
    setProfileButtonIsLoading(false)
  }

  const handleChangePassword = async () => {
    if (newPassword != confirmPassword) {
      showAlert("Your new password and confirm password don't match, kindly try again", "error")
      return;
    }
    if (newPassword.length < 8) {
      showAlert("Your password should be at least 8 characters long", "error")
      return;
    }

    setNotifButtonIsLoading(true)
    const req = {
      newPassword,
      oldPassword,
      userId: user.id
    }

    const response = await post('User/ChangePassword', req)
    if (response.successful) {
      showAlert('Password changed successfully', 'success')
      setOldPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } else {
      showAlert(response.data, 'error')
    }
    setNotifButtonIsLoading(false)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const saveProfile = () => {
    setProfileButtonIsLoading(true)

    setTimeout(() => {
      setProfileButtonIsLoading(false)

    }, 3000);
  };

  const showAlert = (alertMessage, alertType) => {
    setAlertMessage(alertMessage)
    setOpen(true)
    setAlertType(alertType)
  }


  return (
    <div className='h-full font-poppins'>
      <Layout>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={alertType} sx={{ width: '100%' }}>
            {alertMessage}
          </Alert>
        </Snackbar>
        <div className='w-full h-full py-6 flex flex-col gap-6'>
          <p className='w-full block text-lg font-medium text-[#1A1A1A] leading-6'>
            Settings
          </p>

          <div className='bg-white border border-gray-50 shadow rounded-lg w-full overflow-auto h-auto p-2'>

            <div className="md:grid md:grid-cols-3 md:gap-6">

              <div className="md:col-span-1">
                <p className="text-base font-medium leading-6 text-gray-800">Personal Information</p>
              </div>

              <div className="md:col-span-2">
                <div className='space-y-1 my-3'>
                  <div className="flex items-center space-x-4">

                    <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                      {!userImageSrc ? <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg> : <img className='object-cover' src={userImageSrc} />}
                    </span>

                    <input
                      style={{ display: 'none' }}
                      ref={inputRef}
                      type="file"
                      onChange={handleFileChange}
                    />

                    <button
                      type="button"
                      onClick={handleClick}
                      className="rounded-md border border-gray-300 bg-white py-1.5 px-2.5 text-xs font-semibold text-gray-900 shadow-sm hover:bg-gray-50"
                    >
                      Change
                    </button>

                  </div>
                </div>
                <div className="space-y-3">

                  <div className="space-y-1">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="first-name" className="text-xs font-medium leading-5 text-gray-700">
                          First name
                        </label>
                        <input
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          name="first-name"
                          id="first-name"
                          autoComplete="given-name"
                          className="border border-gray-300 p-1 pl-2 text-xs text-gray-700 rounded-sm leading-5 placeholder:text-xs focus:outline-0 w-full"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="last-name" className="text-xs font-medium leading-5 text-gray-700">
                          Last name
                        </label>
                        <input
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          name="last-name"
                          id="last-name"
                          autoComplete="family-name"
                          className="border border-gray-300 p-1 pl-2 text-xs text-gray-700 rounded-sm leading-5 placeholder:text-xs focus:outline-0 w-full"
                        />
                      </div>

                      <div className="col-span-6">
                        <label htmlFor="Confirm password" className="text-xs font-medium leading-5 text-gray-700">
                          Email address
                        </label>
                        <input
                          type="text"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          name="email-address"
                          id="email-address"
                          autoComplete="email"
                          className="border border-gray-300 p-1 pl-2 text-xs text-gray-700 rounded-sm leading-5 placeholder:text-xs focus:outline-0 w-full"
                        />
                      </div>

                    </div>
                  </div>

                  <div className="flex justify-end w-full">
                    <button
                      type="submit"
                      onClick={handleUpdateProfile}
                      disabled={!firstName || !lastName || !email}
                      className="inline-flex justify-center rounded-md bg-yellow-500 py-2 px-3 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    >
                      {profileButtonIsLoading ? <CircularProgress size={24} color="inherit" /> : 'Save'}
                    </button>
                  </div>

                </div>
              </div>

            </div>

            <div className="hidden sm:block" aria-hidden="true">
              <div className="py-5">
                <div className="border-t border-gray-200" />
              </div>
            </div>

            <div className="md:grid md:grid-cols-3 md:gap-6">

              <div className="md:col-span-1">
                <p className="text-base font-medium leading-6 text-gray-800">Change Password</p>
              </div>

              <div className="md:col-span-2">
                <div className="space-y-3">

                  <div className="space-y-1">
                    <div className="grid grid-cols-6 gap-6">
                      {/* <legend className="sr-only">By Email</legend>
                      <div className="text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">
                        By Email
                      </div> */}
                      <div className="col-span-6">
                        <label htmlFor="old-password" className="text-xs font-medium leading-5 text-gray-700">
                          Old password
                        </label>
                        <input
                          type="password"
                          value={oldPassword}
                          onChange={(e) => setOldPassword(e.target.value)}
                          name="old-password"
                          id="old-password"
                          className="border border-gray-300 p-1 pl-2 text-xs text-gray-700 rounded-sm leading-5 placeholder:text-xs focus:outline-0 w-full"
                        />
                      </div>
                      <div className="col-span-6">
                        <label htmlFor="new-password" className="text-xs font-medium leading-5 text-gray-700">
                          New password
                        </label>
                        <input
                          type="password"
                          name="new-password"
                          id="new-password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="border border-gray-300 p-1 pl-2 text-xs text-gray-700 rounded-sm leading-5 placeholder:text-xs focus:outline-0 w-full"
                        />
                      </div>
                      <div className="col-span-6">
                        <label htmlFor="confirm-password" className="text-xs font-medium leading-5 text-gray-700">
                          Confirm password
                        </label>
                        <input
                          type="password"
                          name="confirm-password"
                          id="confirm-password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="border border-gray-300 p-1 pl-2 text-xs text-gray-700 rounded-sm leading-5 placeholder:text-xs focus:outline-0 w-full"
                        />
                      </div>
                    </div>

                  </div>

                  <div className="flex justify-end w-full">
                    <button
                      type="submit"
                      onClick={handleChangePassword}
                      disabled={!oldPassword || !newPassword || !confirmPassword}
                      className="inline-flex justify-center rounded-md bg-yellow-500 py-2 px-3 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    >
                      {notifButtonIsLoading ? <CircularProgress size={24} color="inherit" /> : 'Save'}
                    </button>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </Layout>
    </div>
  )
}

export default Settings;