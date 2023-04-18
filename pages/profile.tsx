import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";
import React from "react";

export default function profile() {
  const { data: session } = useSession();
  return (
    <Layout>
      <div className='flex items-center gap-4 justify-center h-[100vh] '>
        <h1 className='text-center capitalize'>
          Welcome to your profile in this page you can see all of your setting{" "}
          <p className='font-bold text-zinc-100 text-3xl'>{session?.user?.fullName}</p>
          <p className='font-bold text-zinc-100 text-3xl'>{session?.user?.email}</p>
        </h1>
      </div>
    </Layout>
  );
}
