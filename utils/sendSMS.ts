const options = {
  username: process.env.AFRICASTALKING_USERNAME,
  apiKey: process.env.AFRICASTALKING_API_KEY,
};

const AfricasTalking = require('africastalking');
const africastalking = AfricasTalking(options);

export const sendSMS = async (phone_number: string, msg: string)=> {
  const phoneNumber = phone_number.replace(/^[01]/, '+254');
  console.log('Phone number replaced==>', phoneNumber);
  // TODO: Send message
  try {
    const result = await africastalking.SMS.send({
      to: [phoneNumber],
      message: msg,
      // from : 'AFRICASTKING'
    });
    console.log("Result",result.SMSMessageData);
  } catch (error) {
    console.error("error", error);
  }
};


