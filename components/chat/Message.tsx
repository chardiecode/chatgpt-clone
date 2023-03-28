import Image from "next/image";
import { DocumentData } from "firebase/firestore";

type Props = {
  message: DocumentData;
};

function Message({ message }: Props) {
  const isChatGPT = message.user.name !== "ChatGPT";
  return (
    <div
      className={`flex space-x-3 p-6 mx-auto ${isChatGPT && "bg-[#434654]"}`}
    >
      <Image
        src={
          message?.user?.image ||
          message?.user?.avatar ||
          `https://www.pngitem.com/pimgs/m/66-668806_openai-logo-openai-logo-elon-musk-hd-png.png`
        }
        alt="User profile"
        className="h-8 w-8 rounded-full"
        width={50}
        height={50}
      />
      <p className="pt-1 text-sm text-white">{message.text}</p>
    </div>
  );
}

export default Message;
