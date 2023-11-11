
import CryptoJS from "crypto-js";

const KEY =
  "U2FsdGVkX19LHO5Wv887ytewsWCQOBNYBFfs8786336^%%^$%$$^$%%#$*&*&*#dvJ7teaYwTUKw9NN7LNxzC/GxNKfdZ/zmXbUcwFjaa1kQA==";

const CryptoJSAesJson = {
  stringify(cipherParams: any) {
    const j = {
      ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64),
      s: null,
      iv: null,
    };

    if (cipherParams.iv) {
      j.iv = cipherParams.iv.toString();
    }
    if (cipherParams.salt) {
      j.s = cipherParams.salt.toString();
    }
    return JSON.stringify(j);
  },

  parse(jsonStr: string) {
    const j = JSON.parse(jsonStr);
    const cipherParams = CryptoJS.lib.CipherParams.create({
      ciphertext: CryptoJS.enc.Base64.parse(j.ct),
    });
    if (j.iv) {
      cipherParams.iv = CryptoJS.enc.Hex.parse(j.iv);
    }
    if (j.s) {
      cipherParams.salt = CryptoJS.enc.Hex.parse(j.s);
    }
    return cipherParams;
  },
};

export const Encrypt = {
  /**
   * This is used to encrypt data
   * @param data
   * @returns {any|PromiseLike<ArrayBuffer>}
   */
  encrypt(data: string): any | PromiseLike<ArrayBuffer> {
    return !data
      ? null
      : CryptoJS.AES.encrypt(JSON.stringify(data), KEY).toString();
  },

  /**
   * This is used to decrypt data encrypted.
   * @param data
   * @returns {any}
   */
  decrypt(data: string | null): any {
    if (!data) {
      return null;
    }

    try {
      const decryptData = CryptoJS.AES.decrypt(data.toString(), KEY);
      return JSON.parse(decryptData.toString(CryptoJS.enc.Utf8));
    } catch (error) {
      if (typeof window !== "undefined") window.location.href = "/logout";
    }
  },

  /**
   * used to encrypt data to be sent to api resource
   * @param data
   * @returns {string}
   */
  getEncrypted(data: any): string | null {
    return !data
      ? null
      : CryptoJS.AES.encrypt(JSON.stringify(data), KEY, {
        format: CryptoJSAesJson,
      }).toString();
  },

  /**
   * Used to decrypt encrypted data sent from api resource
   * @param data
   * @returns {any}
   */
  decryptEncrypted(data: any): any {
    if (!data) {
      return null;
    }
    const decryptData = CryptoJS.AES.decrypt(data.toString(), KEY, {
      format: CryptoJSAesJson,
    });
    return JSON.parse(decryptData.toString(CryptoJS.enc.Utf8));
  },
};
