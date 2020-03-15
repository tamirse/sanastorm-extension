import utilities from "./utilities";

test("check valid selection", () => {
  expect(utilities.isSelectionValid("hello")).toBe(true);
});

test("check invalid selection contains spaces", () => {
  expect(utilities.isSelectionValid("not valid spaces")).toBe(false);
});

test("check invalid selection empty string", () => {
  expect(utilities.isSelectionValid("")).toBe(false);
});

test("check invalid selection contains newline", () => {
  expect(utilities.isSelectionValid("bla\n")).toBe(false);
});

test("check invalid selection too long", () => {
  expect(
    utilities.isSelectionValid(
      "12345678901234567890123456789012345678901234567890123456789012"
    )
  ).toBe(false);
});
