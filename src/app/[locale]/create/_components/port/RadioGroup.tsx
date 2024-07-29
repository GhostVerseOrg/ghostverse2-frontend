import { FC, HTMLProps, useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import c from 'clsx';

interface FieldRadioGroupProps extends HTMLProps<HTMLInputElement> {
  setExternalValue: (boolean: any) => void;
}

const FieldRadioGroup: FC<FieldRadioGroupProps> = ({ setExternalValue }) => {
  let [plan, setPlan] = useState('NFT');

  function setValues(value: string) {
    setExternalValue(value);
    setPlan(value);
  }

  return (
    <RadioGroup
      value={plan}
      onChange={setValues}
      className="flex flex-row mx-auto mb-5"
    >
      <RadioGroup.Option className="font-bold mx-4 cursor-pointer" value="NFT">
        {({ checked }) => (
          <span className={c([checked ? "text-sky-500" : ""], ["duration-300 transform-all"])}>
            {'Fixed Quantity (NFT)'}
          </span>
        )}
      </RadioGroup.Option>
      <RadioGroup.Option className="font-bold mx-4 cursor-pointer" value="SFT">
        {({ checked }) => (
          <span className={c([checked ? "text-sky-500" : ""], ["duration-300 transform-all"])}>
            {"Variable Quantity (SFT)"}
          </span>
        )}
      </RadioGroup.Option>
    </RadioGroup >
  );
};

export default FieldRadioGroup;
