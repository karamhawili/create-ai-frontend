import React, { Fragment } from 'react';
import { IoPersonOutline, IoLogOutOutline } from 'react-icons/io5';
import { VscAccount } from 'react-icons/vsc';
import { Menu, Transition } from '@headlessui/react';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/router';
import NavLink from './NavLink';
import { handleLogoutFirestore } from '../../firebase/firebaseFunctions';

const DropDownMenu = () => {
  const { logout, currentUser } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/'); // back to landing page
    } catch (error) {
      console.log(error);
    }
    console.log('User pressed the logout button');
  };

  return (
    <div className="flex">
      <Menu as="div" className="relative flex flex-col">
        {({ open }) => (
          <Fragment>
            {/* Arrow Button */}
            <Menu.Button className=" items-center">
              <VscAccount className="" aria-hidden="true" />
            </Menu.Button>

            <Transition
              show={open}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              {/* Menu Items */}
              <Menu.Items
                static
                className="origin-top-right absolute right-0 mt-1 w-40 h-38 rounded-lg shadow-xl bg-white divide-y divide-gray-100 focus:outline-none px-3"
              >
                {/* Account Item */}
                <div className="py-2">
                  <Menu.Item>
                    <NavLink href="/platform/account">
                      <div className="group flex items-center justify-start gap-5 pl-1 py-2 text-md hover:scale-110 cursor-pointer">
                        <IoPersonOutline
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                        <a>Account</a>
                      </div>
                    </NavLink>
                  </Menu.Item>
                </div>

                {/* Log Out Item */}
                <div className="py-2">
                  <Menu.Item onClick={handleLogout}>
                    <div className="group flex items-center justify-start gap-5 pl-1 py-2 text-md hover:scale-110 cursor-pointer">
                      <IoLogOutOutline className="h-6 w-6" aria-hidden="true" />
                      <a>Logout</a>
                    </div>
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Fragment>
        )}
      </Menu>
    </div>
  );
};

export default DropDownMenu;
