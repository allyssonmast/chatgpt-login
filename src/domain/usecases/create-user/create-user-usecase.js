const { BadRequestError, ConflictError } = require('../../../utils/erros/app-erros');

class CreateUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(user) {
    // Verifica se o usuário já existe
    const existingUser = await this.userRepository.findByEmail(user.email);
    if (existingUser) {
      throw new ConflictError('User with this email already exists');
    }

    // Verifica se todas as propriedades do usuário foram fornecidas
    const requiredProperties = ['name', 'email', 'password'];
    const missingProperties = requiredProperties.filter(prop => !user[prop]);
    if (missingProperties.length > 0) {
      throw new BadRequestError(`Missing required properties: ${missingProperties.join(', ')}`);
    }

    // Salva o usuário no repositório
    return await this.userRepository.save(user);

  }
}

module.exports = CreateUserUseCase;
