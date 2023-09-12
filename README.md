
# GPTI

This package simplifies your interaction with various GPT models, eliminating the need for tokens or other methods to access GPT. It also allows you to use three artificial intelligences to generate images: DALL·E, Prodia, and Lexica, all of this without restrictions or limits

## Installation

You can install the package via NPM

```bash
npm i gpti
```

### CDN Links

If you'd rather not install the package via NPM, you can also include it directly from a Content Delivery Network (CDN).

Once you've included the script, you can use the package like this:

```javascript
const { gpt, dalle, lexica, prodia } = gpti;
```

#### UNPKG:

To include the package from UNPKG, add the following script tag to your HTML file:

```html
<script src="https://unpkg.com/gpti@1.0.5/gpti.js"></script>
```

#### jsDelivr:

To include the package from jsDelivr, add the following script tag to your HTML file:

```html
<script src="https://cdn.jsdelivr.net/npm/gpti@1.0.5/gpti.js"></script>
```

#### esm.sh

For esm.sh, include the following script tag in your HTML file:

```html
<script src="https://esm.sh/gpti@1.0.5/gpti.js"></script>
```

#### Skypack:

If you prefer using ES6 modules, you can import the package from Skypack as follows:

```html
<script type="module">
    import { gpt, dalle, lexica, prodia } from 'https://cdn.skypack.dev/gpti@1.0.5';

    // Now you can use the 'gpti' package in your JavaScript code
</script>
```

These CDN options allow you to include the package in your web project with ease. Simply choose the one that fits your project's requirements.

## Usage GPT

```javascript
// import { gpt } from "gpti";
const { gpt } = require("gpti");

gpt({
    prompt: "hello gpt, tell me what your version is?",
    model: "gpt-4",                         // code or model
    type: "json"                            // optional: "json" or "markdown"
}, (err, data) => {
    if(err != null){
        console.log(err);
    } else {
        console.log(data);
    }
});
```

#### JSON

```json
{
    "api": "gpti",
    "code": 200,
    "status": true,
    "model": {
        "code": 1,
        "type": "gpt-4"
    },
    "gpt": "Hello there! I'm GPT-4, the fourth version of the Generative Pre-trained Transformer (GPT) model. As an AI language model, I'm designed to generate human-like text based on the given inputs and previous context. I'm constantly trained on vast amounts of text data from the internet, books, and other sources to improve my understanding and generate more accurate responses. How can I assist you today?"
}
```

#### Models

| Code | Model |
|--------------|--------------|
| 1 | gpt-4 |
| 2 | gpt-4-0613 |
| 3 | gpt-4-32k |
| 4 | gpt-4-0314 |
| 5 | gpt-4-32k-0314 |
| 6 | gpt-3.5-turbo |
| 7 | gpt-3.5-turbo-16k |
| 8 | gpt-3.5-turbo-0613 |
| 9 | gpt-3.5-turbo-16k-0613 |
| 10 | gpt-3.5-turbo-0301 |
| 11 | text-davinci-003 |
| 12 | text-davinci-002 |
| 13 | code-davinci-002 |
| 14 | gpt-3 |
| 15 | text-curie-001 |
| 16 | text-babbage-001 |
| 17 | text-ada-001 |
| 18 | davinci |
| 19 | curie |
| 20 | babbage |
| 21 | ada |
| 22 | babbage-002 |
| 23 | davinci-002 |

## Usage DALL·E

```javascript
// import { dalle } from "gpti";
const { dalle } = require("gpti");

dalle({
    prompt: "starry sky over the city",
    type: "json"                            // optional
}, (err, data) => {
    if(err != null){
        console.log(err);
    } else {
        console.log(data);
    }
});
```

#### JSON

```json
{
    "api": "dalleai",
    "code": 200,
    "status": true,
    "prompt": "starry sky over the city",
    "ul": "https://..."
}
```
## Usage Lexica

```javascript
// import { lexica } from "gpti";
const { lexica } = require("gpti");

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
```

#### JSON

```json
{
    "api": "lexicaai",
    "code": 200,
    "status": true,
    "prompt": "the sky is dyed with soft tones as the sun bids farewell",
    "images": [
        {
            "ul": "https://..."
        },
        {
            "ul": "https://..."
        },
        ...
    ]
}
```
## Usage Prodia

```javascript
// import { prodia } from "gpti";
const { prodia } = require("gpti");

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
```

#### JSON

