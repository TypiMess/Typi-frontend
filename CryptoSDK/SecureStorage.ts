import AESHelper, { CipherInfo } from "./AESHelper";

export default class SecureStorage {
    private static _instance: SecureStorage;
    private static passwordHash: string;

    private constructor() {
        SecureStorage._instance = this;
    }

    static get Instance() { return this._instance || new SecureStorage() }
    static SetPasswordHash(hash: string) {
        this.passwordHash = hash;
    }

    async SaveItem(key: string, value: string) {
        if (key && value && SecureStorage.passwordHash) {
            const encrypted = await AESHelper.Instance.Encrypt(value, SecureStorage.passwordHash);

            if (encrypted) {
                localStorage.setItem(key, encrypted.cipher + '$' + encrypted.iv + '$' + encrypted.authTag);
                return true;
            }
        }

        return false;
    }

    async GetItem(key: string): Promise<string | null> {
        if (this.HasItem(key) && SecureStorage.passwordHash) {
            const encrypted = localStorage.getItem(key).split('$');

            if (encrypted && encrypted.length === 3) {
                const ciphered: CipherInfo = {
                    cipher: encrypted[0],
                    iv: encrypted[1],
                    authTag: encrypted[2]
                }

                return await AESHelper.Instance.Decrypt(ciphered, SecureStorage.passwordHash);
            }
        }

        return null;
    }

    HasItem(key: string) {
        return localStorage.getItem(key) !== null;
    }

    DeleteItem(key: string) {
        localStorage.removeItem(key);
    }
}