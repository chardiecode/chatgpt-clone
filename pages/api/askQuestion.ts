// import { query } from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from "next";
import admin from "firebase-admin";
import query from "@/lib/queryApi";
import { adminDb } from "@/firebaseAdmin";

type Data = {
  answer: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { prompt, chatId, model, session } = req.body;
  if (!prompt) {
    res.status(400).json({ answer: "Pleade provide a prompt!" });
    return;
  }
  if (!chatId) {
    res.status(400).json({ answer: "Pleade provide a valid chat ID!" });
    return;
  }
  const response = await query(prompt, chatId, model);
  const message: Message = {
    text: response || "ChatGPT was unable to find an answer for that!",
    createdAt: admin.firestore.Timestamp.now(),
    user: session,
  };

  await adminDb
    .collection("users")
    .doc(session?.user?.email)
    .collection("chats")
    .doc(chatId)
    .collection("messages")
    .add(message);

  res.status(200).json({ answer: message.text });
}
