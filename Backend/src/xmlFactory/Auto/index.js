import { buildHalXml } from "./hal.js";
import { buildGaXml } from "./ga.js";
import { buildSgiXml } from "./sgi.js";
import { buildIntactXml } from "./intact.js";

export function buildXmlByCarrier(carrier, data) {
  switch (carrier.toLowerCase()) {
    case "hal":
      return buildHalXml(data);
    case "ga":
      return buildGaXml(data);
    case "sgi":
      return buildSgiXml(data);
    case "intact":
      return buildIntactXml(data);
    default:
      throw new Error("Unknown carrier");
  }
}
