import { useState, Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { useFilesTypeContext } from '../../contexts/FilesTypeContext';
import styled from 'styled-components';
import { MdArrowDropDown } from 'react-icons/md';

const ListBoxButton = styled(Listbox.Button)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  cursor: pointer;
  border-radius: 10px;
  background-color: white;
  text-align: left;
  padding-right: 10px;
  padding-left: 20px;
  font-size: 0.9rem;
  color: #34495e;
  font-weight: 600;
  font-family: 'Quicksand', sans-serif;

  & :focus-visible {
    border: 1px solid var(--color-blue-secondary);
  }
`;

const options = [
  { id: 1, name: 'Project Files', unavailable: false },
  { id: 2, name: 'Draft Files', unavailable: false },
];

const SelectorDrop = () => {
  const { filesType, setType } = useFilesTypeContext();
  const [selected, setSelected] = useState(options[0]);

  console.log('selected', selected);

  setType(selected.name === 'Project Files' ? 'projectFiles' : 'draftFiles');
  console.log('filesType', filesType);

  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative w-44 h-[43px]">
        <ListBoxButton className="shadow-sm shadow-gray-300">
          {selected.name}
          <MdArrowDropDown size="30px" color="black" />
        </ListBoxButton>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {options.map((op) => (
              <Listbox.Option
                key={op.id}
                value={op}
                disabled={op.unavailable}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? ' bg-gray-100' : 'text-gray-900'
                  }`
                }
              >
                {op.name}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default SelectorDrop;
