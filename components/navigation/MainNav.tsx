"use client";
import { FC, useState, useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import {
  CircleUserRound,
  ClipboardPlus,
  Disc,
  LayoutDashboard,
  Menu,
  Moon,
  Sun,
} from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import Image from "next/image";

interface MainNavProps {}

const MainNav: FC<MainNavProps> = ({}) => {
  const [scrolled, setScrolled] = useState(false);

  const { user } = useUser();
  const { setTheme, theme } = useTheme();
  const isDark = theme === "dark";
  const handleChangeTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  const pathname = usePathname();
  const links = [
    {
      name: "Dashboard",
      href: "/dashboard",
      active: pathname.includes("dashboard"),
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      name: "Cases ",
      href: "/cases",
      active: pathname.includes("case"),
      icon: <ClipboardPlus className="w-5 h-5" />,
    },
    {
      name: "Recordings",
      href: "/recordings",
      active: pathname.includes("recordings"),
      icon: <Disc className="w-5 h-5" />,
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`w-full h-[60px] flex justify-between items-center px-4 py-9 lg:px-6 backdrop-blur-md border-b bg-transparent `}
    >
      <div className="Branding flex justify-center items-center gap-2">
        <span className="flex justify-center items-center gap-2">
          {isDark ? (
            <Image
              src="/valenis-ai-logo01-dark-01.png"
              alt="logo"
              width={150}
              height={150}
            />
          ) : (
            <Image
              src="/valenis-ai-logo01-02-04-01-01.png"
              alt="logo"
              width={150}
              height={150}
            />
          )}
          {/* <h1 className="font-bold text-xl">MedSim AI</h1> */}

          <p className="border border-[#e9e9e9] dark:border-[#898989] font-semibold px-2 py-1 rounded-full text-xs opacity-70  ">
            EXPERIMENTAL
          </p>
        </span>

        <div className="flex justify-start items-center gap-4 ml-8">
          {links.map((link) => (
            <Link
              key={link.name}
              href={`${link.href}`}
              className={`  flex justify-center items-center h-fit  px-4 py-2  ${
                link.active
                  ? "dark:bg-[#1f1f1f] bg-[#e3e3e3] opacity-100  "
                  : "  opacity-60 hover:opacity-100 transition-all ease-in-out"
              } font-medium flex justify-start items-center gap-2 w-full p-3  rounded-md transition-all ease-in-out`}
            >
              {" "}
              {link.icon}
              {link.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex justify-end items-center gap-6">
        <button onClick={handleChangeTheme}>
          {isDark ? <Sun /> : <Moon />}
        </button>
        <Popover>
          <PopoverTrigger>
            <Avatar className="w-9 h-9 ">
              <AvatarImage src={user?.imageUrl} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent
            sideOffset={10}
            className="mr-4  flex flex-col justify-start overflow-hidden p-0 dark:bg-[#151515] "
          >
            <div className="flex justify-start items-center gap-4 max-w-full border-b p-4">
              <div>
                <Avatar className="w-10 h-10">
                  <AvatarImage src={user?.imageUrl} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex flex-col justify-start items-start gap-1 max-w-full">
                <h3 className="capitalize text-sm font-medium">
                  {user?.username}
                </h3>
                <p className=" max-w-full truncate text-xs opacity-50">
                  {user?.emailAddresses.map((email) => email.emailAddress)}
                </p>
              </div>
            </div>
            <div className="Menu p-4 w-full">
              <ul className="w-full">
                <li className="w-full  hover:bg-muted dark:hover:bg-[#232323] p-3 rounded-lg">
                  <Link
                    href={`/profile`}
                    className="flex justify-start items-center gap-2"
                  >
                    <CircleUserRound className="w-5 h-5" /> Profile
                  </Link>
                </li>
              </ul>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default MainNav;
