import crypto from 'crypto'
import { Buffer } from 'buffer'

export default class AESHelper {
    private static readonly ALGORITHM = 'aes-256-gcm';
    private static readonly MSG_ENCODING = 'utf8';
    private static readonly IV_LENGTH = 12;
    private static readonly CIPHER_ENCODING = 'hex';

    private static _instance: AESHelper;

    private constructor() {
        AESHelper._instance = this;
    }

    static get Instance() { return this._instance || new AESHelper() }

    /**
     * Encrypt given message with a given key
     * @param message The message to be encrypted
     * @param key a passphrase in hex represents 32 bytes key
     * @returns the encrypted message, IV and AuthTag in hex, or null if failed
     */
    async Encrypt(message: string, key: string): Promise<CipherInfo | null> {
        try {
            const iv = crypto.randomBytes(AESHelper.IV_LENGTH);
            const keyBytes = Buffer.from(key, "hex");
            const cipher = crypto.createCipheriv(AESHelper.ALGORITHM, keyBytes, iv);
            let ciphered = cipher.update(message, AESHelper.MSG_ENCODING, AESHelper.CIPHER_ENCODING);
            ciphered += cipher.final(AESHelper.CIPHER_ENCODING);

            return {
                cipher: ciphered,
                iv: iv.toString(AESHelper.CIPHER_ENCODING),
                authTag: cipher.getAuthTag().toString(AESHelper.CIPHER_ENCODING)
            };
        }
        catch
        {
            return null;
        }
    }

    /**
     * Decrypt given message with a given key
     * @param ciphered an object containing the cipher, iv and auth tag
     * @param authTag an AuthTag given by the cipher
     * @returns the decrypted message or null if failed
     */
    async Decrypt(ciphered: CipherInfo, key: string): Promise<string | null> {
        try {
            const iv_buf = Buffer.from(ciphered.iv, AESHelper.CIPHER_ENCODING);
            const keyBytes = Buffer.from(key, "hex");
            const decipher = crypto.createDecipheriv(AESHelper.ALGORITHM, keyBytes, iv_buf);
            decipher.setAuthTag(Buffer.from(ciphered.authTag, AESHelper.CIPHER_ENCODING));
            let deciphered = decipher.update(ciphered.cipher, AESHelper.CIPHER_ENCODING, AESHelper.MSG_ENCODING);
            deciphered += decipher.final(AESHelper.MSG_ENCODING);

            return deciphered;
        }
        catch
        {
            return null;
        }
    }
}

export interface CipherInfo {
    cipher: string,
    iv: string,
    authTag: string
}