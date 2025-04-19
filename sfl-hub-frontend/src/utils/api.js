import CryptoJS from "crypto-js";

export const api = {

    BackendURL: "https://sfl-bk.trysimmer.com",
    OldDatabaseURL: "https://hubapi.sflworldwide.com",
}

export const encryptURL = (url) => {

    const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;
    if (!SECRET_KEY) {
      console.warn("Encryption key is missing!");
      return null;
    }
     if(url){ 
        const enulr=CryptoJS.AES.encrypt(url, SECRET_KEY).toString();
        return encodeURIComponent(enulr);}
    };