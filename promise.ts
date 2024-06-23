/*
    Author: yandricr
    API: https://nexra.aryahcr.cc/
*/

import axios from "axios";

let cred = {
    "x-nexra-user": null,
    "x-nexra-secret": null
}

type gptdata = {
    messages?: messagesdata[],
    prompt?: string,
    model?: string
    markdown?: boolean
}

type gptv2data = {
    messages?: messagesdata[],
    markdown?: boolean
}

type messagesdata = {
    role: "user" | "assistant",
    content: string
}

const nexra = (user: any, secret: any) => {
    cred["x-nexra-secret"] = secret;
    cred["x-nexra-user"] = user;
}

type gptwebdata = {
    prompt: string,
    markdown?: boolean
}

async function consult_(api: any, data: any) {
    return new Promise(async(res, rej) => {
        try {
            let response = await axios.post(api, data, {
                headers: {
                    "Content-Type": "application/json",
                    ...cred
                }
            });

            if(response.status === 200){
                if((typeof response.data).toString().toLowerCase() === "Object".toLowerCase()){
                    if(response.data.code != undefined && response.data.code != null && response.data.code === 200 && response.data.status != undefined && response.data.status != null && response.data.status === true){
                        return res(response.data);
                    } else {
                        return rej(response.data);
                    }
                } else {
                    let js = null;
                    let count = -1;
                    for(let i = 0; i < response.data.length; i++){
                        if(count <= -1){
                            if(response.data[i] === "{"){
                                count = i;
                            }
                        } else {
                            break;
                        }
                    }

                    if(count <= -1){
                        return rej({
                            "code": 500,
                            "status": false,
                            "error": "INTERNAL_SERVER_ERROR",
                            "message": "general (unknown) error"
                        });
                    } else {
                        try {
                            js = response.data.slice(count);
                            js = JSON.parse(js);
                            if(js != undefined && js != null && js.code != undefined && js.code != null && js.code === 200 && js.status != undefined && js.status != null && js.status === true){
                                return res(js);
                            } else {
                                return rej(js);
                            }
                        } catch(e){
                            return rej({
                                "code": 500,
                                "status": false,
                                "error": "INTERNAL_SERVER_ERROR",
                                "message": "general (unknown) error"
                            });
                        }
                    }
                }
            } else {
                return rej({
                    "code": 500,
                    "status": false,
                    "error": "INTERNAL_SERVER_ERROR",
                    "message": "general (unknown) error"
                });
            }
        } catch (error: any) {
            try {
                if (error.response) {
                    return rej(error.response.data)
                } else if (error.request) {
                    return rej({
                        "code": 404,
                        "error": "NOT_FOUND",
                        "message": "the service is currently unavailable"
                    });
                } else {
                    return rej({
                        "code": 500,
                        "status": false,
                        "error": "INTERNAL_SERVER_ERROR",
                        "message": "general (unknown) error"
                    });
                }
            } catch(e){
                return rej({
                    "code": 500,
                    "status": false,
                    "error": "INTERNAL_SERVER_ERROR",
                    "message": "general (unknown) error"
                });
            }
        }
    });
}

