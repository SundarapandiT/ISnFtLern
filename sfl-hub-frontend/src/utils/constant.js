import api from "../utils/apiClient";
import { CryptoCCSecret } from "../utils/config";
// import CryptoJS from "crypto-js";
export class CommonConfig {
  static isEmpty = function(value) {
    if (value === undefined || value === null || value === "") {
      return true;
    } else {
      if (typeof value === "string") {
        return value.trim() === "";
      } else {
        return false;
      }
    }
  };

  static BaseUrl = "https://hub.sflworldwide.com/";

  static FedexExpressStarttime = [
    { value: "08:00:00", label: 1, view: "08:00 am" },
    { value: "08:30:00", label: 2, view: "08:30 am" },
    { value: "09:00:00", label: 3, view: "09:00 am" },
    { value: "09:30:00", label: 4, view: "09:30 am" },
    { value: "10:00:00", label: 5, view: "10:00 am" },
    { value: "10:30:00", label: 6, view: "10:30 am" },
    { value: "11:00:00", label: 7, view: "11:00 am" },
    { value: "11:30:00", label: 8, view: "11:30 am" },
    { value: "12:00:00", label: 9, view: "12:00 pm" },
    { value: "12:30:00", label: 10, view: "12:30 pm" },
    { value: "13:00:00", label: 11, view: "01:00 pm" },
    { value: "13:30:00", label: 12, view: "01:30 pm" },
    { value: "14:00:00", label: 13, view: "02:00 pm" },
    { value: "14:30:00", label: 14, view: "02:30 pm" },
    { value: "15:00:00", label: 15, view: "03:00 pm" },
    { value: "15:00:00", label: 17, view: "03:30 pm" },
    { value: "16:30:00", label: 18, view: "04:30 pm" },
    { value: "16:00:00", label: 19, view: "05:00 pm" },
    { value: "17:30:00", label: 20, view: "05:30 pm" },
  ];

  static FedexGroundStarttime = [
    { value: "07:00:00", label: 1, view: "07:00 am" },
    { value: "07:30:00", label: 2, view: "07:30 am" },
    { value: "08:00:00", label: 3, view: "08:00 am" },
    { value: "08:30:00", label: 4, view: "08:30 am" },
    { value: "09:00:00", label: 7, view: "09:00 am" },
    { value: "09:30:00", label: 8, view: "09:30 am" },
    { value: "10:00:00", label: 9, view: "10:00 am" },
    { value: "10:30:00", label: 10, view: "10:30 am" },
    { value: "11:00:00", label: 11, view: "11:00 am" },
    { value: "11:30:00", label: 12, view: "11:30 am" },
    { value: "12:00:00", label: 13, view: "12:00 pm" },
    { value: "12:30:00", label: 14, view: "12:30 pm" },
    { value: "13:00:00", label: 15, view: "01:00 pm" },
    { value: "13:30:00", label: 16, view: "01:30 pm" },
    { value: "14:00:00", label: 17, view: "02:00 pm" },
  ];

  static OtherStarttime = [
    { value: "08:00:00", label: 1, view: "08:00 am" },
    { value: "08:30:00", label: 2, view: "08:30 am" },
    { value: "09:00:00", label: 3, view: "09:00 am" },
    { value: "09:30:00", label: 4, view: "09:30 am" },
    { value: "10:00:00", label: 5, view: "10:00 am" },
    { value: "10:30:00", label: 6, view: "10:30 am" },
    { value: "11:00:00", label: 7, view: "11:00 am" },
    { value: "11:30:00", label: 8, view: "11:30 am" },
    { value: "12:00:00", label: 9, view: "12:00 pm" },
    { value: "12:30:00", label: 10, view: "12:30 pm" },
    { value: "13:00:00", label: 11, view: "01:00 pm" },
    { value: "13:30:00", label: 12, view: "01:30 pm" },
    { value: "14:00:00", label: 13, view: "02:00 pm" },
    { value: "14:30:00", label: 14, view: "02:30 pm" },
    { value: "15:00:00", label: 15, view: "03:00 pm" },
    { value: "15:00:00", label: 17, view: "03:30 pm" },
    { value: "16:30:00", label: 18, view: "04:30 pm" },
    { value: "16:00:00", label: 19, view: "05:00 pm" },
    { value: "17:30:00", label: 20, view: "05:30 pm" },
    { value: "18:00:00", label: 21, view: "06:00 pm" },
  ];

