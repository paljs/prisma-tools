import { MenuItemType } from '@paljs/ui/types';

const items: MenuItemType[] = [
  { title: 'Home Page', icon: { name: 'home' }, link: { href: '/admin' } },
  {
    title: 'Models',
    icon: { name: 'layers-outline' },
    children: [
      { title: 'Users', link: { href: '/admin/models/User' } },
      {
        title: 'Posts',
        link: { href: '/admin/models/Post' },
      },
      {
        title: 'Comments',
        link: { href: '/admin/models/Comment' },
      },
      {
        title: 'Groups',
        link: { href: '/admin/models/Group' },
      },
    ],
  },
];
export default items;
