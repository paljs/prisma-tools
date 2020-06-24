import { MenuItemType } from '@paljs/ui';

const items: MenuItemType[] = [
  { title: 'Home Page', icon: { name: 'home' }, link: { to: '/admin' } },
  {
    title: 'Models',
    icon: { name: 'layers-outline' },
    children: [
      { title: 'Users', link: { to: '/admin/models/User' } },
      {
        title: 'Posts',
        link: { to: '/admin/models/Post' },
      },
      {
        title: 'Comments',
        link: { to: '/admin/models/Comment' },
      },
      {
        title: 'Groups',
        link: { to: '/admin/models/Group' },
      },
    ],
  },
];
export default items;
