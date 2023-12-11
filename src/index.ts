import { reverse, lookup } from "node:dns/promises";

/**
 * Round trip ReverseDNSLookup verification
 */
export async function verify(
  ip: string,
  ...domains: string[]
): Promise<boolean> {
  if (!domains.length) {
    throw new RangeError("Expected domains list as 2nd and ongoing arguments");
  }

  try {
    const pattern = new RegExp(
      domains.map((domain) => `${domain}$`).join("|"),
      "i",
    );
    const test = pattern.test.bind(pattern);
    const hostnames = await reverse(ip);
    if (!hostnames.some(test)) {
      return false;
    }
    const results = await Promise.all(hostnames.map(lookup));
    const addresses = results.map(({ address }) => address);
    return addresses.includes(ip);
  } catch (error) {
    if (error.code === "EINVAL") {
      return false;
    }
    throw error;
  }
}
