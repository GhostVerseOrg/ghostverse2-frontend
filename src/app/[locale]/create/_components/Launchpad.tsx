'use client';
import React from 'react';
import { CreateCollectionForm } from '@/app/[locale]/create/_components/SimpleCreateCollection-demo';
import { ActivateCollectionForm } from '../_components/SimpleActivateCollection-demo';
import { CreateNFTForm } from '../_components/CreateNFT-demo';

interface LaunchpadProps {
  currentStep: string;
}

export const Launchpad: React.FC<LaunchpadProps> = ({ currentStep }) => {
  return (
    <div className="py-6">
      {currentStep === 'create-collection' ? (
        <>
          <h1 className="text-3xl lg:text-5xl font-bold lg:leading-tight text-center">
            Create Collection
          </h1>
          <CreateCollectionForm />
        </>
      ) : currentStep === 'activate-collection' ? (
        <>
          <h1 className="text-3xl lg:text-5xl font-bold lg:leading-tight text-center">
            Activate Collection
          </h1>
          <ActivateCollectionForm />
        </>
      ) : currentStep === 'create-nft' ? (
        <>
          <h1 className="text-3xl lg:text-5xl font-bold lg:leading-tight text-center">
            Create NFT
          </h1>
          <CreateNFTForm />
        </>
      ) : null}
    </div>
  );
};
