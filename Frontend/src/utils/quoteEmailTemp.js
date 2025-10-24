export default function getQuoteEmailTemplat(name, email, password, quotes) {
  const allQuoteData = [];

  for (const carrierKey in quotes) {
    const carrierEntry = quotes[carrierKey];
    const policyTotal = carrierEntry?.CodeNames?.Auto?.QuoteInfo?.PolicyTotal;
    const premium = policyTotal?.PremiumWithDecimal || "0.00";
    allQuoteData.push({ carrierKey, premium });
  }

  return `

<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Insurance Quotes</title>
</head>
<body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#eef5f0;">

  <table align="center" width="600" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 15px rgba(0,0,0,0.15); margin:30px auto;">

    <!-- Header -->
    <tr>
      <td align="center" style="background:linear-gradient(135deg,#1B5E20,#388E3C); padding:30px;">
        <img src="https://dummyimage.com/160x50/ffffff/1B5E20&text=Insurance+Co." alt="Insurance Logo" width="160" style="display:block;">
        <h1 style="margin:15px 0 0; font-size:24px; color:#fff; font-weight:bold;">Your Personalized Insurance Quotes</h1>
      </td>
    </tr>

    <!-- Greeting -->
    <tr>
      <td style="padding:25px; font-size:16px; color:#333333; line-height:1.6;">
        <p style="margin:0; font-size:18px; font-weight:bold; color:#1B5E20;">Hi ${name}, here are the best quotes we found for you 🎉</p>
        <p style="margin-top:12px;">
          We compared multiple providers to help you choose the best coverage at the best price.
          Review your personalized auto insurance quotes below and secure your rate today.
        </p>
      </td>
    </tr>

   <!-- Dynamic Quotes Section -->
    <tr>
      <td align="center" style="padding:20px;">
		${allQuoteData
      .map(
        (quote) =>
          `<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f9fdf9; border:2px solid #c8e6c9; border-radius:12px; margin-bottom:20px; box-shadow:0 2px 8px rgba(0,0,0,0.05);">
          <tr>
            <td style="padding:20px; text-align:center;">
              <h3 style="margin:0; color:#1B5E20;">${quote.carrierKey}</h3>
              <div style="font-size:22px; font-weight:bold; color:#1B5E20;">$${quote.premium}
                <span style="font-size:14px; color:#777;">/ year</span>
              </div>
              <a href="#" style="margin-top:15px; display:inline-block; background:#1B5E20; color:#fff; padding:10px 25px; border-radius:25px; font-size:14px; font-weight:bold; text-decoration:none;">Choose ${quote.carrierKey}</a>
            </td>
          </tr>
        </table>`
      )
      .join("")}
      </td>
    </tr>

    <!-- User Details Card -->
    <tr>
      <td align="center" style="padding:25px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff; border:2px solid #c8e6c9; border-radius:12px; padding:20px; box-shadow:0 2px 8px rgba(0,0,0,0.05);">
          <tr>
            <td style="padding:10px; text-align:center; font-size:16px; font-weight:bold; color:#1B5E20;">
              🔑 Your Account Details
            </td>
          </tr>
          <tr>
            <td style="padding:15px; font-size:14px; color:#333; line-height:1.6; text-align:center;">
              <strong>Username (Email):</strong> ${email}<br>
              <strong>Password:</strong> ${password}
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:10px;">
              <a href="#" style="background:#1B5E20; color:#ffffff; padding:10px 20px; text-decoration:none; border-radius:5px; font-size:14px; font-weight:bold; display:inline-block;">Login to Your Account</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Contact -->
    <tr>
      <td align="center" style="background:#f5f9f6; padding:25px; font-size:14px; color:#333; border-top:1px solid #e0e0e0;">
        📞 Need help? Call us at <strong style="color:#1B5E20;">1-844-726-0907</strong><br>
        Monday – Friday: 8 am to 8 pm (ET)<br>
        Saturday: 8:30 am to 4 pm (ET)
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="padding:20px; font-size:12px; color:#777; text-align:center; line-height:1.6;">
        <p style="margin:0;">
          These premiums are estimates and may vary. Auto insurance in Ontario is not subject to tax. Coverage details may differ — please confirm with an advisor.
        </p>
        <br>
        <p style="margin:0;">
          Insurance Co., 225 King St W, Suite 1000, Toronto, ON M5V 3M2
        </p>
        <a href="#" style="color:#1B5E20; text-decoration:none;">Unsubscribe</a>
      </td>
    </tr>

    <!-- Copyright -->
    <tr>
      <td align="center" style="background:#1B5E20; color:#fff; font-size:12px; padding:12px;">
        © 2025 Insureinfosys Co. All Rights Reserved.
      </td>
    </tr>
  </table>
</body>
</html>
	`;
}


