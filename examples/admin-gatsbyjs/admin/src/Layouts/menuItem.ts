import { MenuItemType } from 'oah-ui';

const items: MenuItemType[] = [
  { title: 'Home Page', icon: { name: 'home' }, link: { to: '/dashboard' } },
  { title: 'FEATURES', group: true },
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
  {
    title: 'Models',
    icon: { name: 'layers-outline' },
    children: [
      { title: 'Activity name', link: { to: '/models/Activity' } },
      {
        title: 'AssessmentContentQuestion',
        link: { to: '/models/AssessmentContentQuestion' },
      },
      {
        title: 'AssessmentContentQuestionAnswer',
        link: { to: '/models/AssessmentContentQuestionAnswer' },
      },
      {
        title: 'AssessmentContentQuestionOption',
        link: { to: '/models/AssessmentContentQuestionOption' },
      },
      {
        title: 'AssessmentContentQuestionTool',
        link: { to: '/models/AssessmentContentQuestionTool' },
      },
    ],
  },
];
export default items;
