import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FormRenderer from "@/components/FormRenderer";
import { useIsJsEnabled } from "@/app/context/JsEnabledContext";

jest.mock("@/app/context/JsEnabledContext", () => ({
  useIsJsEnabled: jest.fn(),
}));

const mockConfig = {
  sections: [
    {
      id: "contact",
      title: "Contact Info",
      fields: [
        {
          name: "fullName",
          label: "Full Name",
          type: "text",
          placeholder: "Full Name",
          required: true,
        },
        {
          name: "email",
          label: "Email",
          placeholder: "Email",
          type: "email",
          required: true,
        },
      ],
    },
    {
      id: "details",
      title: "Booking Details",
      fields: [
        {
          name: "groupSize",
          label: "Group Size",
          placeholder: "Group Size",
          type: "number",
          required: true,
        },
      ],
    },
  ],
};

describe("FormRenderer", () => {
  beforeEach(() => {
    useIsJsEnabled.mockReturnValue(true);
  });

  it("renders the first section and allows section toggle", async () => {
    render(<FormRenderer config={mockConfig} />);
    expect(screen.getByText("Contact Info")).toBeInTheDocument();
    expect(screen.getByText("Full Name")).toBeInTheDocument();
    const continueButton = screen.getByText("Continue");
    fireEvent.click(continueButton);
    await waitFor(() => screen.getByText("Full Name is required."));
    await waitFor(() => expect(screen.getByText("Email is required.")));
  });

  it("submits form successfully when JS is enabled", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      }),
    );

    render(<FormRenderer config={mockConfig} />);
    const input = await screen.findByPlaceholderText("Full Name");
    fireEvent.change(input, {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "john@example.com" },
    });

    fireEvent.click(screen.getByText("Continue"));

    await waitFor(() => screen.getByPlaceholderText("Group Size"));

    fireEvent.change(screen.getByPlaceholderText("Group Size"), {
      target: { value: 10 },
    });

    fireEvent.click(screen.getByText("Submit Group Booking Request"));

    await waitFor(() =>
      expect(global.fetch).toHaveBeenCalledWith(
        "/api/groupEnquiry",
        expect.any(Object),
      ),
    );
  });
});
