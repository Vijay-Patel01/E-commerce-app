import otpGenerator from 'otp-generator'
import db from '../config.database';
import catchAsync from '../utils/catchAsync';

const Verification = db.verifications;
export default catchAsync(async () => {
    const otp = otpGenerator.generate(4, {
        digits: true,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false
    });
    const currentOTP = await Verification.findOne({where: {type: 'OTP'}});
    if (!currentOTP) {
        const storeCode = await Verification.create({
            type: 'OTP',
            code: otp
        });
    } else {
        const updateCode = await Verification.update({code: otp}, {where: {type: 'OTP'}})
    }
    return otp;
});
