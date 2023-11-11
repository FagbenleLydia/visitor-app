
import Cookies from "js-cookie";
import { Encrypt } from "./encrypt";


const Cache = {
  /**
   * Set Data to storage
   * @param key
   * @param data
   */
  set(key: string, data: any) {
    if (!data) {
      return;
    }

    localStorage.setItem(key, Encrypt.encrypt(data));
  },

  setCookie(key: string, value: string, days?: number) {
    Cookies.set(key, Encrypt.encrypt(value), {
      expires: days,
      secure: true,
      sameSite: "strict",
    });
  },

  /**
   * get Data from storage
   * @param key
   */
  get(key: string) {
    const data = localStorage.getItem(key);
    return Encrypt.decrypt(data);
  },

  getCookie(key: string) {
    const data = Cookies.get(key);
    return Encrypt.decrypt(data as string);
  },

  remove(key: string) {
    localStorage.removeItem(key);
  },

  removeCookie(key: string) {
    Cookies.remove(key);
  },
};

export default Cache;
