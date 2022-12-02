import express from "express"
import storeRoutes from './routes/projects.routes.js'



const app = express();

//middlewares
app.use(express.json())

app.use(storeRoutes);


export default app;