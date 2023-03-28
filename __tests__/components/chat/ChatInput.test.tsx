import { render, screen } from "@testing-library/react";
import { useSession } from "next-auth/react";
import ChatInput from "@/components/chat/ChatInput";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

describe("ChatInput component", () => {
  const mockSession = { user: { email: "test@example.com", image: "test-image" } };

  beforeEach(() => {
    (useSession as jest.Mock).mockReturnValue({ data: mockSession });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
  
  it("should render input and button", () => {
    render(<ChatInput chatId="test-chat" />);
    const input = screen.getByPlaceholderText("Type you message here...");
    expect(input).toBeInTheDocument();

    const button = screen.getByLabelText("submit-button");
    expect(button).toBeInTheDocument();
  });

  it("should disable input and button if user is not logged in", () => {
    (useSession as jest.Mock).mockReturnValue({ data: null });
    render(<ChatInput chatId="test-chat" />);
    const input = screen.getByPlaceholderText("Type you message here...");
    expect(input).toBeDisabled();
    const button = screen.getByRole('button', { name: "submit-button" });
    expect(button).toBeDisabled();
  });
});
