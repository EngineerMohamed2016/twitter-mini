import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import connect from './database/connect-db.js'
import authRouter from './routes/auth-routes.js'
import userRouter from './routes/user-routes.js'
import postsRouter from './routes/posts-routes.js'
import verifyToken from './middlewares/verify-token-middleware.js'
import notFound from './middlewares/not-found-middleware.js'
import errorHandler from './middlewares/error-middleware-handler.js'


const app = express();

dotenv.config();
app.use(cors());
app.use(helmet());
app.use(express.json());


app.use('/auth', authRouter);
app.use('/users', verifyToken, userRouter);
app.use('/posts', verifyToken, postsRouter);

app.use(notFound)
app.use(errorHandler);

const runServer = async () => {
    try {
        await connect(process.env.DB_URI); 
        app.listen(5000, () => console.log('Server running on port 5000'))
    } catch (e) {
        console.log(e)
    }
}

runServer();
