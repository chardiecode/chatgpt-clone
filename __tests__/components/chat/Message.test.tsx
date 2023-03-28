import { render } from "@testing-library/react";
import Message from "@/components/chat/Message";

describe("Message component", () => {
  const mockMessage = {
    user: {
      name: "Chardie Code",
      image: "https://example.com/image.jpg&w=128&q=75",
    },
    text: "Hello Next world!",
  };

  it("renders message text correctly", () => {
    const { getByText } = render(<Message message={mockMessage} />);
    expect(getByText(mockMessage.text)).toBeInTheDocument();
  });

  it("renders user image correctly", () => {
    const { getByAltText } = render(<Message message={mockMessage} />);
    expect(getByAltText("User profile")).toHaveAttribute(
      "src",
      "/_next/image?url=https%3A%2F%2Fexample.com%2Fimage.jpg%26w%3D128%26q%3D75&w=128&q=75"
    );
  });
});
