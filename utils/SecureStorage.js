import * as Keychain from 'react-native-keychain';

export const saveTokens = async (accessToken, refreshToken) => {
    console.log(accessToken, refreshToken)
  await Keychain.setGenericPassword('auth', JSON.stringify({ accessToken, refreshToken }));
};

export const getTokens = async () => {
  const creds = await Keychain.getGenericPassword();
  return creds ? JSON.parse(creds.password) : null;
};

export const clearTokens = async () => {
  await Keychain.resetGenericPassword();
};