async function consult_strm(api: any, data: any, process: (err: any, data: any) => void){
    try {
        let response = await axios.post(api, {
            ...data,
            "stream": true
        }, {
            headers: {
                "Content-Type": "application/json",
                ...cred
            },
            responseType: "stream"
        });

        if(response.status === 200){
            let chat: any = null;
            let error: any = false;
            response.data.on("data", (chunk: any) => {
                let chk = chunk.toString();
                chk = chk.split("");
                let tmp: any = null;
        
                chk.forEach((data: any) => {
                    let result = null;
                    let convert = "";
                    
                    try {
                        convert = JSON.parse(data);
                        result = data;
                        tmp = null;
                    } catch(e){
                        if(tmp === null){
                            tmp = data;
                        } else {
                            try {
                                convert = JSON.parse(tmp);
                                result = tmp;
                                tmp = null;
                            } catch(e){
                                tmp = tmp + data;
                                try {
                                    convert = JSON.parse(tmp);
                                    result = tmp;
                                    tmp = null;
                                } catch(e){
                                    tmp = tmp;
                                }
                            }
                        }
                    }
        
                    if(result != null){
                        try {
                            result = JSON.parse(result);
                            if(chat === null && result != null){
                                chat = "";
                            }

                            if(result != undefined && result != null && result.code === undefined && result.status === undefined){
                                if(error != true){
                                    if(result != undefined && result != null && result.finish != undefined && result.finish != null && result.finish === true){
                                        chat = result;
                                    } else {
                                        chat = result;
                                        process(null, result);
                                    }
                                }
                            } else {
                                error = true;
                                chat = result;
                            }
                        } catch(e){
                            // continue
                        }
                    }
                });
            })
        
            response.data.on("end", () => {
                if(chat != null){
                    if(error != true){
                        return process(null, chat);
                    } else {
                        return process(chat, null);
                    }
                } else {
                    return process({
                        "code": 500,
                        "status": false,
                        "error": "INTERNAL_SERVER_ERROR",
                        "message": "general (unknown) error"
                    }, null);
                }
            });
        
            response.data.on("error", (err: any) => {
                return process({
                    "code": 500,
                    "status": false,
                    "error": "INTERNAL_SERVER_ERROR",
                    "message": "general (unknown) error"
                }, null);
            });
        } else {
            return process({
                "code": 500,
                "status": false,
                "error": "INTERNAL_SERVER_ERROR",
                "message": "general (unknown) error"
            }, null);
        }
    } catch (error: any) {
        try {
            if (error.response) {
                try {
                    let err: any = null;
                    error.response.data.on("data", (chk: any) => {
                        if(err != null){
                            err += chk.toString();
                        } else {
                            err = chk.toString();
                        }
                    });

                    error.response.data.on("end", () => {
                        try {
                            err = JSON.parse(err);
                            return process(err, null);
                        } catch (error) {
                            return process({
                                "code": 500,
                                "status": false,
                                "error": "INTERNAL_SERVER_ERROR",
                                "message": "general (unknown) error"
                            }, null);
                        }
                    });

                    error.response.data.on("error", () => {
                        return process({
                            "code": 500,
                            "status": false,
                            "error": "INTERNAL_SERVER_ERROR",
                            "message": "general (unknown) error"
                        }, null);
                    });
                } catch (error) {
                    return process({
                        "code": 500,
                        "status": false,
                        "error": "INTERNAL_SERVER_ERROR",
                        "message": "general (unknown) error"
                    }, null);
                }
            } else if (error.request) {
                return process({
                    "code": 404,
                    "error": "NOT_FOUND",
                    "message": "the service is currently unavailable"
                }, null);
            } else {
                return process({
                    "code": 500,
                    "status": false,
                    "error": "INTERNAL_SERVER_ERROR",
                    "message": "general (unknown) error"
                }, null);
            }
        } catch (error) {
            return process({
                "code": 500,
                "status": false,
                "error": "INTERNAL_SERVER_ERROR",
                "message": "general (unknown) error"
            }, null);
        }
    }
}

