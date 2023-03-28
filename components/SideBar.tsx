"use client";

import { collection, orderBy, query } from "firebase/firestore";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";

import ChatRow from "@/components/chat/ChatRow";
import NewChat from "@/components/chat/NewChat";

function SideBar() {
  const { data: session } = useSession();
  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, "users", session.user?.email!, "chats"),
        orderBy("createdAt", "asc")
      )
  );
  console.log(session);
  return (
    <div className="p-2 flex flex-col h-screen">
      <div className="flex-1">
        <div>
          {/* New chat */}
          <NewChat />
          <div className="">{/* Model selectio */}</div>
          {/* Map through the chartows */}
          {chats?.docs.map((chat) => (
            <ChatRow key={chat.id} id={chat.id} />
          ))}
          <div></div>
        </div>
      </div>
      {session && (
        <div
          className="h-12 w-12 cursor-pointer mx-auto mb-2 hover:opacity-50"
          onClick={() => signOut()}
        >
          <Image
            className="rounded-full"
            width={48}
            height={48}
            src={
              session.user?.image! || `https://ui-avatars.com/api/?name=wail`
            }
            alt="User image"
          />
        </div>
      )}
    </div>
  );
}

export default SideBar;
