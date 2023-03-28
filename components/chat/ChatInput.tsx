"use client";

import { FormEvent, useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase";
import { toast } from "react-hot-toast";

type Props = {
  chatId: string;
};

function ChatInput({ chatId }: Props) {
  const [prompt, setPrompt] = useState("");
  const { data: session } = useSession();

  // TODO useSWR to get model
  const model = "text-davinci-003";
  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt) return;
    const input = prompt.trim();
    setPrompt("");

    const message: Message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: "ChatGPT",
        name: "ChatGPT",
        avatar: session?.user?.image!,
      },
    };

    await addDoc(
      collection(
        db,
        "users",
        session?.user?.email!,
        "chats",
        chatId,
        "messages"
      ),
      message
    );

    // Toast notification to say loading!
    const notification = toast.loading("ChatGPT is thinking...");

    await fetch("/api/askQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: input,
        chatId,
        model,
        session,
      }),
    }).then(() => {
      // Toast notification to say successful
      toast.success("ChatGPT has reponded", {
        id: notification,
      });
    });
  };
  return (
    <div className="bg-gray-700/50 text-white rounded-lg text-sm">
      <form onSubmit={sendMessage} className="p-3 space-x3 flex">
        <input
          className="bg-transparent flex-1 focus:outline-none
          disabled:cursor-not-allowed disabled:text-gray-300"
          disabled={!session}
          type="text"
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type you message here..."
          value={prompt}
        />
        <button
          disabled={!prompt || !session}
          className="bg-[#11A37f] hover:opacity-50 text-white font-bold px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
          type="submit"
          aria-label="submit-button"
        >
          <PaperAirplaneIcon className="h-4 w-4 -rotate-45" />
        </button>
      </form>
    </div>
  );
}

export default ChatInput;
