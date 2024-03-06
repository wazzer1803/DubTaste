import { AppState, Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

const Auth0ProviderWithNavigate = ({ children }: Props) => {
  const navigate = useNavigate();

  const domain = "dev-764m4ickzkyw5zah.us.auth0.com"
  const clientId = "jfGrfJzNdQc9yb4I8AhkfLWalAmwqraD"
  const redirectUri = "http://localhost:5173"
  const audience = "https://dev-764m4ickzkyw5zah.us.auth0.com/api/v2/"

  if (!domain || !clientId || !redirectUri    || !audience) {
    throw new Error("unable to initialise auth");
  }


  const onRedirectCallback = (appState?: AppState) => {
    navigate(appState?.returnTo || "/auth-callback");
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
        audience,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithNavigate;
