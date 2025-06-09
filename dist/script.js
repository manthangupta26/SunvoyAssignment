"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const qs = __importStar(require("qs"));
const cheerio = __importStar(require("cheerio"));
const tough = __importStar(require("tough-cookie"));
const baseURL = "https://challenge.sunvoy.com";
const cookie = new tough.CookieJar();
function getCookie() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const login = axios_1.default.create({ baseURL });
            let getLoginHtmlData;
            let getLoginMainData;
            const getLoginData = yield login.get('/login');
            getLoginMainData = getLoginData.data;
            getLoginHtmlData = cheerio.load(getLoginMainData);
            const nonceData = getLoginHtmlData('input[name="nonce"]').val();
            const bodyData = qs.stringify({
                nonce: nonceData,
                username: 'demo@example.org',
                password: 'test'
            });
            const postLoginData = yield login.post('/login', bodyData, {
                headers: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                maxRedirects: 0,
                validateStatus: status => status < 400
            });
            const setCookieHeaders = postLoginData.headers['set-cookie'] || [];
            for (let cookieString of setCookieHeaders) {
                yield cookie.setCookie(cookieString, baseURL);
            }
        }
        catch (error) {
            console.log("Errors Logging in : ", error);
            return null;
        }
    });
}
function userDetail(cookieJar) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const cookieHeader = yield cookieJar.getCookieString(baseURL);
            const response = yield axios_1.default.post("https://challenge.sunvoy.com/api/users", {}, {
                headers: {
                    cookie: cookieHeader
                }
            });
            console.log("API data is : ", response.data);
            return response.data;
        }
        catch (error) {
            console.error("Errors fetching Users: ", error);
            return null;
        }
    });
}
// This is for the Authenticated User Detail - Since I don't know the checkcode Algo, so to get that User detail  I am manually enter the field which will result in the user detail
// Note: When the token expire this Method call will fail
function authUserDetail() {
    return __awaiter(this, void 0, void 0, function* () {
        let authenticatedUserDetails;
        let htmlData;
        let value;
        try {
            const authToken = yield axios_1.default.get("https://challenge.sunvoy.com/settings/tokens", {
                headers: {
                    cookie: "user_preferences=eyJ0aGVtZSI6ImxpZ2h0IiwibGFuZ3VhZ2UiOiJlbiIsInRpbWV6b25lIjoiVVRDIiwibm90aWZpY2F0aW9ucyI6dHJ1ZX0%3D; feature_flags=eyJuZXdEYXNoYm9hcmQiOnRydWUsImJldGFGZWF0dXJlcyI6ZmFsc2UsImFkdmFuY2VkU2V0dGluZ3MiOnRydWUsImV4cGVyaW1lbnRhbFVJIjpmYWxzZX0%3D; tracking_consent=accepted; JSESSIONID=cd17e80a-41ae-429f-bd1c-bb1e9f30a835; _csrf_token=7ec00d066f3b070244bfe3c7c838b6f0f4f778d5792fcd2936b0fad8f8026d21; analytics_id=analytics_72aae12dfc35a17f7527e92c335e3ea0; session_fingerprint=08cb269543354e967c22f511f8c44c67c1d64c6e9f6fbb064425095a309f96f7; device_id=device_7859bff2dfd0412e3235cb09"
                }
            });
            htmlData = authToken.data;
            value = cheerio.load(htmlData);
            const apiuser = value('#apiuser').val();
            const language = value('#language').val();
            const openId = value('#openId').val();
            const operateId = value('#operateId').val();
            const userId = value('#userId').val();
            const bodyData = {
                //access_token:authToken.data.access_token,
                access_token: "206a9cd2b6d75f93e4675ea6522d43339b22cdbfbcc3bc0510934cdc761b5c32",
                apiuser: apiuser,
                language: language,
                openId: openId,
                operateId: operateId,
                //timestamp:Math.floor(Date.now() / 1000),
                timestamp: 1749446926,
                userId: userId,
                checkcode: "C890EF8BF05DE01B0F11D5EB181E4D5ADCFA99E2"
            };
            const dataString = qs.stringify(bodyData);
            const authUser = yield axios_1.default.post("https://api.challenge.sunvoy.com/api/settings", dataString, {
                headers: {
                    "content-type": "application/x-www-form-urlencoded"
                }
            });
            authenticatedUserDetails = authUser.data;
            console.log("Auth User data", authenticatedUserDetails);
        }
        catch (err) {
            console.log(err);
        }
    });
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield getCookie();
    yield userDetail(cookie);
    yield authUserDetail();
}))();