  static FedexExpressAvailabletime = [
    { value: "12:00:00", label: 7, view: "12:00 pm" },
    { value: "12:30:00", label: 8, view: "12:30 pm" },
    { value: "13:00:00", label: 9, view: "01:00 pm" },
    { value: "13:30:00", label: 10, view: "01:30 pm" },
    { value: "14:00:00", label: 11, view: "02:00 pm" },
    { value: "14:30:00", label: 12, view: "02:30 pm" },
    { value: "15:00:00", label: 13, view: "03:00 pm" },
    { value: "15:30:00", label: 14, view: "03:30 pm" },
    { value: "16:00:00", label: 15, view: "04:00 pm" },
    { value: "16:30:00", label: 16, view: "04:30 pm" },
    { value: "17:00:00", label: 17, view: "05:00 pm" },
    { value: "17:30:00", label: 18, view: "05:30 pm" },
    { value: "18:00:00", label: 19, view: "06:00 pm" },
    { value: "18:30:00", label: 20, view: "06:30 pm" },
    { value: "19:00:00", label: 21, view: "07:00 pm" },
    { value: "19:30:00", label: 22, view: "07:30 pm" },
    { value: "20:00:00", label: 23, view: "08:00 pm" },
    { value: "20:30:00", label: 24, view: "08:30 pm" },
    { value: "21:00:00", label: 25, view: "09:00 pm" },
    { value: "21:30:00", label: 26, view: "09:30 pm" },
    { value: "22:00:00", label: 27, view: "10:00 pm" },
    { value: "22:30:00", label: 28, view: "10:30 pm" },
    { value: "23:00:00", label: 29, view: "11:00 pm" },
    { value: "23:30:00", label: 30, view: "11:30 pm" },
    { value: "24:00:00", label: 30, view: "12:00 am" },
  ];

  static FedexGroundAvailabletime = [
    { value: "12:00:00", label: 7, view: "12:00 pm" },
    { value: "12:30:00", label: 8, view: "12:30 pm" },
    { value: "13:00:00", label: 9, view: "01:00 pm" },
    { value: "13:30:00", label: 10, view: "01:30 pm" },
    { value: "14:00:00", label: 11, view: "02:00 pm" },
    { value: "14:30:00", label: 12, view: "02:30 pm" },
    { value: "15:00:00", label: 13, view: "03:00 pm" },
    { value: "15:30:00", label: 14, view: "03:30 pm" },
    { value: "16:00:00", label: 15, view: "04:00 pm" },
    { value: "16:30:00", label: 16, view: "04:30 pm" },
    { value: "17:00:00", label: 17, view: "05:00 pm" },
    { value: "17:30:00", label: 18, view: "05:30 pm" },
    { value: "18:00:00", label: 19, view: "06:00 pm" },
    { value: "18:30:00", label: 20, view: "06:30 pm" },
    { value: "19:00:00", label: 21, view: "07:00 pm" },
    { value: "19:30:00", label: 22, view: "07:30 pm" },
    { value: "20:00:00", label: 23, view: "08:00 pm" },
    { value: "20:30:00", label: 24, view: "08:30 pm" },
    { value: "21:00:00", label: 25, view: "09:00 pm" },
  ];
  static OtherAvailabletime = [
    { value: "10:00:00", label: 3, view: "10:00 am" },
    { value: "10:30:00", label: 4, view: "10:30 am" },
    { value: "11:00:00", label: 5, view: "11:00 am" },
    { value: "11:30:00", label: 6, view: "11:30 am" },
    { value: "12:00:00", label: 7, view: "12:00 pm" },
    { value: "12:30:00", label: 8, view: "12:30 pm" },
    { value: "13:00:00", label: 9, view: "01:00 pm" },
    { value: "13:30:00", label: 10, view: "01:30 pm" },
    { value: "14:00:00", label: 11, view: "02:00 pm" },
    { value: "14:30:00", label: 12, view: "02:30 pm" },
    { value: "15:00:00", label: 13, view: "03:00 pm" },
    { value: "15:30:00", label: 14, view: "03:30 pm" },
    { value: "16:00:00", label: 15, view: "04:00 pm" },
    { value: "16:30:00", label: 16, view: "04:30 pm" },
    { value: "17:00:00", label: 17, view: "05:00 pm" },
    { value: "17:30:00", label: 18, view: "05:30 pm" },
    { value: "18:00:00", label: 19, view: "06:00 pm" },
    { value: "18:30:00", label: 20, view: "06:30 pm" },
    { value: "19:00:00", label: 21, view: "07:00 pm" },
    { value: "19:30:00", label: 22, view: "07:30 pm" },
    { value: "20:00:00", label: 23, view: "08:00 pm" },
    { value: "20:30:00", label: 24, view: "08:30 pm" },
  ];

