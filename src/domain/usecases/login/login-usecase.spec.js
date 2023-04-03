const LoginUserUseCase = require('./login-usecase')

describe('LoginUserUseCase', () => {
  it('should be able to login an user', async () => {
    const fakeUserRepository = {
      findByEmail: jest.fn().mockResolvedValue({
        id: 'valid_id',
        email: 'user@test.com',
        passwordHash: '$2a$08$E4amw4OyI4c/sO79/Uz4PO5S5SutZGKr5M5Q5q5i/kU6hLLl6oxQW'
      })
    }

    const fakeBcrypt = {
      compare: jest.fn().mockResolvedValue(true)
    }

    const loginUseCase = new LoginUserUseCase(
      fakeUserRepository,
      fakeBcrypt
    )

    const userId = await loginUseCase.execute(
      'user@test.com',
      'password'
    )

    expect(userId).toBe('valid_id')
  })

  it('should not be able to login an user with non existing email', async () => {
    const fakeUserRepository = {
      findByEmail: jest.fn().mockResolvedValue(undefined)
    }

    const fakeBcrypt = {
      compare: jest.fn().mockResolvedValue(true)
    }

    const loginUseCase = new LoginUserUseCase(
      fakeUserRepository,
      fakeBcrypt
    )

    await expect(
      loginUseCase.execute('user@test.com', 'password')
    ).rejects.toThrow()
  })

  it('should not be able to login an user with wrong password', async () => {
    const fakeUserRepository = {
      findByEmail: jest.fn().mockResolvedValue({
        id: 'valid_id',
        email: 'user@test.com',
        passwordHash: '$2a$08$E4amw4OyI4c/sO79/Uz4PO5S5SutZGKr5M5Q5q5i/kU6hLLl6oxQW'
      })
    }

    const fakeBcrypt = {
      compare: jest.fn().mockResolvedValue(false)
    }

    const loginUseCase = new LoginUserUseCase(
      fakeUserRepository,
      fakeBcrypt
    )

    await expect(
      loginUseCase.execute('user@test.com', 'password')
    ).rejects.toThrow()
  })
})
