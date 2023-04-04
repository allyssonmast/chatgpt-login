const express = require('express');

const bodyParser = require('body-parser');
const { UserRepository, Database } = require('./src/infra/index');
const { CreateUserUseCase, FindUserByIdUseCase, LoginUserUseCase } = require('./src/domain/usecases');
const UserController = require('./src/presentation/controllers/usercontroller');
const { userRoutes } = require('./src/presentation/routes/use-routes');
const { authMiddleware, bodyParserMiddleware, errorHandlerMiddleware } = require('./src/presentation/middlewares/index');
const jwt = require('jsonwebtoken');
const bcrypt = require('./src/utils/helper/hashpassword');
require('dotenv').config()

// Injeção de dependência
const db = new Database(process.env.CONNECTION_STRING);
const userRepository = new UserRepository(db);
const createUserUseCase = new CreateUserUseCase(userRepository);
const findUserByIdUseCase = new FindUserByIdUseCase(userRepository);
const jwtSecret = process.env.JWT_SECRET || 'secret';
const bcryptHelper = bcrypt;
const jwtHelper = jwt;


const loginUserUseCase = new LoginUserUseCase(userRepository, jwtSecret, bcryptHelper, jwtHelper,);
const userController = new UserController(createUserUseCase, findUserByIdUseCase, loginUserUseCase);


const port = 3000;

db.connect()
const app = express();

app.use(bodyParser.json());

// Aplicação dos middlewares
app.use(authMiddleware);
app.use(bodyParserMiddleware);
app.use(errorHandlerMiddleware);

// Injeção de dependência
userRoutes(app, userController);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