  static UStimezone = "America/New_York";

  static dateFormat = {
    dateTime: "MM/DD/YYYY hh:mm:ss A",
    dateOnly: "MM/DD/YYYY",
    forDatePicker: "DD-MM-YYYY",
    yearOnly: "YYYY",
    dbDateTime: "YYYY-MM-DD HH:mm:ss",
    dbDateOnly: "YYYY-MM-DD",
    timeOnly: "HH:mm",
    timeOnlySec: "HH:mm:ss",
    time12Only: "h:mm A",
    dateTimeHrsMin: "MM/DD/YYYY hh:mm A",
    filename: "YYYYMMDDHHmmss",
  };

  static loggedInUserData = function() {
    if (localStorage.getItem("loggedInUserData")) {
      return JSON.parse(localStorage.getItem("loggedInUserData"));
    } else {
      return "";
    }
  };

  static getUserAccess = function(moduleName) {
    if (localStorage.getItem("loggedInUserData")) {
      let data = JSON.parse(localStorage.getItem("loggedInUserData"))
        .userModuleAccess;

      let moduleAccess = data.find((x) => x.MenuKey === moduleName || x.ModuleName === moduleName);

      return moduleAccess;
    } else {
      return "";
    }
  };

  static getIPAddress = function() {};

  static filterCaseInsensitive = function(filter, row) {
    const id = filter.pivotId || filter.id;
    const content = row[id];

    if (typeof content !== "undefined") {
      if (typeof content === "object" && content !== null && content.key) {
        return String(content.key)
          .toLowerCase()
          .includes(filter.value.toLowerCase());
      } else {
        return String(content)
          .toLowerCase()
          .includes(filter.value.toLowerCase());
      }
    }

    return true;
  };

  static releaseLockShipment = function() {
    let success = false;
    let data = {
      ShippingID: "",
      UserID: this.loggedInUserData().PersonID,
      ReleaseAll: 1,
    };
    api
      .post("scheduleshipment/releaseShipmentLockByID", data)
      .then((res) => {
        if (res.success) {
          // cogoToast.success("Shipment unlocked successfully");
          success = true;
        } else {
          // cogoToast.error(res.message);
        }
      })
      .catch((err) => {
        console.log("setLock err", err);
      });
    return success;
  };
   static Decode = function(token) {debugger
 
        const textParts = token.split(":");
        const iv = Buffer.from(textParts.shift(), "hex");
        const encryptedData = textParts.join(":");
       console.log("process.env.CryptoCCSecret",CryptoCCSecret);
       const ivBytes = CryptoJS.enc.Base64.parse(iv);
       const decrypted = CryptoJS.AES.decrypt(encryptedData, CryptoCCSecret, { iv: ivBytes });
       return decrypted.toString(CryptoJS.enc.Utf8);
      }

    
  static dollerSortMethod = function(a, b) {
    // Remove '$' sign and any commas, and convert currency strings to numbers
    if (a) {
      a = parseFloat(a.replace("$", "").replace(/,/g, ""));
    }
    if (b) {
      b = parseFloat(b.replace("$", "").replace(/,/g, ""));
    }
    // Compare the numbers and return 1 if 'a' comes after 'b', -1 otherwise
    return a > b ? 1 : -1;
  };

