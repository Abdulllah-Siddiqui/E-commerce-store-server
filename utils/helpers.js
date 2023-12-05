import bcrypt from 'bcryptjs';

function hashPassword(password) {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, salt);
}

const comparePassword = async (raw, hash) => {
  try {
    return await bcrypt.compare(raw, hash);
  } catch (err) {
    console.log('Error comparing passwords:', err);
    throw new Error('Error comparing passwords');
  }
};

export {
  hashPassword,
  comparePassword
};
