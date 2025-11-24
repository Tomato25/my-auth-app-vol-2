"use client";

import { useTranslations,useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { NavigationMenuItem } from "../ui/navigation-menu";
import Link from "next/link";

type Props = {};

function Links({}: Props) {
  const locale = useLocale()
  const pathname = usePathname()
  const pathWithoutLocale = "/" + pathname.split("/").slice(2).join("/");
  const t = useTranslations("links");

  const pages: { title: string; href: string }[] = [
    {
      title: t("employees"),
      href: `/${locale}/employees`,
    },
    {
      title: t("products"),
      href: `/${locale}/products`,
    },
  ];

  return (
    <>
      {pages.map((page) => {
      const isActive = pathWithoutLocale === page.href.replace(`/${locale}`, "");

        return (
          <NavigationMenuItem key={page.title}>
            <Link
              href={page.href}
              className={`
                    px-3 py-2 rounded-md transition
                    ${isActive ? "bg-primary text-white" : "hover:bg-secondary"}
                  `}
            >
              {page.title}
            </Link>
          </NavigationMenuItem>
        );
      })}
    </>
  );
}

export default Links;