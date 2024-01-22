"use strict";
/*
    Author: yandricr
    API: https://nexra.aryahcr.cc/
*/
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
exports.emi = exports.stablediffusion = exports.prodia = exports.dalle = exports.pixart = exports.bing = exports.gpt = void 0;
var axios_1 = require("axios");
var gpt = function (_a, process) {
    var _b = _a.messages, messages = _b === void 0 ? [] : _b, _c = _a.prompt, prompt = _c === void 0 ? "" : _c, _d = _a.model, model = _d === void 0 ? "" : _d, _e = _a.markdown, markdown = _e === void 0 ? false : _e;
    try {
        axios_1.default.post('https://nexra.aryahcr.cc/api/chat/gpt', {
            messages: messages != undefined && messages != null ? messages : [],
            prompt: prompt != undefined && prompt != null ? prompt : "",
            model: model != undefined && model != null ? model : "",
            markdown: markdown != undefined && markdown != null ? markdown : false
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            if (response.status === 200) {
                if ((typeof response.data).toString().toLowerCase() === "Object".toLowerCase()) {
                    if (response.data.code != undefined && response.data.code != null && response.data.code === 200 && response.data.status != undefined && response.data.status != null && response.data.status === true) {
                        return process(null, response.data);
                    }
                    else {
                        return process(response.data, null);
                    }
                }
                else {
                    var js = null;
                    var count = -1;
                    for (var i = 0; i < response.data.length; i++) {
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
                        return process({
                            "code": 500,
                            "status": false,
                            "error": "INTERNAL_SERVER_ERROR",
                            "message": "general (unknown) error"
                        }, null);
                    }
                    else {
                        try {
                            js = response.data.slice(count);
                            js = JSON.parse(js);
                            if (js != undefined && js != null && js.code != undefined && js.code != null && js.code === 200 && js.status != undefined && js.status != null && js.status === true) {
                                return process(null, js);
                            }
                            else {
                                return process(js, null);
                            }
                        }
                        catch (e) {
                            return process({
                                "code": 500,
                                "status": false,
                                "error": "INTERNAL_SERVER_ERROR",
                                "message": "general (unknown) error"
                            }, null);
                        }
                    }
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
        }).catch(function (error) {
            try {
                if (error.response) {
                    return process(error.response.data, null);
                }
                else if (error.request) {
                    return process({
                        "code": 404,
                        "error": "NOT_FOUND",
                        "message": "the service is currently unavailable"
                    }, null);
                }
                else {
                    return process({
                        "code": 500,
                        "status": false,
                        "error": "INTERNAL_SERVER_ERROR",
                        "message": "general (unknown) error"
                    }, null);
                }
            }
            catch (e) {
                return process({
                    "code": 500,
                    "status": false,
                    "error": "INTERNAL_SERVER_ERROR",
                    "message": "general (unknown) error"
                }, null);
            }
        });
    }
    catch (e) {
        return process({
            "code": 500,
            "status": false,
            "error": "INTERNAL_SERVER_ERROR",
            "message": "general (unknown) error"
        }, null);
    }
};
exports.gpt = gpt;
var bing = function (_a, process) {
    var _b = _a.messages, messages = _b === void 0 ? [] : _b, _c = _a.conversation_style, conversation_style = _c === void 0 ? "Balanced" : _c, _d = _a.markdown, markdown = _d === void 0 ? false : _d, _e = _a.stream, stream = _e === void 0 ? false : _e;
    var str = false;
    try {
        if (stream != undefined && stream != null && (typeof stream).toString().toLowerCase() === "Boolean".toLowerCase()) {
            if (stream === true) {
                str = true;
            }
            else {
                stream = false;
            }
        }
        else {
            stream = false;
        }
    }
    catch (e) {
        stream = false;
    }
    var config = {};
    if (str === true) {
        config = {
            headers: {
                'Content-Type': 'application/json'
            },
            responseType: "stream"
        };
    }
    else {
        config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }
    try {
        axios_1.default.post('https://nexra.aryahcr.cc/api/chat/complements', {
            messages: messages != undefined && messages != null ? messages : [],
            conversation_style: conversation_style,
            markdown: markdown != undefined && markdown != null ? markdown : false,
            model: "bing",
            stream: str === true ? true : false
        }, config).then(function (response) {
            if (response.status === 200) {
                if (str === true) {
                    var chat_1 = null;
                    var error_1 = false;
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
                                        if (error_1 != true) {
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
                                        error_1 = true;
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
                            if (error_1 != true) {
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
                    if ((typeof response.data).toString().toLowerCase() === "Object".toLowerCase()) {
                        if (response.data.code != undefined && response.data.code != null && response.data.code === 200 && response.data.status != undefined && response.data.status != null && response.data.status === true) {
                            return process(null, response.data);
                        }
                        else {
                            return process(response.data, null);
                        }
                    }
                    else {
                        var js = null;
                        var count = -1;
                        for (var i = 0; i < response.data.length; i++) {
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
                            return process({
                                "code": 500,
                                "status": false,
                                "error": "INTERNAL_SERVER_ERROR",
                                "message": "general (unknown) error"
                            }, null);
                        }
                        else {
                            try {
                                js = response.data.slice(count);
                                js = JSON.parse(js);
                                if (js != undefined && js != null && js.code != undefined && js.code != null && js.code === 200 && js.status != undefined && js.status != null && js.status === true) {
                                    return process(null, js);
                                }
                                else {
                                    return process(js, null);
                                }
                            }
                            catch (e) {
                                return process({
                                    "code": 500,
                                    "status": false,
                                    "error": "INTERNAL_SERVER_ERROR",
                                    "message": "general (unknown) error"
                                }, null);
                            }
                        }
                    }
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
        }).catch(function (error) {
            try {
                if (error.response) {
                    return process(error.response.data, null);
                }
                else if (error.request) {
                    return process({
                        "code": 404,
                        "error": "NOT_FOUND",
                        "message": "the service is currently unavailable"
                    }, null);
                }
                else {
                    return process({
                        "code": 500,
                        "status": false,
                        "error": "INTERNAL_SERVER_ERROR",
                        "message": "general (unknown) error"
                    }, null);
                }
            }
            catch (e) {
                return process({
                    "code": 500,
                    "status": false,
                    "error": "INTERNAL_SERVER_ERROR",
                    "message": "general (unknown) error"
                }, null);
            }
        });
    }
    catch (e) {
        return process({
            "code": 500,
            "status": false,
            "error": "INTERNAL_SERVER_ERROR",
            "message": "general (unknown) error"
        }, null);
    }
};
exports.bing = bing;
var pixart = /** @class */ (function () {
    function pixart() {
    }
    pixart.a = function (_a, process) {
        var _b = _a.prompt, prompt = _b === void 0 ? "" : _b, _c = _a.data, data = _c === void 0 ? {
            prompt_negative: "",
            sampler: "DPM-Solver",
            image_style: "(No style)",
            width: 1024,
            height: 1024,
            dpm_guidance_scale: 4.5,
            dpm_inference_steps: 14,
            sa_guidance_scale: 3,
            sa_inference_steps: 25
        } : _c;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_d) {
                try {
                    axios_1.default.post('https://nexra.aryahcr.cc/api/image/complements', {
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
                    }, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(function (response) {
                        if (response.status === 200) {
                            if ((typeof response.data).toString().toLowerCase() === "Object".toLowerCase()) {
                                if (response.data.code != undefined && response.data.code != null && response.data.code === 200 && response.data.status != undefined && response.data.status != null && response.data.status === true) {
                                    return process(null, response.data);
                                }
                                else {
                                    return process(response.data, null);
                                }
                            }
                            else {
                                var js = null;
                                var count = -1;
                                for (var i = 0; i < response.data.length; i++) {
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
                                    return process({
                                        "code": 500,
                                        "status": false,
                                        "error": "INTERNAL_SERVER_ERROR",
                                        "message": "general (unknown) error"
                                    }, null);
                                }
                                else {
                                    try {
                                        js = response.data.slice(count);
                                        js = JSON.parse(js);
                                        if (js != undefined && js != null && js.code != undefined && js.code != null && js.code === 200 && js.status != undefined && js.status != null && js.status === true) {
                                            return process(null, js);
                                        }
                                        else {
                                            return process(js, null);
                                        }
                                    }
                                    catch (e) {
                                        return process({
                                            "code": 500,
                                            "status": false,
                                            "error": "INTERNAL_SERVER_ERROR",
                                            "message": "general (unknown) error"
                                        }, null);
                                    }
                                }
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
                    }).catch(function (error) {
                        try {
                            if (error.response) {
                                return process(error.response.data, null);
                            }
                            else if (error.request) {
                                return process({
                                    "code": 404,
                                    "error": "NOT_FOUND",
                                    "message": "the service is currently unavailable"
                                }, null);
                            }
                            else {
                                return process({
                                    "code": 500,
                                    "status": false,
                                    "error": "INTERNAL_SERVER_ERROR",
                                    "message": "general (unknown) error"
                                }, null);
                            }
                        }
                        catch (e) {
                            return process({
                                "code": 500,
                                "status": false,
                                "error": "INTERNAL_SERVER_ERROR",
                                "message": "general (unknown) error"
                            }, null);
                        }
                    });
                }
                catch (e) {
                    return [2 /*return*/, process({
                            "code": 500,
                            "status": false,
                            "error": "INTERNAL_SERVER_ERROR",
                            "message": "general (unknown) error"
                        }, null)];
                }
                return [2 /*return*/];
            });
        });
    };
    pixart.lcm = function (_a, process) {
        var _b = _a.prompt, prompt = _b === void 0 ? "" : _b, _c = _a.data, data = _c === void 0 ? {
            prompt_negative: "",
            image_style: "(No style)",
            width: 1024,
            height: 1024,
            lcm_inference_steps: 9
        } : _c;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_d) {
                try {
                    axios_1.default.post('https://nexra.aryahcr.cc/api/image/complements', {
                        prompt: prompt != undefined && prompt != null ? prompt : "",
                        model: "pixart-lcm",
                        data: {
                            prompt_negative: data != undefined && data != null && data.prompt_negative != undefined && data.prompt_negative != null ? data.prompt_negative : "",
                            image_style: data != undefined && data != null && data.image_style != undefined && data.image_style != null ? data.image_style : "(No style)",
                            width: data != undefined && data != null && data.width != undefined && data.width != null ? data.width : 1024,
                            height: data != undefined && data != null && data.height != undefined && data.height != null ? data.height : 1024,
                            lcm_inference_steps: data != undefined && data != null && data.lcm_inference_steps != undefined && data.lcm_inference_steps != null ? data.lcm_inference_steps : 9
                        }
                    }, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(function (response) {
                        if (response.status === 200) {
                            if ((typeof response.data).toString().toLowerCase() === "Object".toLowerCase()) {
                                if (response.data.code != undefined && response.data.code != null && response.data.code === 200 && response.data.status != undefined && response.data.status != null && response.data.status === true) {
                                    return process(null, response.data);
                                }
                                else {
                                    return process(response.data, null);
                                }
                            }
                            else {
                                var js = null;
                                var count = -1;
                                for (var i = 0; i < response.data.length; i++) {
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
                                    return process({
                                        "code": 500,
                                        "status": false,
                                        "error": "INTERNAL_SERVER_ERROR",
                                        "message": "general (unknown) error"
                                    }, null);
                                }
                                else {
                                    try {
                                        js = response.data.slice(count);
                                        js = JSON.parse(js);
                                        if (js != undefined && js != null && js.code != undefined && js.code != null && js.code === 200 && js.status != undefined && js.status != null && js.status === true) {
                                            return process(null, js);
                                        }
                                        else {
                                            return process(js, null);
                                        }
                                    }
                                    catch (e) {
                                        return process({
                                            "code": 500,
                                            "status": false,
                                            "error": "INTERNAL_SERVER_ERROR",
                                            "message": "general (unknown) error"
                                        }, null);
                                    }
                                }
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
                    }).catch(function (error) {
                        try {
                            if (error.response) {
                                return process(error.response.data, null);
                            }
                            else if (error.request) {
                                return process({
                                    "code": 404,
                                    "error": "NOT_FOUND",
                                    "message": "the service is currently unavailable"
                                }, null);
                            }
                            else {
                                return process({
                                    "code": 500,
                                    "status": false,
                                    "error": "INTERNAL_SERVER_ERROR",
                                    "message": "general (unknown) error"
                                }, null);
                            }
                        }
                        catch (e) {
                            return process({
                                "code": 500,
                                "status": false,
                                "error": "INTERNAL_SERVER_ERROR",
                                "message": "general (unknown) error"
                            }, null);
                        }
                    });
                }
                catch (e) {
                    return [2 /*return*/, process({
                            "code": 500,
                            "status": false,
                            "error": "INTERNAL_SERVER_ERROR",
                            "message": "general (unknown) error"
                        }, null)];
                }
                return [2 /*return*/];
            });
        });
    };
    return pixart;
}());
exports.pixart = pixart;
var dalle = /** @class */ (function () {
    function dalle() {
    }
    dalle.v1 = function (_a, process) {
        var _b = _a.prompt, prompt = _b === void 0 ? "" : _b;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                try {
                    axios_1.default.post('https://nexra.aryahcr.cc/api/image/complements', {
                        prompt: prompt != undefined && prompt != null ? prompt : "",
                        model: "dalle"
                    }, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(function (response) {
                        if (response.status === 200) {
                            if ((typeof response.data).toString().toLowerCase() === "Object".toLowerCase()) {
                                if (response.data.code != undefined && response.data.code != null && response.data.code === 200 && response.data.status != undefined && response.data.status != null && response.data.status === true) {
                                    return process(null, response.data);
                                }
                                else {
                                    return process(response.data, null);
                                }
                            }
                            else {
                                var js = null;
                                var count = -1;
                                for (var i = 0; i < response.data.length; i++) {
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
                                    return process({
                                        "code": 500,
                                        "status": false,
                                        "error": "INTERNAL_SERVER_ERROR",
                                        "message": "general (unknown) error"
                                    }, null);
                                }
                                else {
                                    try {
                                        js = response.data.slice(count);
                                        js = JSON.parse(js);
                                        if (js != undefined && js != null && js.code != undefined && js.code != null && js.code === 200 && js.status != undefined && js.status != null && js.status === true) {
                                            return process(null, js);
                                        }
                                        else {
                                            return process(js, null);
                                        }
                                    }
                                    catch (e) {
                                        return process({
                                            "code": 500,
                                            "status": false,
                                            "error": "INTERNAL_SERVER_ERROR",
                                            "message": "general (unknown) error"
                                        }, null);
                                    }
                                }
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
                    }).catch(function (error) {
                        try {
                            if (error.response) {
                                return process(error.response.data, null);
                            }
                            else if (error.request) {
                                return process({
                                    "code": 404,
                                    "error": "NOT_FOUND",
                                    "message": "the service is currently unavailable"
                                }, null);
                            }
                            else {
                                return process({
                                    "code": 500,
                                    "status": false,
                                    "error": "INTERNAL_SERVER_ERROR",
                                    "message": "general (unknown) error"
                                }, null);
                            }
                        }
                        catch (e) {
                            return process({
                                "code": 500,
                                "status": false,
                                "error": "INTERNAL_SERVER_ERROR",
                                "message": "general (unknown) error"
                            }, null);
                        }
                    });
                }
                catch (e) {
                    return [2 /*return*/, process({
                            "code": 500,
                            "status": false,
                            "error": "INTERNAL_SERVER_ERROR",
                            "message": "general (unknown) error"
                        }, null)];
                }
                return [2 /*return*/];
            });
        });
    };
    dalle.mini = function (_a, process) {
        var _b = _a.prompt, prompt = _b === void 0 ? "" : _b;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                try {
                    axios_1.default.post('https://nexra.aryahcr.cc/api/image/complements', {
                        prompt: prompt != undefined && prompt != null ? prompt : "",
                        model: "dalle-mini"
                    }, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(function (response) {
                        if (response.status === 200) {
                            if ((typeof response.data).toString().toLowerCase() === "Object".toLowerCase()) {
                                if (response.data.code != undefined && response.data.code != null && response.data.code === 200 && response.data.status != undefined && response.data.status != null && response.data.status === true) {
                                    return process(null, response.data);
                                }
                                else {
                                    return process(response.data, null);
                                }
                            }
                            else {
                                var js = null;
                                var count = -1;
                                for (var i = 0; i < response.data.length; i++) {
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
                                    return process({
                                        "code": 500,
                                        "status": false,
                                        "error": "INTERNAL_SERVER_ERROR",
                                        "message": "general (unknown) error"
                                    }, null);
                                }
                                else {
                                    try {
                                        js = response.data.slice(count);
                                        js = JSON.parse(js);
                                        if (js != undefined && js != null && js.code != undefined && js.code != null && js.code === 200 && js.status != undefined && js.status != null && js.status === true) {
                                            return process(null, js);
                                        }
                                        else {
                                            return process(js, null);
                                        }
                                    }
                                    catch (e) {
                                        return process({
                                            "code": 500,
                                            "status": false,
                                            "error": "INTERNAL_SERVER_ERROR",
                                            "message": "general (unknown) error"
                                        }, null);
                                    }
                                }
                            }
                        }
                        else {
                            return process(response.data, null);
                        }
                    }).catch(function (error) {
                        try {
                            if (error.response) {
                                return process(error.response.data, null);
                            }
                            else if (error.request) {
                                return process({
                                    "code": 404,
                                    "error": "NOT_FOUND",
                                    "message": "the service is currently unavailable"
                                }, null);
                            }
                            else {
                                return process({
                                    "code": 500,
                                    "status": false,
                                    "error": "INTERNAL_SERVER_ERROR",
                                    "message": "general (unknown) error"
                                }, null);
                            }
                        }
                        catch (e) {
                            return process({
                                "code": 500,
                                "status": false,
                                "error": "INTERNAL_SERVER_ERROR",
                                "message": "general (unknown) error"
                            }, null);
                        }
                    });
                }
                catch (e) {
                    return [2 /*return*/, process({
                            "code": 500,
                            "status": false,
                            "error": "INTERNAL_SERVER_ERROR",
                            "message": "general (unknown) error"
                        }, null)];
                }
                return [2 /*return*/];
            });
        });
    };
    return dalle;
}());
exports.dalle = dalle;
var prodia = /** @class */ (function () {
    function prodia() {
    }
    prodia.v1 = function (_a, process) {
        var _b = _a.prompt, prompt = _b === void 0 ? "" : _b, _c = _a.data, data = _c === void 0 ? {
            model: "absolutereality_V16.safetensors [37db0fc3]",
            steps: 25,
            cfg_scale: 7,
            sampler: "DPM++ 2M Karras",
            negative_prompt: ""
        } : _c;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_d) {
                try {
                    axios_1.default.post('https://nexra.aryahcr.cc/api/image/complements', {
                        prompt: prompt != undefined && prompt != null ? prompt : "",
                        model: "prodia",
                        data: {
                            model: data != undefined && data != null && data.model != undefined && data.model != null ? data.model : "absolutereality_V16.safetensors [37db0fc3]",
                            steps: data != undefined && data != null && data.steps != undefined && data.steps != null ? data.steps : 25,
                            cfg_scale: data != undefined && data != null && data.cfg_scale != undefined && data.cfg_scale != null ? data.cfg_scale : 7,
                            sampler: data != undefined && data != null && data.sampler != undefined && data.sampler != null ? data.sampler : "DPM++ 2M Karras",
                            negative_prompt: data != undefined && data != null && data.negative_prompt != undefined && data.negative_prompt != null ? data.negative_prompt : ""
                        }
                    }, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(function (response) {
                        if (response.status === 200) {
                            if ((typeof response.data).toString().toLowerCase() === "Object".toLowerCase()) {
                                if (response.data.code != undefined && response.data.code != null && response.data.code === 200 && response.data.status != undefined && response.data.status != null && response.data.status === true) {
                                    return process(null, response.data);
                                }
                                else {
                                    return process(response.data, null);
                                }
                            }
                            else {
                                var js = null;
                                var count = -1;
                                for (var i = 0; i < response.data.length; i++) {
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
                                    return process({
                                        "code": 500,
                                        "status": false,
                                        "error": "INTERNAL_SERVER_ERROR",
                                        "message": "general (unknown) error"
                                    }, null);
                                }
                                else {
                                    try {
                                        js = response.data.slice(count);
                                        js = JSON.parse(js);
                                        if (js != undefined && js != null && js.code != undefined && js.code != null && js.code === 200 && js.status != undefined && js.status != null && js.status === true) {
                                            return process(null, js);
                                        }
                                        else {
                                            return process(js, null);
                                        }
                                    }
                                    catch (e) {
                                        return process({
                                            "code": 500,
                                            "status": false,
                                            "error": "INTERNAL_SERVER_ERROR",
                                            "message": "general (unknown) error"
                                        }, null);
                                    }
                                }
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
                    }).catch(function (error) {
                        try {
                            if (error.response) {
                                return process(error.response.data, null);
                            }
                            else if (error.request) {
                                return process({
                                    "code": 404,
                                    "error": "NOT_FOUND",
                                    "message": "the service is currently unavailable"
                                }, null);
                            }
                            else {
                                return process({
                                    "code": 500,
                                    "status": false,
                                    "error": "INTERNAL_SERVER_ERROR",
                                    "message": "general (unknown) error"
                                }, null);
                            }
                        }
                        catch (e) {
                            return process({
                                "code": 500,
                                "status": false,
                                "error": "INTERNAL_SERVER_ERROR",
                                "message": "general (unknown) error"
                            }, null);
                        }
                    });
                }
                catch (e) {
                    return [2 /*return*/, process({
                            "code": 500,
                            "status": false,
                            "error": "INTERNAL_SERVER_ERROR",
                            "message": "general (unknown) error"
                        }, null)];
                }
                return [2 /*return*/];
            });
        });
    };
    prodia.stablediffusion = function (_a, process) {
        var _b = _a.prompt, prompt = _b === void 0 ? "" : _b, _c = _a.data, data = _c === void 0 ? {
            prompt_negative: "",
            model: "absolutereality_v181.safetensors [3d9d4d2b]",
            sampling_method: "DPM++ 2M Karras",
            sampling_steps: 25,
            width: 512,
            height: 512,
            cfg_scale: 7
        } : _c;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_d) {
                try {
                    axios_1.default.post('https://nexra.aryahcr.cc/api/image/complements', {
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
                    }, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(function (response) {
                        if (response.status === 200) {
                            if ((typeof response.data).toString().toLowerCase() === "Object".toLowerCase()) {
                                if (response.data.code != undefined && response.data.code != null && response.data.code === 200 && response.data.status != undefined && response.data.status != null && response.data.status === true) {
                                    return process(null, response.data);
                                }
                                else {
                                    return process(response.data, null);
                                }
                            }
                            else {
                                var js = null;
                                var count = -1;
                                for (var i = 0; i < response.data.length; i++) {
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
                                    return process({
                                        "code": 500,
                                        "status": false,
                                        "error": "INTERNAL_SERVER_ERROR",
                                        "message": "general (unknown) error"
                                    }, null);
                                }
                                else {
                                    try {
                                        js = response.data.slice(count);
                                        js = JSON.parse(js);
                                        if (js != undefined && js != null && js.code != undefined && js.code != null && js.code === 200 && js.status != undefined && js.status != null && js.status === true) {
                                            return process(null, js);
                                        }
                                        else {
                                            return process(js, null);
                                        }
                                    }
                                    catch (e) {
                                        return process({
                                            "code": 500,
                                            "status": false,
                                            "error": "INTERNAL_SERVER_ERROR",
                                            "message": "general (unknown) error"
                                        }, null);
                                    }
                                }
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
                    }).catch(function (error) {
                        try {
                            if (error.response) {
                                return process(error.response.data, null);
                            }
                            else if (error.request) {
                                return process({
                                    "code": 404,
                                    "error": "NOT_FOUND",
                                    "message": "the service is currently unavailable"
                                }, null);
                            }
                            else {
                                return process({
                                    "code": 500,
                                    "status": false,
                                    "error": "INTERNAL_SERVER_ERROR",
                                    "message": "general (unknown) error"
                                }, null);
                            }
                        }
                        catch (e) {
                            return process({
                                "code": 500,
                                "status": false,
                                "error": "INTERNAL_SERVER_ERROR",
                                "message": "general (unknown) error"
                            }, null);
                        }
                    });
                }
                catch (e) {
                    return [2 /*return*/, process({
                            "code": 500,
                            "status": false,
                            "error": "INTERNAL_SERVER_ERROR",
                            "message": "general (unknown) error"
                        }, null)];
                }
                return [2 /*return*/];
            });
        });
    };
    prodia.stablediffusion_xl = function (_a, process) {
        var _b = _a.prompt, prompt = _b === void 0 ? "" : _b, _c = _a.data, data = _c === void 0 ? {
            prompt_negative: "",
            model: "sd_xl_base_1.0.safetensors [be9edd61]",
            sampling_method: "DPM++ 2M Karras",
            sampling_steps: 25,
            width: 1024,
            height: 1024,
            cfg_scale: 7
        } : _c;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_d) {
                try {
                    axios_1.default.post('https://nexra.aryahcr.cc/api/image/complements', {
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
                    }, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(function (response) {
                        if (response.status === 200) {
                            if ((typeof response.data).toString().toLowerCase() === "Object".toLowerCase()) {
                                if (response.data.code != undefined && response.data.code != null && response.data.code === 200 && response.data.status != undefined && response.data.status != null && response.data.status === true) {
                                    return process(null, response.data);
                                }
                                else {
                                    return process(response.data, null);
                                }
                            }
                            else {
                                var js = null;
                                var count = -1;
                                for (var i = 0; i < response.data.length; i++) {
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
                                    return process({
                                        "code": 500,
                                        "status": false,
                                        "error": "INTERNAL_SERVER_ERROR",
                                        "message": "general (unknown) error"
                                    }, null);
                                }
                                else {
                                    try {
                                        js = response.data.slice(count);
                                        js = JSON.parse(js);
                                        if (js != undefined && js != null && js.code != undefined && js.code != null && js.code === 200 && js.status != undefined && js.status != null && js.status === true) {
                                            return process(null, js);
                                        }
                                        else {
                                            return process(js, null);
                                        }
                                    }
                                    catch (e) {
                                        return process({
                                            "code": 500,
                                            "status": false,
                                            "error": "INTERNAL_SERVER_ERROR",
                                            "message": "general (unknown) error"
                                        }, null);
                                    }
                                }
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
                    }).catch(function (error) {
                        try {
                            if (error.response) {
                                return process(error.response.data, null);
                            }
                            else if (error.request) {
                                return process({
                                    "code": 404,
                                    "error": "NOT_FOUND",
                                    "message": "the service is currently unavailable"
                                }, null);
                            }
                            else {
                                return process({
                                    "code": 500,
                                    "status": false,
                                    "error": "INTERNAL_SERVER_ERROR",
                                    "message": "general (unknown) error"
                                }, null);
                            }
                        }
                        catch (e) {
                            return process({
                                "code": 500,
                                "status": false,
                                "error": "INTERNAL_SERVER_ERROR",
                                "message": "general (unknown) error"
                            }, null);
                        }
                    });
                }
                catch (e) {
                    return [2 /*return*/, process({
                            "code": 500,
                            "status": false,
                            "error": "INTERNAL_SERVER_ERROR",
                            "message": "general (unknown) error"
                        }, null)];
                }
                return [2 /*return*/];
            });
        });
    };
    return prodia;
}());
exports.prodia = prodia;
var stablediffusion = /** @class */ (function () {
    function stablediffusion() {
    }
    stablediffusion.v1 = function (_a, process) {
        var _b = _a.prompt, prompt = _b === void 0 ? "" : _b;
        try {
            axios_1.default.post('https://nexra.aryahcr.cc/api/image/complements', {
                prompt: prompt != undefined && prompt != null ? prompt : "",
                model: "stablediffusion-1.5"
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (response) {
                if (response.status === 200) {
                    if ((typeof response.data).toString().toLowerCase() === "Object".toLowerCase()) {
                        if (response.data.code != undefined && response.data.code != null && response.data.code === 200 && response.data.status != undefined && response.data.status != null && response.data.status === true) {
                            return process(null, response.data);
                        }
                        else {
                            return process(response.data, null);
                        }
                    }
                    else {
                        var js = null;
                        var count = -1;
                        for (var i = 0; i < response.data.length; i++) {
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
                            return process({
                                "code": 500,
                                "status": false,
                                "error": "INTERNAL_SERVER_ERROR",
                                "message": "general (unknown) error"
                            }, null);
                        }
                        else {
                            try {
                                js = response.data.slice(count);
                                js = JSON.parse(js);
                                if (js != undefined && js != null && js.code != undefined && js.code != null && js.code === 200 && js.status != undefined && js.status != null && js.status === true) {
                                    return process(null, js);
                                }
                                else {
                                    return process(js, null);
                                }
                            }
                            catch (e) {
                                return process({
                                    "code": 500,
                                    "status": false,
                                    "error": "INTERNAL_SERVER_ERROR",
                                    "message": "general (unknown) error"
                                }, null);
                            }
                        }
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
            }).catch(function (error) {
                try {
                    if (error.response) {
                        return process(error.response.data, null);
                    }
                    else if (error.request) {
                        return process({
                            "code": 404,
                            "error": "NOT_FOUND",
                            "message": "the service is currently unavailable"
                        }, null);
                    }
                    else {
                        return process({
                            "code": 500,
                            "status": false,
                            "error": "INTERNAL_SERVER_ERROR",
                            "message": "general (unknown) error"
                        }, null);
                    }
                }
                catch (e) {
                    return process({
                        "code": 500,
                        "status": false,
                        "error": "INTERNAL_SERVER_ERROR",
                        "message": "general (unknown) error"
                    }, null);
                }
            });
        }
        catch (e) {
            return process({
                "code": 500,
                "status": false,
                "error": "INTERNAL_SERVER_ERROR",
                "message": "general (unknown) error"
            }, null);
        }
    };
    stablediffusion.v2 = function (_a, process) {
        var _b = _a.prompt, prompt = _b === void 0 ? "" : _b, _c = _a.data, data = _c === void 0 ? {
            prompt_negative: "",
            guidance_scale: 9
        } : _c;
        try {
            axios_1.default.post('https://nexra.aryahcr.cc/api/image/complements', {
                prompt: prompt != undefined && prompt != null ? prompt : "",
                model: "stablediffusion-2.1",
                data: {
                    prompt_negative: data != undefined && data != null && data.prompt_negative != undefined && data.prompt_negative != null ? data.prompt_negative : "",
                    guidance_scale: data != undefined && data != null && data.guidance_scale != undefined && data.guidance_scale != null ? data.guidance_scale : 9,
                }
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (response) {
                if (response.status === 200) {
                    if ((typeof response.data).toString().toLowerCase() === "Object".toLowerCase()) {
                        if (response.data.code != undefined && response.data.code != null && response.data.code === 200 && response.data.status != undefined && response.data.status != null && response.data.status === true) {
                            return process(null, response.data);
                        }
                        else {
                            return process(response.data, null);
                        }
                    }
                    else {
                        var js = null;
                        var count = -1;
                        for (var i = 0; i < response.data.length; i++) {
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
                            return process({
                                "code": 500,
                                "status": false,
                                "error": "INTERNAL_SERVER_ERROR",
                                "message": "general (unknown) error"
                            }, null);
                        }
                        else {
                            try {
                                js = response.data.slice(count);
                                js = JSON.parse(js);
                                if (js != undefined && js != null && js.code != undefined && js.code != null && js.code === 200 && js.status != undefined && js.status != null && js.status === true) {
                                    return process(null, js);
                                }
                                else {
                                    return process(js, null);
                                }
                            }
                            catch (e) {
                                return process({
                                    "code": 500,
                                    "status": false,
                                    "error": "INTERNAL_SERVER_ERROR",
                                    "message": "general (unknown) error"
                                }, null);
                            }
                        }
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
            }).catch(function (error) {
                try {
                    if (error.response) {
                        return process(error.response.data, null);
                    }
                    else if (error.request) {
                        return process({
                            "code": 404,
                            "error": "NOT_FOUND",
                            "message": "the service is currently unavailable"
                        }, null);
                    }
                    else {
                        return process({
                            "code": 500,
                            "status": false,
                            "error": "INTERNAL_SERVER_ERROR",
                            "message": "general (unknown) error"
                        }, null);
                    }
                }
                catch (e) {
                    return process({
                        "code": 500,
                        "status": false,
                        "error": "INTERNAL_SERVER_ERROR",
                        "message": "general (unknown) error"
                    }, null);
                }
            });
        }
        catch (e) {
            return process({
                "code": 500,
                "status": false,
                "error": "INTERNAL_SERVER_ERROR",
                "message": "general (unknown) error"
            }, null);
        }
    };
    stablediffusion.xl = function (_a, process) {
        var _b = _a.prompt, prompt = _b === void 0 ? "" : _b, _c = _a.data, data = _c === void 0 ? {
            prompt_negative: "",
            image_style: "(No style)",
            guidance_scale: 7.5
        } : _c;
        try {
            axios_1.default.post('https://nexra.aryahcr.cc/api/image/complements', {
                prompt: prompt != undefined && prompt != null ? prompt : "",
                model: "stablediffusion-xl",
                data: {
                    prompt_negative: data != undefined && data != null && data.prompt_negative != undefined && data.prompt_negative != null ? data.prompt_negative : "",
                    image_style: data != undefined && data != null && data.image_style != undefined && data.image_style != null ? data.image_style : "(No style)",
                    guidance_scale: data != undefined && data != null && data.guidance_scale != undefined && data.guidance_scale != null ? data.guidance_scale : 7.5,
                }
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (response) {
                if (response.status === 200) {
                    if ((typeof response.data).toString().toLowerCase() === "Object".toLowerCase()) {
                        if (response.data.code != undefined && response.data.code != null && response.data.code === 200 && response.data.status != undefined && response.data.status != null && response.data.status === true) {
                            return process(null, response.data);
                        }
                        else {
                            return process(response.data, null);
                        }
                    }
                    else {
                        var js = null;
                        var count = -1;
                        for (var i = 0; i < response.data.length; i++) {
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
                            return process({
                                "code": 500,
                                "status": false,
                                "error": "INTERNAL_SERVER_ERROR",
                                "message": "general (unknown) error"
                            }, null);
                        }
                        else {
                            try {
                                js = response.data.slice(count);
                                js = JSON.parse(js);
                                if (js != undefined && js != null && js.code != undefined && js.code != null && js.code === 200 && js.status != undefined && js.status != null && js.status === true) {
                                    return process(null, js);
                                }
                                else {
                                    return process(js, null);
                                }
                            }
                            catch (e) {
                                return process({
                                    "code": 500,
                                    "status": false,
                                    "error": "INTERNAL_SERVER_ERROR",
                                    "message": "general (unknown) error"
                                }, null);
                            }
                        }
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
            }).catch(function (error) {
                try {
                    if (error.response) {
                        return process(error.response.data, null);
                    }
                    else if (error.request) {
                        return process({
                            "code": 404,
                            "error": "NOT_FOUND",
                            "message": "the service is currently unavailable"
                        }, null);
                    }
                    else {
                        return process({
                            "code": 500,
                            "status": false,
                            "error": "INTERNAL_SERVER_ERROR",
                            "message": "general (unknown) error"
                        }, null);
                    }
                }
                catch (e) {
                    return process({
                        "code": 500,
                        "status": false,
                        "error": "INTERNAL_SERVER_ERROR",
                        "message": "general (unknown) error"
                    }, null);
                }
            });
        }
        catch (e) {
            return process({
                "code": 500,
                "status": false,
                "error": "INTERNAL_SERVER_ERROR",
                "message": "general (unknown) error"
            }, null);
        }
    };
    return stablediffusion;
}());
exports.stablediffusion = stablediffusion;
var emi = function (_a, process) {
    var _b = _a.prompt, prompt = _b === void 0 ? "" : _b;
    try {
        axios_1.default.post('https://nexra.aryahcr.cc/api/image/complements', {
            prompt: prompt != undefined && prompt != null ? prompt : "",
            model: "emi"
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            if (response.status === 200) {
                if ((typeof response.data).toString().toLowerCase() === "Object".toLowerCase()) {
                    if (response.data.code != undefined && response.data.code != null && response.data.code === 200 && response.data.status != undefined && response.data.status != null && response.data.status === true) {
                        return process(null, response.data);
                    }
                    else {
                        return process(response.data, null);
                    }
                }
                else {
                    var js = null;
                    var count = -1;
                    for (var i = 0; i < response.data.length; i++) {
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
                        return process({
                            "code": 500,
                            "status": false,
                            "error": "INTERNAL_SERVER_ERROR",
                            "message": "general (unknown) error"
                        }, null);
                    }
                    else {
                        try {
                            js = response.data.slice(count);
                            js = JSON.parse(js);
                            if (js != undefined && js != null && js.code != undefined && js.code != null && js.code === 200 && js.status != undefined && js.status != null && js.status === true) {
                                return process(null, js);
                            }
                            else {
                                return process(js, null);
                            }
                        }
                        catch (e) {
                            return process({
                                "code": 500,
                                "status": false,
                                "error": "INTERNAL_SERVER_ERROR",
                                "message": "general (unknown) error"
                            }, null);
                        }
                    }
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
        }).catch(function (error) {
            try {
                if (error.response) {
                    return process(error.response.data, null);
                }
                else if (error.request) {
                    return process({
                        "code": 404,
                        "error": "NOT_FOUND",
                        "message": "the service is currently unavailable"
                    }, null);
                }
                else {
                    return process({
                        "code": 500,
                        "status": false,
                        "error": "INTERNAL_SERVER_ERROR",
                        "message": "general (unknown) error"
                    }, null);
                }
            }
            catch (e) {
                return process({
                    "code": 500,
                    "status": false,
                    "error": "INTERNAL_SERVER_ERROR",
                    "message": "general (unknown) error"
                }, null);
            }
        });
    }
    catch (e) {
        return process({
            "code": 500,
            "status": false,
            "error": "INTERNAL_SERVER_ERROR",
            "message": "general (unknown) error"
        }, null);
    }
};
exports.emi = emi;
exports.default = {
    gpt: gpt,
    bing: bing,
    pixart: pixart,
    dalle: dalle,
    prodia: prodia,
    stablediffusion: stablediffusion,
    emi: emi
};
