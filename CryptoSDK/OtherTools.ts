import crypto from 'crypto-browserify'

declare var argon2: any;

export default class OtherTools {
    private static _instance: OtherTools;

    private constructor() {
        OtherTools._instance = this;
    }

    static get Instance() { return this._instance || new OtherTools() }

    async HashString(message: string, salt?: string): Promise<HashResult | null> {
        try {
            const _salt = salt ?? crypto.randomBytes(16).toString('hex');

            const hashed = await argon2.hash({
                pass: message,
                salt: _salt,
                hashLen: 32,
                type: argon2.ArgonType.Argon2id
            });

            return {
                hashHex: hashed.hashHex,
                salt: _salt
            }
        }
        catch (e) {
            console.error('Failed hashing', e)
            return null;
        }
    }
}

export interface HashResult {
    hashHex: string,
    salt: string
}