import express, {Express, NextFunction, Request, Response} from 'express'
import { IUser, User } from './models/User';

const app: Express = express();
const port = 3000;

app.use(express.json());

interface CustomRequest extends Request{
    startTime?: number
}

// middleware -> add startTime to request
app.use((req: CustomRequest, res: Response, next: NextFunction) => {
    req.startTime = Date.now();
    next();
});

// post route -> new user -> name, email -> req.body
// -> /user/:id -> Request <{}, {}, {}>

interface User {
    name: string,
    email:  string
}

app.post('/user', (req: Request<{}, {}, User>, res: Response) => {
    const {name, email} = req.body;
    res.json({
        message: `User created ${name}-${email}`
    })
})

// users based on id
app.get('/users/:id', (req: Request<{id: string}>, res: Response) => {
    const {id} = req.params;
    res.json({
        userId : id,
    });
})

app.get('/', (req: Request, res: Response) => {
    res.send("Hello World");
});

app.get('/users', async(req: Request, res: Response) => {
    try {

        const users: IUser[] = await User.find();
        res.json({
            data : users
        })
    } catch(e) {

    }
})

app.listen(port, () => {
    console.log(`Server is now running on port ${port}`);
})