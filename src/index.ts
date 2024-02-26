import { makeAuthenticateWithClientCredentials } from './operations/oauth2-token-client-credentials'

import type { Got, Headers, Hooks, NormalizedOptions, RequiredRetryOptions } from 'got'
import got from 'got'

/**
 * Configurations for the Cognito Authorizer.
 */
export interface Options {
    /**
     * The base URL of the Cognito instance.
     */
    baseUrl: string

    /**
     * Optional headers to include in requests to the Cognito API.
     */
    headers?: Headers

    /**
     * The timeout duration for requests to the Cognito API.
     */
    timeout?: NormalizedOptions['timeout']

    /**
     * Retry options for failed requests to the Cognito API.
     */
    retry?: RequiredRetryOptions

    /**
     * Hooks to customize the behavior of requests to the Cognito API.
     */
    hooks?: Hooks
}

/**
 * Create a Cognito Authorizer that provides functions for authenticating with Cognito.
 *
 * @param {Options} options - Configurations for the authorizer.
 * @returns {CognitoAuthorizer} An object with authentication functions.
 */
export function makeCognitoAuthorizer(options: Options) {
    const gotInstance: Got = got.extend({
        prefixUrl: options.baseUrl,
        headers: options.headers,
        timeout: options.timeout,
        retry: options.retry,
        hooks: options.hooks,
    })

    return {
        /**
         * Authenticate with Cognito using the client credentials grant type.
         * This function uses the client credentials flow to obtain tokens from the Cognito token endpoint.
         * For more details regarding the flow, see: {@link https://docs.aws.amazon.com/cognito/latest/developerguide/token-endpoint.html#post-token}
         *
         * @param {string} clientId - The ID of an app client in your user pool. Specify the same app client that authenticated your user.
         * @param {string} clientSecret - The client secret for the app client that authenticated your user.
         * @returns {Promise<ClientCredentialsTokenResource>} A Promise that resolves to the token resource object.
         */
        authenticateWithClientCredentials: makeAuthenticateWithClientCredentials({
            gotInstance,
        }),
    }
}

export type CognitoAuthorizer = ReturnType<typeof makeCognitoAuthorizer>
