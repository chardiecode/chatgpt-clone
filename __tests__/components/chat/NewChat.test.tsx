import { render } from "@testing-library/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import NewChat from "@/components/chat/NewChat";

jest.mock("next-auth/react", () => ({
    useSession: jest.fn(),
}));

jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
}));

describe("NewChat", () => {
    const mockSession = { user: { email: "test@example.com", image: "test-image" } };
    const push = jest.fn()
    beforeEach(() => {
      (useSession as jest.Mock).mockReturnValue({ data: mockSession });
      (useRouter as jest.Mock).mockImplementationOnce(() => ({
        asPath: "/chat/chat-id-123",
        push,
      }));
    });
  
    afterEach(() => {
      jest.resetAllMocks();
    });
    
    it("renders correctly", () => {
        const { getByText } = render(<NewChat />);
        expect(getByText("New chat")).toBeInTheDocument();
    });

    // TODO: Check fire events
    // ........ 
});
