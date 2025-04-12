"use client";

import { useRouter } from "next/navigation";
import { useEffect } from 'react';

export default function Login() {
    const router = useRouter();

    useEffect(() => {
        router.push('/login');
    }, [router]);

  return (
      <div>
          <p>Loading...</p>
      </div>
  );
}
