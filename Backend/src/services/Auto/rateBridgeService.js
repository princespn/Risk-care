import axios from "axios";
import { buildSoapEnvelope } from "../utils/xmlFactory.js";

export async function getRateQuote(params) {
  const soapEnvelope = buildSoapEnvelope(params);

  const { data } = await axios.post(
    "https://www10.compu-quote.com/RateBridge/Version1.asmx",
    soapEnvelope,
    {
      headers: {
        "Content-Type": "text/xml;charset=utf-8",
        SOAPAction: "http://www.compu-quote.com/RateBridge/Version1/Rate",
      },
      timeout: 100000,
    }
  );

  return data;
}