class gpt {
    static v1 = async ({
        messages = [],
        prompt = "",
        model = "",
        markdown = false
    }: gptdata) => {
        return new Promise(async (res, rej) => {
            try {
                let response = await consult_('https://nexra.aryahcr.cc/api/chat/gpt', {
                    messages: messages != undefined && messages != null ? messages : [],
                    prompt: prompt != undefined  && prompt != null ? prompt : "",
                    model: model != undefined && model != null ? model : "",
                    markdown: markdown != undefined && markdown != null ? markdown : false
                });
    
                return res(response);
            } catch(e){
                if(typeof(e) == "object"){
                    return rej(e);
                } else {
                    return rej({
                        "code": 500,
                        "status": false,
                        "error": "INTERNAL_SERVER_ERROR",
                        "message": "general (unknown) error"
                    });
                }
            }
        });
    }
    static v2 = async ({
        messages = [],
        markdown = false
    }: gptv2data) => {
        return new Promise(async (res, rej) => {
            try {
                let response = await consult_('https://nexra.aryahcr.cc/api/chat/gpt', {
                    messages: messages != undefined && messages != null ? messages : [],
                    model: "chatgpt",
                    markdown: markdown != undefined && markdown != null ? markdown : false,
                });
    
                return res(response);
            } catch(e){
                if(typeof(e) == "object"){
                    return rej(e);
                } else {
                    return rej({
                        "code": 500,
                        "status": false,
                        "error": "INTERNAL_SERVER_ERROR",
                        "message": "general (unknown) error"
                    });
                }
            }
        });
    }
    static v2_strm = async ({
        messages = [],
        markdown = false
    }: gptv2data, process: (err: any, data: any) => void) => {
        try {
            await consult_strm('https://nexra.aryahcr.cc/api/chat/complements', {
                messages: messages != undefined && messages != null ? messages : [],
                model: "chatgpt",
                markdown: markdown != undefined && markdown != null ? markdown : false,
            }, (err, data) => {
                return process(err, data);
            });
        } catch(e){
            return process({
                "code": 500,
                "status": false,
                "error": "INTERNAL_SERVER_ERROR",
                "message": "general (unknown) error"
            }, null);
        }
    }
    static web = async ({
        prompt = "",
        markdown = false
    }: gptwebdata) => {
        return new Promise(async (res, rej) => {
            try {
                let response = await consult_('https://nexra.aryahcr.cc/api/chat/gptweb', {
                    prompt: prompt != undefined  && prompt != null ? prompt : "",
                    markdown: markdown != undefined && markdown != null ? markdown : false
                });
    
                return res(response);
            } catch(e){
                if(typeof(e) == "object"){
                    return rej(e);
                } else {
                    return rej({
                        "code": 500,
                        "status": false,
                        "error": "INTERNAL_SERVER_ERROR",
                        "message": "general (unknown) error"
                    });
                }
            }
        });
    }
}

type llama2data = {
    messages: messagesdata[],
    system_message?: string,
    temperature?: Number,
    max_tokens?: Number,
    top_p?: Number,
    repetition_penalty?: Number,
    markdown?: boolean
}

class llama2 {
    static async asc({
        messages = [],
        system_message = "",
        temperature = 0.9,
        max_tokens = 4096,
        top_p = 0.6,
        repetition_penalty = 1.2,
        markdown = false
    }: llama2data){
        return new Promise(async (res, rej) => {
            try {
                let response = await consult_('https://nexra.aryahcr.cc/api/chat/complements', {
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
                });
    
                return res(response);
            } catch(e){
                if(typeof(e) == "object"){
                    return rej(e);
                } else {
                    return rej({
                        "code": 500,
                        "status": false,
                        "error": "INTERNAL_SERVER_ERROR",
                        "message": "general (unknown) error"
                    });
                }
            }
        });
    }
    static async strm({
        messages = [],
        system_message = "",
        temperature = 0.9,
        max_tokens = 4096,
        top_p = 0.6,
        repetition_penalty = 1.2,
        markdown = false
    }: llama2data, process: (err: any, data: any) => void){
        try {
            await consult_strm('https://nexra.aryahcr.cc/api/chat/complements', {
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
            }, (err, data) => {
                return process(err, data);
            });
        } catch(e){
            return process({
                "code": 500,
                "status": false,
                "error": "INTERNAL_SERVER_ERROR",
                "message": "general (unknown) error"
            }, null);
        }
    }
}

type bingdata = {
    messages: messagesdata[],
    conversation_style?: "Balanced" | "Creative" | "Precise",
    markdown?: boolean
}

