const UserRepository = require('./user-repositoryd');

const mongoose = require('mongoose');

describe('User Repository', () => {
    let userRepository;
    let databaseMock;
    let connectMock;

    beforeEach(() => {
        connectMock = jest.fn();
        databaseMock = jest.fn().mockReturnValue({
            connect: connectMock,
        });
        userRepository = new UserRepository(databaseMock);
        mongoose.connect = jest.fn();
    });

    describe('Save', () => {
        test('Should return a user with an id', async () => {
            const newUser = {
                name: 'John Doe',
                email: 'johndoe@mail.com',
                password: '123456',
            };
            const savedUser = {
                ...newUser,
                id: 'generated-id',
                password: 'hashed-password',
            };
            const saveSpy = jest.spyOn(userRepository, 'save');
            saveSpy.mockResolvedValueOnce(savedUser);

            const result = await userRepository.save(newUser);

            expect(result).toEqual(savedUser);
            expect(connectMock).toHaveBeenCalledTimes(1);
            expect(mongoose.connect).toHaveBeenCalledTimes(1);
            expect(saveSpy).toHaveBeenCalledTimes(1);
            expect(saveSpy).toHaveBeenCalledWith(newUser);
        });
    });

    describe('Find by email', () => {
        test('Should return null if user is not found', async () => {
            const email = 'nonexistent@mail.com';
            const findOneSpy = jest.spyOn(userRepository, 'findByEmail');
            findOneSpy.mockResolvedValueOnce(null);

            const result = await userRepository.findByEmail(email);

            expect(result).toBeNull();
            expect(connectMock).toHaveBeenCalledTimes(1);
            expect(mongoose.connect).toHaveBeenCalledTimes(1);
            expect(findOneSpy).toHaveBeenCalledTimes(1);
            expect(findOneSpy).toHaveBeenCalledWith({ email });
        });

        test('Should return a user if email is found', async () => {
            const email = 'johndoe@mail.com';
            const user = {
                name: 'John Doe',
                email,
                password: 'hashed-password',
                id: 'generated-id',
            };
            const findOneSpy = jest.spyOn(userRepository, 'findByEmail');
            findOneSpy.mockResolvedValueOnce(user);

            const result = await userRepository.findByEmail(email);

            expect(result).toEqual(user);
            expect(connectMock).toHaveBeenCalledTimes(1);
            expect(mongoose.connect).toHaveBeenCalledTimes(1);
            expect(findOneSpy).toHaveBeenCalledTimes(1);
            expect(findOneSpy).toHaveBeenCalledWith({ email });
        });
    });
});
