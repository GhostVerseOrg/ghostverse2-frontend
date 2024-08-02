'use client';
import React from 'react';
import { CreateCollectionForm } from '@/app/[locale]/create/_components/SimpleCreateCollection-demo';
import { ActivateCollectionForm } from '../_components/SimpleActivateCollection-demo';
import { CreateNFTForm } from '../_components/CreateNFT-demo';

interface LaunchpadProps {
  currentStep: string;
}

const renderSwitch = (param: string) => {
  switch (param) {
    case 'create-collection':
    default:
      return (
        <>
          <h1 className="text-3xl lg:text-5xl font-bold lg:leading-tight text-center">
            Create Collection
          </h1>
          <CreateCollectionForm />
        </>
      );
    case 'activate-collection':
      return (
        <>
          <h1 className="text-3xl lg:text-5xl font-bold lg:leading-tight text-center">
            Activate Collection
          </h1>
          <ActivateCollectionForm />
        </>
      );
    case 'create-nft':
      return (
        <>
          <h1 className="text-3xl lg:text-5xl font-bold lg:leading-tight text-center">
            Create NFT
          </h1>
          <CreateNFTForm />
        </>
      );
  }
};

export const Launchpad: React.FC<LaunchpadProps> = ({ currentStep }) => {
  console.log(currentStep);
  return <div className="py-6">{renderSwitch(currentStep)}</div>;
};
