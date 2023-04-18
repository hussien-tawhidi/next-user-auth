import Layout from "@/components/Layout";

export default function Home() {
 
  return (
    <Layout>
      <div className='h-[100vh] w-full flex flex-col items-center justify-center'>
        <div className='font-bold text-zinc-400 flex flex-col gap-3'>
          <h1 className="text-4xl">This is some text for next auth</h1>
          <h6>Nextjs</h6>
          <h6>Next_auth</h6>
          <h6>Mongoose</h6>
        </div>
      </div>
    </Layout>
  );
}
