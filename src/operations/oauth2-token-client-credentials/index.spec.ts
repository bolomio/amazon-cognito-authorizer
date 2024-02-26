import { ClientCredentialsTokenResource, makeAuthenticateWithClientCredentials } from './index'

import got, { Got } from 'got'
import nock, { disableNetConnect } from 'nock'

beforeAll(() => {
    disableNetConnect()
})

const baseUrl = 'https://bolo.example.com/'
const authPath = '/oauth2/token'
describe('authenticateWithClientCredentials', () => {
    const credentials = {
        clientId: 'yourClientId',
        clientSecret: 'yourClientSecret',
    }

    const gotInstance: Got = got.extend({
        prefixUrl: baseUrl,
    })

    const authenticate = makeAuthenticateWithClientCredentials({ gotInstance })

    it('should authenticate to cognito', async () => {
        const tokenResource: ClientCredentialsTokenResource = {
            access_token: 'koko-token',
            token_type: 'Bearer',
            expires_in: 1234567890,
            scope: 'full',
            state: 'bolo_koko',
        }

        nock(baseUrl).post(authPath).reply(200, tokenResource)

        const token = await authenticate(credentials)

        expect(token).toEqual(tokenResource)
    })

    it('should fail to authenticate to cognito', async () => {
        nock(baseUrl).post(authPath).reply(400, { message: 'oh no' })

        await expect(async () => await authenticate(credentials)).rejects.toMatchInlineSnapshot(
            `[HTTPError: Response code 400 (Bad Request)]`
        )
    })
})
