import crypto from 'crypto';

export const generateToken = () => {
  return crypto.randomBytes(30).toString('base64');
};
