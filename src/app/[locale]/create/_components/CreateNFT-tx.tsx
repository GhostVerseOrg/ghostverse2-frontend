import {
  TransactionCallbackParams,
  useAccount,
  useLoggingIn,
  useTransaction,
  useApiCall,
} from '@useelven/core';
import {
  Card,
  CardFooter,
} from '../../../_components/port/useElvenDapp/ui/card';
import { Button } from '../../../_components/port/useElvenDapp/ui/button';
import {
  StringValue,
  ContractFunction,
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
  const { triggerTx, pending, txResult, error } = useTransaction({ cb });
  const { address } = useAccount();
  const { loggedIn } = useLoggingIn();

  // Creatable collection to create NFTs.
  const [collectionTicker, setCollectionTicker] = useState<string>('');
  const [formStep, setFormStep] = useState<number>(0);

  // New NFT properties.
  const [nftName, setNftName] = useState<string>('');
  const [nftRoyalties, setNftRoyalties] = useState<number>(0);
  const [nftAttributes, SetNftAttributes] = useState<string>('');
  const [nftUriImg, setNftUriImg] = useState<string>('');
  const [nftUriJson, setNftUriJson] = useState<string>('');

  const { data: collections, isLoading: collectionsLoading } = useApiCall<
    any[]
  >({
    url: `/accounts/${address}/roles/collections?type=NonFungibleESDT&canCreate=true`,
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormStep(1);
  };

  const handleSendTx = () => {
    const transactionPayload = new ContractCallPayloadBuilder()
      .setFunction(new ContractFunction('ESDTNFTCreate'))
      .setArgs([
        new StringValue(collectionTicker), // Collection ticker
        new U32Value(1), // NFT amount, 1
        new StringValue(nftName), // NFT name
        new U32Value(nftRoyalties), // Royalties in hexadecimal encoding from 0 (0%) to 10000 (100%)
        new StringValue(''), // Arbitrary field that should contain the hash of the NFT metadata. Optional filed, should be left null when building the transaction to create the NFT
        new StringValue(nftAttributes), // Attributes in hexadecimal encoding
        ...(nftUriImg != '' ? [new StringValue(nftUriImg)] : []), // URI in hexadecimal encoding.
        ...(nftUriJson != '' ? [new StringValue(nftUriJson)] : []), // URI 2 in hexadecimal encoding, json file from example.
      ])
      .build();

    triggerTx({
      address: address,
      gasLimit: 60000000,
      value: TokenTransfer.egldFromAmount(0),
      data: transactionPayload,
    });
  };

  return (
    <form className="flex flex-col gap-y-4 w-full" onSubmit={handleSubmit}>
      {formStep === 0 ? (
        <>
          <div className="sm:mt-4 flex justify-center flex-col">
            <div className="text-center text-md text-gray-300 font-bold">
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
        </>
      ) : (
        <>
          <div className="sm:mt-4 flex justify-center flex-col">
            <div className="text-center text-md text-gray-300 font-bold">
              {'Create NFT for: ' + collectionTicker}
            </div>
            <div>
              <div className="sm:mt-4">
                <div className="text-center text-md text-gray-300 font-bold">
                  {'Name'}
                </div>

                <input
                  id="nft_name"
                  className="w-full mt-1 items-center p-4 rounded-full font-bold transition bg-gray-900 hover:bg-gray-700 border-2 border-black focus:border-sky-500"
                  type="text"
                  name="nft_name"
                  placeholder="GhostNFT"
                  onChange={(evt: any) =>
                    setNftName((evt.target as HTMLTextAreaElement).value)
                  }
                />
              </div>
              <div className="sm:mt-4">
                <div className="text-center text-md text-gray-300 font-bold">
                  {'Royalties (0-10000)'}
                </div>
                <input
                  id="nft_royalties"
                  className="w-full mt-1 items-center p-4 rounded-full font-bold transition bg-gray-900 hover:bg-gray-700 border-2 border-black focus:border-sky-500"
                  type="number"
                  name="nft_royalties"
                  placeholder="300"
                  max={10000}
                  min={0}
                  onChange={(evt: any) =>
                    setNftRoyalties(
                      Number((evt.target as HTMLTextAreaElement).value),
                    )
                  }
                />
              </div>
              <div className="sm:mt-4">
                <div className="text-center text-md text-gray-300 font-bold">
                  {'Attributes (comma separated)'}
                </div>
                <input
                  id="nft_attributes"
                  className="w-full mt-1 items-center p-4 rounded-full font-bold transition bg-gray-900 hover:bg-gray-700 border-2 border-black focus:border-sky-500"
                  type="text"
                  name="nft_attributes"
                  placeholder="metadata:ipfsCID/song.json;tags:song,beautiful,music"
                  onChange={(evt: any) =>
                    SetNftAttributes((evt.target as HTMLTextAreaElement).value)
                  }
                />
              </div>
              <div className="sm:mt-4">
                <div className="text-center text-md text-gray-300 font-bold">
                  {'URI (img)'}
                </div>
                <input
                  id="nft_uri_img"
                  className="w-full mt-1 items-center p-4 rounded-full font-bold transition bg-gray-900 hover:bg-gray-700 border-2 border-black focus:border-sky-500"
                  type="text"
                  name="nft_uri_img"
                  placeholder="URL_to_decentralized_storage/song.mp3"
                  onChange={(evt: any) =>
                    setNftUriImg((evt.target as HTMLTextAreaElement).value)
                  }
                />
              </div>
              <div className="sm:mt-4">
                <div className="text-center text-md text-gray-300 font-bold">
                  {'URI (json)'}
                </div>
                <input
                  id="nft_uri_json"
                  className="w-full mt-1 items-center p-4 rounded-full font-bold transition bg-gray-900 hover:bg-gray-700 border-2 border-black focus:border-sky-500"
                  type="text"
                  name="nft_uri_json"
                  placeholder="URL_to_decentralized_storage/song.json"
                  onChange={(evt: any) =>
                    setNftUriJson((evt.target as HTMLTextAreaElement).value)
                  }
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              variant="ghostTheme"
              size={'lg'}
              className="lg:!w-1/2 !w-2/6"
              disabled={pending || !loggedIn || !collectionTicker}
              onClick={handleSendTx}
            >
              Create
            </Button>
          </div>
        </>
      )}
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
