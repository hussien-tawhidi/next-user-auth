import { loginUser } from "@/helpers";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const router = useRouter();
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);
      const loginRes = await loginUser({ email, password });
      if (loginRes && !loginRes.ok) {
        setSubmitError(loginRes.error || "");
      } else {
        router.push("/");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMsg = error.response?.data?.error;
        setSubmitError(errorMsg);
      }
    }
    setLoading(false);
  };
  return (
    <div className='container'>
      <div className='flex items-center justify-center flex-col'>
        <h5 className='text-center text-3xl my-5 font-bold text-zinc-400'>
          Sign up
        </h5>
        <form onSubmit={handleLogin} className='w-80 mx-auto'>
          <input
            type='email'
            placeholder={"Email"}
            value={email}
            name='email'
            onChange={handleEmailChange}
            required
            className='border-b-[1px] w-full p-3 mb-3'
          />
          <input
            type='password'
            placeholder={"Password"}
            value={password}
            name='password'
            onChange={handlePasswordChange}
            required
            className='border-b-[1px] w-full p-3 mb-3'
          />
          {submitError && <p>{submitError}</p>}
          <button
            type='submit'
            disabled={loading}
            className={`bg-slate-600 p-2 rounded-md w-full text-white ${
              loading && "bg-zinc-500 cursor-not-allowed"
            }`}>
            {loading ? "Loading ..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
