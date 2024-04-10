'use client';
import { useRouter } from 'next/navigation';

export const LoginMethods = () => {
  const router = useRouter();

  const onLoginRedirect = () => {
    // router.push(RouteNamesEnum.dashboard);
  };

  return (
    <div className="flex flex-col md:flex-row bg-colr-d-bg">
      {/* <WalletConnectLoginButton
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
      /> */}
    </div>
  );
};
