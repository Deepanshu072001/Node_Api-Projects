import express from 'express';
import 'dotenv/config';
import userRouter from './routes/user.route.js';
import { authenticationMiddleware } from './middlewares/auth.middleware.js';
import urlRouter from './routes/url.route.js'

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(authenticationMiddleware);

app.get('/',(req, res) =>{
    return res.json({ status: `Server is up and running `});
});

app.use('/user', userRouter);
app.use(urlRouter);

app.listen(PORT, () => {
    console.log(`server is running on port : ${PORT}`)
});
