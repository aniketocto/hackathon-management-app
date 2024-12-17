"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { LogOutIcon, User } from "lucide-react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "db/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchUserFromFirestore } from "db/crud";

const Header = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const data = await fetchUserFromFirestore(user.uid);
          setUserData(data);
        } catch (error) {
          console.error("Error loading user data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        router.push("/login");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  return (
    <nav className="relative z-10 py-6 sm:p-6 container">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-lg sm:text-3xl font-bold cyber-glow">
          <Link href="/">
            CYBER<span className="text-neonGreen">HACK</span>
          </Link>
        </h1>

        <div className="sm:space-x-6 space-x-2 text-center flex justify-center items-center">
          <Link href="/create">
            Create
          </Link>
          {/* <Link href="/events">
            Events
          </Link> */}
          {!user ? (
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger className="rounded-full w-10 overflow-hidden">
                <Avatar>
                  <AvatarFallback>
                    {userData?.name?.[0]?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="border border-neonGreen">
                <DropdownMenuLabel>
                  {loading ? "Loading..." : userData?.name || "User"}
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="border border-neonGreen" />
                <Link href="/profile">
                  <DropdownMenuItem>
                    <User className="mr-2" />
                    Profile
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="flex justify-start items-center text-red-400"
                >
                  <LogOutIcon className="mr-2" />
                  Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
