const User = require('../../entities/user')
const { NotFoundError } = require('../../../utils/erros/app-erros');

module.exports = class FindUserByIdUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute(userId) {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new NotFoundError(`User with ID ${userId} not found`);
        }
        return new User(user);
    }
}
