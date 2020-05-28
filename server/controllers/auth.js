let auth = {
	"issuer": "https://sso.intelbras.com.br/auth/realms/intelbras",
	"authorization_endpoint": "https://sso.intelbras.com.br/auth/realms/intelbras/protocol/openid-connect/auth",
	"token_endpoint": "https://sso.intelbras.com.br/auth/realms/intelbras/protocol/openid-connect/token",
	"token_introspection_endpoint": "https://sso.intelbras.com.br/auth/realms/intelbras/protocol/openid-connect/token/introspect",
	"userinfo_endpoint": "https://sso.intelbras.com.br/auth/realms/intelbras/protocol/openid-connect/userinfo",
	"end_session_endpoint": "https://sso.intelbras.com.br/auth/realms/intelbras/protocol/openid-connect/logout",
	"jwks_uri": "https://sso.intelbras.com.br/auth/realms/intelbras/protocol/openid-connect/certs",
	"check_session_iframe": "https://sso.intelbras.com.br/auth/realms/intelbras/protocol/openid-connect/login-status-iframe.html",
	"grant_types_supported": ["authorization_code", "implicit", "refresh_token", "password", "client_credentials"],
	"response_types_supported": ["code", "none", "id_token", "token", "id_token token", "code id_token", "code token", "code id_token token"],
	"subject_types_supported": ["public", "pairwise"],
	"id_token_signing_alg_values_supported": ["RS256"],
	"userinfo_signing_alg_values_supported": ["RS256"],
	"request_object_signing_alg_values_supported": ["none", "RS256"],
	"response_modes_supported": ["query", "fragment", "form_post"],
	"registration_endpoint": "https://sso.intelbras.com.br/auth/realms/intelbras/clients-registrations/openid-connect",
	"token_endpoint_auth_methods_supported": ["private_key_jwt", "client_secret_basic", "client_secret_post"],
	"token_endpoint_auth_signing_alg_values_supported": ["RS256"],
	"claims_supported": ["sub", "iss", "auth_time", "name", "given_name", "family_name", "preferred_username", "email"],
	"claim_types_supported": ["normal"],
	"claims_parameter_supported": false,
	"scopes_supported": ["openid", "offline_access"],
	"request_parameter_supported": true,
	"request_uri_parameter_supported": true
}

const credentials = {
    client: {
      id: 'IntelbrasWhereIs',
      secret: 'c2de75c6-21dd-43fa-a1eb-147c57aa4caf'
    },
    auth: {
      tokenHost: auth['token_endpoint']
    }
  };

  const oauth2 = require('simple-oauth2').create(credentials);

  console.log(oauth2);

  module.exports = (express) => {
  express.get('/oauth', (req, res) => { // ok
    
    const authorizationUri = oauth2.authorizationCode.authorizeURL({
        redirect_uri: 'http://localhost:3000/callback',
        scope: 'openid',
        state: '<state>'
      });
      res.json(authorizationUri);
    })
}