class bing {
    static async asc({
        messages = [],
        conversation_style = "Balanced",
        markdown = false
    }: bingdata){
        return new Promise(async (res, rej) => {
            try {
                let response = await consult_('https://nexra.aryahcr.cc/api/chat/complements', {
                    messages: messages != undefined && messages != null ? messages : [],
                    conversation_style: conversation_style,
                    markdown: markdown != undefined && markdown != null ? markdown : false,
                    model: "bing"
                });
    
                return res(response);
            } catch(e){
                if(typeof(e) == "object"){
                    return rej(e);
                } else {
                    return rej({
                        "code": 500,
                        "status": false,
                        "error": "INTERNAL_SERVER_ERROR",
                        "message": "general (unknown) error"
                    });
                }
            }
        });
    }
    static async strm({
        messages = [],
        conversation_style = "Balanced",
        markdown = false,
    }: bingdata, process: (err: any, data: any) => void){
        try {
            await consult_strm('https://nexra.aryahcr.cc/api/chat/complements', {
                messages: messages != undefined && messages != null ? messages : [],
                conversation_style: conversation_style,
                markdown: markdown != undefined && markdown != null ? markdown : false,
                model: "bing"
            }, (err, data) => {
                return process(err, data);
            });
        } catch(e){
            return process({
                "code": 500,
                "status": false,
                "error": "INTERNAL_SERVER_ERROR",
                "message": "general (unknown) error"
            }, null);
        }
    }
}

type pixartadata = {
    prompt: string,
    data?: {
        prompt_negative?: string,
        sampler?: "DPM-Solver" | "SA-Solver",
        image_style?: "(No style)" | "Cinematic" | "Photographic" | "Anime" | "Manga" | "Digital Art" | "Pixel art" | "Fantasy art" | "Neonpunk" | "3D Model",
        width?: Number,
        height?: Number,
        dpm_guidance_scale?: Number,
        dpm_inference_steps?: Number,
        sa_guidance_scale?: Number,
        sa_inference_steps?: Number
    }
}

type pixartlcmdata = {
    prompt: string,
    data?: {
        prompt_negative?: string,
        image_style?: "(No style)" | "Cinematic" | "Photographic" | "Anime" | "Manga" | "Digital Art" | "Pixel art" | "Fantasy art" | "Neonpunk" | "3D Model",
        width?: Number,
        height?: Number,
        lcm_inference_steps?: Number
    }
}

class pixart {
    static async a({
        prompt = "",
        data = {
            prompt_negative: "",
            sampler: "DPM-Solver",
            image_style: "(No style)",
            width: 1024,
            height: 1024,
            dpm_guidance_scale: 4.5,
            dpm_inference_steps: 14,
            sa_guidance_scale: 3,
            sa_inference_steps: 25
        }
    }: pixartadata){
        return new Promise(async (res, rej) => {
            try {
                let response = await consult_('https://nexra.aryahcr.cc/api/image/complements', {
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
                });
    
                return res(response);
            } catch(e){
                if(typeof(e) == "object"){
                    return rej(e);
                } else {
                    return rej({
                        "code": 500,
                        "status": false,
                        "error": "INTERNAL_SERVER_ERROR",
                        "message": "general (unknown) error"
                    });
                }
            }
        });
    }
    static async lcm({
        prompt = "",
        data = {
            prompt_negative: "",
            image_style: "(No style)",
            width: 1024,
            height: 1024,
            lcm_inference_steps: 9
        }
    }: pixartlcmdata){
        return new Promise(async (res, rej) => {
            try {
                let response = await consult_('https://nexra.aryahcr.cc/api/image/complements', {
                    prompt: prompt != undefined && prompt != null ? prompt : "",
                    model: "pixart-lcm",
                    data: {
                        prompt_negative: data != undefined && data != null && data.prompt_negative != undefined && data.prompt_negative != null ? data.prompt_negative : "",
                        image_style: data != undefined && data != null && data.image_style != undefined && data.image_style != null ? data.image_style : "(No style)",
                        width: data != undefined && data != null && data.width != undefined && data.width != null ? data.width : 1024,
                        height: data != undefined && data != null && data.height != undefined && data.height != null ? data.height : 1024,
                        lcm_inference_steps: data != undefined && data != null && data.lcm_inference_steps != undefined && data.lcm_inference_steps != null ? data.lcm_inference_steps : 9
                    }
                });
    
                return res(response);
            } catch(e){
                if(typeof(e) == "object"){
                    return rej(e);
                } else {
                    return rej({
                        "code": 500,
                        "status": false,
                        "error": "INTERNAL_SERVER_ERROR",
                        "message": "general (unknown) error"
                    });
                }
            }
        });
    }
}

