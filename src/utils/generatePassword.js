import bcrypt from 'bcryptjs';

const passwordGenerator = async(password) => {
    const salt = await bcrypt.genSalt(10);

    return bcrypt.hash(password, salt);
}

export default passwordGenerator;