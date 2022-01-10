# RentalWorks API
Node.JS library for interacting with DatabaseWorks' [RentalWorks](https://dbworks.com/products/rentalworks/)

# Usage

## Basic Usage
```ts
/* async function start */

import {RentalWorks} from 'rentalworks-api'

const rwApi = new RentalWorks("https://company.rentalworksweb.com")
await rwApi.login("username", "password")

let items = await rwApi.getOrderItems("A0091DK5")

console.log(items)

/* async function end */
```

Output
```yaml
[
  {
    "Rows": {
      "OrderItemId": "A009GURA",
      ...Item Data...
    }
  },
  {
    "Rows": {
      "OrderItemId": "A009GURB",
      ...Item Data...
    }
  }
]
```

## Creating an instance with a RentalWorks token
```ts
  /* async function start */

  import {RentalWorks} from 'rentalworks-api'

  const rwApi = new RentalWorks("https://company.rentalworksweb.com", "509467ugvo03t7y9y8rfhgv7832gft783wqrf")

  let items = await rwApi.getOrderItems("A0091DK5")

  console.log(items)

  /* async function end */
```

Output
```yaml
[
  {
    "Rows": {
      "OrderItemId": "A009GURA",
      ...Item Data...
    }
  },
  {
    "Rows": {
      "OrderItemId": "A009GURB",
      ...Item Data...
    }
  }
]
```