'use client';

import type { PropsWithChildren, ReactNode } from 'react';
//import {
//  TransactionsToastList,
//  NotificationModal,
//  SignTransactionsModals,
//  // uncomment this to use the custom transaction tracker
//  // TransactionsTracker
//} from '@/components';

import {
  apiTimeout,
  walletConnectV2ProjectId,
  environment,
  sampleAuthenticatedDomains,
} from '@/config';
import { BatchTransactionsContextProvider } from '@/app/_wrappers/BatchTransactionsContextProvider';
import { AxiosInterceptorContext } from '@multiversx/sdk-dapp/wrappers/AxiosInterceptorContext';
import { RouteNamesEnum } from '@/app/_constants/routes';
import { DappProvider } from '@/app/_components/sdkDappComponents/sdkDappComponents';

const AppContent = ({ children }: PropsWithChildren) => {
  return (
    <DappProvider
      environment={environment}
      customNetworkConfig={{
        name: 'customConfig',
        apiTimeout,
        walletConnectV2ProjectId,
      }}
      dappConfig={{
        isSSR: true,
        shouldUseWebViewProvider: true,
        logoutRoute: RouteNamesEnum.home,
      }}
      customComponents={{
        transactionTracker: {
          // uncomment this to use the custom transaction tracker
          // component: TransactionsTracker,
          props: {
            onSuccess: (sessionId: string) => {
              console.log(`Session ${sessionId} successfully completed`);
            },
            onFail: (sessionId: string, errorMessage: string) => {
              console.log(`Session ${sessionId} failed. ${errorMessage ?? ''}`);
            },
          },
        },
      }}
    >
      <AxiosInterceptorContext.Listener>
        {/*<TransactionsToastList />*/}
        {/*<NotificationModal />*/}
        {/*<SignTransactionsModals />*/}
        {children}
      </AxiosInterceptorContext.Listener>
    </DappProvider>
  );
};

export default function App({ children }: { children: ReactNode }) {
  return (
    <AxiosInterceptorContext.Provider>
      <AxiosInterceptorContext.Interceptor
        authenticatedDomains={sampleAuthenticatedDomains}
      >
        <BatchTransactionsContextProvider>
          <AppContent>{children}</AppContent>
        </BatchTransactionsContextProvider>
      </AxiosInterceptorContext.Interceptor>
    </AxiosInterceptorContext.Provider>
  );
}
