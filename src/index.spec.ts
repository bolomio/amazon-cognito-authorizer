import { makeCognitoAuthorizer, CognitoAuthorizer } from './index'

describe('index', () => {
    const connector: CognitoAuthorizer = makeCognitoAuthorizer({
        baseUrl: 'https://koko.example.com',
    })

    it('should be able to instantiate', () => {
        expect(connector).toHaveProperty('authenticateWithClientCredentials')
    })
})
