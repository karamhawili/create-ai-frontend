import { IoCodeOutline } from 'react-icons/io5';
import { AiOutlineCloud, AiOutlineUser } from 'react-icons/ai';
import { VscHome } from 'react-icons/vsc';

export const navItems = [
  {
    id: 1,
    title: 'Home',
    path: '/platform/home?uid=',
    icon: <VscHome />,
    cName: 'nav-items',
  },

  {
    id: 2,
    title: 'Playground',
    path: '/platform/playground?uid=',
    icon: <IoCodeOutline />,
    cName: 'nav-items',
  },

  {
    id: 3,
    title: 'Projects',
    path: '/platform/projects?uid=',
    icon: <AiOutlineCloud />,
    cName: 'nav-items',
  },

  {
    id: 4,
    title: 'Account',
    path: '/platform/account?uid=',
    icon: <AiOutlineUser />,
    cName: 'nav-items',
  },
];
