//used to generate the data from the openai API

import express from 'express'
import  * as dotenv from 'dotenv'
import { Configuration, OpenAIApi} from 'openai'

import Post from '../mongodb/models/post.js'
import { get } from 'mongoose'

dotenv.config();

const router = express.Router();

// Setup - provide object as 1 parameter
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

// Create New Instance on Open-Ai 
const openai = new OpenAIApi(configuration)

// Interaction with backend Cluster
router.route('/').get((req, res) => {
    res.send('Hello fom Dall-e Aradhya!');
})

// Add real DALL-E route, making a call to theOpen-AI DALL-E API and based on our prompt, returns a real AI generated Image
router.route('/').post(async (req,res)=>{
    try {
        const{prompt} = req.body
        const aiResponse = await openai.createImage({
            prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json',
        })

        const image = aiResponse.data.data[0].b64_json

        res.status(200).json({photo: image})
    } catch (error) {
        console.log(error)
        res.status(500).send(error?.response.data.error.message)
    }
} )


export default router;