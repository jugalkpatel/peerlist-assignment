import peerlistLogo from "@/public/images/peerlist-logo-full.svg";
import yogini from "@/public/images/yogini.svg";
import Image from "next/image";
import Link from "next/link";
import {
  Home,
  Box,
  MessageCircleMore,
  Briefcase,
  Search,
  Users,
  Menu,
  MenuIcon,
} from "lucide-react";
import { ActionButton, ActionIcon } from "./Header";
import { useEffect, useState } from "react";
import useMediaQuery from "@/hooks/useMediaQuery";

const sidebarItems: SidebarItemProps[] = [
  {
    icon: Home,
    label: "Scroll",
    path: "/",
  },
  {
    icon: Box,
    label: "Projects",
    path: "/",
  },
  {
    icon: MessageCircleMore,
    label: "Inbox",
    path: "/",
  },
  {
    icon: Briefcase,
    label: "Jobs",
    path: "/",
  },
  {
    icon: Search,
    label: "Search",
    path: "/",
  },
  {
    icon: Users,
    label: "My Network",
    path: "/",
  },
];

export function Sidebar() {
  const [showMenu, setShowMenu] = useState(false);
  const isDesktop = useMediaQuery(1024);

  useEffect(() => {
    if (!isDesktop) {
      setShowMenu(true);
    } else {
      setShowMenu(false);
    }
  }, [isDesktop]);

  return (
    <div className="border-r border-border-primary bg-white fixed top-0 left-0 lg:static p-3 lg:pl-6 lg:pt-4 gap-8 flex w-full justify-between lg:justify-normal lg:flex-col z-20">
      <div className="relative ">
        <div className="flex gap-2 ">
          <ActionButton
            className="lg:hidden"
            onClick={() => setShowMenu((prev) => !prev)}
          >
            <Menu />
          </ActionButton>
          <Link href="/" className="block">
            <Image src={peerlistLogo} width={132} height={32} alt="logo" />
          </Link>
        </div>
      </div>
      {showMenu && (
        <section className="flex flex-col gap-4 absolute  top-[59px] bg-white h-[calc(100vh-60px)] lg:h-fit w-[212px] lg:w-full lg:static p-4 lg:p-0 border-r border-border-primary lg:border-0 ">
          {sidebarItems.map((i, idx) => {
            return <SidebarItem {...i} key={`sidebaritem-${idx}`} />;
          })}
        </section>
      )}
      <Profile />
    </div>
  );
}

type SidebarItemProps = {
  path: string;
  icon: React.ElementType;
  label: string;
};

function SidebarItem({ icon, label, path }: SidebarItemProps) {
  return (
    <Link
      href={path}
      className="flex gap-2 text-txt-primary items-center hover:font-semibold cursor-pointer"
    >
      <ActionIcon Component={icon} className="h-6 w-6" />
      <p className="text-sm">{label}</p>
    </Link>
  );
}

function Profile() {
  return (
    <Link
      href="/"
      className="flex gap-2 text-txt-primary items-center hover:font-semibold cursor-pointer"
    >
      <Image src={yogini} height={24} width={24} alt="avatar" />
      <p className="text-sm">Yogini</p>
    </Link>
  );
}
