/*
    Author: yandricr
    API: https://nexra.aryahcr.cc/
*/

import axios from "axios";

type gptdata = {
    messages?: messagesdata[],
    prompt?: string,
    model?: string
    markdown?: boolean
}

type messagesdata = {
    role: "user" | "assistant",
    content: string
}

const gpt = ({
    messages = [],
    prompt = "",
    model = "",
    markdown = false
}: gptdata, process: (err: any, data: any) => void) => {
    try {
        axios.post('https://nexra.aryahcr.cc/api/chat/gpt', {
            messages: messages != undefined && messages != null ? messages : [],
            prompt: prompt != undefined  && prompt != null ? prompt : "",
            model: model != undefined && model != null ? model : "",
            markdown: markdown != undefined && markdown != null ? markdown : false
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if(response.status === 200){
                if((typeof response.data).toString().toLowerCase() === "Object".toLowerCase()){
                    if(response.data.code != undefined && response.data.code != null && response.data.code === 200 && response.data.status != undefined && response.data.status != null && response.data.status === true){
                        return process(null, response.data);
                    } else {
                        return process(response.data, null);
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
                        return process({
                            "code": 500,
                            "status": false,
                            "error": "INTERNAL_SERVER_ERROR",
                            "message": "general (unknown) error"
                        }, null);
                    } else {
                        try {
                            js = response.data.slice(count);
                            js = JSON.parse(js);
                            if(js != undefined && js != null && js.code != undefined && js.code != null && js.code === 200 && js.status != undefined && js.status != null && js.status === true){
                                return process(null, js);
                            } else {
                                return process(js, null);
                            }
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
            } else {
                return process({
                    "code": 500,
                    "status": false,
                    "error": "INTERNAL_SERVER_ERROR",
                    "message": "general (unknown) error"
                }, null);
            }
        }).catch(error => {
            try {
                if (error.response) {
                    return process(error.response.data, null)
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
            } catch(e){
                return process({
                    "code": 500,
                    "status": false,
                    "error": "INTERNAL_SERVER_ERROR",
                    "message": "general (unknown) error"
                }, null);
            }
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

type bingdata = {
    messages: messagesdata[],
    conversation_style?: "Balanced" | "Creative" | "Precise",
    markdown?: boolean,
    stream?: boolean
}

const bing = ({
    messages = [],
    conversation_style = "Balanced",
    markdown = false,
    stream = false,
}: bingdata, process: (err: any, data: any) => void) => {
    let str = false;
    try {
        if(stream != undefined && stream != null && (typeof stream).toString().toLowerCase() === "Boolean".toLowerCase()){
            if(stream === true){
                str = true;
            } else {
                stream = false;
            }
        } else {
            stream = false;
        }
    } catch(e){
        stream = false;
    }

    let config = {};

    if(str === true){
        config = {
            headers: {
                'Content-Type': 'application/json'
            },
            responseType: "stream"
        }
    } else {
        config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    }

    try {
        axios.post('https://nexra.aryahcr.cc/api/chat/complements', {
            messages: messages != undefined && messages != null ? messages : [],
            conversation_style: conversation_style,
            markdown: markdown != undefined && markdown != null ? markdown : false,
            model: "bing",
            stream: str === true ? true : false
        }, config).then(response => {
            if(response.status === 200){
                if(str === true){
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
                    if((typeof response.data).toString().toLowerCase() === "Object".toLowerCase()){
                        if(response.data.code != undefined && response.data.code != null && response.data.code === 200 && response.data.status != undefined && response.data.status != null && response.data.status === true){
                            return process(null, response.data);
                        } else {
                            return process(response.data, null);
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
                            return process({
                                "code": 500,
                                "status": false,
                                "error": "INTERNAL_SERVER_ERROR",
                                "message": "general (unknown) error"
                            }, null);
                        } else {
                            try {
                                js = response.data.slice(count);
                                js = JSON.parse(js);
                                if(js != undefined && js != null && js.code != undefined && js.code != null && js.code === 200 && js.status != undefined && js.status != null && js.status === true){
                                    return process(null, js);
                                } else {
                                    return process(js, null);
                                }
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
                }
            } else {
                return process({
                    "code": 500,
                    "status": false,
                    "error": "INTERNAL_SERVER_ERROR",
                    "message": "general (unknown) error"
                }, null);
            }
        }).catch(error => {
            try {
                if (error.response) {
                    return process(error.response.data, null)
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
            } catch(e){
                return process({
                    "code": 500,
                    "status": false,
                    "error": "INTERNAL_SERVER_ERROR",
                    "message": "general (unknown) error"
                }, null);
            }
        });
    } catch(e){
        return process({
            "code": 500,
            "status": false,
            "error": "INTERNAL_SERVER_ERROR",
            "message": "general (unknown) error"
        }, null);
    }
};

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
    }: pixartadata, process: (err: any, data: any) => void){
        try {
            axios.post('https://nexra.aryahcr.cc/api/image/complements', {
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
            }).then(response => {
                if(response.status === 200){
                    if((typeof response.data).toString().toLowerCase() === "Object".toLowerCase()){
                        if(response.data.code != undefined && response.data.code != null && response.data.code === 200 && response.data.status != undefined && response.data.status != null && response.data.status === true){
                            return process(null, response.data);
                        } else {
                            return process(response.data, null);
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
                            return process({
                                "code": 500,
                                "status": false,
                                "error": "INTERNAL_SERVER_ERROR",
                                "message": "general (unknown) error"
                            }, null);
                        } else {
                            try {
                                js = response.data.slice(count);
                                js = JSON.parse(js);
                                if(js != undefined && js != null && js.code != undefined && js.code != null && js.code === 200 && js.status != undefined && js.status != null && js.status === true){
                                    return process(null, js);
                                } else {
                                    return process(js, null);
                                }
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
                } else {
                    return process({
                        "code": 500,
                        "status": false,
                        "error": "INTERNAL_SERVER_ERROR",
                        "message": "general (unknown) error"
                    }, null);
                }
            }).catch(error => {
                try {
                    if (error.response) {
                        return process(error.response.data, null)
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
                } catch(e){
                    return process({
                        "code": 500,
                        "status": false,
                        "error": "INTERNAL_SERVER_ERROR",
                        "message": "general (unknown) error"
                    }, null);
                }
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
    static async lcm({
        prompt = "",
        data = {
            prompt_negative: "",
            image_style: "(No style)",
            width: 1024,
            height: 1024,
            lcm_inference_steps: 9
        }
    }: pixartlcmdata, process: (err: any, data: any) => void){
        try {
            axios.post('https://nexra.aryahcr.cc/api/image/complements', {
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
            }).then(response => {
                if(response.status === 200){
                    if((typeof response.data).toString().toLowerCase() === "Object".toLowerCase()){
                        if(response.data.code != undefined && response.data.code != null && response.data.code === 200 && response.data.status != undefined && response.data.status != null && response.data.status === true){
                            return process(null, response.data);
                        } else {
                            return process(response.data, null);
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
                            return process({
                                "code": 500,
                                "status": false,
                                "error": "INTERNAL_SERVER_ERROR",
                                "message": "general (unknown) error"
                            }, null);
                        } else {
                            try {
                                js = response.data.slice(count);
                                js = JSON.parse(js);
                                if(js != undefined && js != null && js.code != undefined && js.code != null && js.code === 200 && js.status != undefined && js.status != null && js.status === true){
                                    return process(null, js);
                                } else {
                                    return process(js, null);
                                }
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
                } else {
                    return process({
                        "code": 500,
                        "status": false,
                        "error": "INTERNAL_SERVER_ERROR",
                        "message": "general (unknown) error"
                    }, null);
                }
            }).catch(error => {
                try {
                    if (error.response) {
                        return process(error.response.data, null)
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
                } catch(e){
                    return process({
                        "code": 500,
                        "status": false,
                        "error": "INTERNAL_SERVER_ERROR",
                        "message": "general (unknown) error"
                    }, null);
                }
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

type dalledata = {
    prompt: string
}

class dalle {
    static async v1({
        prompt = ""
    }: dalledata, process: (err: any, data: any) => void){
        try {
            axios.post('https://nexra.aryahcr.cc/api/image/complements', {
                prompt: prompt != undefined && prompt != null ? prompt : "",
                model: "dalle"
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                if(response.status === 200){
                    if((typeof response.data).toString().toLowerCase() === "Object".toLowerCase()){
                        if(response.data.code != undefined && response.data.code != null && response.data.code === 200 && response.data.status != undefined && response.data.status != null && response.data.status === true){
                            return process(null, response.data);
                        } else {
                            return process(response.data, null);
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
                            return process({
                                "code": 500,
                                "status": false,
                                "error": "INTERNAL_SERVER_ERROR",
                                "message": "general (unknown) error"
                            }, null);
                        } else {
                            try {
                                js = response.data.slice(count);
                                js = JSON.parse(js);
                                if(js != undefined && js != null && js.code != undefined && js.code != null && js.code === 200 && js.status != undefined && js.status != null && js.status === true){
                                    return process(null, js);
                                } else {
                                    return process(js, null);
                                }
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
                } else {
                    return process({
                        "code": 500,
                        "status": false,
                        "error": "INTERNAL_SERVER_ERROR",
                        "message": "general (unknown) error"
                    }, null);
                }
            }).catch(error => {
                try {
                    if (error.response) {
                        return process(error.response.data, null)
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
                } catch(e){
                    return process({
                        "code": 500,
                        "status": false,
                        "error": "INTERNAL_SERVER_ERROR",
                        "message": "general (unknown) error"
                    }, null);
                }
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
    static async mini({
        prompt = "" 
    }: dalledata, process: (err: any, data: any) => void){
        try {
            axios.post('https://nexra.aryahcr.cc/api/image/complements', {
                prompt: prompt != undefined && prompt != null ? prompt : "",
                model: "dalle-mini"
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                if(response.status === 200){
                    if((typeof response.data).toString().toLowerCase() === "Object".toLowerCase()){
                        if(response.data.code != undefined && response.data.code != null && response.data.code === 200 && response.data.status != undefined && response.data.status != null && response.data.status === true){
                            return process(null, response.data);
                        } else {
                            return process(response.data, null);
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
                            return process({
                                "code": 500,
                                "status": false,
                                "error": "INTERNAL_SERVER_ERROR",
                                "message": "general (unknown) error"
                            }, null);
                        } else {
                            try {
                                js = response.data.slice(count);
                                js = JSON.parse(js);
                                if(js != undefined && js != null && js.code != undefined && js.code != null && js.code === 200 && js.status != undefined && js.status != null && js.status === true){
                                    return process(null, js);
                                } else {
                                    return process(js, null);
                                }
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
                } else {
                    return process(response.data, null);
                }
            }).catch(error => {
                try {
                    if (error.response) {
                        return process(error.response.data, null)
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
                } catch(e){
                    return process({
                        "code": 500,
                        "status": false,
                        "error": "INTERNAL_SERVER_ERROR",
                        "message": "general (unknown) error"
                    }, null);
                }
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
    }: prodiav1data, process: (err: any, data: any) => void){
        try {
            axios.post('https://nexra.aryahcr.cc/api/image/complements', {
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
            }).then(response => {
                if(response.status === 200){
                    if((typeof response.data).toString().toLowerCase() === "Object".toLowerCase()){
                        if(response.data.code != undefined && response.data.code != null && response.data.code === 200 && response.data.status != undefined && response.data.status != null && response.data.status === true){
                            return process(null, response.data);
                        } else {
                            return process(response.data, null);
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
                            return process({
                                "code": 500,
                                "status": false,
                                "error": "INTERNAL_SERVER_ERROR",
                                "message": "general (unknown) error"
                            }, null);
                        } else {
                            try {
                                js = response.data.slice(count);
                                js = JSON.parse(js);
                                if(js != undefined && js != null && js.code != undefined && js.code != null && js.code === 200 && js.status != undefined && js.status != null && js.status === true){
                                    return process(null, js);
                                } else {
                                    return process(js, null);
                                }
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
                } else {
                    return process({
                        "code": 500,
                        "status": false,
                        "error": "INTERNAL_SERVER_ERROR",
                        "message": "general (unknown) error"
                    }, null);
                }
            }).catch(error => {
                try {
                    if (error.response) {
                        return process(error.response.data, null)
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
                } catch(e){
                    return process({
                        "code": 500,
                        "status": false,
                        "error": "INTERNAL_SERVER_ERROR",
                        "message": "general (unknown) error"
                    }, null);
                }
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
    }: prodiastablediffusion, process: (err: any, data: any) => void){
        try {
            axios.post('https://nexra.aryahcr.cc/api/image/complements', {
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
            }).then(response => {
                if(response.status === 200){
                    if((typeof response.data).toString().toLowerCase() === "Object".toLowerCase()){
                        if(response.data.code != undefined && response.data.code != null && response.data.code === 200 && response.data.status != undefined && response.data.status != null && response.data.status === true){
                            return process(null, response.data);
                        } else {
                            return process(response.data, null);
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
                            return process({
                                "code": 500,
                                "status": false,
                                "error": "INTERNAL_SERVER_ERROR",
                                "message": "general (unknown) error"
                            }, null);
                        } else {
                            try {
                                js = response.data.slice(count);
                                js = JSON.parse(js);
                                if(js != undefined && js != null && js.code != undefined && js.code != null && js.code === 200 && js.status != undefined && js.status != null && js.status === true){
                                    return process(null, js);
                                } else {
                                    return process(js, null);
                                }
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
                } else {
                    return process({
                        "code": 500,
                        "status": false,
                        "error": "INTERNAL_SERVER_ERROR",
                        "message": "general (unknown) error"
                    }, null);
                }
            }).catch(error => {
                try {
                    if (error.response) {
                        return process(error.response.data, null)
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
                } catch(e){
                    return process({
                        "code": 500,
                        "status": false,
                        "error": "INTERNAL_SERVER_ERROR",
                        "message": "general (unknown) error"
                    }, null);
                }
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
    }: prodiastablediffusion, process: (err: any, data: any) => void){
        try {
            axios.post('https://nexra.aryahcr.cc/api/image/complements', {
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
            }).then(response => {
                if(response.status === 200){
                    if((typeof response.data).toString().toLowerCase() === "Object".toLowerCase()){
                        if(response.data.code != undefined && response.data.code != null && response.data.code === 200 && response.data.status != undefined && response.data.status != null && response.data.status === true){
                            return process(null, response.data);
                        } else {
                            return process(response.data, null);
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
                            return process({
                                "code": 500,
                                "status": false,
                                "error": "INTERNAL_SERVER_ERROR",
                                "message": "general (unknown) error"
                            }, null);
                        } else {
                            try {
                                js = response.data.slice(count);
                                js = JSON.parse(js);
                                if(js != undefined && js != null && js.code != undefined && js.code != null && js.code === 200 && js.status != undefined && js.status != null && js.status === true){
                                    return process(null, js);
                                } else {
                                    return process(js, null);
                                }
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
                } else {
                    return process({
                        "code": 500,
                        "status": false,
                        "error": "INTERNAL_SERVER_ERROR",
                        "message": "general (unknown) error"
                    }, null);
                }
            }).catch(error => {
                try {
                    if (error.response) {
                        return process(error.response.data, null)
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
                } catch(e){
                    return process({
                        "code": 500,
                        "status": false,
                        "error": "INTERNAL_SERVER_ERROR",
                        "message": "general (unknown) error"
                    }, null);
                }
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
    static v1({
        prompt = ""
    }: diffusionv1data, process: (err: any, data: any) => void){
        try {
            axios.post('https://nexra.aryahcr.cc/api/image/complements', {
                prompt: prompt != undefined && prompt != null ? prompt : "",
                model: "stablediffusion-1.5"
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                if(response.status === 200){
                    if((typeof response.data).toString().toLowerCase() === "Object".toLowerCase()){
                        if(response.data.code != undefined && response.data.code != null && response.data.code === 200 && response.data.status != undefined && response.data.status != null && response.data.status === true){
                            return process(null, response.data);
                        } else {
                            return process(response.data, null);
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
                            return process({
                                "code": 500,
                                "status": false,
                                "error": "INTERNAL_SERVER_ERROR",
                                "message": "general (unknown) error"
                            }, null);
                        } else {
                            try {
                                js = response.data.slice(count);
                                js = JSON.parse(js);
                                if(js != undefined && js != null && js.code != undefined && js.code != null && js.code === 200 && js.status != undefined && js.status != null && js.status === true){
                                    return process(null, js);
                                } else {
                                    return process(js, null);
                                }
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
                } else {
                    return process({
                        "code": 500,
                        "status": false,
                        "error": "INTERNAL_SERVER_ERROR",
                        "message": "general (unknown) error"
                    }, null);
                }
            }).catch(error => {
                try {
                    if (error.response) {
                        return process(error.response.data, null)
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
                } catch(e){
                    return process({
                        "code": 500,
                        "status": false,
                        "error": "INTERNAL_SERVER_ERROR",
                        "message": "general (unknown) error"
                    }, null);
                }
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
    static v2({
        prompt = "",
        data = {
            prompt_negative: "",
            guidance_scale: 9
        }
    }: diffusionv2data, process: (err: any, data: any) => void){
        try {
            axios.post('https://nexra.aryahcr.cc/api/image/complements', {
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
            }).then(response => {
                if(response.status === 200){
                    if((typeof response.data).toString().toLowerCase() === "Object".toLowerCase()){
                        if(response.data.code != undefined && response.data.code != null && response.data.code === 200 && response.data.status != undefined && response.data.status != null && response.data.status === true){
                            return process(null, response.data);
                        } else {
                            return process(response.data, null);
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
                            return process({
                                "code": 500,
                                "status": false,
                                "error": "INTERNAL_SERVER_ERROR",
                                "message": "general (unknown) error"
                            }, null);
                        } else {
                            try {
                                js = response.data.slice(count);
                                js = JSON.parse(js);
                                if(js != undefined && js != null && js.code != undefined && js.code != null && js.code === 200 && js.status != undefined && js.status != null && js.status === true){
                                    return process(null, js);
                                } else {
                                    return process(js, null);
                                }
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
                } else {
                    return process({
                        "code": 500,
                        "status": false,
                        "error": "INTERNAL_SERVER_ERROR",
                        "message": "general (unknown) error"
                    }, null);
                }
            }).catch(error => {
                try {
                    if (error.response) {
                        return process(error.response.data, null)
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
                } catch(e){
                    return process({
                        "code": 500,
                        "status": false,
                        "error": "INTERNAL_SERVER_ERROR",
                        "message": "general (unknown) error"
                    }, null);
                }
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
    static xl({
        prompt = "",
        data = {
            prompt_negative: "",
            image_style: "(No style)",
            guidance_scale: 7.5
        }
    }: diffusionxldata, process: (err: any, data: any) => void){
        try {
            axios.post('https://nexra.aryahcr.cc/api/image/complements', {
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
            }).then(response => {
                if(response.status === 200){
                    if((typeof response.data).toString().toLowerCase() === "Object".toLowerCase()){
                        if(response.data.code != undefined && response.data.code != null && response.data.code === 200 && response.data.status != undefined && response.data.status != null && response.data.status === true){
                            return process(null, response.data);
                        } else {
                            return process(response.data, null);
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
                            return process({
                                "code": 500,
                                "status": false,
                                "error": "INTERNAL_SERVER_ERROR",
                                "message": "general (unknown) error"
                            }, null);
                        } else {
                            try {
                                js = response.data.slice(count);
                                js = JSON.parse(js);
                                if(js != undefined && js != null && js.code != undefined && js.code != null && js.code === 200 && js.status != undefined && js.status != null && js.status === true){
                                    return process(null, js);
                                } else {
                                    return process(js, null);
                                }
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
                } else {
                    return process({
                        "code": 500,
                        "status": false,
                        "error": "INTERNAL_SERVER_ERROR",
                        "message": "general (unknown) error"
                    }, null);
                }
            }).catch(error => {
                try {
                    if (error.response) {
                        return process(error.response.data, null)
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
                } catch(e){
                    return process({
                        "code": 500,
                        "status": false,
                        "error": "INTERNAL_SERVER_ERROR",
                        "message": "general (unknown) error"
                    }, null);
                }
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

type emidata = {
    prompt: string
}

const emi = ({
    prompt = ""
}: emidata, process: (err: any, data: any) => void) => {
    try {
        axios.post('https://nexra.aryahcr.cc/api/image/complements', {
            prompt: prompt != undefined && prompt != null ? prompt : "",
            model: "emi"
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if(response.status === 200){
                if((typeof response.data).toString().toLowerCase() === "Object".toLowerCase()){
                    if(response.data.code != undefined && response.data.code != null && response.data.code === 200 && response.data.status != undefined && response.data.status != null && response.data.status === true){
                        return process(null, response.data);
                    } else {
                        return process(response.data, null);
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
                        return process({
                            "code": 500,
                            "status": false,
                            "error": "INTERNAL_SERVER_ERROR",
                            "message": "general (unknown) error"
                        }, null);
                    } else {
                        try {
                            js = response.data.slice(count);
                            js = JSON.parse(js);
                            if(js != undefined && js != null && js.code != undefined && js.code != null && js.code === 200 && js.status != undefined && js.status != null && js.status === true){
                                return process(null, js);
                            } else {
                                return process(js, null);
                            }
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
            } else {
                return process({
                    "code": 500,
                    "status": false,
                    "error": "INTERNAL_SERVER_ERROR",
                    "message": "general (unknown) error"
                }, null);
            }
        }).catch(error => {
            try {
                if (error.response) {
                    return process(error.response.data, null)
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
            } catch(e){
                return process({
                    "code": 500,
                    "status": false,
                    "error": "INTERNAL_SERVER_ERROR",
                    "message": "general (unknown) error"
                }, null);
            }
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

export {
    gpt,
    bing,
    pixart,
    dalle,
    prodia,
    stablediffusion,
    emi
}

export default {
    gpt,
    bing,
    pixart,
    dalle,
    prodia,
    stablediffusion,
    emi
}