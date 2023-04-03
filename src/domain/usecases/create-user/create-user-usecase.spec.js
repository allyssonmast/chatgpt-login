const FakeUserRepository = require('../../../domain/repository/user-repository')
const CreateUserUseCase = require('../../../domain/usecases/create-user/create-user-usecase')

let createUserUseCase
let fakeUserRepository

describe('Create User Use Case', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository()
    createUserUseCase = new CreateUserUseCase(fakeUserRepository)
  })

  it('should create a user with valid data', async () => {
    const userData = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    }

    const user = await createUserUseCase.execute(userData)

    expect(user).toHaveProperty('name', userData.name)
    expect(user).toHaveProperty('email', userData.email)
  })
})
