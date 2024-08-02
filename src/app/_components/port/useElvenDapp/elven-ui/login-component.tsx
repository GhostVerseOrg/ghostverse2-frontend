// Login component wraps all auth services in one place
// You can always use only one of them if needed
import { useCallback, memo, useState, useEffect } from 'react';
import { useLogin, LoginMethodsEnum } from '@useelven/core';
import { WalletConnectQRCode } from './walletconnect-qr-code';
import { WalletConnectPairings } from './walletconnect-pairings';
import { LedgerAccountsList } from './ledger-accounts-list';
import { getLoginMethodDeviceName } from '../lib/get-signing-device-name';
import { Spinner } from '../ui/spinner';
import { Button } from '../ui/button';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export const LoginComponent = memo(() => {
  const router = useRouter();
  const pathname = usePathname();

  const {
    login,
    isLoggingIn,
    isLoggedIn,
    error,
    walletConnectUri,
    getHWAccounts,
    walletConnectPairingLogin,
    walletConnectPairings,
    walletConnectRemovePairing,
  } = useLogin();

  const [loginMethod, setLoginMethod] = useState<LoginMethodsEnum>();

  const handleLogin = useCallback(
    (type: LoginMethodsEnum, ledgerAccountsIndex?: number) => () => {
      setLoginMethod(type);
      login(type, ledgerAccountsIndex);
    },
    [login],
  );

  const handleLoginFromRedirectedRoute = useEffect(() => {
    if (isLoggedIn) {
      // Redirect to the route that was requested before redirection to login page.
      const redirectPath = new URLSearchParams(window.location.search).get(
        'route',
      );
      console.log(redirectPath);
      if (redirectPath) {
        router.push(`${redirectPath}`);
      }
    }
  }, [isLoggedIn]);

  const handleLedgerAccountsList = useCallback(() => {
    setLoginMethod(LoginMethodsEnum.ledger);
  }, []);

  const resetLoginMethod = useCallback(() => {
    setLoginMethod(undefined);
  }, []);

  const ledgerOrPortalName = getLoginMethodDeviceName(loginMethod!);

  if (error)
    return (
      <div className="flex flex-col">
        <div className="text-center">{error}</div>
        <div className="text-center pt-4 font-bold">Close and try again</div>
      </div>
    );

  return (
    <>
      {isLoggingIn ? (
        <div className="flex inset-0 z-50 items-center justify-center min-h-[200px]">
          <div>
            {ledgerOrPortalName ? (
              <div className="mb-4">
                <div className="text-lg text-center">Confirmation required</div>
                <div className="text-sm text-center">
                  Approve on {ledgerOrPortalName}
                </div>
              </div>
            ) : null}
            <div className="flex items-center justify-center">
              <Spinner size="26" />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-1.5 items-center lg:px-8">
          <Button
            className="w-full select-none h-auto py-3 justify-between whitespace-nowrap bg-login-modal-label-background/[0.08] border-login-modal-label-background/[0.06] border-[1px]"
            variant="outline"
            onClick={handleLogin(LoginMethodsEnum.extension)}
          >
            <div className="flex items-center gap-2.5">
              <span className="size-4 text-white stroke-white items-center flex">
                <Image
                  alt="MultiversX DeFi Wallet login"
                  src="/assets/icons/login-app.svg"
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: '100%', height: 'auto' }}
                  priority
                />
              </span>
              <span>MultiversX DeFi Wallet</span>
            </div>
            <div className="flex items-center text-xs">
              <span className="text-login-modal-label-method font-philosopher-regular">
                Extension
              </span>
              <span className="gray-500 text-gray-500 items-center flex">
                <ChevronRightIcon className="h-4 w-4" />
              </span>
            </div>
          </Button>
          <Button
            className="w-full select-none h-auto py-3 justify-between whitespace-nowrap bg-login-modal-label-background/[0.08] border-login-modal-label-background/[0.06] border-[1px]"
            variant="outline"
            onClick={handleLogin(LoginMethodsEnum.walletconnect)}
          >
            <div className="flex items-center gap-2.5">
              <span className="size-4 text-white stroke-white items-center flex">
                <Image
                  alt="MultiversX DeFi Wallet login"
                  src="/assets/icons/login-xportal.svg"
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: '100%', height: 'auto' }}
                  priority
                />
              </span>
              <span>xPortal App</span>
            </div>
            <div className="flex items-center text-xs">
              <span className="text-login-modal-label-method font-philosopher-regular">
                Mobile
              </span>
              <span className="gray-500 text-gray-500 items-center flex">
                <ChevronRightIcon className="h-4 w-4" />
              </span>
            </div>
          </Button>
          <Button
            className="w-full select-none h-auto py-3 justify-between whitespace-nowrap bg-login-modal-label-background/[0.08] border-login-modal-label-background/[0.06] border-[1px]"
            variant="outline"
            onClick={handleLedgerAccountsList}
          >
            <div className="flex items-center gap-2.5">
              <span className="-ml-1 -mr-1.5 size-7 text-white stroke-white items-center flex">
                <Image
                  alt="MultiversX DeFi Wallet login"
                  src="/assets/icons/login-ledger.svg"
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: '100%', height: 'auto' }}
                  priority
                />
              </span>
              <span>Ledger</span>
            </div>
            <div className="flex items-center text-xs">
              <span className="text-login-modal-label-method font-philosopher-regular">
                Hardware
              </span>
              <span className="gray-500 text-gray-500 items-center flex">
                <ChevronRightIcon className="h-4 w-4" />
              </span>
            </div>
          </Button>
          <Button
            className="w-full select-none h-auto py-3 justify-between whitespace-nowrap bg-login-modal-label-background/[0.08] border-login-modal-label-background/[0.06] border-[1px]"
            variant="outline"
            onClick={handleLogin(LoginMethodsEnum.wallet)}
          >
            <div className="flex items-center gap-2.5">
              <span className="size-4 text-white stroke-white items-center flex">
                <Image
                  alt="MultiversX DeFi Wallet login"
                  src="/assets/icons/login-web.svg"
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: '100%', height: 'auto' }}
                  priority
                />
              </span>
              <span>MultiversX Web Wallet</span>
            </div>
            <div className="flex items-center text-xs">
              <span className="text-login-modal-label-method font-philosopher-regular">
                Browser
              </span>
              <span className="gray-500 text-gray-500 items-center flex">
                <ChevronRightIcon className="h-4 w-4" />
              </span>
            </div>
          </Button>
          <hr className="w-full h-px mx-auto bg-white/20 border-0 rounded mt-2 md:my-6" />
          <p className="-mb-1.5 text-sm text-login-modal-label-method">
            New to MultiversX?
          </p>
          <Link
            className="underline -mb-5 text-login-modal-label-method hover:text-gray-300 text-sm"
            href="https://wallet.multiversx.com/"
            target="_blank"
          >
            Learn how to setup a wallet
          </Link>
        </div>
      )}

      {loginMethod === LoginMethodsEnum.walletconnect && walletConnectUri && (
        <div className="mt-5">
          <WalletConnectQRCode uri={walletConnectUri} />
        </div>
      )}
      {loginMethod === LoginMethodsEnum.walletconnect &&
        walletConnectPairings &&
        walletConnectPairings.length > 0 && (
          <WalletConnectPairings
            pairings={walletConnectPairings}
            login={walletConnectPairingLogin}
            remove={walletConnectRemovePairing}
          />
        )}
      {loginMethod === LoginMethodsEnum.ledger && (
        <LedgerAccountsList
          getHWAccounts={getHWAccounts}
          resetLoginMethod={resetLoginMethod}
          handleLogin={handleLogin}
        />
      )}
    </>
  );
});

LoginComponent.displayName = 'LoginComponent';
