"use client";

import Link from "next/link";
import { usePathname, useParams, useSearchParams } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { routing } from "@/i18n/routing";

export function LanguageSwitcher() {
  const pathname = usePathname();
  const params = useParams();
  const searchParams = useSearchParams();
  const search = searchParams?.toString();
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          {(params.locale as string).toUpperCase()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {routing.locales.map((locale) => {
          if (locale === params.locale) return null; 
          const href = `${pathname.replace(`/${params.locale}`, `/${locale}`)}${search ? `?${search}` : ""}`;
          return (
            <DropdownMenuItem key={locale} asChild>
              <Link href={href}>{locale.toUpperCase()}</Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}