"use strict";
/*
    Author: yandricr
    API: https://nexra.aryahcr.cc/
*/
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.playground = exports.nexra = exports.animagine = exports.render3d = exports.pixelart = exports.llama2 = exports.emi = exports.stablediffusion = exports.prodia = exports.dalle = exports.pixart = exports.bing = exports.gpt = void 0;
var axios_1 = require("axios");
var cred = {
    "x-nexra-user": null,
    "x-nexra-secret": null
};
var nexra = function (user, secret) {
    cred["x-nexra-secret"] = secret;
    cred["x-nexra-user"] = user;
};
exports.nexra = nexra;
function consult_(api, data) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (res, rej) { return __awaiter(_this, void 0, void 0, function () {
                    var response, js, count, i, error_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, axios_1.default.post(api, data, {
                                        headers: __assign({ "Content-Type": "application/json" }, cred)
                                    })];
                            case 1:
                                response = _a.sent();
                                if (response.status === 200) {
                                    if ((typeof response.data).toString().toLowerCase() === "Object".toLowerCase()) {
                                        if (response.data.code != undefined && response.data.code != null && response.data.code === 200 && response.data.status != undefined && response.data.status != null && response.data.status === true) {
                                            return [2 /*return*/, res(response.data)];
                                        }
                                        else {
                                            return [2 /*return*/, rej(response.data)];
                                        }
                                    }
                                    else {
                                        js = null;
                                        count = -1;
                                        for (i = 0; i < response.data.length; i++) {
                                            if (count <= -1) {
                                                if (response.data[i] === "{") {
                                                    count = i;
                                                }
                                            }
                                            else {
                                                break;
                                            }
                                        }
                                        if (count <= -1) {
                                            return [2 /*return*/, rej({
                                                    "code": 500,
                                                    "status": false,
                                                    "error": "INTERNAL_SERVER_ERROR",
                                                    "message": "general (unknown) error"
                                                })];
                                        }
                                        else {
                                            try {
                                                js = response.data.slice(count);
                                                js = JSON.parse(js);
                                                if (js != undefined && js != null && js.code != undefined && js.code != null && js.code === 200 && js.status != undefined && js.status != null && js.status === true) {
                                                    return [2 /*return*/, res(js)];
                                                }
                                                else {
                                                    return [2 /*return*/, rej(js)];
                                                }
                                            }
                                            catch (e) {
                                                return [2 /*return*/, rej({
                                                        "code": 500,
                                                        "status": false,
                                                        "error": "INTERNAL_SERVER_ERROR",
                                                        "message": "general (unknown) error"
                                                    })];
                                            }
                                        }
                                    }
                                }
                                else {
                                    return [2 /*return*/, rej({
                                            "code": 500,
                                            "status": false,
                                            "error": "INTERNAL_SERVER_ERROR",
                                            "message": "general (unknown) error"
                                        })];
                                }
                                return [3 /*break*/, 3];
                            case 2:
                                error_1 = _a.sent();
                                try {
                                    if (error_1.response) {
                                        return [2 /*return*/, rej(error_1.response.data)];
                                    }
                                    else if (error_1.request) {
                                        return [2 /*return*/, rej({
                                                "code": 404,
                                                "error": "NOT_FOUND",
                                                "message": "the service is currently unavailable"
                                            })];
                                    }
                                    else {
                                        return [2 /*return*/, rej({
                                                "code": 500,
                                                "status": false,
                                                "error": "INTERNAL_SERVER_ERROR",
                                                "message": "general (unknown) error"
                                            })];
                                    }
                                }
                                catch (e) {
                                    return [2 /*return*/, rej({
                                            "code": 500,
                                            "status": false,
                                            "error": "INTERNAL_SERVER_ERROR",
                                            "message": "general (unknown) error"
                                        })];
                                }
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); })];
        });
    });
}
function consult_strm(api, data, process) {
    return __awaiter(this, void 0, void 0, function () {
        var response, chat_1, error_3, error_2, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1.default.post(api, __assign(__assign({}, data), { "stream": true }), {
                            headers: __assign({ "Content-Type": "application/json" }, cred),
                            responseType: "stream"
                        })];
                case 1:
                    response = _a.sent();
                    if (response.status === 200) {
                        chat_1 = null;
                        error_3 = false;
                        response.data.on("data", function (chunk) {
                            var chk = chunk.toString();
                            chk = chk.split("");
                            var tmp = null;
                            chk.forEach(function (data) {
                                var result = null;
                                var convert = "";
                                try {
                                    convert = JSON.parse(data);
                                    result = data;
                                    tmp = null;
                                }
                                catch (e) {
                                    if (tmp === null) {
                                        tmp = data;
                                    }
                                    else {
                                        try {
                                            convert = JSON.parse(tmp);
                                            result = tmp;
                                            tmp = null;
                                        }
                                        catch (e) {
                                            tmp = tmp + data;
                                            try {
                                                convert = JSON.parse(tmp);
                                                result = tmp;
                                                tmp = null;
                                            }
                                            catch (e) {
                                                tmp = tmp;
                                            }
                                        }
                                    }
                                }
                                if (result != null) {
                                    try {
                                        result = JSON.parse(result);
                                        if (chat_1 === null && result != null) {
                                            chat_1 = "";
                                        }
                                        if (result != undefined && result != null && result.code === undefined && result.status === undefined) {
                                            if (error_3 != true) {
                                                if (result != undefined && result != null && result.finish != undefined && result.finish != null && result.finish === true) {
                                                    chat_1 = result;
                                                }
                                                else {
                                                    chat_1 = result;
                                                    process(null, result);
                                                }
                                            }
                                        }
                                        else {
                                            error_3 = true;
                                            chat_1 = result;
                                        }
                                    }
                                    catch (e) {
                                        // continue
                                    }
                                }
                            });
                        });
                        response.data.on("end", function () {
                            if (chat_1 != null) {
                                if (error_3 != true) {
                                    return process(null, chat_1);
                                }
                                else {
                                    return process(chat_1, null);
                                }
                            }
                            else {
                                return process({
                                    "code": 500,
                                    "status": false,
                                    "error": "INTERNAL_SERVER_ERROR",
                                    "message": "general (unknown) error"
                                }, null);
                            }
                        });
                        response.data.on("error", function (err) {
                            return process({
                                "code": 500,
                                "status": false,
                                "error": "INTERNAL_SERVER_ERROR",
                                "message": "general (unknown) error"
                            }, null);
                        });
                    }
                    else {
                        return [2 /*return*/, process({
                                "code": 500,
                                "status": false,
                                "error": "INTERNAL_SERVER_ERROR",
                                "message": "general (unknown) error"
                            }, null)];
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    try {
                        if (error_2.response) {
                            try {
                                err_1 = null;
                                error_2.response.data.on("data", function (chk) {
                                    if (err_1 != null) {
                                        err_1 += chk.toString();
                                    }
                                    else {
                                        err_1 = chk.toString();
                                    }
                                });
                                error_2.response.data.on("end", function () {
                                    try {
                                        err_1 = JSON.parse(err_1);
                                        return process(err_1, null);
                                    }
                                    catch (error) {
                                        return process({
                                            "code": 500,
                                            "status": false,
                                            "error": "INTERNAL_SERVER_ERROR",
                                            "message": "general (unknown) error"
                                        }, null);
                                    }
                                });
                                error_2.response.data.on("error", function () {
                                    return process({
                                        "code": 500,
                                        "status": false,
                                        "error": "INTERNAL_SERVER_ERROR",
                                        "message": "general (unknown) error"
                                    }, null);
                                });
                            }
                            catch (error) {
                                return [2 /*return*/, process({
                                        "code": 500,
                                        "status": false,
                                        "error": "INTERNAL_SERVER_ERROR",
                                        "message": "general (unknown) error"
                                    }, null)];
                            }
                        }
                        else if (error_2.request) {
                            return [2 /*return*/, process({
                                    "code": 404,
                                    "error": "NOT_FOUND",
                                    "message": "the service is currently unavailable"
                                }, null)];
                        }
                        else {
                            return [2 /*return*/, process({
                                    "code": 500,
                                    "status": false,
                                    "error": "INTERNAL_SERVER_ERROR",
                                    "message": "general (unknown) error"
                                }, null)];
                        }
                    }
                    catch (error) {
                        return [2 /*return*/, process({
                                "code": 500,
                                "status": false,
                                "error": "INTERNAL_SERVER_ERROR",
                                "message": "general (unknown) error"
                            }, null)];
                    }
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
var gpt = /** @class */ (function () {
    function gpt() {
    }
    var _a;
    _a = gpt;
    gpt.v1 = function (_b) { return __awaiter(void 0, [_b], void 0, function (_c) {
        var _d = _c.messages, messages = _d === void 0 ? [] : _d, _e = _c.prompt, prompt = _e === void 0 ? "" : _e, _f = _c.model, model = _f === void 0 ? "" : _f, _g = _c.markdown, markdown = _g === void 0 ? false : _g;
        return __generator(_a, function (_h) {
            return [2 /*return*/, new Promise(function (res, rej) { return __awaiter(void 0, void 0, void 0, function () {
                    var response, e_1;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, consult_('https://nexra.aryahcr.cc/api/chat/gpt', {
                                        messages: messages != undefined && messages != null ? messages : [],
                                        prompt: prompt != undefined && prompt != null ? prompt : "",
                                        model: model != undefined && model != null ? model : "",
                                        markdown: markdown != undefined && markdown != null ? markdown : false
                                    })];
                            case 1:
                                response = _b.sent();
                                return [2 /*return*/, res(response)];
                            case 2:
                                e_1 = _b.sent();
                                if (typeof (e_1) == "object") {
                                    return [2 /*return*/, rej(e_1)];
                                }
                                else {
                                    return [2 /*return*/, rej({
                                            "code": 500,
                                            "status": false,
                                            "error": "INTERNAL_SERVER_ERROR",
                                            "message": "general (unknown) error"
                                        })];
                                }
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); })];
        });
    }); };
    gpt.v2 = function (_b) { return __awaiter(void 0, [_b], void 0, function (_c) {
        var _d = _c.messages, messages = _d === void 0 ? [] : _d, _e = _c.markdown, markdown = _e === void 0 ? false : _e;
        return __generator(_a, function (_f) {
            return [2 /*return*/, new Promise(function (res, rej) { return __awaiter(void 0, void 0, void 0, function () {
                    var response, e_2;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, consult_('https://nexra.aryahcr.cc/api/chat/gpt', {
                                        messages: messages != undefined && messages != null ? messages : [],
                                        model: "chatgpt",
                                        markdown: markdown != undefined && markdown != null ? markdown : false,
                                    })];
                            case 1:
                                response = _b.sent();
                                return [2 /*return*/, res(response)];
                            case 2:
                                e_2 = _b.sent();
                                if (typeof (e_2) == "object") {
                                    return [2 /*return*/, rej(e_2)];
                                }
                                else {
                                    return [2 /*return*/, rej({
                                            "code": 500,
                                            "status": false,
                                            "error": "INTERNAL_SERVER_ERROR",
                                            "message": "general (unknown) error"
                                        })];
                                }
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); })];
        });
    }); };
    gpt.v2_strm = function (_b, process_1) { return __awaiter(void 0, [_b, process_1], void 0, function (_c, process) {
        var e_3;
        var _d = _c.messages, messages = _d === void 0 ? [] : _d, _e = _c.markdown, markdown = _e === void 0 ? false : _e;
        return __generator(_a, function (_f) {
            switch (_f.label) {
                case 0:
                    _f.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, consult_strm('https://nexra.aryahcr.cc/api/chat/complements', {
                            messages: messages != undefined && messages != null ? messages : [],
                            model: "chatgpt",
                            markdown: markdown != undefined && markdown != null ? markdown : false,
                        }, function (err, data) {
                            return process(err, data);
                        })];
                case 1:
                    _f.sent();
                    return [3 /*break*/, 3];
                case 2:
                    e_3 = _f.sent();
                    return [2 /*return*/, process({
                            "code": 500,
                            "status": false,
                            "error": "INTERNAL_SERVER_ERROR",
                            "message": "general (unknown) error"
                        }, null)];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    gpt.web = function (_b) { return __awaiter(void 0, [_b], void 0, function (_c) {
        var _d = _c.prompt, prompt = _d === void 0 ? "" : _d, _e = _c.markdown, markdown = _e === void 0 ? false : _e;
        return __generator(_a, function (_f) {
            return [2 /*return*/, new Promise(function (res, rej) { return __awaiter(void 0, void 0, void 0, function () {
                    var response, e_4;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _b.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, consult_('https://nexra.aryahcr.cc/api/chat/gptweb', {
                                        prompt: prompt != undefined && prompt != null ? prompt : "",
                                        markdown: markdown != undefined && markdown != null ? markdown : false
                                    })];
                            case 1:
                                response = _b.sent();
                                return [2 /*return*/, res(response)];
                            case 2:
                                e_4 = _b.sent();
                                if (typeof (e_4) == "object") {
                                    return [2 /*return*/, rej(e_4)];
                                }
                                else {
                                    return [2 /*return*/, rej({
                                            "code": 500,
                                            "status": false,
                                            "error": "INTERNAL_SERVER_ERROR",
                                            "message": "general (unknown) error"
                                        })];
                                }
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); })];
        });
    }); };
    return gpt;
}());
exports.gpt = gpt;
var llama2 = /** @class */ (function () {
    function llama2() {
    }
    llama2.asc = function (_b) {
        return __awaiter(this, arguments, void 0, function (_c) {
            var _this = this;
            var _d = _c.messages, messages = _d === void 0 ? [] : _d, _e = _c.system_message, system_message = _e === void 0 ? "" : _e, _f = _c.temperature, temperature = _f === void 0 ? 0.9 : _f, _g = _c.max_tokens, max_tokens = _g === void 0 ? 4096 : _g, _h = _c.top_p, top_p = _h === void 0 ? 0.6 : _h, _j = _c.repetition_penalty, repetition_penalty = _j === void 0 ? 1.2 : _j, _k = _c.markdown, markdown = _k === void 0 ? false : _k;
            return __generator(this, function (_l) {
                return [2 /*return*/, new Promise(function (res, rej) { return __awaiter(_this, void 0, void 0, function () {
                        var response, e_5;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _b.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, consult_('https://nexra.aryahcr.cc/api/chat/complements', {
                                            messages: messages != undefined && messages != null ? messages : [],
                                            model: "llama2",
                                            data: {
                                                system_message: system_message != undefined && system_message != null ? system_message : "",
                                                temperature: temperature != undefined && temperature != null ? temperature : 0.9,
                                                max_tokens: max_tokens != undefined && max_tokens != null ? max_tokens : 4096,
                                                top_p: top_p != undefined && top_p != null ? top_p : 0.6,
                                                repetition_penalty: repetition_penalty != undefined && repetition_penalty != null ? repetition_penalty : 1.2,
                                            },
                                            markdown: markdown != undefined && markdown != null ? markdown : false
                                        })];
                                case 1:
                                    response = _b.sent();
                                    return [2 /*return*/, res(response)];
                                case 2:
                                    e_5 = _b.sent();
                                    if (typeof (e_5) == "object") {
                                        return [2 /*return*/, rej(e_5)];
                                    }
                                    else {
                                        return [2 /*return*/, rej({
                                                "code": 500,
                                                "status": false,
                                                "error": "INTERNAL_SERVER_ERROR",
                                                "message": "general (unknown) error"
                                            })];
                                    }
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    llama2.strm = function (_b, process_1) {
        return __awaiter(this, arguments, void 0, function (_c, process) {
            var e_6;
            var _d = _c.messages, messages = _d === void 0 ? [] : _d, _e = _c.system_message, system_message = _e === void 0 ? "" : _e, _f = _c.temperature, temperature = _f === void 0 ? 0.9 : _f, _g = _c.max_tokens, max_tokens = _g === void 0 ? 4096 : _g, _h = _c.top_p, top_p = _h === void 0 ? 0.6 : _h, _j = _c.repetition_penalty, repetition_penalty = _j === void 0 ? 1.2 : _j, _k = _c.markdown, markdown = _k === void 0 ? false : _k;
            return __generator(this, function (_l) {
                switch (_l.label) {
                    case 0:
                        _l.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, consult_strm('https://nexra.aryahcr.cc/api/chat/complements', {
                                messages: messages != undefined && messages != null ? messages : [],
                                model: "llama2",
                                data: {
                                    system_message: system_message != undefined && system_message != null ? system_message : "",
                                    temperature: temperature != undefined && temperature != null ? temperature : 0.9,
                                    max_tokens: max_tokens != undefined && max_tokens != null ? max_tokens : 4096,
                                    top_p: top_p != undefined && top_p != null ? top_p : 0.6,
                                    repetition_penalty: repetition_penalty != undefined && repetition_penalty != null ? repetition_penalty : 1.2
                                },
                                markdown: markdown != undefined && markdown != null ? markdown : false
                            }, function (err, data) {
                                return process(err, data);
                            })];
                    case 1:
                        _l.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_6 = _l.sent();
                        return [2 /*return*/, process({
                                "code": 500,
                                "status": false,
                                "error": "INTERNAL_SERVER_ERROR",
                                "message": "general (unknown) error"
                            }, null)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return llama2;
}());
exports.llama2 = llama2;
var bing = /** @class */ (function () {
    function bing() {
    }
    bing.asc = function (_b) {
        return __awaiter(this, arguments, void 0, function (_c) {
            var _this = this;
            var _d = _c.messages, messages = _d === void 0 ? [] : _d, _e = _c.conversation_style, conversation_style = _e === void 0 ? "Balanced" : _e, _f = _c.markdown, markdown = _f === void 0 ? false : _f;
            return __generator(this, function (_g) {
                return [2 /*return*/, new Promise(function (res, rej) { return __awaiter(_this, void 0, void 0, function () {
                        var response, e_7;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _b.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, consult_('https://nexra.aryahcr.cc/api/chat/complements', {
                                            messages: messages != undefined && messages != null ? messages : [],
                                            conversation_style: conversation_style,
                                            markdown: markdown != undefined && markdown != null ? markdown : false,
                                            model: "bing"
                                        })];
                                case 1:
                                    response = _b.sent();
                                    return [2 /*return*/, res(response)];
                                case 2:
                                    e_7 = _b.sent();
                                    if (typeof (e_7) == "object") {
                                        return [2 /*return*/, rej(e_7)];
                                    }
                                    else {
                                        return [2 /*return*/, rej({
                                                "code": 500,
                                                "status": false,
                                                "error": "INTERNAL_SERVER_ERROR",
                                                "message": "general (unknown) error"
                                            })];
                                    }
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    bing.strm = function (_b, process_1) {
        return __awaiter(this, arguments, void 0, function (_c, process) {
            var e_8;
            var _d = _c.messages, messages = _d === void 0 ? [] : _d, _e = _c.conversation_style, conversation_style = _e === void 0 ? "Balanced" : _e, _f = _c.markdown, markdown = _f === void 0 ? false : _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        _g.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, consult_strm('https://nexra.aryahcr.cc/api/chat/complements', {
                                messages: messages != undefined && messages != null ? messages : [],
                                conversation_style: conversation_style,
                                markdown: markdown != undefined && markdown != null ? markdown : false,
                                model: "bing"
                            }, function (err, data) {
                                return process(err, data);
                            })];
                    case 1:
                        _g.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_8 = _g.sent();
                        return [2 /*return*/, process({
                                "code": 500,
                                "status": false,
                                "error": "INTERNAL_SERVER_ERROR",
                                "message": "general (unknown) error"
                            }, null)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return bing;
}());
exports.bing = bing;
var pixart = /** @class */ (function () {
    function pixart() {
    }
    pixart.a = function (_b) {
        return __awaiter(this, arguments, void 0, function (_c) {
            var _this = this;
            var _d = _c.prompt, prompt = _d === void 0 ? "" : _d, _e = _c.data, data = _e === void 0 ? {
                prompt_negative: "",
                sampler: "DPM-Solver",
                image_style: "(No style)",
                width: 1024,
                height: 1024,
                dpm_guidance_scale: 4.5,
                dpm_inference_steps: 14,
                sa_guidance_scale: 3,
                sa_inference_steps: 25
            } : _e;
            return __generator(this, function (_f) {
                return [2 /*return*/, new Promise(function (res, rej) { return __awaiter(_this, void 0, void 0, function () {
                        var response, e_9;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _b.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, consult_('https://nexra.aryahcr.cc/api/image/complements', {
                                            prompt: prompt != undefined && prompt != null ? prompt : "",
                                            model: "pixart-a",
                                            data: {
                                                prompt_negative: data != undefined && data != null && data.prompt_negative != undefined && data.prompt_negative != null ? data.prompt_negative : "",
                                                sampler: data != undefined && data != null && data.sampler != undefined && data.sampler != null ? data.sampler : "DPM-Solver",
                                                image_style: data != undefined && data != null && data.image_style != undefined && data.image_style != null ? data.image_style : "(No style)",
                                                width: data != undefined && data != null && data.width != undefined && data.width != null ? data.width : 1024,
                                                height: data != undefined && data != null && data.height != undefined && data.height != null ? data.height : 1024,
                                                dpm_guidance_scale: data != undefined && data != null && data.dpm_guidance_scale != undefined && data.dpm_guidance_scale != null ? data.dpm_guidance_scale : 4.5,
                                                dpm_inference_steps: data != undefined && data != null && data.dpm_inference_steps != undefined && data.dpm_inference_steps != null ? data.dpm_inference_steps : 14,
                                                sa_guidance_scale: data != undefined && data != null && data.sa_guidance_scale != undefined && data.sa_guidance_scale != null ? data.sa_guidance_scale : 3,
                                                sa_inference_steps: data != undefined && data != null && data.sa_inference_steps != undefined && data.sa_inference_steps != null ? data.sa_inference_steps : 25
                                            }
                                        })];
                                case 1:
                                    response = _b.sent();
                                    return [2 /*return*/, res(response)];
                                case 2:
                                    e_9 = _b.sent();
                                    if (typeof (e_9) == "object") {
                                        return [2 /*return*/, rej(e_9)];
                                    }
                                    else {
                                        return [2 /*return*/, rej({
                                                "code": 500,
                                                "status": false,
                                                "error": "INTERNAL_SERVER_ERROR",
                                                "message": "general (unknown) error"
                                            })];
                                    }
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    pixart.lcm = function (_b) {
        return __awaiter(this, arguments, void 0, function (_c) {
            var _this = this;
            var _d = _c.prompt, prompt = _d === void 0 ? "" : _d, _e = _c.data, data = _e === void 0 ? {
                prompt_negative: "",
                image_style: "(No style)",
                width: 1024,
                height: 1024,
                lcm_inference_steps: 9
            } : _e;
            return __generator(this, function (_f) {
                return [2 /*return*/, new Promise(function (res, rej) { return __awaiter(_this, void 0, void 0, function () {
                        var response, e_10;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _b.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, consult_('https://nexra.aryahcr.cc/api/image/complements', {
                                            prompt: prompt != undefined && prompt != null ? prompt : "",
                                            model: "pixart-lcm",
                                            data: {
                                                prompt_negative: data != undefined && data != null && data.prompt_negative != undefined && data.prompt_negative != null ? data.prompt_negative : "",
                                                image_style: data != undefined && data != null && data.image_style != undefined && data.image_style != null ? data.image_style : "(No style)",
                                                width: data != undefined && data != null && data.width != undefined && data.width != null ? data.width : 1024,
                                                height: data != undefined && data != null && data.height != undefined && data.height != null ? data.height : 1024,
                                                lcm_inference_steps: data != undefined && data != null && data.lcm_inference_steps != undefined && data.lcm_inference_steps != null ? data.lcm_inference_steps : 9
                                            }
                                        })];
                                case 1:
                                    response = _b.sent();
                                    return [2 /*return*/, res(response)];
                                case 2:
                                    e_10 = _b.sent();
                                    if (typeof (e_10) == "object") {
                                        return [2 /*return*/, rej(e_10)];
                                    }
                                    else {
                                        return [2 /*return*/, rej({
                                                "code": 500,
                                                "status": false,
                                                "error": "INTERNAL_SERVER_ERROR",
                                                "message": "general (unknown) error"
                                            })];
                                    }
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    return pixart;
}());
exports.pixart = pixart;
var dalle = /** @class */ (function () {
    function dalle() {
    }
    dalle.v1 = function (_b) {
        return __awaiter(this, arguments, void 0, function (_c) {
            var _this = this;
            var _d = _c.prompt, prompt = _d === void 0 ? "" : _d;
            return __generator(this, function (_e) {
                return [2 /*return*/, new Promise(function (res, rej) { return __awaiter(_this, void 0, void 0, function () {
                        var response, e_11;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _b.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, consult_('https://nexra.aryahcr.cc/api/image/complements', {
                                            prompt: prompt != undefined && prompt != null ? prompt : "",
                                            model: "dalle"
                                        })];
                                case 1:
                                    response = _b.sent();
                                    return [2 /*return*/, res(response)];
                                case 2:
                                    e_11 = _b.sent();
                                    if (typeof (e_11) == "object") {
                                        return [2 /*return*/, rej(e_11)];
                                    }
                                    else {
                                        return [2 /*return*/, rej({
                                                "code": 500,
                                                "status": false,
                                                "error": "INTERNAL_SERVER_ERROR",
                                                "message": "general (unknown) error"
                                            })];
                                    }
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    dalle.v2 = function (_b) {
        return __awaiter(this, arguments, void 0, function (_c) {
            var _this = this;
            var _d = _c.prompt, prompt = _d === void 0 ? "" : _d, _e = _c.data, data = _e === void 0 ? {
                prompt_negative: "",
                width: 1024,
                height: 1024,
                guidance_scale: 6
            } : _e;
            return __generator(this, function (_f) {
                return [2 /*return*/, new Promise(function (res, rej) { return __awaiter(_this, void 0, void 0, function () {
                        var response, e_12;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _b.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, consult_('https://nexra.aryahcr.cc/api/image/complements', {
                                            prompt: prompt != undefined && prompt != null ? prompt : "",
                                            model: "dalle2",
                                            data: {
                                                prompt_negative: data != undefined && data != null && data.prompt_negative != undefined && data.prompt_negative != null ? data.prompt_negative : "",
                                                width: data != undefined && data != null && data.width != undefined && data.width != null ? data.width : 1024,
                                                height: data != undefined && data != null && data.height != undefined && data.height != null ? data.height : 1024,
                                                guidance_scale: data != undefined && data != null && data.guidance_scale != undefined && data.guidance_scale != null ? data.guidance_scale : 6
                                            }
                                        })];
                                case 1:
                                    response = _b.sent();
                                    return [2 /*return*/, res(response)];
                                case 2:
                                    e_12 = _b.sent();
                                    if (typeof (e_12) == "object") {
                                        return [2 /*return*/, rej(e_12)];
                                    }
                                    else {
                                        return [2 /*return*/, rej({
                                                "code": 500,
                                                "status": false,
                                                "error": "INTERNAL_SERVER_ERROR",
                                                "message": "general (unknown) error"
                                            })];
                                    }
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    dalle.mini = function (_b) {
        return __awaiter(this, arguments, void 0, function (_c) {
            var _this = this;
            var _d = _c.prompt, prompt = _d === void 0 ? "" : _d;
            return __generator(this, function (_e) {
                return [2 /*return*/, new Promise(function (res, rej) { return __awaiter(_this, void 0, void 0, function () {
                        var response, e_13;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _b.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, consult_('https://nexra.aryahcr.cc/api/image/complements', {
                                            prompt: prompt != undefined && prompt != null ? prompt : "",
                                            model: "dalle-mini"
                                        })];
                                case 1:
                                    response = _b.sent();
                                    return [2 /*return*/, res(response)];
                                case 2:
                                    e_13 = _b.sent();
                                    if (typeof (e_13) == "object") {
                                        return [2 /*return*/, rej(e_13)];
                                    }
                                    else {
                                        return [2 /*return*/, rej({
                                                "code": 500,
                                                "status": false,
                                                "error": "INTERNAL_SERVER_ERROR",
                                                "message": "general (unknown) error"
                                            })];
                                    }
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    return dalle;
}());
exports.dalle = dalle;
var prodia = /** @class */ (function () {
    function prodia() {
    }
    prodia.v1 = function (_b) {
        return __awaiter(this, arguments, void 0, function (_c) {
            var _this = this;
            var _d = _c.prompt, prompt = _d === void 0 ? "" : _d, _e = _c.data, data = _e === void 0 ? {
                model: "absolutereality_V16.safetensors [37db0fc3]",
                steps: 25,
                cfg_scale: 7,
                sampler: "DPM++ 2M Karras",
                negative_prompt: ""
            } : _e;
            return __generator(this, function (_f) {
                return [2 /*return*/, new Promise(function (res, rej) { return __awaiter(_this, void 0, void 0, function () {
                        var response, e_14;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _b.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, consult_('https://nexra.aryahcr.cc/api/image/complements', {
                                            prompt: prompt != undefined && prompt != null ? prompt : "",
                                            model: "prodia",
                                            data: {
                                                model: data != undefined && data != null && data.model != undefined && data.model != null ? data.model : "absolutereality_V16.safetensors [37db0fc3]",
                                                steps: data != undefined && data != null && data.steps != undefined && data.steps != null ? data.steps : 25,
                                                cfg_scale: data != undefined && data != null && data.cfg_scale != undefined && data.cfg_scale != null ? data.cfg_scale : 7,
                                                sampler: data != undefined && data != null && data.sampler != undefined && data.sampler != null ? data.sampler : "DPM++ 2M Karras",
                                                negative_prompt: data != undefined && data != null && data.negative_prompt != undefined && data.negative_prompt != null ? data.negative_prompt : ""
                                            }
                                        })];
                                case 1:
                                    response = _b.sent();
                                    return [2 /*return*/, res(response)];
                                case 2:
                                    e_14 = _b.sent();
                                    if (typeof (e_14) == "object") {
                                        return [2 /*return*/, rej(e_14)];
                                    }
                                    else {
                                        return [2 /*return*/, rej({
                                                "code": 500,
                                                "status": false,
                                                "error": "INTERNAL_SERVER_ERROR",
                                                "message": "general (unknown) error"
                                            })];
                                    }
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    prodia.stablediffusion = function (_b) {
        return __awaiter(this, arguments, void 0, function (_c) {
            var _this = this;
            var _d = _c.prompt, prompt = _d === void 0 ? "" : _d, _e = _c.data, data = _e === void 0 ? {
                prompt_negative: "",
                model: "absolutereality_v181.safetensors [3d9d4d2b]",
                sampling_method: "DPM++ 2M Karras",
                sampling_steps: 25,
                width: 512,
                height: 512,
                cfg_scale: 7
            } : _e;
            return __generator(this, function (_f) {
                return [2 /*return*/, new Promise(function (res, rej) { return __awaiter(_this, void 0, void 0, function () {
                        var response, e_15;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _b.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, consult_('https://nexra.aryahcr.cc/api/image/complements', {
                                            prompt: prompt != undefined && prompt != null ? prompt : "",
                                            model: "prodia-stablediffusion",
                                            data: {
                                                model: data != undefined && data != null && data.model != undefined && data.model != null ? data.model : "absolutereality_v181.safetensors [3d9d4d2b]",
                                                sampling_method: data != undefined && data != null && data.sampling_method != undefined && data.sampling_method != null ? data.sampling_method : "DPM++ 2M Karras",
                                                sampling_steps: data != undefined && data != null && data.sampling_steps != undefined && data.sampling_steps != null ? data.sampling_steps : 25,
                                                width: data != undefined && data != null && data.width != undefined && data.width != null ? data.width : 512,
                                                height: data != undefined && data != null && data.height != undefined && data.height != null ? data.height : 512,
                                                cfg_scale: data != undefined && data != null && data.cfg_scale != undefined && data.cfg_scale != null ? data.cfg_scale : 7,
                                                prompt_negative: data != undefined && data != null && data.prompt_negative != undefined && data.prompt_negative != null ? data.prompt_negative : "",
                                            }
                                        })];
                                case 1:
                                    response = _b.sent();
                                    return [2 /*return*/, res(response)];
                                case 2:
                                    e_15 = _b.sent();
                                    if (typeof (e_15) == "object") {
                                        return [2 /*return*/, rej(e_15)];
                                    }
                                    else {
                                        return [2 /*return*/, rej({
                                                "code": 500,
                                                "status": false,
                                                "error": "INTERNAL_SERVER_ERROR",
                                                "message": "general (unknown) error"
                                            })];
                                    }
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    prodia.stablediffusion_xl = function (_b) {
        return __awaiter(this, arguments, void 0, function (_c) {
            var _this = this;
            var _d = _c.prompt, prompt = _d === void 0 ? "" : _d, _e = _c.data, data = _e === void 0 ? {
                prompt_negative: "",
                model: "sd_xl_base_1.0.safetensors [be9edd61]",
                sampling_method: "DPM++ 2M Karras",
                sampling_steps: 25,
                width: 1024,
                height: 1024,
                cfg_scale: 7
            } : _e;
            return __generator(this, function (_f) {
                return [2 /*return*/, new Promise(function (res, rej) { return __awaiter(_this, void 0, void 0, function () {
                        var response, e_16;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _b.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, consult_('https://nexra.aryahcr.cc/api/image/complements', {
                                            prompt: prompt != undefined && prompt != null ? prompt : "",
                                            model: "prodia-stablediffusion-xl",
                                            data: {
                                                model: data != undefined && data != null && data.model != undefined && data.model != null ? data.model : "sd_xl_base_1.0.safetensors [be9edd61]",
                                                sampling_method: data != undefined && data != null && data.sampling_method != undefined && data.sampling_method != null ? data.sampling_method : "DPM++ 2M Karras",
                                                sampling_steps: data != undefined && data != null && data.sampling_steps != undefined && data.sampling_steps != null ? data.sampling_steps : 25,
                                                width: data != undefined && data != null && data.width != undefined && data.width != null ? data.width : 1024,
                                                height: data != undefined && data != null && data.height != undefined && data.height != null ? data.height : 1024,
                                                cfg_scale: data != undefined && data != null && data.cfg_scale != undefined && data.cfg_scale != null ? data.cfg_scale : 7,
                                                prompt_negative: data != undefined && data != null && data.prompt_negative != undefined && data.prompt_negative != null ? data.prompt_negative : "",
                                            }
                                        })];
                                case 1:
                                    response = _b.sent();
                                    return [2 /*return*/, res(response)];
                                case 2:
                                    e_16 = _b.sent();
                                    if (typeof (e_16) == "object") {
                                        return [2 /*return*/, rej(e_16)];
                                    }
                                    else {
                                        return [2 /*return*/, rej({
                                                "code": 500,
                                                "status": false,
                                                "error": "INTERNAL_SERVER_ERROR",
                                                "message": "general (unknown) error"
                                            })];
                                    }
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    return prodia;
}());
exports.prodia = prodia;
var stablediffusion = /** @class */ (function () {
    function stablediffusion() {
    }
    stablediffusion.v1 = function (_b) {
        return __awaiter(this, arguments, void 0, function (_c) {
            var _this = this;
            var _d = _c.prompt, prompt = _d === void 0 ? "" : _d;
            return __generator(this, function (_e) {
                return [2 /*return*/, new Promise(function (res, rej) { return __awaiter(_this, void 0, void 0, function () {
                        var response, e_17;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _b.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, consult_('https://nexra.aryahcr.cc/api/image/complements', {
                                            prompt: prompt != undefined && prompt != null ? prompt : "",
                                            model: "stablediffusion-1.5"
                                        })];
                                case 1:
                                    response = _b.sent();
                                    return [2 /*return*/, res(response)];
                                case 2:
                                    e_17 = _b.sent();
                                    if (typeof (e_17) == "object") {
                                        return [2 /*return*/, rej(e_17)];
                                    }
                                    else {
                                        return [2 /*return*/, rej({
                                                "code": 500,
                                                "status": false,
                                                "error": "INTERNAL_SERVER_ERROR",
                                                "message": "general (unknown) error"
                                            })];
                                    }
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    stablediffusion.v2 = function (_b) {
        return __awaiter(this, arguments, void 0, function (_c) {
            var _this = this;
            var _d = _c.prompt, prompt = _d === void 0 ? "" : _d, _e = _c.data, data = _e === void 0 ? {
                prompt_negative: "",
                guidance_scale: 9
            } : _e;
            return __generator(this, function (_f) {
                return [2 /*return*/, new Promise(function (res, rej) { return __awaiter(_this, void 0, void 0, function () {
                        var response, e_18;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _b.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, consult_('https://nexra.aryahcr.cc/api/image/complements', {
                                            prompt: prompt != undefined && prompt != null ? prompt : "",
                                            model: "stablediffusion-2.1",
                                            data: {
                                                prompt_negative: data != undefined && data != null && data.prompt_negative != undefined && data.prompt_negative != null ? data.prompt_negative : "",
                                                guidance_scale: data != undefined && data != null && data.guidance_scale != undefined && data.guidance_scale != null ? data.guidance_scale : 9,
                                            }
                                        })];
                                case 1:
                                    response = _b.sent();
                                    return [2 /*return*/, res(response)];
                                case 2:
                                    e_18 = _b.sent();
                                    if (typeof (e_18) == "object") {
                                        return [2 /*return*/, rej(e_18)];
                                    }
                                    else {
                                        return [2 /*return*/, rej({
                                                "code": 500,
                                                "status": false,
                                                "error": "INTERNAL_SERVER_ERROR",
                                                "message": "general (unknown) error"
                                            })];
                                    }
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    stablediffusion.xl = function (_b) {
        return __awaiter(this, arguments, void 0, function (_c) {
            var _this = this;
            var _d = _c.prompt, prompt = _d === void 0 ? "" : _d, _e = _c.data, data = _e === void 0 ? {
                prompt_negative: "",
                image_style: "(No style)",
                guidance_scale: 7.5
            } : _e;
            return __generator(this, function (_f) {
                return [2 /*return*/, new Promise(function (res, rej) { return __awaiter(_this, void 0, void 0, function () {
                        var response, e_19;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _b.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, consult_('https://nexra.aryahcr.cc/api/image/complements', {
                                            prompt: prompt != undefined && prompt != null ? prompt : "",
                                            model: "stablediffusion-xl",
                                            data: {
                                                prompt_negative: data != undefined && data != null && data.prompt_negative != undefined && data.prompt_negative != null ? data.prompt_negative : "",
                                                image_style: data != undefined && data != null && data.image_style != undefined && data.image_style != null ? data.image_style : "(No style)",
                                                guidance_scale: data != undefined && data != null && data.guidance_scale != undefined && data.guidance_scale != null ? data.guidance_scale : 7.5,
                                            }
                                        })];
                                case 1:
                                    response = _b.sent();
                                    return [2 /*return*/, res(response)];
                                case 2:
                                    e_19 = _b.sent();
                                    if (typeof (e_19) == "object") {
                                        return [2 /*return*/, rej(e_19)];
                                    }
                                    else {
                                        return [2 /*return*/, rej({
                                                "code": 500,
                                                "status": false,
                                                "error": "INTERNAL_SERVER_ERROR",
                                                "message": "general (unknown) error"
                                            })];
                                    }
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    return stablediffusion;
}());
exports.stablediffusion = stablediffusion;
var emi = function (_b) { return __awaiter(void 0, [_b], void 0, function (_c) {
    var _d = _c.prompt, prompt = _d === void 0 ? "" : _d;
    return __generator(this, function (_e) {
        return [2 /*return*/, new Promise(function (res, rej) { return __awaiter(void 0, void 0, void 0, function () {
                var response, e_20;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, consult_('https://nexra.aryahcr.cc/api/image/complements', {
                                    prompt: prompt != undefined && prompt != null ? prompt : "",
                                    model: "emi"
                                })];
                        case 1:
                            response = _b.sent();
                            return [2 /*return*/, res(response)];
                        case 2:
                            e_20 = _b.sent();
                            if (typeof (e_20) == "object") {
                                return [2 /*return*/, rej(e_20)];
                            }
                            else {
                                return [2 /*return*/, rej({
                                        "code": 500,
                                        "status": false,
                                        "error": "INTERNAL_SERVER_ERROR",
                                        "message": "general (unknown) error"
                                    })];
                            }
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); })];
    });
}); };
exports.emi = emi;
var render3d = function (_b) { return __awaiter(void 0, [_b], void 0, function (_c) {
    var _d = _c.prompt, prompt = _d === void 0 ? "" : _d, _e = _c.data, data = _e === void 0 ? {
        prompt_negative: ""
    } : _e;
    return __generator(this, function (_f) {
        return [2 /*return*/, new Promise(function (res, rej) { return __awaiter(void 0, void 0, void 0, function () {
                var response, e_21;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, consult_('https://nexra.aryahcr.cc/api/image/complements', {
                                    prompt: prompt != undefined && prompt != null ? prompt : "",
                                    model: "render3d",
                                    data: {
                                        prompt_negative: data != undefined && data != null && data.prompt_negative != undefined && data.prompt_negative != null ? data.prompt_negative : ""
                                    }
                                })];
                        case 1:
                            response = _b.sent();
                            return [2 /*return*/, res(response)];
                        case 2:
                            e_21 = _b.sent();
                            if (typeof (e_21) == "object") {
                                return [2 /*return*/, rej(e_21)];
                            }
                            else {
                                return [2 /*return*/, rej({
                                        "code": 500,
                                        "status": false,
                                        "error": "INTERNAL_SERVER_ERROR",
                                        "message": "general (unknown) error"
                                    })];
                            }
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); })];
    });
}); };
exports.render3d = render3d;
var pixelart = function (_b) { return __awaiter(void 0, [_b], void 0, function (_c) {
    var _d = _c.prompt, prompt = _d === void 0 ? "" : _d, _e = _c.data, data = _e === void 0 ? {
        prompt_negative: ""
    } : _e;
    return __generator(this, function (_f) {
        return [2 /*return*/, new Promise(function (res, rej) { return __awaiter(void 0, void 0, void 0, function () {
                var response, e_22;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, consult_('https://nexra.aryahcr.cc/api/image/complements', {
                                    prompt: prompt != undefined && prompt != null ? prompt : "",
                                    model: "pixel-art",
                                    data: {
                                        prompt_negative: data != undefined && data != null && data.prompt_negative != undefined && data.prompt_negative != null ? data.prompt_negative : ""
                                    }
                                })];
                        case 1:
                            response = _b.sent();
                            return [2 /*return*/, res(response)];
                        case 2:
                            e_22 = _b.sent();
                            if (typeof (e_22) == "object") {
                                return [2 /*return*/, rej(e_22)];
                            }
                            else {
                                return [2 /*return*/, rej({
                                        "code": 500,
                                        "status": false,
                                        "error": "INTERNAL_SERVER_ERROR",
                                        "message": "general (unknown) error"
                                    })];
                            }
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); })];
    });
}); };
exports.pixelart = pixelart;
var playground = function (_b) { return __awaiter(void 0, [_b], void 0, function (_c) {
    var _d = _c.prompt, prompt = _d === void 0 ? "" : _d, _e = _c.data, data = _e === void 0 ? {
        prompt_negative: "",
        width: 1024,
        height: 1024,
        guidance_scale: 3
    } : _e;
    return __generator(this, function (_f) {
        return [2 /*return*/, new Promise(function (res, rej) { return __awaiter(void 0, void 0, void 0, function () {
                var response, e_23;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, consult_('https://nexra.aryahcr.cc/api/image/complements', {
                                    prompt: prompt != undefined && prompt != null ? prompt : "",
                                    model: "playground",
                                    data: {
                                        prompt_negative: data != undefined && data != null && data.prompt_negative != undefined && data.prompt_negative != null ? data.prompt_negative : "",
                                        width: data != undefined && data != null && data.width != undefined && data.width != null ? data.width : 1024,
                                        height: data != undefined && data != null && data.height != undefined && data.height != null ? data.height : 1024,
                                        guidance_scale: data != undefined && data != null && data.guidance_scale != undefined && data.guidance_scale != null ? data.guidance_scale : 6,
                                    }
                                })];
                        case 1:
                            response = _b.sent();
                            return [2 /*return*/, res(response)];
                        case 2:
                            e_23 = _b.sent();
                            if (typeof (e_23) == "object") {
                                return [2 /*return*/, rej(e_23)];
                            }
                            else {
                                return [2 /*return*/, rej({
                                        "code": 500,
                                        "status": false,
                                        "error": "INTERNAL_SERVER_ERROR",
                                        "message": "general (unknown) error"
                                    })];
                            }
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); })];
    });
}); };
exports.playground = playground;
var animagine = function (_b) { return __awaiter(void 0, [_b], void 0, function (_c) {
    var _d = _c.prompt, prompt = _d === void 0 ? "" : _d, _e = _c.data, data = _e === void 0 ? {
        prompt_negative: "",
        quality_tags: "Standard",
        style_present: "(None)",
        width: 1024,
        height: 1024,
        strength: 0.5,
        upscale: 1.5,
        sampler: "Euler a",
        guidance_scale: 7,
        inference_steps: 28
    } : _e;
    return __generator(this, function (_f) {
        return [2 /*return*/, new Promise(function (res, rej) { return __awaiter(void 0, void 0, void 0, function () {
                var response, e_24;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, consult_('https://nexra.aryahcr.cc/api/image/complements', {
                                    prompt: prompt != undefined && prompt != null ? prompt : "",
                                    model: "animagine-xl",
                                    data: {
                                        prompt_negative: data != undefined && data != null && data.prompt_negative != undefined && data.prompt_negative != null ? data.prompt_negative : "",
                                        width: data != undefined && data != null && data.width != undefined && data.width != null ? data.width : 1024,
                                        height: data != undefined && data != null && data.height != undefined && data.height != null ? data.height : 1024,
                                        guidance_scale: data != undefined && data != null && data.guidance_scale != undefined && data.guidance_scale != null ? data.guidance_scale : 7,
                                        quality_tags: data != undefined && data != null && data.quality_tags != undefined && data.quality_tags != null ? data.quality_tags : "Standard",
                                        style_present: data != undefined && data != null && data.style_present != undefined && data.style_present != null ? data.style_present : "(None)",
                                        strength: data != undefined && data != null && data.strength != undefined && data.strength != null ? data.strength : 0.5,
                                        upscale: data != undefined && data != null && data.upscale != undefined && data.upscale != null ? data.upscale : 1.5,
                                        sampler: data != undefined && data != null && data.sampler != undefined && data.sampler != null ? data.sampler : "Euler a",
                                        inference_steps: data != undefined && data != null && data.inference_steps != undefined && data.inference_steps != null ? data.inference_steps : 28
                                    }
                                })];
                        case 1:
                            response = _b.sent();
                            return [2 /*return*/, res(response)];
                        case 2:
                            e_24 = _b.sent();
                            if (typeof (e_24) == "object") {
                                return [2 /*return*/, rej(e_24)];
                            }
                            else {
                                return [2 /*return*/, rej({
                                        "code": 500,
                                        "status": false,
                                        "error": "INTERNAL_SERVER_ERROR",
                                        "message": "general (unknown) error"
                                    })];
                            }
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); })];
    });
}); };
exports.animagine = animagine;
exports.default = {
    gpt: gpt,
    bing: bing,
    pixart: pixart,
    dalle: dalle,
    prodia: prodia,
    stablediffusion: stablediffusion,
    emi: emi,
    llama2: llama2,
    pixelart: pixelart,
    render3d: render3d,
    animagine: animagine,
    nexra: nexra,
    playground: playground
};