```json
{
    "api": "prodiaai",
    "code": 200,
    "status": true,
    "model": {
        "model": {
            "code": 25,
            "type": "Realistic_Vision_V5.0.safetensors [614d1063]",
            "name": "Realistic Vision V5.0"
        },
        "sampler": {
            "code": 1,
            "type": "Euler",
        }
        "steps": 25,
        "cfg_scale": 7,
        "prompt": "the sun bids farewell in a warm sky, painting soft colors as the clouds dance",
        "negative_prompt": ""
    },
    "ul": "https://..."
}
```

#### Models

| Code | Model                                 | Name               |
|------|---------------------------------------|--------------------|
| 1 | absolutereality_V16.safetensors [37db0fc3] | Absolute Reality V1.6 |
| 2 | absolutereality_v181.safetensors [3d9d4d2b] | Absolute Reality V1.8.1 |
| 3 | analog-diffusion-1.0.ckpt [9ca13f02] | Analog V1 |
| 4 | anythingv3_0-pruned.ckpt [2700c435] | Anything V3 |
| 5 | anything-v4.5-pruned.ckpt [65745d25] | Anything V4.5 |
| 6 | anythingV5_PrtRE.safetensors [893e49b9] | Anything V5 |
| 7 | AOM3A3_orangemixs.safetensors [9600da17] | AbyssOrangeMix V3 |
| 8 | deliberate_v2.safetensors [10ec4b29] | Deliberate V2 |
| 9 | dreamlike-diffusion-1.0.safetensors [5c9fd6e0] | Dreamlike Diffusion V1 |
| 10 | dreamlike-photoreal-2.0.safetensors [fdcf65e7] | Dreamlike Photoreal V2 |
| 11 | dreamshaper_6BakedVae.safetensors [114c8abb] | Dreamshaper 6 baked vae |
| 12 | dreamshaper_7.safetensors [5cf5ae06] | Dreamshaper 7 |
| 13 | dreamshaper_8.safetensors [9d40847d] | Dreamshaper 8 |
| 14 | EimisAnimeDiffusion_V1.ckpt [4f828a15] | Eimis Anime Diffusion V1.0 |
| 15 | elldreths-vivid-mix.safetensors [342d9d26] | Elldreth's Vivid |
| 16 | lyriel_v16.safetensors [68fceea2] | Lyriel V1.6 |
| 17 | mechamix_v10.safetensors [ee685731] | MechaMix V1.0 |
| 18 | meinamix_meinaV9.safetensors [2ec66ab0] | MeinaMix Meina V9 |
| 19 | meinamix_meinaV11.safetensors [b56ce717] | MeinaMix Meina V11 |
| 20 | openjourney_V4.ckpt [ca2f377f] | Openjourney V4 |
| 21 | portraitplus_V1.0.safetensors [1400e684] | Portrait+ V1 |
| 22 | Realistic_Vision_V1.4-pruned-fp16.safetensors [8d21810b] | Realistic Vision V1.4 |
| 23 | Realistic_Vision_V2.0.safetensors [79587710] | Realistic Vision V2.0 |
| 24 | Realistic_Vision_V4.0.safetensors [29a7afaa] | Realistic Vision V4.0 |
| 25 | Realistic_Vision_V5.0.safetensors [614d1063] | Realistic Vision V5.0 |
| 26 | redshift_diffusion-V10.safetensors [1400e684] | Redshift Diffusion V1.0 |
| 27 | revAnimated_v122.safetensors [3f4fefd9] | ReV Animated V1.2.2 |
| 28 | sdv1_4.ckpt [7460a6fa] | SD V1.4 |
| 29 | v1-5-pruned-emaonly.safetensors [d7049739] | SD V1.5 |
| 30 | shoninsBeautiful_v10.safetensors [25d8c546] | Shonin's Beautiful People V1.0 |
| 31 | theallys-mix-ii-churned.safetensors [5d9225a4] | TheAlly's Mix II |
| 32 | timeless-1.0.ckpt [7c4971d4] | Timeless V1 |

#### Samplers

| Code | Sampler |
|--------------|--------------|
| 1 | Euler |
| 2 | Euler a |
| 3 | Heun |
| 4 | DPM++ 2M Karras |
| 5 | DPM++ SDE Karras |
| 6 | DDIM |

## API Reference

Currently, the [API](https://gpti.projectsrpp.repl.co/api/) has no access restrictions or usage limits.

For more details and examples, refer to the complete [documentation](https://gpti.projectsrpp.repl.co/)

### Success 
The API can return the following success response code:

- **200** OK: The request was successful, and the response data is provided.

### Errors
The API can return the following error codes:

- **400** Bad Request: Incorrect or insufficient parameters.
- **404** Not Found: The requested resource was not found.
