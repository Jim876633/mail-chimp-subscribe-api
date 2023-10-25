// netlify/functions/myFunction.js


const mailchimp = require('@mailchimp/mailchimp_marketing');

const SUCCESS_CODE = '0000';
const ERROR_CODE = '9999';

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_PREFIX,
});

async function subscribedEmail(email) {
  try {
    const response = await mailchimp.lists.addListMember(process.env.MAILCHIMP_AUDIENCEID, {
      email_address: email,
      status: "subscribed",
    });
    return { code: SUCCESS_CODE, status: response.status }
  } catch (error) {
    console.log('request error')
    const errorObj = JSON.parse(error.response.text)
    const errorMsg = errorObj.detail
    return { code: ERROR_CODE, errorMsg }
  }
}

exports.handler = async (event) => {
  try {
    if (!event.body?.email) {
      throw new Error('email is required')
    }
    if (event.path === '/') {
      const email = JSON.parse(event.body).email
      const response = await subscribedEmail(email);
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'text/html',
        },
        body: JSON.stringify(response),
      };
    } else {
      return {
        statusCode: 404,
        body: '404 Not Found: ' + event.path,
      }
    }
  } catch (error) {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html',
      },
      body: JSON.stringify({ code: ERROR_CODE, errorMsg: error.message }),
    }
  }
};