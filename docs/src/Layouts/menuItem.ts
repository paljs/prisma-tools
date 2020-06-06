import { MenuItemType } from 'oah-ui';

const items: MenuItemType[] = [
  {
    title: 'Getting Started',
    link: { to: '/' },
  },
  {
    group: true,
    title: 'CRUD Generators',
  },
  {
    title: 'Nexus',
    children: [
      {
        title: 'Features',
        link: { to: '/nexus/features' },
      },
      {
        title: 'Nexus Framework',
        link: { to: '/nexus/framework' },
      },
      {
        title: 'Nexus Schema',
        link: { to: '/nexus/schema' },
      },
      {
        title: 'Api',
        link: { to: '/nexus/api' },
      },
    ],
  },
  {
    title: 'SDL First',
    link: { to: '/sdl' },
  },
  {
    title: 'GraphQL Modules',
    link: { to: '/graphql-modules' },
  },
  {
    group: true,
    title: 'Tools',
  },
  {
    title: 'Select',
    children: [
      {
        title: 'Introduction',
        link: { to: '/select' },
      },
      {
        title: 'nexus-plugin-prisma-select',
        link: { to: '/nexus-plugin-prisma-select' },
      },
      {
        title: 'nexus-schema-plugin-prisma-select',
        link: { to: '/nexus-schema-plugin-prisma-select' },
      },
    ],
  },
  {
    title: 'On Delete',
    link: { to: '/delete' },
  },
  {
    title: 'Schema convert',
    link: { to: '/schema' },
  },
  {
    group: true,
    title: 'Projects',
  },
  {
    title: 'Admin UI',
    children: [
      {
        title: 'Examples',
        link: { to: '/admin/examples' },
      },
      {
        title: 'Generator',
        link: { to: '/admin/generator' },
      },
    ],
  },
  {
    group: true,
    title: 'CLI',
  },
  {
    title: 'Nexus Prisma Plugin',
    link: { to: '/cnt' },
  },
];

export default items;
