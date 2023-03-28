import { render, fireEvent } from "@testing-library/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase";
import NewChat from "@/components/chat/NewChat";

// jest.mock("next-auth/react", () => ({
//     useSession: jest.fn(),
// }));

// jest.mock("next/navigation", () => ({
//     useRouter: jest.fn(),
// }));

jest.mock("next-auth/react");
jest.mock("next/navigation");
jest.mock("firebase/firestore");

describe("NewChat", () => {
  const mockPush = jest.fn();
  const mockAddDoc = jest.fn();

  beforeAll(() => {
    // Mock the useRouter hook
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    // Mock the addDoc function from Firestore
    (addDoc as unknown as jest.SpyInstance).mockImplementation(mockAddDoc);

    // Mock the mockAddDoc function to return a doc with an ID
    mockAddDoc.mockResolvedValue({
      id: "abc123",
    });
  });
  
  afterEach(() => {
    jest.clearAllMocks();
  });
    
  it("should render the component", () => {
    // Mock the useSession hook
    (useSession as jest.Mock).mockReturnValue({
      data: {
        user: {
          email: "test@example.com",
        },
      },
    });

    const { getByText } = render(<NewChat />);
    expect(getByText("New chat")).toBeInTheDocument();
  });

  it("should create a new chat when clicked", async () => {
    // Mock the useSession hook
    (useSession as jest.Mock).mockReturnValue({
      data: {
        user: {
          email: "test@example.com",
        },
      },
    });

    const { getByText } = render(<NewChat />);
    fireEvent.click(getByText("New chat"));

    // Wait for addDoc to be called
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Expect mockAddDoc to be called with the correct arguments
    expect(addDoc as jest.Mock).toHaveBeenCalledWith(
      collection(db, "users", "test@example.com", "chats"),
      {
        userId: "test@example.com",
        createdAt: serverTimestamp(),
      }
    );

    // Expect router.push to be called with the correct path
    expect(mockPush).toHaveBeenCalledWith("/chat/abc123");
  });

  it("should not create a new chat if user is not logged in", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: undefined
    });

    const { getByText } = render(<NewChat />);
    fireEvent.click(getByText("New chat"));

    expect(mockAddDoc).toHaveBeenCalled();
    expect(mockPush).not.toHaveBeenCalled();
  });
});
