/**
 * **Auth0 user reconciliation rule for attendees**
 *
 * on Auth0 dashboard Go to:
 *    Auth Pipeline -> Rules -> + Create -> Empty Rule
 *
 * Fill the Rule:
 *
 *    Name: user-reconciliation
 *
 *    Script: Copy the following and update:
 *
 *    - admin_secret
 *    - url
 *
 * Test it and make sure it's working correctly (it creates users logged in the application into your db):
 *
 *    Press: Save and Try
 */
function userReconciliation(user, context, callback) {
  /**
   * defaulting to the one placed on apps/docker-compose.yml for local development
   *
   * In case of production, update this with your corresponding hasura's admin_secret value
   */
  const admin_secret =
    "a47d92b89d53d3f4b9887b8a7a4d163e8e0d3ff988ccc20b6c9d11ea8b415262";

  /**
   * In order to test in local environment:
   *
   *    follow setup guide from https://dashboard.ngrok.com/get-started/setup
   *
   *    and update <https://120f368312ea.ngrok.io> with its corresponding value from the command in order to expose
   *    local graphl API endpoint for auth0 to consume it
   *    `ngrok http 8081`
   *
   * For production environment:
   *    Use the hasura's one from production to handle production data.
   */
  const url = "https://120f368312ea.ngrok.io/v1/graphql";

  const userId = user.user_id;
  const firstname = user.given_name || user.name;
  const lastname = user.family_name || "";
  const email = user.email;

  const updateQuery = `
      mutation (
        $userId: String!
        $firstname: String
        $lastname: String
        $email: String
        $roleId: Int
      ) {
        insert_User(
          objects: [
            {
              auth_user_id: $userId
              firstname: $firstname
              lastname: $lastname
              email: $email
              User_Has_Role: $roleId
            }
          ]
          on_conflict: {
            constraint: User_auth_user_id_key
            update_columns: [firstname, lastname]
          }
        ) {
          affected_rows
        }
      }
    `;

  const defaultRoleQuery = `
      query defaultRole {
        Role(where: { name: { _iregex: "attendee" } }) {
          role_id
        }
      }
    `;

  request.post(
    {
      url: url,
      headers: {
        "content-type": "application/json",
        "x-hasura-admin-secret": admin_secret,
      },
      body: JSON.stringify({
        query: defaultRoleQuery,
      }),
    },
    function (error, response, body) {
      const variables = {
        userId: userId,
        firstname: firstname,
        lastname: lastname,
        email: email,
        roleId: JSON.parse(body).data.Role[0].role_id,
      };

      request.post(
        {
          url: url,
          headers: {
            "content-type": "application/json",
            "x-hasura-admin-secret": admin_secret,
          },
          body: JSON.stringify({
            query: updateQuery,
            variables: variables,
          }),
        },
        function (error, response, body) {
          console.log(body);
          callback(null, user, context);
        }
      );
    }
  );
}
