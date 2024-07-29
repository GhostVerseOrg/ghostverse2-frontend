'use client';

import { FC, useState } from 'react';
import { useLogin, useLogout } from '@useelven/core';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { LoginComponent } from './login-component';
import { Button } from '../ui/button';
import { useEffectOnlyOnUpdate } from '../hooks/use-effect-only-on-update';

interface LoginModalButtonProps {
  onClose?: () => void;
  onOpen?: () => void;
}

export const LoginModalButton: FC<LoginModalButtonProps> = ({
  onClose,
  onOpen,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, isLoggingIn, setLoggingInState } = useLogin();

  const { logout } = useLogout();

  useEffectOnlyOnUpdate(() => {
    if (isLoggedIn) {
      setIsOpen(false);
      onClose?.();
    }
  }, [isLoggedIn]);

  const onCloseComplete = (open: boolean) => {
    if (!open) {
      setIsOpen(false);
      setTimeout(() => {
        setLoggingInState('error', '');
      }, 1000);
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
    onOpen?.();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onCloseComplete}>
      {isLoggedIn ? (
        <Button variant="ghostTheme" onClick={() => logout()}>
          Logout
        </Button>
      ) : (
        <Button variant="ghostTheme" onClick={handleOpen}>
          {isLoggingIn ? 'Connecting...' : 'Connect'}
        </Button>
      )}
      <DialogContent className="max-w-xs sm:max-w-lg bg-login-modal-background border-white/30 text-login-modal-text p-0">
        <div
          className="
            flex justify-center gap-2
            px-6 pt-6 
            text-xl tracking-tight text-white/85"
        >
          <p className="font-cubic12">Connect to </p>
          <p className="font-cubic12">GhostVerse</p>
        </div>
        <div className="grid gap-4 overflow-y-auto max-h-[calc(100vh-160px)] px-6 pb-12 pt-3">
          <LoginComponent />
        </div>
      </DialogContent>
    </Dialog>
  );
};
