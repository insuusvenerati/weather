// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import requestIp from "request-ip";
import geoip, { Lookup } from "geoip-lite";

export default async function getLocation(req: NextApiRequest, res: NextApiResponse<Lookup>) {
  try {
    const ip = requestIp.getClientIp(req).replace("::1", "").replace("127.0.0.1", "72.1.69.153");
    const location = geoip.lookup(ip);
    res.status(200).json(location);
  } catch (error) {
    res.status(500).json(error);
  }
}