  static percentageSortMethod = function(a, b) {
    // Remove '%' sign and convert percentage strings to numbers
    if (a) {
      a = parseFloat(a.replace("%", ""));
    }
    if (b) {
      b = parseFloat(b.replace("%", ""));
    }
    // Compare the numbers and return 1 if 'a' comes after 'b', -1 otherwise
    return a > b ? 1 : -1;
  };
  static dateSortMethod = function(a, b) {
    if (a) {
      a = a.split("/");
      a = new Date(a[2], a[0] - 1, a[1]).getTime();
    }
    if (b) {
      b = b.split("/");
      b = new Date(b[2], b[0] - 1, b[1]).getTime();
    }
    return a > b ? 1 : -1;
  };

  static arabicvalidate = function(value){
    var arabicCharUnicodeRange = /[\u0600-\u06FF]/;
    if ( arabicCharUnicodeRange.test(value) )
    {
      return "no"
    }else{
      return "yes"
    }
  }

  static RegExp = {
    number: /^[0-9\b]+$/,
    onlyNumber: /[a-zA-Z~`!@#$%^&*()_+=-{}|:"<>?,;']+$/,
    onlyDecimal: /^[0-9]+(\.[0-9][0-9])?$/,
    phoneNumber: /^([0-9]+\s?)*$/g,
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    companyName: /[!@~`#$%^*()_+\-=\[\]{};':"\\|<>\/?]/,
    zipCode: /^([a-zA-Z0-9]+\s?)*$/g,
    regExpNumber: /[0-9]/g,
    regExpUpperCase: /[A-Z]/g,
    regExpLowerCase: /[a-z]/g,
    regExpSpecialCharacter: /[!@#$%^&*(),.?":{}|<>]/g,
    userNameSpecialCharacter: /[@\._-]/g,
    NofirstInputSpecialCharacter: /[a-zA-Z0-9][@._-]/g,
    userErrorSpecial: /[!~`#$%^&*()+<>/:;"',|]/g,
    //exceptCirilic:/^[ A-Za-z0-9[_@.,/!$%^(\]\\){\n\s\t\r}|:;<>?#*&+-=– ‎b]*$/,
    exceptCirilic:/^[\s\S]*$/,
  };
//~`@#$%^&*()_+=-{}|:"<>?,;'
  static zipCodeAPIKey = function(zipCode, countryName) {
    // return `https://maps.googleapis.com/maps/api/geocode/json?address="` + zipCode + `"&key=AIzaSyDIU6hx3WQi16Xd-5HlRgT6_QtLgpv1KKQ`

    return (
      `https://maps.googleapis.com/maps/api/geocode/json?&key=AIzaSyDIU6hx3WQi16Xd-5HlRgT6_QtLgpv1KKQ&components=country:` +
      countryName +
      `|postal_code:` +
      zipCode +
      ``
    );

    // return `https://maps.googleapis.com/maps/api/geocode/json?address=` + zipCode + `&components=country:=` + countryName + `|postal_code=` + zipCode + `&key=AIzaSyDIU6hx3WQi16Xd-5HlRgT6_QtLgpv1KKQ`
    // apiKey : 'AIzaSyDIU6hx3WQi16Xd-5HlRgT6_QtLgpv1KKQ'
  };
  static EmailAPIKey = function(Email) {
    return (
      `https://api.listwisehq.com/clean/deep.php?email=` +
      Email +
      `&api_key=67f3cba671614b7aa9d0bd97e74b0653`
    );

    // return `https://maps.googleapis.com/maps/api/geocode/json?address=` + zipCode + `&components=country:=` + countryName + `|postal_code=` + zipCode + `&key=AIzaSyDIU6hx3WQi16Xd-5HlRgT6_QtLgpv1KKQ`
    // apiKey : 'AIzaSyDIU6hx3WQi16Xd-5HlRgT6_QtLgpv1KKQ'
  };
  static timezoneAPI = function(lat, lon) {
    return (
      `https://maps.googleapis.com/maps/api/timezone/json?location=` +
      lat +
      `,` +
      lon +
      `&timestamp=1458000000&key=AIzaSyDIU6hx3WQi16Xd-5HlRgT6_QtLgpv1KKQ`
    );
  };

  static apiKey = {
    geoCodeAPI: "AIzaSyDIU6hx3WQi16Xd-5HlRgT6_QtLgpv1KKQ",
  };

  static logoutUserdata = function() {
    localStorage.clear();
    // history.push("/login-page");
    // window.location.href = "http://localhost:3000/auth/login-page"
    window.location.href = "https://hub.sflworldwide.com/auth/login-page"
  };
}
