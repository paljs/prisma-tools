import { MenuItemType } from 'oah-ui';

const items: MenuItemType[] = [
  { title: 'Home Page', icon: { name: 'home' }, link: { to: '/dashboard' } },
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
];
export default items;
