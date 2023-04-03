
class UserController {
    constructor(createUserUseCase, findUserByIdUseCase, loginUserUseCase) {
        this.createUserUseCase = createUserUseCase;
        this.findUserByIdUseCase = findUserByIdUseCase;
        this.loginUserUseCase = loginUserUseCase;
    }

    async createUser(req, res) {

        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Invalid request body" });
        }

        try {
            const user = await this.createUserUseCase.execute({ name, email, password });

            return res.status(201).json(user);
        } catch (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    async findUserById(req, res) {
        try {
            const { id } = req.params;

            const user = await this.findUserByIdUseCase.execute(id);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            return res.status(200).json(user);
        } catch (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    async loginUser(req, res) {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        try {

            const user = await this.loginUserUseCase.execute({ email, password });

            if (!user) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            return res.status(200).json(user);
        } catch (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = UserController;
