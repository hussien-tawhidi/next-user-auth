import { loginUser } from "@/helpers";
import { InputErros } from "@/types";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";

export default function SignUpForm() {
  const [data, setData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [validationErrors, setValidationErrors] = useState<InputErros[]>([]);
  const [submitError, setSubmitError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const validateData = (): boolean => {
    const err = [];

    if (data.fullName?.length < 4) {
      err.push({ fullName: "Full name must be at least 5 character" });
    } else if (data.fullName?.length > 30) {
      err.push({ fullName: "Full name must be maximum character" });
    } else if (data.password?.length < 6) {
      err.push({ password: "Password must be atleast 6 character" });
    } else if (data.password !== data.confirmPassword) {
      err.push({ confirmPassword: "Password are not are matched" });
    }

    setValidationErrors(err);

    if (err.length > 0) {
      return false;
    } else {
      return true;
    }
  };

  const HandleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValid = validateData();

    if (isValid) {
      try {
        setLoading(true);
        const apiRes = await axios.post(
          "http://localhost:3000/api/auth/signup",
          data
        );

        if (apiRes?.data?.success) {
          const loginRes = await loginUser({
            email: data?.email,
            password: data?.password,
          });

          if (loginRes && !loginRes.ok) {
            setSubmitError(loginRes.error || "");
          } else {
            router.push("/");
          }
        }
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          const errorMsg = error.response?.data?.error;
          setSubmitError(errorMsg);
        }
      }
      setLoading(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
  return (
    <div className='container'>
      <div className='flex items-center justify-center flex-col'>
        <h5 className='text-center text-3xl my-5 font-bold text-zinc-400'>
          Sign up
        </h5>
        <form onSubmit={HandleSignUp} className='w-80 mx-auto'>
          <input
            type='text'
            placeholder={"Full Name"}
            value={data.fullName}
            name='fullName'
            onChange={handleInputChange}
            required
            className='border-b-[1px] w-full p-3 mb-3'
          />
          <input
            type='email'
            placeholder={"Email"}
            value={data.email}
            name='email'
            onChange={handleInputChange}
            required
            className='border-b-[1px] w-full p-3 mb-3'
          />
          <input
            type='password'
            placeholder={"Password"}
            value={data.password}
            name='password'
            onChange={handleInputChange}
            required
            className='border-b-[1px] w-full p-3 mb-3'
          />
          <input
            type='password'
            placeholder={"Confirm Password"}
            value={data.confirmPassword}
            name='confirmPassword'
            onChange={handleInputChange}
            required
            className='border-b-[1px] w-full p-3 mb-3'
          />
          {submitError && (
            <p className='text-red-500 py-2 text-center'>
              {data?.email}
              {submitError}
            </p>
          )}
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
