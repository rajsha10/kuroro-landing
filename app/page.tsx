"use client";
import KuroroLanding from "@/components/kuroro-landing"
import LoginButton from "@/components/LoginButton";
import { useOCAuth } from '@opencampus/ocid-connect-js';

export default function Home() {
  const { isInitialized, authState, ocAuth } = useOCAuth();

  if (!isInitialized) {
    return <div>Loading...</div>;
  }

  if (authState.error) {
    return <div>Error: {authState.error.message}</div>;
  }

  return (
    <>
      {authState.isAuthenticated ? (
        <KuroroLanding />
        
      ) : (
        <LoginButton />
      )}
    </>
  )
}

