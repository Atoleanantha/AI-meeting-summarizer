import React, { useState } from 'react';
import { AuthForm } from '@/components/auth/AuthForm';

const Auth = () => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');

  const toggleMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
  };

  return <AuthForm mode={mode} onToggleMode={toggleMode} />;
};

export default Auth;