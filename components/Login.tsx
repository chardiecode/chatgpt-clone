"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

function Login() {
  return (
    <div className="bg-[#f6f6f6] h-screen flex flex-col items-center justify-center text-center">
      <Image
        src="https://www.pngitem.com/pimgs/m/66-668806_openai-logo-openai-logo-elon-musk-hd-png.png"
        width={300}
        height={300}
        alt="logo"
      />
      <button
        onClick={() => signIn("google")}
        className="font-bold text-3xl animate-pulse"
      >
        Sign in now to use chatgpt2.0
      </button>
    </div>
  );
}

export default Login;
