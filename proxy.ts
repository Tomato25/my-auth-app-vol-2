import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  const isProtectedRoute = pathname.includes('/employees') || 
                          pathname.includes('/products');
  
  if (isProtectedRoute) {
   
    const token = request.cookies.get('token')?.value;
    
    if (!token) {
      const locale = pathname.split('/')[1] || 'en';
      const loginUrl = new URL(`/${locale}/login`, request.url);
      return NextResponse.redirect(loginUrl);
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/:locale/employees/:path*',
    '/:locale/products/:path*',
    // Add other protected routes
  ],
};