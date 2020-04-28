import { MenuItemType } from 'oah-ui';

const items: MenuItemType[] = [
  { title: 'Home Page', icon: { name: 'home' }, link: { to: '/dashboard' } },
  { title: 'FEATURES', group: true },
  {
    title: 'Models',
    icon: { name: 'layers-outline' },
    children: [
      { title: 'Users', link: { to: '/models/User' } },
      {
        title: 'Posts',
        link: { to: '/models/Post' },
      },
      {
        title: 'Comments',
        link: { to: '/models/Comment' },
      },
      {
        title: 'Groups',
        link: { to: '/models/Group' },
      },
    ],
  },
  {
    title: 'Miscellaneous',
    icon: { name: 'shuffle-2-outline' },
    children: [{ title: '404', link: { to: '/miscellaneous/404' } }],
  },
  {
    title: 'Auth',
    icon: { name: 'lock-outline' },
    children: [
      { title: 'Login', link: { to: '/auth/login' } },
      { title: 'Register', link: { to: '/auth/register' } },
      { title: 'Request Password', link: { to: '/auth/request-password' } },
      { title: 'Reset Password', link: { to: '/auth/reset-password' } },
    ],
  },
];
export default items;
