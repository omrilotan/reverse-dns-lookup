# reverse-dns-lookup [![](https://img.shields.io/npm/v/reverse-dns-lookup.svg)](https://www.npmjs.com/package/reverse-dns-lookup) [![](https://img.shields.io/badge/source--000000.svg?logo=github&style=social)](https://github.com/omrilotan/reverse-dns-lookup)

## 🕵 Verify an IP is related to a certain domain

You can verify if a web crawler accessing your server really is who they claim they are. This is useful if you're concerned that spammers or other troublemakers are accessing your site while claiming to be known crawlers. Crawlers do not post public lists of IP addresses to whitelist. This is because these IP address ranges can change, causing problems for any systems who have hard-coded them, so you must run a DNS lookup as described next.

Example flow to verify Googlebot as the caller
```js
const { verify } = require('reverse-dns-lookup');
const { getClientIp } = require('request-ip');

const clientIp = getClientIp(request);
const isGooglebotServer = await verify(clientIp, 'google.com', 'googlebot.com');
```

### What just happened?
1. Run a reverse DNS lookup on the accessing IP address.
2. Verify that the domain name is in the supplied domain names.
3. Run a forward DNS lookup on the retrieved domain name (from step 1).
4. Verify that it is the same as the original accessing IP address from your logs.

Some popular domains
```js
const crawler_domains = [
  '.google.com', '.googlebot.com',
  'search.msn.com', // Bing
  '.applebot.apple.com',
  '.twttr.com', // Twitter
  '.crawl.baidu.com' // Baidu craler
];

const isCrawlerServer = await verify(clientIp, ...crawler_domains);
```

### CLI

```
reverse-dns-lookup 66.249.66.1 google.com googlebot.com
```

| Checks out
| -
| `66.249.66.1 checks up with google.com, googlebot.com`
| Exit code 0

------

| Does not check out okay
| -
| `1.1.1.1 does not check up with google.com, googlebot.com.`
| Exit code 1
