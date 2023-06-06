import * as crypto from 'crypto';

export const createSHA512Hash = (str: string): string => {
  const sha512hasher = crypto.createHmac(
    'sha512',
    'Wxq32kz5c52CYCX3wXaKWsWKQwYSQLtrgIyyzjiM4n7RtnG6LN77S7v3Ey0YaUVb',
  );
  return sha512hasher.update(str).digest('hex');
};
