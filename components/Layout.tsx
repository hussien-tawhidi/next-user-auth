import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { CiUser } from "react-icons/ci";
import { AiOutlineLogin, AiOutlinePoweroff } from "react-icons/ai";
import { RiHome6Line, RiLogoutCircleLine } from "react-icons/ri";

export default function Layout({ children }: any) {
  const { data: session } = useSession();
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <main>
        <div className='w-full h-100 flex items-center px-9 border-b-[1px] '>
          <ul className='flex gap-5  h-200 w-full py-4 '>
            {session ? (
              <>
                <Link href='/profile'>
                  <li className='flex gap-1 items-center h-100 font-semibold text-zinc-400'>
                    <CiUser /> {session?.user?.fullName}
                  </li>
                </Link>
                <li
                  onClick={() => signOut()}
                  className='font-semibold text-zinc-400 cursor-pointer flex items-center gap-2 justify-center'>
                  Sign Out
                  <AiOutlinePoweroff />
                </li>
              </>
            ) : (
              <>
                <Link href='/signin'>
                  <li className='flex gap-1 items-center h-100 font-semibold text-zinc-400'>
                    <RiLogoutCircleLine />
                    Sign In
                  </li>
                </Link>
                <Link href='/signup'>
                  <li className='flex gap-1 items-center h-100 font-semibold text-zinc-400'>
                    Sign Up
                    <AiOutlineLogin />
                  </li>
                </Link>
              </>
            )}
          </ul>
          <Link href='/'>
            <p className='font-semibold text-zinc-400 flex gap-1 items-center justify-center'>
              Home <RiHome6Line />
            </p>
          </Link>
        </div>
        {children}
      </main>
    </>
  );
}
