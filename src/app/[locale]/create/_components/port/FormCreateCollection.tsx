import { FC, useState } from 'react';
import FieldSwitch from './Switch';
import FieldRadioGroup from './RadioGroup';
import { useRouter } from 'next/router';
import c from 'clsx';

const elrond_nft_management_sc_address =
  process.env.NEXT_PUBLIC_ELROND_NFT_MANAGEMENT_SC_ADDRESS;

const FormCreateCollection: FC = ({ }) => {
  let [statusText, setStatusText] = useState('');

  const [plan, setPlan] = useState('NFT');

  const [collectionName, setCollectionName] = useState('');
  const [collection, setCollection] = useState('');
  const [isFreezable, setIsFreezable] = useState(false);
  const [isWipeable, setIsWipeable] = useState(false);
  const [isPauseable, setIsPauseable] = useState(false);
  const [formStatus, setFormStatus] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
  };

  return (
    <form
      className="form_centered form flex flex-col"
      method="POST"
      onSubmit={handleSubmit}
    >
      <div className="flex-col flex-start  px-2 mt-0 sm:mt-10 ">
        <div className="mb-1 text-center text-md text-gray-300 font-bold">
          {'Collection name'}
        </div>
        <input
          id="collection_name"
          className="w-full inline-flex mb-2 items-center p-4 rounded-full font-bold transition bg-gray-900 hover:bg-gray-700 shadow-md border-2 border-black focus:border-sky-500"
          type="text"
          name="collection_name"
          placeholder="Collection name"
          onChange={(evt: any) =>
            setCollectionName((evt.target as HTMLTextAreaElement).value)
          }
        />
      </div>
      <div className="flex-col justify-start  px-2">
        <div className="mb-1 text-center text-md text-gray-300 font-bold">
          {'Collection Ticker'}
        </div>
        <input
          id="collection"
          className="w-full inline-flex mb-2 items-center p-4 rounded-full font-bold transition bg-gray-900 hover:bg-gray-700 shadow-md border-2 border-black focus:border-sky-500"
          type="text"
          name="collection"
          placeholder="Collection"
          onChange={(evt: any) =>
            setCollection((evt.target as HTMLTextAreaElement).value)
          }
        ></input>
      </div>
      <FieldRadioGroup setExternalValue={setPlan} />
      <div className="flex justify-between">
        <FieldSwitch
          id={'is_freezable'}
          name={'Freezable'}
          setExternalValue={setIsFreezable}
        />
        <FieldSwitch
          id={'is_wipeable'}
          name={'Wipeable'}
          setExternalValue={setIsWipeable}
        />
        <FieldSwitch
          id={'is_pauseable'}
          name={'Pauseable'}
          setExternalValue={setIsPauseable}
        />
      </div>
      <button disabled={formStatus} type="submit"
        className={c(
          ['rounded-full bg-gradient-to-r from-sky-500 to-sky-400 focus:ring-2 focus:ring-sky-400 transform-all duration-300'],
          ['mx-auto px-10 py-2 mt-5'],
        )}>
        <div className='flex my-auto items-center font-bold '>Create</div>
      </button>
      <div className="mx-auto mt-10">{statusText}</div>
    </form>
  );
};

export default FormCreateCollection;