type dalledata = {
    prompt: string
}

type dalle2data = {
    prompt: string,
    data?: {
        prompt_negative?: String,
        width?: Number,
        height?: Number,
        guidance_scale?: Number
    }
}

class dalle {
    static async v1({
        prompt = ""
    }: dalledata){
        return new Promise(async (res, rej) => {
            try {
                let response = await consult_('https://nexra.aryahcr.cc/api/image/complements', {
                    prompt: prompt != undefined && prompt != null ? prompt : "",
                    model: "dalle"
                });
    
                return res(response);
            } catch(e){
                if(typeof(e) == "object"){
                    return rej(e);
                } else {
                    return rej({
                        "code": 500,
                        "status": false,
                        "error": "INTERNAL_SERVER_ERROR",
                        "message": "general (unknown) error"
                    });
                }
            }
        });
    }
    static async v2({
        prompt = "",
        data = {
            prompt_negative: "",
            width: 1024,
            height: 1024,
            guidance_scale: 6
        }
    }: dalle2data){
        return new Promise(async (res, rej) => {
            try {
                let response = await consult_('https://nexra.aryahcr.cc/api/image/complements', {
                    prompt: prompt != undefined && prompt != null ? prompt : "",
                    model: "dalle2",
                    data: {
                        prompt_negative: data != undefined && data != null && data.prompt_negative != undefined && data.prompt_negative != null ? data.prompt_negative : "",
                        width: data != undefined && data != null && data.width != undefined && data.width != null ? data.width : 1024,
                        height: data != undefined && data != null && data.height != undefined && data.height != null ? data.height : 1024,
                        guidance_scale: data != undefined && data != null && data.guidance_scale != undefined && data.guidance_scale != null ? data.guidance_scale : 6
                    }
                });
    
                return res(response);
            } catch(e){
                if(typeof(e) == "object"){
                    return rej(e);
                } else {
                    return rej({
                        "code": 500,
                        "status": false,
                        "error": "INTERNAL_SERVER_ERROR",
                        "message": "general (unknown) error"
                    });
                }
            }
        });
    }
    static async mini({
        prompt = "" 
    }: dalledata){
        return new Promise(async (res, rej) => {
            try {
                let response = await consult_('https://nexra.aryahcr.cc/api/image/complements', {
                        prompt: prompt != undefined && prompt != null ? prompt : "",
                        model: "dalle-mini"
                    });
    
                return res(response);
            } catch(e){
                if(typeof(e) == "object"){
                    return rej(e);
                } else {
                    return rej({
                        "code": 500,
                        "status": false,
                        "error": "INTERNAL_SERVER_ERROR",
                        "message": "general (unknown) error"
                    });
                }
            }
        });
    }
}

type prodiav1data = {
    prompt: string,
    data?: {
        model?: string,
        steps?: number,
        cfg_scale?: number,
        sampler?: string,
        negative_prompt?: string
    }
}

type prodiastablediffusion = {
    prompt: string,
    data?: {
        prompt_negative?: string,
        model?: string,
        sampling_method?: string,
        sampling_steps?: number,
        width?: number,
        height?: number,
        cfg_scale?: number
    }
}

