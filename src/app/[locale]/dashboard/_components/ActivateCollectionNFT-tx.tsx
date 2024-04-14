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
  ContractCallPayloadBuilder,
} from '@multiversx/sdk-core';
import { TokenTransfer, Address } from '@multiversx/sdk-core';

export const ActivateCollectionNFT = ({
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
      .setFunction(new ContractFunction('setSpecialRole'))
      .setArgs([
        new StringValue(fullTokenIdentifier),
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
    <Card className="flex flex-1 flex-col justify-between">
      <CardContent className="mt-6">
        <div className="mb-4">
          {`2. You will be setting a special ESDTRoleNFTCreate role to the token you just created to create NFT-s on top of that "collection" token.`}
          <br />
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          disabled={pending || !loggedIn}
          onClick={handleSendTx}
        >
          Send Transaction
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
