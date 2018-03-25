module.exports = (survey, doorwayURI) => (`
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Survey</title>
      <link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>
    </head>

    <body>
      <table cellpadding="0" cellspacing="0" border="0" align="center" width="80%">
        <tr>
          <td style="font-family: ‘Open Sans’, Arial, sans-serif; color: #212529; font-size: 14px; line-height: 21px;">
            <h3 style="color: rgb(41,70,97); font-size: 20px; font-weight: 150">Hi,</h3>
            <span>${survey.body}</span>
          </td>
        </tr>
        <tr><td height="35" style="font-size: 35px; line-height: 35px;">&nbsp;</td></tr>
        <tr>
          <td style="font-family: ‘Open Sans’, Arial, sans-serif;">
            <a href="${doorwayURI}/${survey.id}/yes" style="background-color: #007bff; border-radius: 4px; color: #fff; font-size: 14px; line-height: 21px; margin-right: 3px; padding: 6px 12px; text-align: center; text-decoration: none">Yes</a>
            <a href="${doorwayURI}/${survey.id}/no" style="background-color: #6c757d; border-radius: 4px; color: #fff; font-size: 14px; line-height: 21px; margin-left: 3px; padding: 6px 12px; text-align: center; text-decoration: none">No</a>
          </td>
        </tr>
        <tr><td height="35" style="font-size: 35px; line-height: 35px;">&nbsp;</td></tr>
        <tr>
          <td style="font-family: ‘Open Sans’, Arial, sans-serif; color: rgb(41,70,97); font-size: 14px; line-height: 21px;">
            <span>Thank you for your candid feedback!</span><br /><br />
            <span>Cheers,</span><br />
            <span>${survey.sender}</span>
          </td>
        </tr>
      </table>
    </body>
  </html>
`);
