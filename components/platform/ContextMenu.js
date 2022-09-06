import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { BsThreeDots } from 'react-icons/bs';

const DropDownMenu = () => {
  return (
    <div className="flex">
      <Menu as="div" className="relative">
        {({ open }) => (
          <Fragment>
            {/* Arrow Button */}
            <Menu.Button className="flex">
              <BsThreeDots
                size={28}
                color={'#000000'}
                style={{ cursor: 'pointer' }}
                aria-hidden="true"
              />
            </Menu.Button>

            <Transition show={open}>
              {/* Menu Items */}
              <Menu.Items
                static
                className="absolute bottom-0 right-0 mb-10 w-24 h-fit rounded-lg shadow-xl bg-gray-50 divide-y divide-gray-100 focus:outline-none px-3 cursor-pointer"
              >
                {/* Account Item */}
                <div className="py-2">
                  <Menu.Item>
                    <div className="flex items-center justify-center py-1 text-md hover:scale-110">
                      <p>Edit</p>
                    </div>
                  </Menu.Item>
                </div>

                {/* Log Out Item */}
                <div className="py-2">
                  <Menu.Item>
                    <div
                      href="#"
                      className="flex items-center justify-center py-1 text-md hover:scale-110"
                    >
                      <p>Delete</p>
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
