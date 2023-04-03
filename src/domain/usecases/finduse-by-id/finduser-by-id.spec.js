const FindUserByIdUseCase = require('./finduser-by-id');
const { NotFoundError } = require('../../../utils/erros/app-erros');

describe('FindUserByIdUseCase', () => {
    const userId = '123';
    const user = { id: userId, name: 'John Doe', email: 'john.doe@example.com' };
    const userRepository = {
        findById: jest.fn().mockResolvedValue(user),
    };
    const findUserByIdUseCase = new FindUserByIdUseCase(userRepository);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return user when user is found', async () => {
        const result = await findUserByIdUseCase.execute(userId);
        expect(userRepository.findById).toHaveBeenCalledWith(userId);
        expect(result).toEqual(user);
    });

    it('should throw NotFoundError when user is not found', async () => {
        userRepository.findById.mockResolvedValueOnce(null);
        await expect(findUserByIdUseCase.execute(userId)).rejects.toThrow(
            new NotFoundError(`User with ID ${userId} not found`)
        );
        expect(userRepository.findById).toHaveBeenCalledWith(userId);
    });
});
