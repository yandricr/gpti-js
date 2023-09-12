// import { gpt, dalle, lexica, prodia, util } from "gpti";
const { gpt, dalle, lexica, prodia, util } = require("gpti");

/* gpt */
gpt({
    prompt: "hello GPT, what model are you?",
    model: "gpt-4",                         // code or model
    type: "json"                            // optional: "json" or "markdown"
}, (err, data) => {
    if(err != null){
        console.log(err);
    } else {
        console.log(data);
    }
});
/* gpt */


/* dalle */
dalle({
    prompt: "a golden sunset over a serene lake, where the colors of the sky and water blend into a peaceful embrace",
    type: "json"                            // optional
}, (err, data) => {
    if(err != null){
        console.log(err);
    } else {
        console.log(data);
    }
});
/* dalle */


/* lexica */
lexica({
    prompt: "the sky is dyed with soft tones as the sun bids farewell",
    type: "json"                            // optional
}, (err, data) => {
    if(err != null){
        console.log(err);
    } else {
        console.log(data);
    }
});
/* lexica */


/* prodia */
prodia({
    prompt: "the sun bids farewell in a warm sky, painting soft colors as the clouds dance",
    model: "Realistic_Vision_V5.0.safetensors [614d1063]",                          // code or model
    sampler: "Euler",                                                               // code or sampler
    steps: 25,                                                                      // 1-30
    cfg_scale: 7,                                                                   // 0-20
    negative_prompt: "",                                                            // optional
    type: "json"                                                                    // optional
}, (err, data) => {
    if(err != null){
        console.log(err);
    } else {
        console.log(data);
    }
});
/* prodia */


/* util */
console.log(util.gptModel());
console.log(util.prodiaModel());
console.log(util.prodiaSampler());
/* util */