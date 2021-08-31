# 2.0.0

## Breaking change

Instead of
```js
const reverseDNSLookup = require('reverse-dns-lookup');
const matches = await reverseDNSLookup(ip, domainA, domainB);
```

Use
```js
const { verify } = require('reverse-dns-lookup');
const matches = await verify(ip, domainA, domainB);
```

"source" function is no longer available

## Internal change
Use node's DNS module instead of unix commands.
