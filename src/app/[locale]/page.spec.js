import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "./page";

jest.mock("../../configs/form/groupBookingSchema", () => ({
  getGroupBookingFormConfig: jest.fn(async (locale) => {
    return {
      title: locale === "en" ? "Mocked English Title" : "Mocked German Title",
      description:
        locale === "en"
          ? "Mocked English description for group booking."
          : "Mocked German description für Gruppenbuchung.",
      sections: [
        {
          id: "mock-contact-details",
          title: "Mock Contact Details",
          fields: [
            {
              name: "mockField",
              label: "Mock Field",
              type: "text",
              required: false,
            },
          ],
        },
      ],
    };
  }),
}));

jest.mock("../../components/FormRenderer", () => ({
  __esModule: true,
  default: jest.fn(({ config }) => (
    <div data-testid="mock-form-renderer">Mock Form Rendere</div>
  )),
}));

describe("Home Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the page title and description in English when locale is "en"', async () => {
    render(await Home({ params: { locale: "en" } }));
    expect(screen.getByText("Mocked English Title")).toBeInTheDocument();
    expect(
      screen.getByText("Mocked English description for group booking."),
    ).toBeInTheDocument();
    expect(screen.getByTestId("mock-form-renderer")).toBeInTheDocument();
  });

  it('renders the page title and description in German when locale is "de"', async () => {
    render(await Home({ params: { locale: "de" } }));

    expect(screen.getByText("Mocked German Title")).toBeInTheDocument();
    expect(
      screen.getByText("Mocked German description für Gruppenbuchung."),
    ).toBeInTheDocument();
    expect(screen.getByTestId("mock-form-renderer")).toBeInTheDocument();
  });
});
