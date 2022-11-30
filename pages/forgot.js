import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Forgot() {
  const router = useRouter();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cpassword, setCpassword] = useState('')


  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/");
    }
  }, []);


  const handleChange = async (e) => {
    if (e.target.name == "password") {
      setPassword(e.target.value);
    } else if (e.target.name == "cpassword") {
      setCpassword(e.target.value);
    } else if (e.target.name == "email") {
      setEmail(e.target.value);
    }
  };


  const sendResetEmail = async () => {
    let data = {
      email,
      sendmail: true
    }

    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let res = await a.json();
    if (res.success) {
      toast.success("Reset Password Link Sent to your Mail Id", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    else {
      toast.error("Some Error Occurred", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  const resetPassword = async () => {
    if (password === cpassword) {
      let data = {
        password, sendmail: false,
        token: router.query.token
      }
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      let res = await a.json();
      if (res.success) {
        toast.success("Password Has Been Changed", {
          position: "top-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      else {
        toast.error("Some Error Occurred", {
          position: "top-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  }

  return (
    <div className="flex min-h-screen items-start justify-center py-32 px-4 sm:px-6 lg:px-8">
      <ToastContainer
        position="top-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="w-full max-w-md space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=pink&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Reset Your Password
          </h2>
          <div className="mt-2 text-center text-sm text-gray-600">
            Or
            <Link href="/login">
              <a
                href="#"
                className="font-medium text-pink-600 hover:text-pink-500">
                {" "}
                Login
              </a>
            </Link>
          </div>
        </div>
        {router.query.token && <div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" value="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="password" className="sr-only">Enter New Password</label>
                <input
                  value={password}
                  onChange={handleChange}
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md mb-2 border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-pink-500 focus:outline-none focus:ring-pink-500 sm:text-sm"
                  placeholder="Enter New Password"
                />
              </div>
              <label htmlFor="cpassword" className="sr-only">
                Confirm Password
              </label>
              <input
                value={cpassword}
                onChange={handleChange}
                id="cpassword"
                name="cpassword"
                type="password"
                required
                className="relative block w-full appearance-none rounded-none rounded-t-md border mb-4 border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-pink-500 focus:outline-none focus:ring-pink-500 sm:text-sm"
                placeholder="Confirm Password"
              />
            </div>
            <div>
              <button
                onClick={resetPassword}
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-pink-600 py-2 px-4 text-sm font-medium text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-pink-500 group-hover:text-pink-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                Continue
              </button>
            </div>
            {password != cpassword && <span className="text-red-600">Passwords Don't Match</span>}
            {password && password === cpassword && <span className="text-green-600">Passwords Matched</span>}
          </form>
        </div>
        }
        {!router.query.token && <form className="mt-8 space-y-6" action="#" method="POST">
          <input type="hidden" name="remember" value="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                value={email}
                onChange={handleChange}
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-pink-500 focus:outline-none focus:ring-pink-500 sm:text-sm"
                placeholder="Email address"
              />
            </div>
          </div>

          <div>
            <button
              onClick={sendResetEmail}
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-pink-600 py-2 px-4 text-sm font-medium text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-pink-500 group-hover:text-pink-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Continue
            </button>
          </div>
        </form>}
      </div>
    </div>
  );
}

export default Forgot;
