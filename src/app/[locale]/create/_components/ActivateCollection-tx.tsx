'use client';

import {
  TransactionCallbackParams,
  useAccount,
  useLoggingIn,
  useTransaction,
  useApiCall,
  SCQueryType,
  useConfig,
} from '@useelven/core';
import { Button } from '../../../_components/port/useElvenDapp/ui/button';
import {
  StringValue,
  ContractFunction,
  AddressValue,
  ContractCallPayloadBuilder,
} from '@multiversx/sdk-core';
import { TokenTransfer, Address } from '@multiversx/sdk-core';
import { useEffect, useState } from 'react';

export const ActivateCollectionNFT = ({
  cb,
}: {
  cb: (params: TransactionCallbackParams) => void;
}) => {
  const { triggerTx, pending } = useTransaction({ cb });
  const { address } = useAccount();
  const { loggedIn } = useLoggingIn();

  // Non cretable collections yet.
  const [collectionTicker, setCollectionTicker] = useState<string>('');

  const { data: collections, isLoading: collectionsLoading } = useApiCall<
    any[]
  >({
    url: `/accounts/${address}/roles/collections?type=NonFungibleESDT&canCreate=false`,
  });

  const handleSendTx = () => {
    const transactionPayload = new ContractCallPayloadBuilder()
      .setFunction(new ContractFunction('setSpecialRole'))
      .setArgs([
        new StringValue(collectionTicker),
        new AddressValue(Address.fromBech32(address)), // Current ElvenTools doesn't provide method for proper conversion.
        new StringValue('ESDTRoleNFTCreate'),
      ])
      .build();

    triggerTx({
      address: 'erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqzllls8a5w6u',
      gasLimit: 60000000,
      value: TokenTransfer.egldFromAmount(0),
      data: transactionPayload,
    });
  };

  return (
    <form className="flex flex-col gap-y-4">
      <div className="sm:mt-4">
        <div className="text-center text-md text-gray-300 font-bold">
          {'Activate an existing collection token to create NFTs on top of it'}
        </div>
        <div>
          {collections && collections.length > 0 ? (
            <select
              name="collections"
              id="collection-select"
              value={collectionTicker}
              className="w-full inline-flex mt-5 text-base bg-gray-900 hover:bg-sky-500 focus:bg-gray-700 items-center p-4 rounded-full"
              required
              onChange={(e) => {
                setCollectionTicker(e.target.value);
              }}
            >
              <option
                disabled
                selected
                hidden
                key={''}
                value={''}
                label="Choose a collection"
              />
              {collections.map((item) => (
                <option
                  key={item.ticker}
                  value={item.ticker}
                  label={item.name + ' - ' + item.ticker}
                >
                  {item.name}
                </option>
              ))}
            </select>
          ) : (
            <div className="w-full text-center cursor-not-allowed text-red-400 mt-4 text-base bg-gray-900 focus:bg-gray-700 items-center p-4 rounded-full">
              Create new collection first!
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center">
        <Button
          variant="ghostTheme"
          size={'lg'}
          className="!w-1/2"
          disabled={pending || !loggedIn || !collectionTicker}
          onClick={handleSendTx}
        >
          Activate
        </Button>
      </div>
    </form>
  );
};
