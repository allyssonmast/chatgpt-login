const LoginUserUseCase = require('./login-usecase');
const { NotFoundError, UnauthorizedError } = require('../../../utils/erros/app-erros');

describe('LoginUserUseCase', () => {
  const mockedUser = {
    _id: 'user_id',
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: '$2b$10$H.sG.5DZVo9eL0xRMzJQ3e3kbM5g5wC/TMbwO7V0VP08JZSD7QF/O', // password: 123456
  };

  const userRepository = {
    findByEmail: jest.fn(),
  };

  const bcrypt = {
    compare: jest.fn(),
  };

  const jwt = {
    sign: jest.fn(),
  };

  const jwtSecret = 'secret';

  beforeEach(() => {
    userRepository.findByEmail.mockReset();
    bcrypt.compare.mockReset();
    jwt.sign.mockReset();
  });

  test('should return token when credentials are valid', async () => {
    const useCase = new LoginUserUseCase(userRepository, jwtSecret, bcrypt, jwt);

    userRepository.findByEmail.mockResolvedValue(mockedUser);
    bcrypt.compare.mockImplementation(() => Promise.resolve(true));
    jwt.sign.mockReturnValue('token');

    const result = await useCase.execute({
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(result).toEqual({ token: 'token' });
    expect(userRepository.findByEmail).toHaveBeenCalledTimes(1);
    expect(userRepository.findByEmail).toHaveBeenCalledWith('johndoe@example.com');
    expect(bcrypt.compare).toHaveBeenCalledTimes(1);
    expect(bcrypt.compare).toHaveBeenCalledWith('123456', mockedUser.password);
    expect(jwt.sign).toHaveBeenCalledTimes(1);

  });

  test('should throw UnauthorizedError when password is invalid', async () => {
    userRepository.findByEmail.mockResolvedValue(mockedUser);
    bcrypt.compare.mockImplementation(() => Promise.resolve(false));
    const useCase = new LoginUserUseCase(userRepository, jwtSecret, bcrypt, jwt,);
    await expect(useCase.execute({
      email: 'johndoe@example.com',
      password: 'wrong_password',
    })).rejects.toThrow(UnauthorizedError);

    expect(userRepository.findByEmail).toHaveBeenCalledTimes(1);
    expect(userRepository.findByEmail).toHaveBeenCalledWith('johndoe@example.com');
    expect(bcrypt.compare).toHaveBeenCalledTimes(1);
    expect(bcrypt.compare).toHaveBeenCalledWith('wrong_password', mockedUser.password);
    expect(jwt.sign).not.toHaveBeenCalled();
  });

  test('should throw NotFoundError when user is not found', async () => {
    const useCase = new LoginUserUseCase(userRepository, jwtSecret, bcrypt, jwt,);

    userRepository.findByEmail.mockResolvedValue(null);

    await expect(useCase.execute({
      email: 'nonexistentuser@example.com',
      password: '123456',
    })).rejects.toThrow(NotFoundError);

    expect(userRepository.findByEmail).toHaveBeenCalledTimes(1);
    expect(userRepository.findByEmail).toHaveBeenCalledWith('nonexistentuser@example.com');
    expect(bcrypt.compare).not.toHaveBeenCalled();
    expect(jwt.sign).not.toHaveBeenCalled();
  });
});
