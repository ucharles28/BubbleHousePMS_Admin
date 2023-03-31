import { Alert, CircularProgress, Snackbar } from '@mui/material';
import { Switch } from 'antd';
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';

function Settings() {
  const [open, setOpen] = useState(false);
  const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [profileButtonIsLoading, setProfileButtonIsLoading] = useState(false);
  const [notifButtonIsLoading, setNotifButtonIsLoading] = useState(false);

  useEffect(() => {

  }, [])

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
                      <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </span>

                    <button
                      type="button"
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
                          name="last-name"
                          id="last-name"
                          autoComplete="family-name"
                          className="border border-gray-300 p-1 pl-2 text-xs text-gray-700 rounded-sm leading-5 placeholder:text-xs focus:outline-0 w-full"
                        />
                      </div>

                      <div className="col-span-6">
                        <label htmlFor="email-address" className="text-xs font-medium leading-5 text-gray-700">
                          Email address
                        </label>
                        <input
                          type="text"
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
                <p className="text-base font-medium leading-6 text-gray-800">Notifications</p>
              </div>

              <div className="md:col-span-2">
                <div className="space-y-3">

                  <div className="space-y-1">
                    <fieldset>

                      <div className="space-y-4">

                        <div className="flex items-start w-full gap-x-2">
                          <Switch
                            className='bg-gray-300 hover:bg-gray-400 checked:bg-yellow-500'
                          />
                          <div className="text-sm leading-6">
                            <label htmlFor="comments" className="font-medium text-gray-900">
                              New Customer
                            </label>
                            <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <div className="flex h-6 items-center">
                            <input
                              id="comments"
                              name="comments"
                              type="checkbox"
                              className="text-xs h-3 w-3 border leading-5 font-normal text-gray-700"
                            />
                          </div>
                          <div className="ml-3 text-sm leading-6">
                            <label htmlFor="comments" className="font-medium text-gray-900">
                              New Booking
                            </label>
                            <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex h-6 items-center">
                            <input
                              id="candidates"
                              name="candidates"
                              type="checkbox"
                              className="text-xs h-3 w-3 border leading-5 font-normal text-gray-700"
                            />
                          </div>
                          <div className="ml-3 text-sm leading-6">
                            <label htmlFor="candidates" className="font-medium text-gray-900">
                              Booking confirmation
                            </label>
                            <p className="text-gray-500">Get notified when a candidate applies for a job.</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex h-6 items-center">
                            <input
                              id="offers"
                              name="offers"
                              type="checkbox"
                              className="text-xs h-3 w-3 border leading-5 font-normal text-gray-700"
                            />
                          </div>
                          <div className="ml-3 text-sm leading-6">
                            <label htmlFor="offers" className="font-medium text-gray-900">
                              Check-In & Check-Out Notifications
                            </label>
                            <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex h-6 items-center">
                            <input
                              id="offers"
                              name="offers"
                              type="checkbox"
                              className="text-xs h-3 w-3 border leading-5 font-normal text-gray-700"
                            />
                          </div>
                          <div className="ml-3 text-sm leading-6">
                            <label htmlFor="offers" className="font-medium text-gray-900">
                              Booking cancellation
                            </label>
                            <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex h-6 items-center">
                            <input
                              id="comments"
                              name="comments"
                              type="checkbox"
                              className="text-xs h-3 w-3 border leading-5 font-normal text-gray-700"
                            />
                          </div>
                          <div className="ml-3 text-sm leading-6">
                            <label htmlFor="comments" className="font-medium text-gray-900">
                              New Message
                            </label>
                            <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
                          </div>
                        </div>
                      </div>
                    </fieldset>

                  </div>

                  <div className="flex justify-end w-full">
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md bg-yellow-500 py-2 px-3 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    >
                      Save
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