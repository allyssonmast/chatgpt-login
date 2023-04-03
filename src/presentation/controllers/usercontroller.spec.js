const UserController = require("../controllers/usercontroller");

describe("User Controller", () => {
    describe("createUser", () => {
        it("should return 400 if request body is invalid", async () => {
            const CreateUserUseCaseMock = {
                execute: jest.fn(),
            };
            const controller = new UserController(CreateUserUseCaseMock);
            const req = {
                body: {},
            };
            const res = {
                status: jest.fn(() => res),
                json: jest.fn(),
            };
            await controller.createUser(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
        });

        it("should return 201 if user is created successfully", async () => {
            const CreateUserUseCaseMock = {
                execute: jest.fn(() => Promise.resolve({ id: "user_id" })),
            };
            const controller = new UserController(CreateUserUseCaseMock);
            const req = {
                body: {
                    name: "John Doe",
                    email: "john.doe@example.com",
                    password: "123456",
                },
            };
            const res = {
                status: jest.fn(() => res),
                json: jest.fn(),
            };
            await controller.createUser(req, res);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ id: "user_id" });
        });
    });

    describe("findUserById", () => {
        it("should return 404 if user is not found", async () => {
            const FindUserByIdUseCaseMock = {
                execute: jest.fn(() => Promise.resolve(null)),
            };
            const controller = new UserController(null, FindUserByIdUseCaseMock);
            const req = {
                params: {
                    id: "user_id",
                },
            };
            const res = {
                status: jest.fn(() => res),
                json: jest.fn(),
            };
            await controller.findUserById(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
        });

        it("should return 200 with user data if user is found", async () => {
            const FindUserByIdUseCaseMock = {
                execute: jest.fn(() =>
                    Promise.resolve({
                        id: "user_id",
                        name: "John Doe",
                        email: "john.doe@example.com",
                    })
                ),
            };
            const controller = new UserController(null, FindUserByIdUseCaseMock);
            const req = {
                params: {
                    id: "user_id",
                },
            };
            const res = {
                status: jest.fn(() => res),
                json: jest.fn(),
            };
            await controller.findUserById(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                id: "user_id",
                name: "John Doe",
                email: "john.doe@example.com",
            });
        });
    });

    describe("loginUser", () => {
        it("should return 400 if request body is invalid", async () => {
            const LoginUserUseCaseMock = {
                execute: jest.fn(),
            };
            const controller = new UserController(null, null, LoginUserUseCaseMock);
            const req = {
                body: {},
            };
            const res = {
                status: jest.fn(() => res),
                json: jest.fn(),
            };
            await controller.loginUser(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
        });
    });
});