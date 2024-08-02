import {
  TransactionCallbackParams,
  useAccount,
  useLoggingIn,
  useTransaction,
  useApiCall,
} from '@useelven/core';
import {
  Card,
  CardContent,
  CardFooter,
} from '../../../_components/port/useElvenDapp/ui/card';
import { Button } from '../../../_components/port/useElvenDapp/ui/button';
import {
  StringValue,
  ContractFunction,
  AddressValue,
  U32Value,
  ContractCallPayloadBuilder,
} from '@multiversx/sdk-core';
import { TokenTransfer, Address } from '@multiversx/sdk-core';
import { useState } from 'react';

export const CreateNFT = ({
  cb,
}: {
  cb: (params: TransactionCallbackParams) => void;
}) => {
  const { triggerTx, pending } = useTransaction({ cb });
  const { address } = useAccount();
  const { loggedIn } = useLoggingIn();

  // Creatable collection to create NFTs.
  const [collectionTicker, setCollectionTicker] = useState<string>('');

  const { data: collections, isLoading: collectionsLoading } = useApiCall<
    any[]
  >({
    url: `/accounts/${address}/roles/collections?type=NonFungibleESDT&canCreate=true`,
  });

  // const handleSendTx = () => {
  //   const fullTokenIdentifier = 'TEST-2be25e';

  //   const transactionPayload = new ContractCallPayloadBuilder()
  //     .setFunction(new ContractFunction('ESDTNFTCreate'))
  //     .setArgs([
  //       new StringValue(fullTokenIdentifier),
  //       new U32Value(1),
  //       new StringValue('MyNFTname01'),
  //       new U32Value(10000), // Royalties in hexadecimal encoding from 0 (0%) to 10000 (100%)
  //       new StringValue(''), // Arbitrary field that should contain the hash of the NFT metadata. Optional filed, should be left null when building the transaction to create the NFT
  //       new StringValue(`{
  //           "description": "This is a sample description",
  //           "attributes": [
  //             {
  //               "trait_type": "Background",
  //               "value": "Yellow",
  //               "{key}": "{value}",
  //               "{...}": "{...}",
  //               "{key}": "{value}"
  //             },
  //             {
  //               "trait_type": "Headwear",
  //               "value": "BlackBeanie"
  //             },
  //             {
  //               "trait_type": "SampleTrait3",
  //               "value": "SampleValue3"
  //             }
  //           ],
  //           "collection": "ipfsCID/fileName.json"
  //         }`), // Attributes in hexadecimal encoding
  //       new StringValue(
  //         'https://ipfs.io/ipfs/QmeASSx1GtQfo2XX8d9A5yHA2k25zyZdvB64H4NuFNnxa8/6118.png',
  //       ), // URI in hexadecimal encoding
  //       new StringValue(
  //         'https://ipfs.io/ipfs/QmaDv6F76YkkKq5QffkuVAEkHWkyC5KysxHPVEp2cALqMC/6118.json',
  //       ), // URI 2 in hexadecimal encoding, json file from example .
  //     ])
  //     .build();

  //   triggerTx({
  //     address: address,
  //     gasLimit: 60000000,
  //     value: TokenTransfer.egldFromAmount(0),
  //     data: transactionPayload,
  //   });
  // };

  //   return (
  //     <Card className="flex flex-1 flex-col justify-between">
  //       <CardContent className="mt-6">
  //         <div className="mb-4">
  //           {`3. Create NFT for the active collection token.`}
  //           <br />
  //         </div>
  //       </CardContent>
  //       <CardFooter>
  //         <Button
  //           variant="outline"
  //           disabled={pending || !loggedIn}
  //           onClick={handleSendTx}
  //         >
  //           Create
  //         </Button>
  //       </CardFooter>
  //     </Card>
  //   );
  // };

  return (
    <form className="flex flex-col gap-y-4 w-full">
      <div className="sm:mt-4 flex justify-center flex-col">
        <div className="text-center text-md text-gray-300 font-bold ">
          {'Choose active collection to create NFT'}
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
          className="lg:!w-1/2 !w-2/6"
          disabled={pending || !loggedIn || !collectionTicker}
          onClick={() => {}}
        >
          Create
        </Button>
      </div>
    </form>
  );
};

export const stringToHex = (str: string) => {
  if (str) {
    const arr1 = [];
    for (let n = 0, l = str.length; n < l; n++) {
      const hex = Number(str.charCodeAt(n)).toString(16);
      arr1.push(hex);
    }
    return arr1.join('');
  }
  return '';
};

function padTrailingZeros(num: string, size: number) {
  var s = num + '';
  while (s.length < size) s = s + '0';
  return s;
}
