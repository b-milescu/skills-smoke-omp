import { expect, test } from "bun:test";
import { add, mul, sub } from "./math";

test("add", () => {
  expect(add(2, 3)).toBe(5);
});

test("sub", () => {
  expect(sub(7, 3)).toBe(4);
  expect(sub(3, 7)).toBe(-4);
  expect(sub(5, 5)).toBe(0);
  expect(sub(0, 3)).toBe(-3);
  expect(sub(-2, -5)).toBe(3);
});

test("mul", () => {
  expect(mul(2, 3)).toBe(6);
  expect(mul(0, 5)).toBe(0);
  expect(mul(5, 0)).toBe(0);
  expect(mul(-2, 3)).toBe(-6);
  expect(mul(2, -3)).toBe(-6);
  expect(mul(-2, -3)).toBe(6);
});
