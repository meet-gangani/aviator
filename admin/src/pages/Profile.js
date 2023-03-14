import React from 'react'
import PageTitle from '../components/Typography/PageTitle'

function Profile() {
  return (
      <div className="h-full">
        <PageTitle>Profile</PageTitle>
        <div className="border-b-3 block md:flex">
          <div className="w-full md:w-2/5 p-4 sm:p-6 lg:p-8 bg-white shadow-md">
            <div className="text-center">
              <a className="font-bold">Jamed Allan</a>
            </div>
            <div className="w-full p-8 mx-2 flex justify-center">
              <img className="w-32 h-32 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="Rounded avatar"/>
            </div>
            <div>
              <div className="flex w-full items-center justify-center bg-grey-lighter">
                <label className="w-48 flex flex-col items-center py-2 bg-orange-700	 text-white rounded shadow-lg tracking-wide  border border-blue cursor-pointer ">
                  <span className="leading-normal">Upload New Photo</span>
                  <input type="file" className="hidden"/>
                </label>
              </div>
              <div className="box-border border mt-5">
                <a className="text-center">Upload a new avatar.Larger image will be resized automatically.</a>
                <a>ax</a>
              </div>
            </div>
          </div>

          <div className="w-full md:w-3/5 bg-white lg:ml-4 shadow-md  ">
            <div className="bg-gray-300	w-full p-4">
              <h1 className="text-4xl font-medium	 text-gray-900 dark:text-white">Edit Profile</h1>
              <div className="w-full mt-4 row-auto">
                <a>User info</a>
                <a className="px-3">Billing Information</a>
              </div>
            </div>
            <form className="w-full p-8">
              <div className="flex -mx-3 mb-6 mt-8">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="block  tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                    User Name
                  </label>
                  <input className="appearance-none block w-full  text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                         id="grid-first-name" type="text" placeholder="Jane"/>
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label className="block  tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                    Full Name
                  </label>
                  <input
                      className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-last-name" type="text" placeholder="Doe"/>
                </div>
              </div>
              <div className="flex -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3">
                  <label className="block  tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                    Password
                  </label>
                  <input
                      className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-password" type="password" placeholder="******************"/>
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label className="block  tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                    Confirm Password
                  </label>
                  <input
                      className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-password" type="password" placeholder="******************"/>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full md:w-1/2 px-3">
                  <label htmlFor="email" className="block  tracking-wide text-gray-700 text-xs font-bold mb-2">Email Address</label>
                  <input type="email" id="email"
                         className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                         placeholder="name@flowbite.com" required/>
                </div>
              </div>
              <div className="flex px-3 -mx-3 mb-6 gap-5">
                <div
                    className="flex w-full md:w-1/2  appearance-none block w-full text-gray-700 border border-gray-200 rounded pl-2  mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                  <label className="inline-flex items-center border border-l-0 border-b-0 border-t-0 rounded-l-md pr-2 dark:bg-gray-600 dark:text-gray-400 ">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="30px" height="30px">
                      <linearGradient id="Ld6sqrtcxMyckEl6xeDdMa" x1="9.993" x2="40.615" y1="9.993" y2="40.615" gradientUnits="userSpaceOnUse">
                        <stop offset="0" stop-color="#2aa4f4"/>
                        <stop
                            offset="1" stop-color="#007ad9"/>
                      </linearGradient>
                      <path fill="url(#Ld6sqrtcxMyckEl6xeDdMa)" d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z"/>
                      <path
                          fill="#fff"
                          d="M26.707,29.301h5.176l0.813-5.258h-5.989v-2.874c0-2.184,0.714-4.121,2.757-4.121h3.283V12.46 c-0.577-0.078-1.797-0.248-4.102-0.248c-4.814,0-7.636,2.542-7.636,8.334v3.498H16.06v5.258h4.948v14.452 C21.988,43.9,22.981,44,24,44c0.921,0,1.82-0.084,2.707-0.204V29.301z"/>
                    </svg>
                  </label>
                  <input type="email" id="email"
                         className="appearance-none block w-full  text-gray-700  rounded py-3 px-5 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                         placeholder="name@flowbite.com" required/>
                </div>
                <div
                    className="flex w-full md:w-1/2  appearance-none block w-full text-gray-700 border border-gray-200 rounded pl-2  mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                  <label className="inline-flex items-center border border-l-0 border-b-0 border-t-0 rounded-l-md pr-2 dark:bg-gray-600 dark:text-gray-400 ">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="30px" height="30px">
                      <linearGradient id="Ld6sqrtcxMyckEl6xeDdMa" x1="9.993" x2="40.615" y1="9.993" y2="40.615" gradientUnits="userSpaceOnUse">
                        <stop offset="0" stop-color="#2aa4f4"/>
                        <stop
                            offset="1" stop-color="#007ad9"/>
                      </linearGradient>
                      <path fill="url(#Ld6sqrtcxMyckEl6xeDdMa)" d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z"/>
                      <path
                          fill="#fff"
                          d="M26.707,29.301h5.176l0.813-5.258h-5.989v-2.874c0-2.184,0.714-4.121,2.757-4.121h3.283V12.46 c-0.577-0.078-1.797-0.248-4.102-0.248c-4.814,0-7.636,2.542-7.636,8.334v3.498H16.06v5.258h4.948v14.452 C21.988,43.9,22.981,44,24,44c0.921,0,1.82-0.084,2.707-0.204V29.301z"/>
                    </svg>
                  </label>
                  <input type="email" id="email"
                         className="appearance-none block w-full  text-gray-700  rounded py-3 px-5 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                         placeholder="name@flowbite.com" required/>
                </div>
              </div>
              <button className="w-40 flex flex-col items-center py-2 bg-orange-700	 text-white rounded shadow-lg tracking-wide  border border-blue cursor-pointer ">
                Update info
              </button>
            </form>
          </div>
        </div>
      </div>
  )
}

export default Profile