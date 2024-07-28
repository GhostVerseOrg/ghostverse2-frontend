import {
  TransactionCallbackParams,
  useAccount,
  useLoggingIn,
  useTransaction,
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

export const CreateNFT = ({
  cb,
}: {
  cb: (params: TransactionCallbackParams) => void;
}) => {
  const { triggerTx, pending } = useTransaction({ cb });
  const { address } = useAccount();
  const { loggedIn } = useLoggingIn();

  const handleSendTx = () => {
    const fullTokenIdentifier = 'TEST-2be25e';

    const transactionPayload = new ContractCallPayloadBuilder()
      .setFunction(new ContractFunction('ESDTNFTCreate'))
      .setArgs([
        new StringValue(fullTokenIdentifier),
        new U32Value(1),
        new StringValue('MyNFTname01'),
        new U32Value(10000), // Royalties in hexadecimal encoding from 0 (0%) to 10000 (100%)
        new StringValue(''), // Arbitrary field that should contain the hash of the NFT metadata. Optional filed, should be left null when building the transaction to create the NFT
        new StringValue(`{
            "description": "This is a sample description",
            "attributes": [
              {
                "trait_type": "Background",
                "value": "Yellow",
                "{key}": "{value}",
                "{...}": "{...}",
                "{key}": "{value}"
              },
              {
                "trait_type": "Headwear",
                "value": "BlackBeanie"
              },
              {
                "trait_type": "SampleTrait3",
                "value": "SampleValue3"
              }
            ],
            "collection": "ipfsCID/fileName.json"
          }`), // Attributes in hexadecimal encoding
        new StringValue(
          'https://ipfs.io/ipfs/QmeASSx1GtQfo2XX8d9A5yHA2k25zyZdvB64H4NuFNnxa8/6118.png',
        ), // URI in hexadecimal encoding
        new StringValue(
          'https://ipfs.io/ipfs/QmaDv6F76YkkKq5QffkuVAEkHWkyC5KysxHPVEp2cALqMC/6118.json',
        ), // URI 2 in hexadecimal encoding, json file from example .
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
    <Card className="flex flex-1 flex-col justify-between">
      <CardContent className="mt-6">
        <div className="mb-4">
          {`3. Create NFT for the active collection token.`}
          <br />
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          disabled={pending || !loggedIn}
          onClick={handleSendTx}
        >
          Create
        </Button>
      </CardFooter>
    </Card>
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
