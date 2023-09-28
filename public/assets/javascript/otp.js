const accountSid = "AC6bc7b3e973838bcfcfda9d0464bebcd7";
const authToken = "c6fd007386899dd03401ba3e503f350d";
const client = require("twilio")(accountSid, authToken);

const sendOTP = (phoneNumber) => {
  //   const otp = generateOTP(); // Implement your OTP generation logic here

  client.messages
    .create({
      body: `Your OTP is: ${1111}`,
      from: +12524659501,
      to: phoneNumber,
    })
    .then((message) => console.log(`OTP sent to ${message.to}`))
    .catch((error) => console.error(error));
};

sendOTP(+919551096952);
