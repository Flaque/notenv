import proclaim from ".";

test("proclaim can get a development secret", () => {
  const env = proclaim({
    MY_SECRET: "dummy"
  });

  process.env.NODE_ENV = "development";
  expect(env("MY_SECRET")).toBe("dummy");
});

test("env will crash in production if the secret doesn't exist", () => {
  const env = proclaim({
    MY_SECRET: "dummy"
  });

  process.env.NODE_ENV = "production";
  expect(() => env("MY_SECRET")).toThrow();
});

test("env will NOT crash in production if the secret DOES exist", () => {
  const env = proclaim({
    MY_SECRET: "dummy"
  });

  process.env.NODE_ENV = "production";
  process.env.MY_SECRET = "prod-secret";
  expect(env("MY_SECRET")).toBe("prod-secret");
});

test("env will take the development secret if not in production", () => {
  const env = proclaim({
    MY_SECRET: "dummy"
  });

  process.env.NODE_ENV = "development";
  process.env.MY_SECRET = "prod-secret";
  expect(env("MY_SECRET")).toBe("dummy");
});
