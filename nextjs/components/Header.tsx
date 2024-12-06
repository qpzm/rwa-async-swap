import React from "react";
import { useRouter } from "next/router";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import { useChainId } from "wagmi";
import { FaucetButton, RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import Link from "next/link";

const isActiveLink = (router: any, href: string) => router.pathname === href;
/**
 * Site header
 */
export const Header = () => {
  const router = useRouter();
  const chainId = useChainId();
  const redirectLink = (event: any, href: string) => {
    event.preventDefault();
    router.push(href);
  };
  const navLinks = (
    <>
      <NavbarItem
        className="cursor-pointer"
        isActive={isActiveLink(router, "/swap-ui?page=swap")}
        onClick={(event: any) => redirectLink(event, "/swap-ui?page=swap")}
      >
        Swap
      </NavbarItem>
      <NavbarItem
        className="cursor-pointer"
        isActive={isActiveLink(router, "/swap-ui?page=queue")}
        onClick={(event: any) => redirectLink(event, "/swap-ui?page=queue")}
      >
        Queue
      </NavbarItem>
    </>
  );

  return (
    <Navbar
      shouldHideOnScroll
      isBordered
      maxWidth="full"
      // className="px-10 md:px-0"
      classNames={{
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[2px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-purple-600",
        ],
        base: "px-10 md:px-0",
      }}
    >
      <NavbarBrand>
        <Link href="/">
          <p className="font-bold text-inherit">rwa-async-swap</p>
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {navLinks}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <RainbowKitCustomConnectButton />
        </NavbarItem>
        <NavbarItem>
          <FaucetButton />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};
