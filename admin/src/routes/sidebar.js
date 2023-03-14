/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const routes = [
  {
    path: '/app/dashboard', // the url
    icon: 'MdDashboardCustomize', // the component being exported from icons/index.js
    name: 'Dashboard' // name that appear in Sidebar
  },
  {
    path: '/app/services',
    icon: 'MdMiscellaneousServices',
    name: 'Services'
  },
  {
    path: '/app/profile',
    icon: 'CgProfile',
    name: 'Profile'
  },
  {
    path: '/app/manage-users',
    icon: 'RiUserSettingsFill',
    name: 'Manage users'
  },
  {
    path: '/app/payment',
    icon: 'MdPayment',
    name: 'Payment'
  },
  {
    path: '/app/cronjobs',
    icon: 'MdSchedule',
    name: 'Cron Jobs'
  },
  {
    path: '/app/forms',
    icon: 'FormsIcon',
    name: 'Forms'
  },
  {
    icon: 'PagesIcon',
    name: 'Pages',
    routes: [
      {
        path: '/login',
        name: 'Login'
      },
      {
        path: '/create-account',
        name: 'Create account'
      },
      {
        path: '/forgot-password',
        name: 'Forgot password'
      }
    ]
  }
]

export default routes
