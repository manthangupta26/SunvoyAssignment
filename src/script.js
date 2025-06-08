"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var qs = require("qs");
var cheerio = require("cheerio");
var tough = require("tough-cookie");
var baseURL = "https://challenge.sunvoy.com";
var cookie = new tough.CookieJar();
function getCookie() {
    return __awaiter(this, void 0, void 0, function () {
        var login, getLoginHtmlData, getLoginMainData, getLoginData, nonceData, bodyData, postLoginData, setCookieHeaders, _i, setCookieHeaders_1, cookieString, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 8]);
                    login = axios_1.default.create({ baseURL: baseURL });
                    getLoginHtmlData = void 0;
                    getLoginMainData = void 0;
                    return [4 /*yield*/, login.get('/login')];
                case 1:
                    getLoginData = _a.sent();
                    getLoginMainData = getLoginData.data;
                    getLoginHtmlData = cheerio.load(getLoginMainData);
                    nonceData = getLoginHtmlData('input[name="nonce"]').val();
                    bodyData = qs.stringify({
                        nonce: nonceData,
                        username: 'demo@example.org',
                        password: 'test'
                    });
                    return [4 /*yield*/, login.post('/login', bodyData, {
                            headers: {
                                'content-type': 'application/x-www-form-urlencoded'
                            },
                            maxRedirects: 0,
                            validateStatus: function (status) { return status < 400; }
                        })];
                case 2:
                    postLoginData = _a.sent();
                    setCookieHeaders = postLoginData.headers['set-cookie'] || [];
                    _i = 0, setCookieHeaders_1 = setCookieHeaders;
                    _a.label = 3;
                case 3:
                    if (!(_i < setCookieHeaders_1.length)) return [3 /*break*/, 6];
                    cookieString = setCookieHeaders_1[_i];
                    return [4 /*yield*/, cookie.setCookie(cookieString, baseURL)];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 3];
                case 6:
                    console.log(cookie);
                    return [3 /*break*/, 8];
                case 7:
                    error_1 = _a.sent();
                    console.log("Errors Logging in : ", error_1);
                    return [2 /*return*/, null];
                case 8: return [2 /*return*/];
            }
        });
    });
}
function userDetail(cookieJar) {
    return __awaiter(this, void 0, void 0, function () {
        var cookieHeader, response, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, cookieJar.getCookieString(baseURL)];
                case 1:
                    cookieHeader = _a.sent();
                    return [4 /*yield*/, axios_1.default.post("https://challenge.sunvoy.com/api/users", {}, {
                            headers: {
                                cookie: cookieHeader
                            }
                        })];
                case 2:
                    response = _a.sent();
                    console.log("API data is : ", response.data);
                    return [2 /*return*/, response.data];
                case 3:
                    error_2 = _a.sent();
                    console.error("Errors fetching Users: ", error_2);
                    return [2 /*return*/, null];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function authUserDetail() {
    return __awaiter(this, void 0, void 0, function () {
        var authenticatedUserDetails, htmlData, value, authToken, apiuser, language, openId, operateId, userId, bodyData, dataString, authUser, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, axios_1.default.get("https://challenge.sunvoy.com/settings/tokens", {
                            headers: {
                                cookie: "user_preferences=eyJ0aGVtZS6ImxpZ2h0IiwibGFuZ3VhZ2UiOiJlbiIsInRpbWV6b25lIjoiVVRDIiwibm90aWZpY2F0aW9ucyI6dHJ1ZX0%3D; feature_flags=eyJuZXdEYXNoYm9hcmQiOnRydWUsImJldGFGZWF0dXJlcyI6ZmFsc2UsImFkdmFuY2VkU2V0dGluZ3MiOnRydWUsImV4cGVyaW1lbnRhbFVJIjpmYWxzZX0%3D; tracking_consent=accepted; JSESSIONID=00e03bfe-c13d-41b1-8e09-2fb5e60f4679; _csrf_token=a9708d8c8af45d79b303c51875aad9981c8b7f340673f775fe65a6f3d45d5b12; analytics_id=analytics_fbe96a0c6925beb3e9ad5b2abcb1764e; session_fingerprint=ce6a0892344676afab3121745decf920a6e1102766c0ad7c6abc5eeb7967eaef; device_id=device_14f8b49b1547adabdc038fc2"
                            }
                        })];
                case 1:
                    authToken = _a.sent();
                    console.log("Auth token data is : ", authToken.data);
                    htmlData = authToken.data;
                    value = cheerio.load(htmlData);
                    apiuser = value('#apiuser').val();
                    language = value('#language').val();
                    openId = value('#openId').val();
                    operateId = value('#operateId').val();
                    userId = value('#userId').val();
                    bodyData = {
                        //access_token:authToken.data.access_token,
                        access_token: "b592ccadc0a70f1f8c73355d78ee2e4db1ef85f28498d1bdb61ed86a3f812a9e",
                        apiuser: apiuser,
                        language: language,
                        openId: openId,
                        operateId: operateId,
                        //timestamp:Math.floor(Date.now() / 1000),
                        timestamp: 1749386980,
                        userId: userId,
                        checkcode: "35FCDDC3D80737E7E59D5AB794BAD80B811CA71E"
                    };
                    dataString = qs.stringify(bodyData);
                    return [4 /*yield*/, axios_1.default.post("https://api.challenge.sunvoy.com/api/settings", dataString, {
                            headers: {
                                "content-type": "application/x-www-form-urlencoded"
                            }
                        })];
                case 2:
                    authUser = _a.sent();
                    authenticatedUserDetails = authUser.data;
                    console.log("Auth User data", authenticatedUserDetails);
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    console.log(err_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getCookie()];
            case 1:
                _a.sent();
                return [4 /*yield*/, userDetail(cookie)];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })();
