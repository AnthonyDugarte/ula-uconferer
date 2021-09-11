/**
 * **Auth0 user role claim**
 *
 * Follow steps at:
 *      to configure the rule, as explained bellow
 *      https://hasura.io/learn/graphql/nextjs-fullstack-serverless/auth0-setup/1-custom-claims/
 * then at:
 *      to make hasura aware of hour role claim configuration
 *      https://hasura.io/learn/graphql/nextjs-fullstack-serverless/auth0-setup/2-connect-hasura-auth0/
 *
 * on Auth0 dashboard Go to:
 *    Auth Pipeline -> Rules -> + Create -> Empty Rule
 *
 * Fill the Rule:
 *
 *    Name: role-claim
 *
 *    Script: Copy the following
 *
 * Test it and make sure it's working correctly (it creates users logged in the application into your db):
 *
 *    Press: Save and Try
 *
 *
 */
function userRoleClaim(user, context, callback) {
  /**
   * Default value for hasura's JWT namespace, to customize it you can refer to
   *    https://hasura.io/docs/latest/graphql/core/auth/authentication/jwt.html
   */
  const namespace = 'https://hasura.io/jwt/claims';

  /**
   * TODO: Get user's allowed-roles from database instead of using auth-user-id
   */
  const claim = {
    'x-hasura-default-role': 'user',
    'x-hasura-allowed-roles': ['user'],
    'x-hasura-auth-user-id': user.user_id,
  };

  if (context.accessToken) context.accessToken[namespace] = claim;
  if (context.idToken) context.idToken[namespace] = claim;

  callback(null, user, context);
}
