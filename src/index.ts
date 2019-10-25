/**
 * Friends don't let friends use .env
 */

export default function proclaim<
  T extends { [key: string]: string },
  P extends keyof T
>(envs: T) {
  return (key: P) => {
    const developmentValue = envs[key];

    if (process.env.NODE_ENV !== "production") {
      return developmentValue;
    }

    const value = process.env[key as string];
    if (!value || value === "") {
      throw new Error(
        `Expected environment variable '${key}' in production but none was found.`
      );
    }

    return value;
  };
}
