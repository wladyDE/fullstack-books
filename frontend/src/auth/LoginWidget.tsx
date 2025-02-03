import { useEffect, useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import OktaSignInWidget from './OktaSignInWidget';

interface LoginWidgetProps {
  config: any;
}

const LoginWidget = ({ config }: LoginWidgetProps) => {
  const { oktaAuth, authState } = useOktaAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authState !== undefined) {
      setLoading(false);
    }
  }, [authState]);

  const handleSuccess = async (tokens: any) => {
    console.log("Login Success:", tokens);

    if (tokens.accessToken && tokens.idToken) {
      await oktaAuth.handleLoginRedirect(tokens);
    } else {
      console.error("No tokens received:", tokens);
    }
  };

  const handleError = (err: any) => {
    console.error('Sign-in error', err);
  };

  if (!authState) {
    return <div>Loading...</div>;
  }

  if (authState.isAuthenticated) {
    return <div>You are already logged in!</div>;
  }

  return <OktaSignInWidget config={config} onSuccess={handleSuccess} onError={handleError} />;
};

export default LoginWidget;
