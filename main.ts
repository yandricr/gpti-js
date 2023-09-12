/*
    Author: yandricr
    API: https://gpti.projectsrpp.repl.co/api
    Docs: https://gpti.projectsrpp.repl.co/
*/

import axios from "axios";

const api = "https://gpti.projectsrpp.repl.co/api";
const doc = "https://gpti.projectsrpp.repl.co/";

const gptmodel = [
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

const prodiaai = {
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
}

type gptiopt = {
    prompt: string;
    model: "" | "gpt-4" | "gpt-4-0613" | "gpt-4-32k" | "gpt-4-0314" | "gpt-4-32k-0314" | "gpt-3.5-turbo" | "gpt-3.5-turbo-16k" | "gpt-3.5-turbo-0613" | "gpt-3.5-turbo-16k-0613" | "gpt-3.5-turbo-0301" | "text-davinci-003" | "text-davinci-002" | "code-davinci-002" | "gpt-3" | "text-curie-001" | "text-babbage-001" | "text-ada-001" | "davinci" | "curie" | "babbage" | "ada" | "babbage-002" | "davinci-002";
    type?: "json" | "markdown"
}

type gpt_ = {
    api: string;
    code: 200 | 400;
    status: true | false;
    model: {
        code: number | null;
        type: string | null
    };
    gpt: string | null;
}

type gptErr = {
    api: string;
    code: 400;
    status: false;
    message: string,
    doc: string
}

type dalleopt = {
    prompt: string,
    type?: "json"
}

type dalle_ = {
    "api": "dalleai",
    "code": 200 | 400,
    "status": true | false,
    "prompt": string | null,
    "ul": string | null
}

type dalleErr = {
    api: string;
    code: 400;
    status: false;
    message: string;
    doc: string
}

type lexicaopt = {
    prompt: string;
    type?: "json"
}

type lexicaErr = {
    api: string;
    code: 400;
    status: false;
    message: string;
    doc: string
}

type lexImage = {
    ul: string
}

type lexica_ = {
    api: "lexicaai";
    code: 200 | 400;
    status: true | false;
    prompt: string | null;
    images: lexImage[] | null;
}

type prodiaopt = {
    prompt: string;
    model: "" | "absolutereality_V16.safetensors [37db0fc3]" | "absolutereality_v181.safetensors [3d9d4d2b]" | "analog-diffusion-1.0.ckpt [9ca13f02]" | "anythingv3_0-pruned.ckpt [2700c435]" | "anything-v4.5-pruned.ckpt [65745d25]" | "anythingV5_PrtRE.safetensors [893e49b9]" | "AOM3A3_orangemixs.safetensors [9600da17]" | "deliberate_v2.safetensors [10ec4b29]" | "dreamlike-diffusion-1.0.safetensors [5c9fd6e0]" | "dreamlike-photoreal-2.0.safetensors [fdcf65e7]" | "dreamshaper_6BakedVae.safetensors [114c8abb]" | "dreamshaper_7.safetensors [5cf5ae06]" | "dreamshaper_8.safetensors [9d40847d]" | "EimisAnimeDiffusion_V1.ckpt [4f828a15]" | "elldreths-vivid-mix.safetensors [342d9d26]" | "lyriel_v16.safetensors [68fceea2]" | "mechamix_v10.safetensors [ee685731]" | "meinamix_meinaV9.safetensors [2ec66ab0]" | "meinamix_meinaV11.safetensors [b56ce717]" | "openjourney_V4.ckpt [ca2f377f]" | "portraitplus_V1.0.safetensors [1400e684]" | "Realistic_Vision_V1.4-pruned-fp16.safetensors [8d21810b]" | "Realistic_Vision_V2.0.safetensors [79587710]" | "Realistic_Vision_V4.0.safetensors [29a7afaa]" | "Realistic_Vision_V5.0.safetensors [614d1063]" | "redshift_diffusion-V10.safetensors [1400e684]" | "revAnimated_v122.safetensors [3f4fefd9]" | "sdv1_4.ckpt [7460a6fa]" | "v1-5-pruned-emaonly.safetensors [d7049739]" | "shoninsBeautiful_v10.safetensors [25d8c546]" | "theallys-mix-ii-churned.safetensors [5d9225a4]" | "timeless-1.0.ckpt [7c4971d4]",
    sampler: "" | "Euler" | "Euler a" | "Heun" | "DPM++ 2M Karras" | "DPM++ SDE Karras" | "DDIM",
    steps: number,
    cfg_scale: number,
    negative_prompt?: string,
    type?: "json"
}

type prodiaErr = {
    api: string;
    code: 400;
    status: false;
    message: string;
    doc: string
}

type prodia_ = {
    api: "prodiaai";
    code: 200 | 400;
    status: true | false;
    model: {
        model: {
            code: number | null;
            type: string | null;
            name: string | null;
        },
        sampler: {
            code: number | null;
            type: string | null;
        },
        steps: number | null;
        cfg_scale: number | null;
        prompt: string | null;
        negative_prompt: string | null;
    };
    ul: string | null;
}

const gpt = ({
    prompt = "",
    model = "",
    type = "json",
}: gptiopt, proc: (err: gptErr | null,  data: gpt_) => void) => {
    type mddata = {
        code: Number | null;
        model: string | null
    }

    let md: mddata = {
        code: null,
        model: null
    }

    gptmodel.forEach(e => {
        if(md["model"] === null && md["code"] === null){
            if("NaN".toLowerCase() != Number(model).toString().toLowerCase()){
                if(e["code"] === Number(model)){
                    md["model"] = e["model"];
                    md["code"] = Number(e["code"]);
                }
            } else {
                if(e["model"].toString().toLowerCase() === model.toString().toLowerCase()){
                    md["model"] = e["model"];
                    md["code"] = Number(e["code"]);
                }
            }
        }
    });

    try {
        axios.post(`${api}/gpti`, {
            prompt: (prompt != undefined ? prompt.toString() : ""),
            model: md["code"] != null ? Number(md["code"]) : "-1",
            type: type != undefined ? type.toString().toLowerCase() != "text" ? type.toString() : "" : ""
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            if(response.status === 200 && response["data"]["status"] != undefined && response["data"]["status"] === true){
                const sgpt: gpt_ = response["data"];
                return proc(null, sgpt);
            } else {
                const egpt: gptErr = {
                    api: "gpti",
                    code: 400,
                    status: false,
                    message: "error",
                    doc: doc
                };
                
                const sgpt: gpt_ = {
                    api: "gpti",
                    code: 400,
                    status: false,
                    model: {
                        code: (Number(md["code"]).toString().toLowerCase() != "NaN".toLowerCase() ? Number(md["code"]) : null),
                        type: md["model"]
                    },
                    gpt: null
                }

                return proc(egpt, sgpt);
            }
        }).catch((e) => {
            const egpt: gptErr = {
                api: "gpti",
                code: 400,
                status: false,
                message: "error",
                doc: doc
            };
            
            const sgpt: gpt_ = {
                api: "gpti",
                code: 400,
                status: false,
                model: {
                    code: (Number(md["code"]).toString().toLowerCase() != "NaN".toLowerCase() ? Number(md["code"]) : null),
                    type: md["model"]
                },
                gpt: null
            }

            return proc(egpt, sgpt);
        });
    } catch(e){
        const egpt: gptErr = {
            api: "gpti",
            code: 400,
            status: false,
            message: "error",
            doc: doc
        };
        
        const sgpt: gpt_ = {
            api: "gpti",
            code: 400,
            status: false,
            model: {
                code: (Number(md["code"]).toString().toLowerCase() != "NaN".toLowerCase() ? Number(md["code"]) : null),
                type: md["model"]
            },
            gpt: null
        }

        return proc(egpt, sgpt);
    }
};

const dalle = ({
    prompt = "",
    type = "json"
}: dalleopt, proc: (err: dalleErr | null, data: dalle_) => void) => {
    try {
        axios.post(`${api}/dalleai`, {
            prompt: (prompt != undefined && prompt.toString().trim().length > 0 ? prompt.toString() : undefined),
            type: type != undefined && type.toString().toLowerCase() === "text" ? ""  : ""
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response => {
            if(response.status === 200 && response["data"]["status"] != undefined && response["data"]["status"] === true){
                const ddalle: dalle_ = response["data"];
                return proc(null, ddalle);
            } else {
                const edalle: dalleErr = {
                    api: "dalleai",
                    code: 400,
                    status: false,
                    message: "error",
                    doc: doc
                };
        
                const ddalle: dalle_ = {
                    "api": "dalleai",
                    "code": 400,
                    "status": false,
                    "prompt": (prompt != undefined && prompt.toString().trim().length > 0 ? prompt.toString() : null),
                    "ul": null
                };
        
                return proc(edalle, ddalle);
            }
        })).catch((err) => {
            const edalle: dalleErr = {
                api: "dalleai",
                code: 400,
                status: false,
                message: "error",
                doc: doc
            };
    
            const ddalle: dalle_ = {
                "api": "dalleai",
                "code": 400,
                "status": false,
                "prompt": (prompt != undefined && prompt.toString().trim().length > 0 ? prompt.toString() : null),
                "ul": null
            };
    
            return proc(edalle, ddalle);
        });
    } catch(e){
        const edalle: dalleErr = {
            api: "dalleai",
            code: 400,
            status: false,
            message: "error",
            doc: doc
        };

        const ddalle: dalle_ = {
            "api": "dalleai",
            "code": 400,
            "status": false,
            "prompt": (prompt != undefined && prompt.toString().trim().length > 0 ? prompt.toString() : null),
            "ul": null
        };

        return proc(edalle, ddalle);
    }
}

const lexica = ({
    prompt = "",
    type = "json"
}: lexicaopt, proc: (err: lexicaErr | null, data: lexica_) => void) => {
    try {
        axios.post(`${api}/lexicaai`, {
            prompt: (prompt != undefined ? prompt.toString() : ""),
            type: type != undefined && type.toString().toLowerCase() === "text" ? ""  : ""
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            if(response.status === 200 && response["data"]["status"] != undefined && response["data"]["status"] == true){
                const slexica: lexica_ = response["data"];
                return proc(null, slexica);
            } else {
                const elexica: lexicaErr = {
                    api: "lexicaai",
                    code: 400,
                    status: false,
                    message: "error",
                    doc: doc
                };
        
                const slexica: lexica_ = {
                    "api": "lexicaai",
                    "code": 400,
                    "status": false,
                    "prompt": (prompt != undefined && prompt.toString().trim().length > 0 ? prompt.toString() : null),
                    "images": null
                };
        
                return proc(elexica, slexica);
            }
        }).catch((err) => {
            const elexica: lexicaErr = {
                api: "lexicaai",
                code: 400,
                status: false,
                message: "error",
                doc: doc
            };

            const slexica: lexica_ = {
                "api": "lexicaai",
                "code": 400,
                "status": false,
                "prompt": (prompt != undefined && prompt.toString().trim().length > 0 ? prompt.toString() : null),
                "images": null
            };

            return proc(elexica, slexica);
        });
    } catch(e){
        const elexica: lexicaErr = {
            api: "lexicaai",
            code: 400,
            status: false,
            message: "error",
            doc: doc
        };

        const slexica: lexica_ = {
            "api": "lexicaai",
            "code": 400,
            "status": false,
            "prompt": (prompt != undefined && prompt.toString().trim().length > 0 ? prompt.toString() : null),
            "images": null
        };

        return proc(elexica, slexica);
    }
}

const prodia = ({
    prompt = "",
    model = "",
    sampler = "",
    steps = Number(),
    cfg_scale = Number(),
    negative_prompt = "",
    type = "json",
}: prodiaopt, proc: (err: prodiaErr | null, data: prodia_) => void) => {
    type mddata = {
        model: {
            code: Number | null;
            type: string | null;
            name: string | null;
        };
        sampler: {
            code: Number | null;
            type: string | null;
        };
        steps: number | null;
        cfg_scale: number | null;
    }

    let md: mddata = {
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
    }

    prodiaai["model"].forEach(e => {
        if(md["model"]["code"] === null && md["model"]["type"] === null && md["model"]["name"] === null){
            if("NaN".toLowerCase() != Number(model).toString().toLowerCase()){
                if(e["code"] === Number(model)){
                    md["model"]["code"] = Number(e["code"]);
                    md["model"]["type"] = e["model"];
                    md["model"]["name"] = e["name"];
                }
            } else {
                if(e["model"].toString().toLowerCase() === model.toString().toLowerCase()){
                    md["model"]["code"] = Number(e["code"]);
                    md["model"]["type"] = e["model"];
                    md["model"]["name"] = e["name"];
                }
            }
        }
    });

    prodiaai["sampler"].forEach(e => {
        if(md["sampler"]["code"] === null && md["sampler"]["type"] === null){
            if("NaN".toLowerCase() != Number(sampler).toString().toLowerCase()){
                if(e["code"] === Number(model)){
                    md["sampler"]["code"] = Number(e["code"]);
                    md["sampler"]["type"] = e["sampler"];
                }
            } else {
                if(e["sampler"].toString().toLowerCase() === sampler.toString().toLowerCase()){
                    md["sampler"]["code"] = Number(e["code"]);
                    md["sampler"]["type"] = e["sampler"];
                }
            }
        }
    });

    if(steps > 0 && steps <= 30){
        md["steps"] = Number(steps);
    } else {
        md["steps"] = null;
    }

    if(cfg_scale >= 0 && cfg_scale <= 20){
        md["cfg_scale"] = Number(cfg_scale);
    } else {
        md["cfg_scale"] = null;
    }

    try {
        axios.post(`${api}/prodiaai`, {
            prompt: (prompt != undefined && prompt.toString().trim().length > 0 ? prompt.toString() : ""),
            model: (md["model"]["code"] != null ? md["model"]["code"] : -1),
            sampler: (md["sampler"]["code"] != null ? md["sampler"]["code"] : -1),
            steps: md["steps"],
            cfg_scale: md["cfg_scale"],
            negative_prompt: (negative_prompt != undefined && negative_prompt.toString().trim().length > 0 ? negative_prompt.toString() : ""),
            type: (type != undefined && type.toString().toLowerCase() === "text" ? "" : ""),
        }).then((response) => {
            if(response.status === 200 && response["data"]["status"] != undefined && response["data"]["status"] === true){
                const sprodia: prodia_ = response["data"];
                return proc(null, sprodia);
            } else {
                const eprodia: prodiaErr = {
                    api: "prodiaai",
                    code: 400,
                    status: false,
                    message: "error",
                    doc: doc
                };
        
                const sprodia: prodia_ = {
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
        }).catch((err) => {
            const eprodia: prodiaErr = {
                api: "prodiaai",
                code: 400,
                status: false,
                message: "error",
                doc: doc
            };
    
            const sprodia: prodia_ = {
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
    } catch(e){
        const eprodia: prodiaErr = {
            api: "prodiaai",
            code: 400,
            status: false,
            message: "error",
            doc: doc
        };

        const sprodia: prodia_ = {
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
}

const util = {
    gptModel: () => {
        return gptmodel;
    },
    prodiaModel: () => {
        return prodiaai["model"];
    },
    prodiaSampler: () => {
        return prodiaai["sampler"];
    }
}

export {
    gpt,
    dalle,
    lexica,
    prodia,
    util
}

export default {
    gpt,
    dalle,
    lexica,
    prodia,
    util
}