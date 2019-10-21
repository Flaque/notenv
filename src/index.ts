/**
 * Friends don't let friends use .env
 */

export function proclaim(key: string, devValue: string) {
  if (process.env.NODE_ENV !== "production") {
    return devValue;
  }

  const value = process.env[key];
  if (!value) {
    throw new Error(
      `Expected enviornment variable '${key}' but couldn't find one.`
    );
  }
  return value;
}
