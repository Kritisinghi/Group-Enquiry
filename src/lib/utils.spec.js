import { flattenLocaleData } from "./utils";

describe("flattenLocaleData", () => {
  it("flattens nested objects with string values", () => {
    const input = {
      greeting: {
        hello: "Hello",
        welcome: "Welcome",
      },
      user: {
        name: {
          first: "sam",
          last: "mis",
        },
      },
    };

    const expected = {
      "greeting.hello": "Hello",
      "greeting.welcome": "Welcome",
      "user.name.first": "sam",
      "user.name.last": "mis",
    };

    expect(flattenLocaleData(input)).toEqual(expected);
  });

  it("handles empty object", () => {
    expect(flattenLocaleData({})).toEqual({});
  });

  it("handles non-string leaf values by converting to string", () => {
    const input = {
      count: 5,
      isActive: true,
      nullValue: null,
      nested: {
        undefinedValue: undefined,
      },
    };

    const result = flattenLocaleData(input);

    expect(result["count"]).toBe("5");
    expect(result["isActive"]).toBe("true");
    expect(result["nullValue"]).toBe("null");
    expect(result["nested.undefinedValue"]).toBe("undefined");
  });

  it("uses custom prefix if provided", () => {
    const input = {
      title: "Test",
    };

    const result = flattenLocaleData(input, "custom");
    expect(result["custom.title"]).toBe("Test");
  });
});
