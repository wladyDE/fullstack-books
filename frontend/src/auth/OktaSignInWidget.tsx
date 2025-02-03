import { useEffect, useRef } from 'react';
import OktaSignIn, { WidgetOptions, Tokens } from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';

interface OktaSignInWidgetProps {
  config: WidgetOptions;
  onSuccess: (tokens: Tokens) => void;
  onError: (err: Error) => void;
}

const OktaSignInWidget = ({ config, onSuccess, onError }: OktaSignInWidgetProps) => {
  const widgetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!widgetRef.current) return;

    const widget = new OktaSignIn(config);

    widget
      .showSignInToGetTokens({ el: widgetRef.current })
      .then((tokens) => {
        console.log("Tokens received:", tokens);
        onSuccess(tokens);
      })
      .catch((err) => {
        console.error("Error in sign-in widget:", err);
        onError(err);
      });

    return () => widget.remove();
  }, [config, onSuccess, onError]);

  return <div ref={widgetRef} />;
};

export default OktaSignInWidget;

