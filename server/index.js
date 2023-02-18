import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'

import connectDB from './mongodb/connect.js'
import postRoutes from './routes/postRoutes.js'
import dalleRoutes from './routes/dalleRoutes.js'

//allows us to pool our evironment variables from our .env file

dotenv.config()

const app = express()
app.use(cors())
// additional middleware
app.use(express.json({limit:'50mb'}))

// adding api end points to connect to from the front-end
app.use('/api/v1/post', postRoutes)
app.use('/api/v1/dalle', dalleRoutes)

// first route - interaction with backend MongoDB 
app.get('/', async (req,res) => {
    res.send('Hello from the back end Dall-e ')
})

// Run the server
const startServer = async() => {

    // if server fails we create a try and catch block
try {
    connectDB(process.env.MONGODB_URL)


    app.listen(8080, () => console.log('Server up on port http://localhost:8080') )
} catch (error) {
    console.log(error)}
}

startServer();

// Recap - Create a simple instance of our backend API that has 1 route, where we can verify that out application is working.
// We have aslo started our server and connected it to MongoDB by passing a specific a MonogDB URI query for our Atlas cluster
// Then we add post routes and DALL-E Routes 
// Post Routes - which are used to create the posts and retrieve them,DALL-E routes - used to generate data from api