class prodia {
    static async v1({
        prompt = "",
        data = {
            model: "absolutereality_V16.safetensors [37db0fc3]",
            steps: 25,
            cfg_scale: 7,
            sampler: "DPM++ 2M Karras",
            negative_prompt: ""
        }
    }: prodiav1data){
        return new Promise(async (res, rej) => {
            try {
                let response = await consult_('https://nexra.aryahcr.cc/api/image/complements', {
                    prompt: prompt != undefined && prompt != null ? prompt : "",
                    model: "prodia",
                    data: {
                        model: data != undefined && data != null && data.model != undefined && data.model != null ? data.model : "absolutereality_V16.safetensors [37db0fc3]",
                        steps: data != undefined && data != null && data.steps != undefined && data.steps != null ? data.steps : 25,
                        cfg_scale: data != undefined && data != null && data.cfg_scale != undefined && data.cfg_scale != null ? data.cfg_scale : 7,
                        sampler: data != undefined && data != null && data.sampler != undefined && data.sampler != null ? data.sampler : "DPM++ 2M Karras",
                        negative_prompt: data != undefined && data != null && data.negative_prompt != undefined && data.negative_prompt != null ? data.negative_prompt : ""
                    }
                });
    
                return res(response);
            } catch(e){
                if(typeof(e) == "object"){
                    return rej(e);
                } else {
                    return rej({
                        "code": 500,
                        "status": false,
                        "error": "INTERNAL_SERVER_ERROR",
                        "message": "general (unknown) error"
                    });
                }
            }
        });
    }
    static async stablediffusion({
        prompt = "",
        data = {
            prompt_negative: "",
            model: "absolutereality_v181.safetensors [3d9d4d2b]",
            sampling_method: "DPM++ 2M Karras",
            sampling_steps: 25,
            width: 512,
            height: 512,
            cfg_scale: 7
        }
    }: prodiastablediffusion){
        return new Promise(async (res, rej) => {
            try {
                let response = await consult_('https://nexra.aryahcr.cc/api/image/complements', {
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
                });
    
                return res(response);
            } catch(e){
                if(typeof(e) == "object"){
                    return rej(e);
                } else {
                    return rej({
                        "code": 500,
                        "status": false,
                        "error": "INTERNAL_SERVER_ERROR",
                        "message": "general (unknown) error"
                    });
                }
            }
        });
    }
    static async stablediffusion_xl({
        prompt = "",
        data = {
            prompt_negative: "",
            model: "sd_xl_base_1.0.safetensors [be9edd61]",
            sampling_method: "DPM++ 2M Karras",
            sampling_steps: 25,
            width: 1024,
            height: 1024,
            cfg_scale: 7
        }
    }: prodiastablediffusion){
        return new Promise(async (res, rej) => {
            try {
                let response = await consult_('https://nexra.aryahcr.cc/api/image/complements', {
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
                });
    
                return res(response);
            } catch(e){
                if(typeof(e) == "object"){
                    return rej(e);
                } else {
                    return rej({
                        "code": 500,
                        "status": false,
                        "error": "INTERNAL_SERVER_ERROR",
                        "message": "general (unknown) error"
                    });
                }
            }
        });
    }
}

type diffusionv1data = {
    prompt: string
}

type diffusionv2data = {
    prompt: string,
    data?: {
        prompt_negative?: string,
        guidance_scale?: Number
    }
}

type diffusionxldata = {
    prompt: string,
    data?: {
        prompt_negative?: string,
        image_style?: "(No style)" | "Cinematic" | "Photographic" | "Anime" | "Manga" | "Digital Art" | "Pixel art" | "Fantasy art" | "Neonpunk" | "3D Model",
        guidance_scale?: number
    }
}

