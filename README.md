# notenv

`notenv` is a "replacement" for a dumb uses of `.env` files. You really shouldn't use .env files. Any production secret that would live in a `.env` should _never_ live on some engineers computer. And in _many_ cases, any development "secret" should be so unimportant that it's fine to put it in source control.

For example, you don't need to put your "password" for the development postgres in `.env` if it's just something running locally on a developer's laptop.  

The general rule of thumb: if you're worried about committing a secret to source control, it probably shouldn't be living on some engineers computer either.

## Install

```
yarn add notenv
```

## Usage

`notenv` lets you `proclaim` the existence of an environment variable:

```ts
import { proclaim } from "notenv";

const DATABASE_PASSWORD = proclaim("DATABASE_PASSWORD", "dummy");
```

If you're in production and it can't find it in `process.env[key]`, it'll throw an error. Otherwise, it'll use the development value (the second argument).

The suggested way to use `notenv` is to create a `env.js` (or `env.ts`) file somewhere and then export all your environment variables from there.

```ts
// env.js
import { proclaim } from "notenv";

export const DATABASE_URL = proclaim("DATABASE_URL", "postgres://localh..");
export const DATABASE_USER = proclaim("DATABASE_PASSWORD", "local");
export const DATABASE_PASSWORD = proclaim("DATABASE_PASSWORD", "dummy");
```
