import { FC, HTMLProps, useState } from 'react';
import { Switch } from '@headlessui/react';
import c from 'clsx';

interface FieldSwitchProps extends HTMLProps<HTMLInputElement> {
  setExternalValue: (boolean: any) => void;
}

const FieldSwitch: FC<FieldSwitchProps> = ({
  children,
  className,
  id,
  name,
  setExternalValue,
}) => {
  const [enabled, setEnabled] = useState(false);

  function setValues(value: any) {
    setEnabled(value);
    setExternalValue(value);
  }

  return (
    <Switch.Group>
      <div className={c('', className)}>
        <Switch
          id={id}
          name={name}
          checked={enabled}
          onChange={setValues}
          className={`${
            enabled ? 'bg-sky-500' : 'bg-gray-400'
          } inline-flex items-center h-6 rounded-full w-11 duration-300`}
        >
          <span
            className={`${
              enabled ? 'translate-x-6' : 'translate-x-1'
            } w-4 h-4 transform bg-white rounded-full duration-300`}
          />
        </Switch>
        <Switch.Label
          className={`${
            enabled ? 'text-sky-500' : 'text-gray-400'
          } pl-2 whitespace-no-wrap cursor-pointer`}
        >
          {name}
          {children}
        </Switch.Label>
      </div>
    </Switch.Group>
  );
};

export default FieldSwitch;