class stablediffusion {
    static async v1({
        prompt = ""
    }: diffusionv1data){
        return new Promise(async (res, rej) => {
            try {
                let response = await consult_('https://nexra.aryahcr.cc/api/image/complements', {
                    prompt: prompt != undefined && prompt != null ? prompt : "",
                    model: "stablediffusion-1.5"
                });
    
                return res(response);
            } catch(e){
                if(typeof(e) == "object"){
                    return rej(e);
                } else {
                    return rej({
                        "code": 500,
                        "status": false,
                        "error": "INTERNAL_SERVER_ERROR",
                        "message": "general (unknown) error"
                    });
                }
            }
        });
    }
    static async v2({
        prompt = "",
        data = {
            prompt_negative: "",
            guidance_scale: 9
        }
    }: diffusionv2data){
        return new Promise(async (res, rej) => {
            try {
                let response = await consult_('https://nexra.aryahcr.cc/api/image/complements', {
                    prompt: prompt != undefined && prompt != null ? prompt : "",
                    model: "stablediffusion-2.1",
                    data: {
                        prompt_negative: data != undefined && data != null && data.prompt_negative != undefined && data.prompt_negative != null ? data.prompt_negative : "",
                        guidance_scale: data != undefined && data != null && data.guidance_scale != undefined && data.guidance_scale != null ? data.guidance_scale : 9,
                    }
                });
    
                return res(response);
            } catch(e){
                if(typeof(e) == "object"){
                    return rej(e);
                } else {
                    return rej({
                        "code": 500,
                        "status": false,
                        "error": "INTERNAL_SERVER_ERROR",
                        "message": "general (unknown) error"
                    });
                }
            }
        });
    }
    static async xl({
        prompt = "",
        data = {
            prompt_negative: "",
            image_style: "(No style)",
            guidance_scale: 7.5
        }
    }: diffusionxldata){
        return new Promise(async (res, rej) => {
            try {
                let response = await consult_('https://nexra.aryahcr.cc/api/image/complements', {
                    prompt: prompt != undefined && prompt != null ? prompt : "",
                    model: "stablediffusion-xl",
                    data: {
                        prompt_negative: data != undefined && data != null && data.prompt_negative != undefined && data.prompt_negative != null ? data.prompt_negative : "",
                        image_style: data != undefined && data != null && data.image_style != undefined && data.image_style != null ? data.image_style : "(No style)",
                        guidance_scale: data != undefined && data != null && data.guidance_scale != undefined && data.guidance_scale != null ? data.guidance_scale : 7.5,
                    }
                });
    
                return res(response);
            } catch(e){
                if(typeof(e) == "object"){
                    return rej(e);
                } else {
                    return rej({
                        "code": 500,
                        "status": false,
                        "error": "INTERNAL_SERVER_ERROR",
                        "message": "general (unknown) error"
                    });
                }
            }
        });
    }
}

type emidata = {
    prompt: string
}

const emi = async ({
    prompt = ""
}: emidata) => {
    return new Promise(async (res, rej) => {
        try {
            let response = await consult_('https://nexra.aryahcr.cc/api/image/complements', {
                prompt: prompt != undefined && prompt != null ? prompt : "",
                model: "emi"
            });

            return res(response);
        } catch(e){
            if(typeof(e) == "object"){
                return rej(e);
            } else {
                return rej({
                    "code": 500,
                    "status": false,
                    "error": "INTERNAL_SERVER_ERROR",
                    "message": "general (unknown) error"
                });
            }
        }
    });
}

type rendpixeldata = {
    prompt: string,
    data?: {
        prompt_negative?: string
    }
}

const render3d = async ({
    prompt = "",
    data = {
        prompt_negative: ""
    }
}: rendpixeldata) => {
    return new Promise(async (res, rej) => {
        try {
            let response = await consult_('https://nexra.aryahcr.cc/api/image/complements', {
                prompt: prompt != undefined && prompt != null ? prompt : "",
                model: "render3d",
                data: {
                    prompt_negative: data != undefined && data != null && data.prompt_negative != undefined && data.prompt_negative != null ? data.prompt_negative : ""
                }
            });

            return res(response);
        } catch(e){
            if(typeof(e) == "object"){
                return rej(e);
            } else {
                return rej({
                    "code": 500,
                    "status": false,
                    "error": "INTERNAL_SERVER_ERROR",
                    "message": "general (unknown) error"
                });
            }
        }
    });
}

