import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
import { useEffect, useRef, useCallback } from 'react';

const OktaSignInWidget = ({ onSuccess, onError, config }) => {
    const widgetRef = useRef();

    const handleSuccess = useCallback(onSuccess, []);
    const handleError = useCallback(onError, []);

    useEffect(() => {
        if (!widgetRef.current) {
            return;
        }

        const widget = new OktaSignIn(config);

        widget.showSignInToGetTokens({ el: widgetRef.current })
            .then(handleSuccess)
            .catch(handleError);

        return () => widget.remove();
    }, [handleSuccess, handleError]);

    return (
        <div className="container mt-5">
            <div ref={widgetRef}></div>
        </div>
    );
};

export default OktaSignInWidget;
