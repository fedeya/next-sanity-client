<h1 align="center">Welcome to next-sanity-client 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/next-sanity-client" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/next-sanity-client.svg">
  </a>
  <a href="https://www.npmjs.com/package/next-sanity-client" target="_blank">
    <img alt="npm" src="https://img.shields.io/npm/dt/next-sanity-client">    
  </a>
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> Sanity Client for Next.js Apps with App Dir Support

## Overview

### Features

- Per-request Caching ⭐️
- Full Typescript Support
- Edge Runtime Support

## Installation

### yarn

```sh
yarn add next-sanity-client
```

### npm

```sh
npm i next-sanity-client
```

## Usage
```ts
import SanityClient from 'next-sanity-client';

const client = new SanityClient({
  projectId: 'YOUR_PROJECT_ID',
  dataset: 'YOUR_DATASET',
  useCdn: process.env.NODE_ENV === 'production',
});

client.fetch({
  query: `[_type == 'post']`,
  config: {
    cache: 'force-cache',
    next: { revalidate: 60 }
  }
});
```

### Create API Utility

#### Predefine Query
The client support passing a queries object to get autocomplete when creating your api utilities functions
```ts
const client = new SanityClient({
  ...config,
  queries: {
    getTodosQuery: ``
  }
})
```

This is useful when you have a file with your queries, you can simply pass it to the client
```ts
// lib/queries.ts
export const getTodosQuery = groq`[_type == 'todo']`;

// lib/sanity.ts
import * as queries from './queries';

const client = new SanityClient({
  ...config,
  queries
});
```
And you can create a function to fetch that query using it name, full typed
```ts
// lib/api.ts
export const getTodos = client.createApiUtil<Todo[]>('getTodosQuery');

// here also you can set the default caching strategy
export const getTodo = client.createApiUtil<Todo, { id: string }>(
  'getTodoQuery',
  {
    cache: 'no-cache'
  }
);

// or use your own query
export const getProducts = client.createApiUtil<Product[]>(queries.getProducts, {
  cache: 'no-cache'
});
```
Next in your Server Components:
```ts
// app/todos/page.tsx
const todos = await getTodos({ cache: 'no-cache' });

// app/todos/[id]/page.tsx
const todo = await getTodo({ id: 'uid', next: { revalidate: 10 } });

// components/ProductList.tsx
const products = await getProducts({ cache: 'force-cache' });
```

## Author

👤 **Fedeya <elfedeminaya@gmail.com>**

- Website: [fedeminaya.com](https://fedeminaya.com)
- Twitter: [@fedeminaya](https://twitter.com/fedeminaya)
- Github: [@Fedeya](https://github.com/Fedeya)
- LinkedIn: [@federico-minaya](https://linkedin.com/in/federico-minaya)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/Fedeya/next-sanity-client/issues).

## Show your support

Give a ⭐️ if this project helped you!