const pixelart = async ({
    prompt = "",
    data = {
        prompt_negative: ""
    }
}: rendpixeldata) => {
    return new Promise(async (res, rej) => {
        try {
            let response = await consult_('https://nexra.aryahcr.cc/api/image/complements', {
                prompt: prompt != undefined && prompt != null ? prompt : "",
                model: "pixel-art",
                data: {
                    prompt_negative: data != undefined && data != null && data.prompt_negative != undefined && data.prompt_negative != null ? data.prompt_negative : ""
                }
            });

            return res(response);
        } catch(e){
            if(typeof(e) == "object"){
                return rej(e);
            } else {
                return rej({
                    "code": 500,
                    "status": false,
                    "error": "INTERNAL_SERVER_ERROR",
                    "message": "general (unknown) error"
                });
            }
        }
    });
}

type playgrounddata = {
    prompt: string,
    data?: {
        prompt_negative?: String,
        width?: Number,
        height?: Number,
        guidance_scale?: Number
    }
}

const playground = async ({
    prompt = "",
    data = {
        prompt_negative: "",
        width: 1024,
        height: 1024,
        guidance_scale: 3
    }
}: playgrounddata) => {
    return new Promise(async (res, rej) => {
        try {
            let response = await consult_('https://nexra.aryahcr.cc/api/image/complements', {
                prompt: prompt != undefined && prompt != null ? prompt : "",
                model: "playground",
                data: {
                    prompt_negative: data != undefined && data != null && data.prompt_negative != undefined && data.prompt_negative != null ? data.prompt_negative : "",
                    width: data != undefined && data != null && data.width != undefined && data.width != null ? data.width : 1024,
                    height: data != undefined && data != null && data.height != undefined && data.height != null ? data.height : 1024,
                    guidance_scale: data != undefined && data != null && data.guidance_scale != undefined && data.guidance_scale != null ? data.guidance_scale : 6,
                }
            });

            return res(response);
        } catch(e){
            if(typeof(e) == "object"){
                return rej(e);
            } else {
                return rej({
                    "code": 500,
                    "status": false,
                    "error": "INTERNAL_SERVER_ERROR",
                    "message": "general (unknown) error"
                });
            }
        }
    });
}

type animaginedata = {
    prompt: string,
    data?: {
        prompt_negative?: String,
        quality_tags?: "Standard" | "Light" | "Heavy" | "(None)",
        style_present?: "(None)" | "Cinematic" | "Photographic" | "Anime" | "Manga" | "Digital Art" | "Pixel art" | "Fantasy art" | "Neonpunk" | "3D Model",
        width?: Number,
        height?: Number,
        strength?: Number,
        upscale?: Number,
        sampler?: "Euler a" | "DPM++ 2M Karras" | "DPM++ SDE Karras" | "DPM++ 2M SDE Karras" | "Euler" | "DDIM",
        guidance_scale?: Number,
        inference_steps?: Number
    }
}

const animagine = async ({
    prompt = "",
    data = {
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
    }
}: animaginedata) => {
    return new Promise(async (res, rej) => {
        try {
            let response = await consult_('https://nexra.aryahcr.cc/api/image/complements', {
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
            });

            return res(response);
        } catch(e){
            if(typeof(e) == "object"){
                return rej(e);
            } else {
                return rej({
                    "code": 500,
                    "status": false,
                    "error": "INTERNAL_SERVER_ERROR",
                    "message": "general (unknown) error"
                });
            }
        }
    });
}

export {
    gpt,
    bing,
    pixart,
    dalle,
    prodia,
    stablediffusion,
    emi,
    llama2,
    pixelart,
    render3d,
    animagine,
    nexra,
    playground
}

export default {
    gpt,
    bing,
    pixart,
    dalle,
    prodia,
    stablediffusion,
    emi,
    llama2,
    pixelart,
    render3d,
    animagine,
    nexra,
    playground
}