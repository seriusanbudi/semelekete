import { useEffect } from "react";
import { useMoralis } from "react-moralis";

const useEagerConnect = () => {
  const { isAuthenticated, enableWeb3, isWeb3Enabled, isWeb3EnableLoading } =
    useMoralis();

  useEffect(() => {
    const connectorId = window.localStorage.getItem("connectorId");

    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
      enableWeb3({ provider: connectorId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);
};

export default useEagerConnect;
