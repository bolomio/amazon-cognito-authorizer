import type { Got, Options, Response } from 'got'

export interface ClientCredentialsTokenResource {
    /**
     * The access token issued by the authorization server.
     * @type {string}
     */
    access_token: string

    /**
     * The type of the token issued. Case-insensitive. "Bearer".
     * @type {string}
     */
    token_type: string

    /**
     * The lifetime in seconds of the access token.
     * @type {number}
     * @default {undefined}
     */
    expires_in?: number

    /**
     * The scope of the access token. Optional if identical to the scope requested by the client.
     * @type {string}
     * @default {undefined}
     */
    scope?: string

    /**
     * The exact value received from the client if the "state" parameter was present in the client authorization request.
     * @type {string}
     * @default {undefined}
     */
    state?: string
}

export function makeAuthenticateWithClientCredentials({ gotInstance }: { gotInstance: Got }) {
    /**
     * Authenticate with Cognito using the client credentials grant type.
     * This function uses the client credentials flow to obtain tokens from the Cognito token endpoint.
     * For more details regarding the flow, see: {@link https://docs.aws.amazon.com/cognito/latest/developerguide/token-endpoint.html#post-token}
     *
     * @param {string} clientId - The ID of an app client in your user pool. Specify the same app client that authenticated your user.
     * @param {string} clientSecret - The client secret for the app client that authenticated your user.
     * @returns {Promise<ClientCredentialsTokenResource>} A Promise that resolves to the token resource object.
     */
    return async function authenticateWithClientCredentials({
        clientId,
        clientSecret,
    }: {
        clientId: string
        clientSecret: string
    }): Promise<ClientCredentialsTokenResource> {
        const options: Options = {
            form: {
                grant_type: 'client_credentials',
                client_id: clientId,
                client_secret: clientSecret,
            },
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
            },
            responseType: 'json',
        }

        const response = (await gotInstance.post(
            `oauth2/token`,
            options
        )) as Response<ClientCredentialsTokenResource>

        return response.body
    }
}
