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
      if (!developmentValue) {
        throw new Error(
          `Expected environment variable '${key}' to be set with a development value but none was found.`
        );
      }

      return developmentValue;
    }

    const value = process.env[key as string];
    if (!value) {
      throw new Error(
        `Expected environment variable '${key}' in production but none was found.`
      );
    }

    return value;
  };
}
