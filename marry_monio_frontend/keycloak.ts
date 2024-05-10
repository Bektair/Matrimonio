import Keycloak, { KeycloakInitOptions, KeycloakTokenParsed } from "keycloak-js"

const keycloak = new Keycloak({
  clientId: "marryMonioFrontend",
  realm: "marryMonio",
  url: "https://localhost:8443"
}) as KeycloakInstance;

export const initialize = () => {
  const config: KeycloakInitOptions = {
      checkLoginIframe: false,
      // onLoad: 'check-sso',
      // silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html'
  }
  return keycloak.init(config)
}

interface KeycloakInstance extends Keycloak {
  tokenParsed?: KeycloakTokenParsedExtended
}
export interface KeycloakTokenParsedExtended extends KeycloakTokenParsed {
  // Extend with additional props
  'allowed-origins': string[]
  email?: string
  email_verified?: boolean
  family_name?: string
  given_name?: string
  jti?: string
  name?: string
  preferred_username?: string
  roles?: string[]
  scope?: string
  sid?: string
  typ?: string
}



export default keycloak;

