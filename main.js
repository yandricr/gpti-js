"use strict";
/*
    Author: yandricr
    API: https://gpti.projectsrpp.repl.co/api
    Docs: https://gpti.projectsrpp.repl.co/
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.util = exports.prodia = exports.lexica = exports.dalle = exports.gpt = void 0;
var axios_1 = require("axios");
var api = "https://gpti.projectsrpp.repl.co/api";
var doc = "https://gpti.projectsrpp.repl.co/";
var gptmodel = [
    {
        "code": 1,
        "model": "gpt-4"
    },
    {
        "code": 2,
        "model": "gpt-4-0613"
    },
    {
        "code": 3,
        "model": "gpt-4-32k"
    },
    {
        "code": 4,
        "model": "gpt-4-0314"
    },
    {
        "code": 5,
        "model": "gpt-4-32k-0314"
    },
    {
        "code": 6,
        "model": "gpt-3.5-turbo"
    },
    {
        "code": 7,
        "model": "gpt-3.5-turbo-16k"
    },
    {
        "code": 8,
        "model": "gpt-3.5-turbo-0613"
    },
    {
        "code": 9,
        "model": "gpt-3.5-turbo-16k-0613"
    },
    {
        "code": 10,
        "model": "gpt-3.5-turbo-0301"
    },
    {
        "code": 11,
        "model": "text-davinci-003"
    },
    {
        "code": 12,
        "model": "text-davinci-002"
    },
    {
        "code": 13,
        "model": "code-davinci-002"
    },
    {
        "code": 14,
        "model": "gpt-3"
    },
    {
        "code": 15,
        "model": "text-curie-001"
    },
    {
        "code": 16,
        "model": "text-babbage-001"
    },
    {
        "code": 17,
        "model": "text-ada-001"
    },
    {
        "code": 18,
        "model": "davinci"
    },
    {
        "code": 19,
        "model": "curie"
    },
    {
        "code": 20,
        "model": "babbage"
    },
    {
        "code": 21,
        "model": "ada"
    },
    {
        "code": 22,
        "model": "babbage-002"
    },
    {
        "code": 23,
        "model": "davinci-002"
    }
];
var prodiaai = {
    model: [
        {
            "code": 1,
            "model": "absolutereality_V16.safetensors [37db0fc3]",
            "name": "Absolute Reality V1.6"
        },
        {
            "code": 2,
            "model": "absolutereality_v181.safetensors [3d9d4d2b]",
            "name": "Absolute Reality V1.8.1"
        },
        {
            "code": 3,
            "model": "analog-diffusion-1.0.ckpt [9ca13f02]",
            "name": "Analog V1"
        },
        {
            "code": 4,
            "model": "anythingv3_0-pruned.ckpt [2700c435]",
            "name": "Anything V3"
        },
        {
            "code": 5,
            "model": "anything-v4.5-pruned.ckpt [65745d25]",
            "name": "Anything V4.5"
        },
        {
            "code": 6,
            "model": "anythingV5_PrtRE.safetensors [893e49b9]",
            "name": "Anything V5"
        },
        {
            "code": 7,
            "model": "AOM3A3_orangemixs.safetensors [9600da17]",
            "name": "AbyssOrangeMix V3"
        },
        {
            "code": 8,
            "model": "deliberate_v2.safetensors [10ec4b29]",
            "name": "Deliberate V2"
        },
        {
            "code": 9,
            "model": "dreamlike-diffusion-1.0.safetensors [5c9fd6e0]",
            "name": "Dreamlike Diffusion V1"
        },
        {
            "code": 10,
            "model": "dreamlike-photoreal-2.0.safetensors [fdcf65e7]",
            "name": "Dreamlike Photoreal V2"
        },
        {
            "code": 11,
            "model": "dreamshaper_6BakedVae.safetensors [114c8abb]",
            "name": "Dreamshaper 6 baked vae"
        },
        {
            "code": 12,
            "model": "dreamshaper_7.safetensors [5cf5ae06]",
            "name": "Dreamshaper 7"
        },
        {
            "code": 13,
            "model": "dreamshaper_8.safetensors [9d40847d]",
            "name": "Dreamshaper 8"
        },
        {
            "code": 14,
            "model": "EimisAnimeDiffusion_V1.ckpt [4f828a15]",
            "name": "Eimis Anime Diffusion V1.0"
        },
        {
            "code": 15,
            "model": "elldreths-vivid-mix.safetensors [342d9d26]",
            "name": "Elldreth's Vivid"
        },
        {
            "code": 16,
            "model": "lyriel_v16.safetensors [68fceea2]",
            "name": "Lyriel V1.6"
        },
        {
            "code": 17,
            "model": "mechamix_v10.safetensors [ee685731]",
            "name": "MechaMix V1.0"
        },
        {
            "code": 18,
            "model": "meinamix_meinaV9.safetensors [2ec66ab0]",
            "name": "MeinaMix Meina V9"
        },
        {
            "code": 19,
            "model": "meinamix_meinaV11.safetensors [b56ce717]",
            "name": "MeinaMix Meina V11"
        },
        {
            "code": 20,
            "model": "openjourney_V4.ckpt [ca2f377f]",
            "name": "Openjourney V4"
        },
        {
            "code": 21,
            "model": "portraitplus_V1.0.safetensors [1400e684]",
            "name": "Portrait+ V1"
        },
        {
            "code": 22,
            "model": "Realistic_Vision_V1.4-pruned-fp16.safetensors [8d21810b]",
            "name": "Realistic Vision V1.4"
        },
        {
            "code": 23,
            "model": "Realistic_Vision_V2.0.safetensors [79587710]",
            "name": "Realistic Vision V2.0"
        },
        {
            "code": 24,
            "model": "Realistic_Vision_V4.0.safetensors [29a7afaa]",
            "name": "Realistic Vision V4.0"
        },
        {
            "code": 25,
            "model": "Realistic_Vision_V5.0.safetensors [614d1063]",
            "name": "Realistic Vision V5.0"
        },
        {
            "code": 26,
            "model": "redshift_diffusion-V10.safetensors [1400e684]",
            "name": "Redshift Diffusion V1.0"
        },
        {
            "code": 27,
            "model": "revAnimated_v122.safetensors [3f4fefd9]",
            "name": "ReV Animated V1.2.2"
        },
        {
            "code": 28,
            "model": "sdv1_4.ckpt [7460a6fa]",
            "name": "SD V1.4"
        },
        {
            "code": 29,
            "model": "v1-5-pruned-emaonly.safetensors [d7049739]",
            "name": "SD V1.5"
        },
        {
            "code": 30,
            "model": "shoninsBeautiful_v10.safetensors [25d8c546]",
            "name": "Shonin's Beautiful People V1.0"
        },
        {
            "code": 31,
            "model": "theallys-mix-ii-churned.safetensors [5d9225a4]",
            "name": "TheAlly's Mix II"
        },
        {
            "code": 32,
            "model": "timeless-1.0.ckpt [7c4971d4]",
            "name": "Timeless V1"
        }
    ],
    sampler: [
        {
            "code": 1,
            "sampler": "Euler"
        },
        {
            "code": 2,
            "sampler": "Euler a"
        },
        {
            "code": 3,
            "sampler": "Heun"
        },
        {
            "code": 4,
            "sampler": "DPM++ 2M Karras"
        },
        {
            "code": 5,
            "sampler": "DPM++ SDE Karras"
        },
        {
            "code": 6,
            "sampler": "DDIM"
        }
    ]
};
var gpt = function (_a, proc) {
    var _b = _a.prompt, prompt = _b === void 0 ? "" : _b, _c = _a.model, model = _c === void 0 ? "" : _c, _d = _a.type, type = _d === void 0 ? "json" : _d;
    var md = {
        code: null,
        model: null
    };
    gptmodel.forEach(function (e) {
        if (md["model"] === null && md["code"] === null) {
            if ("NaN".toLowerCase() != Number(model).toString().toLowerCase()) {
                if (e["code"] === Number(model)) {
                    md["model"] = e["model"];
                    md["code"] = Number(e["code"]);
                }
            }
            else {
                if (e["model"].toString().toLowerCase() === model.toString().toLowerCase()) {
                    md["model"] = e["model"];
                    md["code"] = Number(e["code"]);
                }
            }
        }
    });
    try {
        axios_1.default.post("".concat(api, "/gpti"), {
            prompt: (prompt != undefined ? prompt.toString() : ""),
            model: md["code"] != null ? Number(md["code"]) : "-1",
            type: type != undefined ? type.toString().toLowerCase() != "text" ? type.toString() : "" : ""
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (response) {
            if (response.status === 200 && response["data"]["status"] != undefined && response["data"]["status"] === true) {
                var sgpt = response["data"];
                return proc(null, sgpt);
            }
            else {
                var egpt = {
                    api: "gpti",
                    code: 400,
                    status: false,
                    message: "error",
                    doc: doc
                };
                var sgpt = {
                    api: "gpti",
                    code: 400,
                    status: false,
                    model: {
                        code: (Number(md["code"]).toString().toLowerCase() != "NaN".toLowerCase() ? Number(md["code"]) : null),
                        type: md["model"]
                    },
                    gpt: null
                };
                return proc(egpt, sgpt);
            }
        }).catch(function (e) {
            var egpt = {
                api: "gpti",
                code: 400,
                status: false,
                message: "error",
                doc: doc
            };
            var sgpt = {
                api: "gpti",
                code: 400,
                status: false,
                model: {
                    code: (Number(md["code"]).toString().toLowerCase() != "NaN".toLowerCase() ? Number(md["code"]) : null),
                    type: md["model"]
                },
                gpt: null
            };
            return proc(egpt, sgpt);
        });
    }
    catch (e) {
        var egpt = {
            api: "gpti",
            code: 400,
            status: false,
            message: "error",
            doc: doc
        };
        var sgpt = {
            api: "gpti",
            code: 400,
            status: false,
            model: {
                code: (Number(md["code"]).toString().toLowerCase() != "NaN".toLowerCase() ? Number(md["code"]) : null),
                type: md["model"]
            },
            gpt: null
        };
        return proc(egpt, sgpt);
    }
};
exports.gpt = gpt;
var dalle = function (_a, proc) {
    var _b = _a.prompt, prompt = _b === void 0 ? "" : _b, _c = _a.type, type = _c === void 0 ? "json" : _c;
    try {
        axios_1.default.post("".concat(api, "/dalleai"), {
            prompt: (prompt != undefined && prompt.toString().trim().length > 0 ? prompt.toString() : undefined),
            type: type != undefined && type.toString().toLowerCase() === "text" ? "" : ""
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then((function (response) {
            if (response.status === 200 && response["data"]["status"] != undefined && response["data"]["status"] === true) {
                var ddalle = response["data"];
                return proc(null, ddalle);
            }
            else {
                var edalle = {
                    api: "dalleai",
                    code: 400,
                    status: false,
                    message: "error",
                    doc: doc
                };
                var ddalle = {
                    "api": "dalleai",
                    "code": 400,
                    "status": false,
                    "prompt": (prompt != undefined && prompt.toString().trim().length > 0 ? prompt.toString() : null),
                    "ul": null
                };
                return proc(edalle, ddalle);
            }
        })).catch(function (err) {
            var edalle = {
                api: "dalleai",
                code: 400,
                status: false,
                message: "error",
                doc: doc
            };
            var ddalle = {
                "api": "dalleai",
                "code": 400,
                "status": false,
                "prompt": (prompt != undefined && prompt.toString().trim().length > 0 ? prompt.toString() : null),
                "ul": null
            };
            return proc(edalle, ddalle);
        });
    }
    catch (e) {
        var edalle = {
            api: "dalleai",
            code: 400,
            status: false,
            message: "error",
            doc: doc
        };
        var ddalle = {
            "api": "dalleai",
            "code": 400,
            "status": false,
            "prompt": (prompt != undefined && prompt.toString().trim().length > 0 ? prompt.toString() : null),
            "ul": null
        };
        return proc(edalle, ddalle);
    }
};
exports.dalle = dalle;
var lexica = function (_a, proc) {
    var _b = _a.prompt, prompt = _b === void 0 ? "" : _b, _c = _a.type, type = _c === void 0 ? "json" : _c;
    try {
        axios_1.default.post("".concat(api, "/lexicaai"), {
            prompt: (prompt != undefined ? prompt.toString() : ""),
            type: type != undefined && type.toString().toLowerCase() === "text" ? "" : ""
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (response) {
            if (response.status === 200 && response["data"]["status"] != undefined && response["data"]["status"] == true) {
                var slexica = response["data"];
                return proc(null, slexica);
            }
            else {
                var elexica = {
                    api: "lexicaai",
                    code: 400,
                    status: false,
                    message: "error",
                    doc: doc
                };
                var slexica = {
                    "api": "lexicaai",
                    "code": 400,
                    "status": false,
                    "prompt": (prompt != undefined && prompt.toString().trim().length > 0 ? prompt.toString() : null),
                    "images": null
                };
                return proc(elexica, slexica);
            }
        }).catch(function (err) {
            var elexica = {
                api: "lexicaai",
                code: 400,
                status: false,
                message: "error",
                doc: doc
            };
            var slexica = {
                "api": "lexicaai",
                "code": 400,
                "status": false,
                "prompt": (prompt != undefined && prompt.toString().trim().length > 0 ? prompt.toString() : null),
                "images": null
            };
            return proc(elexica, slexica);
        });
    }
    catch (e) {
        var elexica = {
            api: "lexicaai",
            code: 400,
            status: false,
            message: "error",
            doc: doc
        };
        var slexica = {
            "api": "lexicaai",
            "code": 400,
            "status": false,
            "prompt": (prompt != undefined && prompt.toString().trim().length > 0 ? prompt.toString() : null),
            "images": null
        };
        return proc(elexica, slexica);
    }
};
exports.lexica = lexica;
var prodia = function (_a, proc) {
    var _b = _a.prompt, prompt = _b === void 0 ? "" : _b, _c = _a.model, model = _c === void 0 ? "" : _c, _d = _a.sampler, sampler = _d === void 0 ? "" : _d, _e = _a.steps, steps = _e === void 0 ? Number() : _e, _f = _a.cfg_scale, cfg_scale = _f === void 0 ? Number() : _f, _g = _a.negative_prompt, negative_prompt = _g === void 0 ? "" : _g, _h = _a.type, type = _h === void 0 ? "json" : _h;
    var md = {
        model: {
            code: null,
            type: null,
            name: null,
        },
        sampler: {
            code: null,
            type: null,
        },
        steps: null,
        cfg_scale: null
    };
    prodiaai["model"].forEach(function (e) {
        if (md["model"]["code"] === null && md["model"]["type"] === null && md["model"]["name"] === null) {
            if ("NaN".toLowerCase() != Number(model).toString().toLowerCase()) {
                if (e["code"] === Number(model)) {
                    md["model"]["code"] = Number(e["code"]);
                    md["model"]["type"] = e["model"];
                    md["model"]["name"] = e["name"];
                }
            }
            else {
                if (e["model"].toString().toLowerCase() === model.toString().toLowerCase()) {
                    md["model"]["code"] = Number(e["code"]);
                    md["model"]["type"] = e["model"];
                    md["model"]["name"] = e["name"];
                }
            }
        }
    });
    prodiaai["sampler"].forEach(function (e) {
        if (md["sampler"]["code"] === null && md["sampler"]["type"] === null) {
            if ("NaN".toLowerCase() != Number(sampler).toString().toLowerCase()) {
                if (e["code"] === Number(model)) {
                    md["sampler"]["code"] = Number(e["code"]);
                    md["sampler"]["type"] = e["sampler"];
                }
            }
            else {
                if (e["sampler"].toString().toLowerCase() === sampler.toString().toLowerCase()) {
                    md["sampler"]["code"] = Number(e["code"]);
                    md["sampler"]["type"] = e["sampler"];
                }
            }
        }
    });
    if (steps > 0 && steps <= 30) {
        md["steps"] = Number(steps);
    }
    else {
        md["steps"] = null;
    }
    if (cfg_scale >= 0 && cfg_scale <= 20) {
        md["cfg_scale"] = Number(cfg_scale);
    }
    else {
        md["cfg_scale"] = null;
    }
    try {
        axios_1.default.post("".concat(api, "/prodiaai"), {
            prompt: (prompt != undefined && prompt.toString().trim().length > 0 ? prompt.toString() : ""),
            model: (md["model"]["code"] != null ? md["model"]["code"] : -1),
            sampler: (md["sampler"]["code"] != null ? md["sampler"]["code"] : -1),
            steps: md["steps"],
            cfg_scale: md["cfg_scale"],
            negative_prompt: (negative_prompt != undefined && negative_prompt.toString().trim().length > 0 ? negative_prompt.toString() : ""),
            type: (type != undefined && type.toString().toLowerCase() === "text" ? "" : ""),
        }).then(function (response) {
            if (response.status === 200 && response["data"]["status"] != undefined && response["data"]["status"] === true) {
                var sprodia = response["data"];
                return proc(null, sprodia);
            }
            else {
                var eprodia = {
                    api: "prodiaai",
                    code: 400,
                    status: false,
                    message: "error",
                    doc: doc
                };
                var sprodia = {
                    "api": "prodiaai",
                    "code": 400,
                    "status": false,
                    "model": {
                        "model": {
                            "code": (md["model"]["code"] != null ? Number(md["model"]["code"]) : null),
                            "type": md["model"]["type"],
                            "name": md["model"]["name"]
                        },
                        "sampler": {
                            "code": 1,
                            "type": "Euler"
                        },
                        "steps": md["steps"],
                        "cfg_scale": md["cfg_scale"],
                        "prompt": (prompt != undefined && prompt.toString().trim().length > 0 ? prompt.toString() : ""),
                        "negative_prompt": ""
                    },
                    "ul": null
                };
                return proc(eprodia, sprodia);
            }
        }).catch(function (err) {
            var eprodia = {
                api: "prodiaai",
                code: 400,
                status: false,
                message: "error",
                doc: doc
            };
            var sprodia = {
                "api": "prodiaai",
                "code": 400,
                "status": false,
                "model": {
                    "model": {
                        "code": (md["model"]["code"] != null ? Number(md["model"]["code"]) : null),
                        "type": md["model"]["type"],
                        "name": md["model"]["name"]
                    },
                    "sampler": {
                        "code": 1,
                        "type": "Euler"
                    },
                    "steps": md["steps"],
                    "cfg_scale": md["cfg_scale"],
                    "prompt": (prompt != undefined && prompt.toString().trim().length > 0 ? prompt.toString() : ""),
                    "negative_prompt": ""
                },
                "ul": null
            };
            return proc(eprodia, sprodia);
        });
    }
    catch (e) {
        var eprodia = {
            api: "prodiaai",
            code: 400,
            status: false,
            message: "error",
            doc: doc
        };
        var sprodia = {
            "api": "prodiaai",
            "code": 400,
            "status": false,
            "model": {
                "model": {
                    "code": (md["model"]["code"] != null ? Number(md["model"]["code"]) : null),
                    "type": md["model"]["type"],
                    "name": md["model"]["name"]
                },
                "sampler": {
                    "code": 1,
                    "type": "Euler"
                },
                "steps": md["steps"],
                "cfg_scale": md["cfg_scale"],
                "prompt": (prompt != undefined && prompt.toString().trim().length > 0 ? prompt.toString() : ""),
                "negative_prompt": ""
            },
            "ul": null
        };
        return proc(eprodia, sprodia);
    }
};
exports.prodia = prodia;
var util = {
    gptModel: function () {
        return gptmodel;
    },
    prodiaModel: function () {
        return prodiaai["model"];
    },
    prodiaSampler: function () {
        return prodiaai["sampler"];
    }
};
exports.util = util;
exports.default = {
    gpt: gpt,
    dalle: dalle,
    lexica: lexica,
    prodia: prodia,
    util: util
};
