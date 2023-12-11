#!/usr/bin/env node

const {
  argv: [, , ip, ...domains],
} = process;
const { verify } = require(".");

(async () => {
  try {
    const success = await verify(ip, ...domains);
    if (!success) {
      console.log(`✘ ${ip} does not check up with ${domains.join(", ")}`);
      process.exit(1);
    }
    console.log(`✔︎ ${ip} checks up with ${domains.join(", ")}`);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
