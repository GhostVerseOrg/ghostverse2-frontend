import {
  TransactionCallbackParams,
  useLoggingIn,
  useTransaction,
} from '@useelven/core';
// import {
//   Card,
//   CardContent,
//   CardFooter,
// } from '../../../_components/port/useElvenDapp/ui/card';
// import { Button } from '../../../_components/port/useElvenDapp/ui/button';
import {
  StringValue,
  ContractFunction,
  ContractCallPayloadBuilder,
} from '@multiversx/sdk-core';
import { TokenTransfer } from '@multiversx/sdk-core';
// import Form from "./port/Form";
import FormCreateCollection from './port/FormCreateCollection';

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

    const canFreeze = true; // The token manager may freeze the token balance in a specific account, preventing transfers to and from that account.
    const canPause = true; // The token manager may prevent all transactions of the token, apart from minting and burning.
    const canWipe = true; // The token manager may wipe out the tokens held by a frozen account, reducing the supply.
    const canChangeOwner = true; // Token management can be transferred to a different account.
    const canTransferNFTCreateRole = true; // The token manager can transfer NFT/SFT/Meta creation role
    const canAddSpecialRoles = true; // The token manager can assign a specific role(s). Important for token management.
    const canUpgrade = true; // The token manager may change these properties. Without it you won't be able to change these properties in the future.
    // We don't take 'canMint' property here as we are creating a collection token, not minting it.

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
        new StringValue('canTransferNFTCreateRole'),
        new StringValue(String(canTransferNFTCreateRole)),
        new StringValue('canAddSpecialRoles'),
        new StringValue(String(canAddSpecialRoles)),
        new StringValue('canUpgrade'),
        new StringValue(String(canUpgrade)),
      ])
      .build();

    triggerTx({
      address: 'erd1qqqqqqqqqqqqqqqpqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqzllls8a5w6u',
      gasLimit: 60000000,
      value: TokenTransfer.egldFromAmount(0.05),
      data: transactionPayload,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col w-screen justify-center items-center">
      <FormCreateCollection />
    </div>
    // <Card className="flex flex-1 flex-col justify-between">
    //   <CardContent className="mt-6">
    //     <div className="mb-4">
    //       {`1. You will be creating NonFungible Token to be used as "Collection" for NFTs creation`}
    //       <br />
    //     </div>
    //   </CardContent>
    //   <CardFooter>
    //     <Button
    //       variant="outline"
    //       disabled={pending || !loggedIn}
    //       onClick={handleSendTx}
    //     >
    //       Create
    //     </Button>
    //   </CardFooter>
    // </Card>
  );
};
