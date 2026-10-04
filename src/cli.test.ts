import { expect, test } from "bun:test";

test("cli prints 5", async () => {
  const child = Bun.spawn([process.execPath, `${import.meta.dir}/cli.ts`], {
    stdout: "pipe",
    stderr: "inherit",
  });
  const [stdout, exitCode] = await Promise.all([
    new Response(child.stdout).text(),
    child.exited,
  ]);

  expect(stdout).toBe("5\n");
  expect(exitCode).toBe(0);
});
