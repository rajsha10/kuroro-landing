'use client';

import React from 'react';
import { useOCAuth } from '@opencampus/ocid-connect-js';

export default function LoginButton(): React.ReactElement {
  const { ocAuth } = useOCAuth();

  const handleLogin = async (): Promise<void> => {
    try {
      await ocAuth.signInWithRedirect({ state: 'opencampus' });
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return <button onClick={handleLogin}>Login</button>;
}