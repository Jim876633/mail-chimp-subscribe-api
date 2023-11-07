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
    return { code: error.status, errorMsg }
  }
}

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    "Access-Control-Allow-Methods": "GET,POST",
    "Access-Control-Allow-Headers": "Content-Type"
  }
  try {
    if (event.httpMethod !== 'POST') throw new Error('Only POST requests allowed')
    if (event.path === '/') {
      const email = JSON.parse(event.body)?.email
      if (!email) {
        throw new Error('email is required')
      }
      const response = await subscribedEmail(email);
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(response),
      };
    } else {
      return {
        statusCode: 404,
        headers,
        body: '404 Not Found: ' + event.path,
      }
    }
  } catch (error) {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ code: ERROR_CODE, errorMsg: error.message }),
    }
  }
};