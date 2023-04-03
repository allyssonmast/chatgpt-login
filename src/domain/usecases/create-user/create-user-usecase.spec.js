const CreateUserUseCase = require('./create-user-usecase');
const { BadRequestError, ConflictError } = require('../../../utils/erros/app-erros');

describe('CreateUserUseCase', () => {
  let userRepository;
  let createUserUseCase;

  beforeEach(() => {
    userRepository = {
      findByEmail: jest.fn(),
      save: jest.fn(),
    };

    createUserUseCase = new CreateUserUseCase(userRepository);
  });

  it('should create a new user successfully', async () => {
    // Arrange
    const newUser = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password',
    };

    userRepository.findByEmail.mockReturnValue(undefined);
    userRepository.save.mockResolvedValueOnce({ ...newUser, id: 'generated-id' });

    // Act
    const createdUser = await createUserUseCase.execute(newUser);

    // Assert
    expect(createdUser).toHaveProperty('id');
    expect(userRepository.findByEmail).toHaveBeenCalledWith(newUser.email);
    expect(userRepository.save).toHaveBeenCalledWith(newUser);
  });

  it('should throw BadRequestError when some required property is missing', async () => {
    // Arrange
    const newUser = {
      name: 'John Doe',
      email: 'johndoe@example.com',
    };

    // Act & Assert
    await expect(createUserUseCase.execute(newUser)).rejects.toThrow(
      new BadRequestError('Missing required properties: password')
    );
  });

  it('should throw ConflictError when user already exists', async () => {
    // Arrange
    const newUser = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password',
    };

    const existingUser = {
      ...newUser,
      id: 'some-id',
    };

    userRepository.findByEmail.mockReturnValue(existingUser);

    // Act & Assert
    await expect(createUserUseCase.execute(newUser)).rejects.toThrow(
      new ConflictError('User with this email already exists')
    );
  });
});
