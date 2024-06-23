import * as speakeasy from 'speakeasy';

const options = {
  username: process.env.AFRICASTALKING_USERNAME,
  apiKey: process.env.AFRICASTALKING_API_KEY,
};
// initialize africastalking gateway
// eslint-disable-next-line @typescript-eslint/no-var-requires
const africastalking = require('africastalking')(options);
const sms = africastalking.SMS;

export const generateOTP = (secret: string): string => {
  const otp = speakeasy.totp({
    secret,
    digits: 4, // Set the desired number of digits for the OTP
  });
  return otp;
};

export const sendSMS = (phone_number: string, msg: string) => {
  // const phoneNumber = phone_number.replace(/^[01]/, '+254');
  // console.log('Phone number replaced==>', phoneNumber);
  const sending_options = {
    to: phone_number,
    message: msg,
  };

  // send sms
  return sms
    .send(sending_options)
    .then((response) => {
      console.log("SMS Response",response.SMSMessageData);
      return response;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};
