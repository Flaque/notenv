# notenv

`notenv` is a "replacement" for a dumb uses of `.env` files. You really shouldn't use .env files. Any production secret that would live in a `.env` should _never_ live on some engineers computer. And in _many_ cases, any development "secret" should be so unimportant that it's fine to put it in source control.

For example, you don't need to put your "password" for the development postgres in `.env` if it's just something running locally on a developer's laptop.

The general rule of thumb: if you're worried about committing a secret to source control, it probably shouldn't be living on some engineers computer either.

## Install

```
yarn add notenv
```

## Usage

`notenv` lets you `proclaim` the existence of an environment variables and then get them later on with a type-safe getter.

```ts
import proclaim from "notenv";

const env = proclaim({
  DATABASE_PASSWORD: "my-development-password"
});

env("DATABASE_PASSWORD"); // returns "my-development-password" when NODE_ENV !== "production"
env("ARGLE_BARGLE"); // Fails typecheck
```

If you're in production and it can't find it in `process.env[key]`, it'll throw an error. Otherwise, it'll use the development value, (the property in the object).

The suggested way to use `notenv` is to create a `env.js` (or `env.ts`) file somewhere and then export all your environment variables from there.

```ts
// env.js
import proclaim from "notenv";

export default proclaim({
  DATABASE_URL: "postgres://localhost...",
  DATABASE_USER: "local",
  DATABASE_PASSWORD: "dummy-buddy"
});
```

Then in some other file, you can use `env` variables like this:

```ts
import env from "./env.js";

env("DATABASE_USER");
```
