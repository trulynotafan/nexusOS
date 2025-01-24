import bcrypt from 'bcryptjs';

const generateHash = async () => {
    const password = 'wholoveme414lolff';
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    console.log('Password Hash:', hash);
};

generateHash(); 