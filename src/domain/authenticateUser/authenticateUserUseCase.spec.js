
describe('Authenticate User Use Case', () => {
  test('Should return 401 if invalid email is provided', async () => {
    const { sut, userRepositoryStub } = makeSut()
        jest.spyOn(userRepositoryStub, 'findByEmail').mockReturnValueOnce(null)

        const response = await sut.execute({ email: 'invalid_email@example.com', password: 'any_password' })

        expect(response.statusCode).toBe(401)
    })
})
