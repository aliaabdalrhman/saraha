import connectDb from '../DB/Connection.js';
import authRouter from './Modules/Auth/Auth.router.js'
import messageRouter from './Modules/Messages/Message.router.js'
const initApp = (app, express) => {
    connectDb(),
    app.use(express.json());
    app.use('/auth', authRouter);
    app.use('/messages', messageRouter);
    app.get('*', (req, res) => {
        return res.status(404).json({ message: "page not found" });
    })
}

export default initApp;