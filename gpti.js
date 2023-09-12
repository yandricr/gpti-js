/*
    Author: yandricr
    API: https://gpti.projectsrpp.repl.co/api
    Docs: https://gpti.projectsrpp.repl.co/
*/

const gpti = {
    gpt: ({
       prompt = "",
       model = "",
       type = "json",
    }, proc = (err, data)) => {
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

        const error = {
            "api": "gpti",
            "code": 400,
            "status": false,
            "message": "error",
            "doc": "https://gpti.projectsrpp.repl.co"
        }

        var md = {
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

        const url = "https://gpti.projectsrpp.repl.co/api/gpti";
        const js = {
            prompt: (prompt != undefined ? prompt.toString() : ""),
            model: (md["code"] != null ? md["code"] : "-1"),
            type: (type != undefined ? type.toString().toLowerCase() === "text" ? "json" : type.toString() : "")
        };

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(js)
        })
        .then(response => response.json())
        .then(json => {
            if(json != undefined && json["status"] != undefined && json["status"] === true){
                return proc(null, json);
            } else {
                return proc(error, null);
            }
        })
        .catch(error => {
            return proc(error, null);
        });
    },
    dalle: ({
        prompt = "",
        type = "json"
    }, proc = (err, data)) => {
        const error = {
            "api": "dalleai",
            "code": 400,
            "status": false,
            "message": "error",
            "doc": "https://gpti.projectsrpp.repl.co"
        }

        const url = "https://gpti.projectsrpp.repl.co/api/dalleai";
        const js = {
            prompt: (prompt != undefined && prompt.toString().trim().length > 0 ? prompt.toString() : undefined),
            type: (type != undefined && type.toString().toLowerCase() === "text" ? "" : "")
        };

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(js)
        })
        .then(response => response.json())
        .then(json => {
            if(json != undefined && json["status"] != undefined && json["status"] === true){
                return proc(null, json);
            } else {
                return proc(error, null);
            }
        })
        .catch(error => {
            return proc(error, null);
        });
    },
    lexica: ({
        prompt = "",
        type = "json"
    }, proc = (err, data)) => {
        const error = {
            "api": "lexicaai",
            "code": 400,
            "status": false,
            "message": "error",
            "doc": "https://gpti.projectsrpp.repl.co"
        }

        const url = "https://gpti.projectsrpp.repl.co/api/lexicaai";
        const js = {
            prompt: (prompt != undefined && prompt.toString().trim().length > 0 ? prompt.toString() : ""),
            type: (type != undefined && type.toString().toLowerCase() === "text" ? "" : "")
        };

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(js)
        })
        .then(response => response.json())
        .then(json => {
            if(json != undefined && json["status"] != undefined && json["status"] === true){
                return proc(null, json);
            } else {
                return proc(error, null);
            }
        })
        .catch(error => {
            return proc(error, null);
        });
    },
    prodia: ({
        prompt = "",
        model = "",
        sampler = "",
        steps = "",
        cfg_scale = "",
        negative_prompt = "",
        type = "json"
    }, proc = (err, data)) => {
        const error = {
            "api": "prodiaai",
            "code": 400,
            "status": false,
            "message": "error",
            "doc": "https://gpti.projectsrpp.repl.co"
        }

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
        }

        const prodiaai = {
            "model": [
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
            "sampler": [
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

        console.log(md)
    
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

        const url = "https://gpti.projectsrpp.repl.co/api/prodiaai";
        const js = {
            prompt: (prompt != undefined && prompt.toString().trim().length > 0 ? prompt.toString() : ""),
            model: (md["model"]["code"] != null ? md["model"]["code"] : "-1"),
            sampler: (md["sampler"]["code"] != null ? md["sampler"]["code"] : "-1"),
            steps: (md["steps"] != null ? md["steps"] : "-1"),
            cfg_scale: (md["cfg_scale"] != null ? md["cfg_scale"] : "-1"),
            negative_prompt: (negative_prompt != undefined && negative_prompt.toString().trim().length > 0 ? negative_prompt.toString() : ""),
            type: (type != undefined && type.toString().toLowerCase() === "text" ? "" : "")
        };

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(js)
        })
        .then(response => response.json())
        .then(json => {
            if(json != undefined && json["status"] != undefined && json["status"] === true){
                return proc(null, json);
            } else {
                return proc(error, null);
            }
        })
        .catch(error => {
            return proc(error, null);
        });
    },
    util: {
        gptModel: () => {
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

            return gptmodel;
        },
        prodiaModel: () => {
            const prodiaai = {
                "model": [
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
                ]
            }
            
            return prodiaai["model"];
        },
        prodiaSampler: () => {
            const prodiaai = {
                "sampler": [
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

            return prodiaai["sampler"];
        }
    }
}