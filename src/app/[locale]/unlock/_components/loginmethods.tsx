'use client';
import {
  WalletConnectLoginButton,
  LedgerLoginButton,
  ExtensionLoginButton,
  OperaWalletLoginButton,
  WebWalletLoginButton,
  ExtensionLoginButtonPropsType,
  LedgerLoginButtonPropsType,
  OperaWalletLoginButtonPropsType,
  WalletConnectLoginButtonPropsType,
  WebWalletLoginButtonPropsType,
} from '@multiversx/sdk-dapp/UI';
import { RouteNamesEnum } from '@/app/_constants/routes';
import { nativeAuth } from '@/config';
import { useRouter } from 'next/navigation';

type CommonPropsType =
  | OperaWalletLoginButtonPropsType
  | ExtensionLoginButtonPropsType
  | WebWalletLoginButtonPropsType
  | LedgerLoginButtonPropsType
  | WalletConnectLoginButtonPropsType;

const commonProps: CommonPropsType = {
  callbackRoute: RouteNamesEnum.dashboard,
  nativeAuth,
};

export const LoginMethods = () => {
  const router = useRouter();

  const onLoginRedirect = () => {
    router.push(RouteNamesEnum.dashboard);
  };

  return (
    <div className="flex flex-col md:flex-row bg-colr-d-bg">
      <WalletConnectLoginButton
        loginButtonText="xPortal App"
        onLoginRedirect={onLoginRedirect}
        {...commonProps}
      />
      <LedgerLoginButton
        loginButtonText="Ledger"
        onLoginRedirect={onLoginRedirect}
        {...commonProps}
      />
      {typeof window !== 'undefined' && (
        <ExtensionLoginButton
          onLoginRedirect={onLoginRedirect}
          loginButtonText="DeFi Wallet"
          {...commonProps}
        />
      )}
      <OperaWalletLoginButton
        loginButtonText="Opera Crypto Wallet - Beta"
        {...commonProps}
      />
      <WebWalletLoginButton
        loginButtonText="Web Wallet"
        data-testid="webWalletLoginBtn"
        {...commonProps}
      />
    </div>
  );
};
