import {
  TransactionCallbackParams,
  useLoggingIn,
  useTransaction,
} from '@useelven/core';
import { Button } from '../../../_components/port/useElvenDapp/ui/button';
import {
  StringValue,
  ContractFunction,
  ContractCallPayloadBuilder,
} from '@multiversx/sdk-core';
import { TokenTransfer } from '@multiversx/sdk-core';
import { useState } from 'react';
import FieldSwitch from './port/Switch';

export const CreateCollectionNFT = ({
  cb,
}: {
  cb: (params: TransactionCallbackParams) => void;
}) => {
  const { triggerTx, pending } = useTransaction({ cb });
  const { loggedIn } = useLoggingIn();

  const [tokenName, setTokenName] = useState('testMe');
  const [tokenTicker, setTokenTicker] = useState('TEST');
  const [canFreeze, setCanFreeze] = useState(false); // The token manager may freeze the token balance in a specific account, preventing transfers to and from that account.
  const [canPause, setCanPause] = useState(false); // The token manager may prevent all transactions of the token, apart from minting and burning.
  const [canWipe, setCanWipe] = useState(false); // The token manager may wipe out the tokens held by a frozen account, reducing the supply.
  const [canChangeOwner, setCanChangeOwner] = useState(false); // Token management can be transferred to a different account.
  const [canTransferNFTCreateRole, setCanTransferNFTCreateRole] =
    useState(false); // The token manager can transfer NFT/SFT/Meta creation role
  const [canAddSpecialRoles, setCanAddSpecialRoles] = useState(true); // The token manager can assign a specific role(s). Important for token management. NB! Without "true" we won't be able to activate collection.
  const [canUpgrade, setCanUpgrade] = useState(false); // The token manager may change these properties. Without it you won't be able to change these properties in the future.
  // We don't take 'canMint' property here as we are creating a collection token, not minting it.
  const canMint = false;

  const handleSendTx = () => {
    const transactionPayload = new ContractCallPayloadBuilder()
      .setFunction(new ContractFunction('issueNonFungible'))
      .setArgs([
        new StringValue(tokenName),
        new StringValue(tokenTicker),
        new StringValue('canFreeze'),
        new StringValue(String(canFreeze)),
        new StringValue('canPause'),
        new StringValue(String(canPause)),
        new StringValue('canWipe'),
        new StringValue(String(canWipe)),
        // new StringValue('canChangeOwner'),
        // new StringValue(String(canChangeOwner)),
        // new StringValue('canTransferNFTCreateRole'),
        // new StringValue(String(canTransferNFTCreateRole)),
        // new StringValue('canAddSpecialRoles'),
        // new StringValue(String(canAddSpecialRoles)),
        // new StringValue('canUpgrade'),
        // new StringValue(String(canUpgrade)),
      ])
      .build();

    console.log(transactionPayload);

    triggerTx({
      address: 'erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqzllls8a5w6u',
      gasLimit: 60000000,
      value: TokenTransfer.egldFromAmount(0.05),
      data: transactionPayload,
    });
  };

  return (
    <div className="flex flex-col gap-y-3">
      <div className="sm:mt-4">
        <div className="text-center text-md text-gray-300 font-bold">
          {'Token Name'}
        </div>
        {/* 
          length between 3 and 50 characters 
          alphanumeric characters only 
        */}
        <input
          id="token_name"
          className="w-full mt-1 items-center p-4 rounded-full font-bold transition bg-gray-900 hover:bg-gray-700 border-2 border-black focus:border-sky-500"
          type="text"
          name="token_name"
          placeholder="GhostCollection"
          onChange={(evt: any) =>
            setTokenName((evt.target as HTMLTextAreaElement).value)
          }
        />
      </div>
      <div className="flex-col justify-start">
        <div className="text-center text-md text-gray-300 font-bold">
          {'Token Ticker'}
        </div>
        {/* 
          length between 3 and 10 characters
          alphanumeric UPPERCASE only
        */}
        <input
          id="token_ticker"
          className="w-full mt-1 items-center p-4 rounded-full font-bold transition bg-gray-900 hover:bg-gray-700 border-2 border-black focus:border-sky-500"
          type="text"
          name="token_ticker"
          placeholder="GHST"
          onChange={(evt: any) =>
            setTokenTicker((evt.target as HTMLTextAreaElement).value)
          }
        />
      </div>
      <div className="flex justify-between">
        <FieldSwitch
          className="mx-2"
          id={'canFreeze'}
          name={'Can Freeze'}
          setExternalValue={setCanFreeze}
        />
        <FieldSwitch
          className="mx-2"
          id={'canWipe'}
          name={'Can Wipe'}
          setExternalValue={setCanWipe}
        />
        <FieldSwitch
          className="mx-2"
          id={'canPause'}
          name={'Can Pause'}
          setExternalValue={setCanPause}
        />
      </div>

      {/* <div className="flex justify-between mt-2">
        <FieldSwitch
          id={'canChangeOwner'}
          name={'Can Change Owner'}
          setExternalValue={setCanChangeOwner}
        />
        <FieldSwitch
          id={'canTransferNFTCreateRole'}
          name={'Can Transfer Role'}
          setExternalValue={setCanTransferNFTCreateRole}
        />
        <FieldSwitch
          id={'canAddSpecialRoles'}
          name={'Can Add Roles'}
          setExternalValue={setCanAddSpecialRoles}
        />
        <FieldSwitch
          id={'canUpgrade'}
          name={'Can Upgrade'}
          setExternalValue={setCanUpgrade}
        />
      </div> */}

      <div className="flex justify-center">
        <Button
          variant="ghostTheme"
          size={'lg'}
          className="!w-1/2"
          disabled={pending || !loggedIn}
          onClick={handleSendTx}
        >
          Create
        </Button>
      </div>
    </div>
  );
};
