'use client';

import { TokenTransfer } from '@multiversx/sdk-core';
import Link from 'next/link';
import { useAccount, useConfig } from '@useelven/core';
import { Card, CardContent } from '../ui/card';
import { shortenHash } from '../lib/shorten-hash';
import { useEffect, useState } from 'react';

export const GetUserDataDemo = () => {
  const { address, nonce, balance, activeGuardianAddress } = useAccount();
  const { explorerAddress } = useConfig();

  // Fetch GREEN token balance for the current wallet session.
  const [balanceGreen, setBalanceGreen] = useState<number>();
  const [herotag, setHerotag] = useState<string>('');

  useEffect(() => {
    const getGreenBalance = async () => {
      const res = await fetch(
        'https://api.multiversx.com' +
          `/accounts/` +
          address +
          `/tokens?name=GREEN`,
        {
          method: 'GET',
        },
      );

      if (!res.ok) {
        return console.error(await res.text());
      }

      if (res.status === 200) {
        const data = await res.json();

        // Check if response is empty.
        if (data[0] && data[0]?.balance) {
          let balanceGreen = data[0].balance;

          if (balanceGreen != 0) {
            setBalanceGreen(balanceGreen);
          }
        }
      }
    };

    getGreenBalance();
  }, [address]);

  useEffect(() => {
    const getGreenBalance = async () => {
      const res = await fetch(
        'https://api.multiversx.com' + `/address/` + address,
        {
          method: 'GET',
        },
      );

      if (!res.ok) {
        return console.error(await res.text());
      }

      if (res.status === 200) {
        const data = await res.json();

        // Check if response is empty.
        if (data.data.account.username) {
          // Default is like @build.elrond, we need to pick the first part only.
          let username = data.data.account.username.split('.')[0];

          if (username != '') {
            setHerotag(username);
          }
        }
      }
    };

    getGreenBalance();
  }, [address]);

  return (
    <Card className="flex-1">
      <CardContent className="mt-6">
        {!herotag ? (
          <div className="text-xl mb-2 font-bold">User data:</div>
        ) : null}
        {herotag ? (
          <div className="text-xl mb-2 font-bold">Hello @{herotag} !</div>
        ) : null}
        <div>
          <span className="inline-block font-bold">address:</span>{' '}
          {address ? (
            <Link
              className="underline"
              href={`${explorerAddress}/accounts/${address}`}
            >
              {shortenHash(address, 8)}
            </Link>
          ) : (
            '-'
          )}
        </div>
        <div>
          {/* <span className="inline-block font-bold">guardian:</span>{' '}
          {activeGuardianAddress ? (
            <Link
              className="underline"
              href={`${explorerAddress}/accounts/${address}`}
            >
              {shortenHash(activeGuardianAddress, 8)}
            </Link>
          ) : (
            <span>-</span>
          )} */}
        </div>
        {/* <div> */}
        {/* <span className="inline-block font-bold">nonce:</span> {nonce}
        </div> */}
        <div>
          <span className="inline-block font-bold">EGLD:</span>{' '}
          {balance
            ? parseFloat(
                TokenTransfer.egldFromBigInteger(balance).toPrettyString(),
              )
            : '-'}
        </div>
        <div>
          <span className="inline-block font-bold">GREEN:</span>{' '}
          {balanceGreen ? balanceGreen : '-'}
        </div>
      </CardContent>
    </Card>
  );
};
