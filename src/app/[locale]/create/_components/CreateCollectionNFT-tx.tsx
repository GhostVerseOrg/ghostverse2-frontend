import {
  TransactionCallbackParams,
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
  ContractCallPayloadBuilder,
} from '@multiversx/sdk-core';
import { TokenTransfer } from '@multiversx/sdk-core';

export const CreateCollectionNFT = ({
  cb,
}: {
  cb: (params: TransactionCallbackParams) => void;
}) => {
  const { triggerTx, pending } = useTransaction({ cb });
  const { loggedIn } = useLoggingIn();

  const handleSendTx = () => {
    const tokenName = 'testMe';
    const tokenTicker = 'TEST';
    const canFreeze = true;
    const canPause = true;
    const canWipe = true;
    const canChangeOwner = true;

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
        new StringValue('canChangeOwner'),
        new StringValue(String(canChangeOwner)),
      ])
      .build();

    triggerTx({
      address: 'erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqzllls8a5w6u',
      gasLimit: 60000000,
      value: TokenTransfer.egldFromAmount(0.05),
      data: transactionPayload,
    });
  };

  return (
    <Card className="flex flex-1 flex-col justify-between">
      <CardContent className="mt-6">
        <div className="mb-4">
          {`1. You will be creating NonFungible Token to be used as "Collection" for NFTs creation`}
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
