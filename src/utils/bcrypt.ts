import bcrypt from 'bcrypt';
import config from '../config';

const bcryptPassword = async (password: string) => {
    const round = Number(config.BCRYPT.ROUNDS) || 12;
    return bcrypt.hash(password, round);
}

const comparePassword = async (bodyPassword: string, databasePassword: string) => {
    return await bcrypt.compare(bodyPassword, databasePassword);
}

export default {
    bcryptPassword,
    comparePassword
}
