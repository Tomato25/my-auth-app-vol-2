'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function LocaleRootPage() {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;

  useEffect(() => {
    async function checkAuthAndRedirect() {
      const token = localStorage.getItem('token');

      if (!token) {
        // No token - go to login
        router.replace(`/${locale}/login`);
        return;
      }

      try {
        // Verify token with your API
        const response = await fetch('/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          // Valid token - go to employees
          router.replace(`/${locale}/employees`);
        } else {
          // Invalid token - clear and go to login
          localStorage.removeItem('token');
          router.replace(`/${locale}/login`);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        router.replace(`/${locale}/login`);
      }
    }

    checkAuthAndRedirect();
  }, [locale, router]);

  // Show loading while checking
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );
}