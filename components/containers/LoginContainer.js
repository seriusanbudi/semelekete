import Button from "components/ui/Button";
import { useMoralis } from "react-moralis";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import Modal from "components/ui/Modal";
import { useState } from "react";
import MagicEmailForm from "components/forms/MagicEmailForm";

const LoginContainer = () => {
  const [showMagicLogin, setShowMagicLogin] = useState(false);
  const { authenticate, isWeb3EnableLoading, hasAuthError, authError } =
    useMoralis();

  const handleAuth = (method) => {
    switch (method) {
      case "metamask":
        authenticate();
        break;
      case "magic":
        setShowMagicLogin(true);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-10 bg-black flex items-center justify-center">
        <div className="w-[420px]">
          <h1 className="text-3xl text-white font-bold mb-4">Semelekete</h1>
          <div className="bg-white rounded-lg p-10">
            <p className="text-center mb-4">
              Connect your wallet to use the platform
            </p>
            <div className="flex justify-center">
              <Menu
                arrow
                transition
                align="center"
                theming="dark"
                direction="left"
                onItemClick={({ value }) => handleAuth(value)}
                menuButton={
                  <MenuButton>
                    <Button>
                      {isWeb3EnableLoading ? "Loading..." : "Connect"}
                    </Button>
                  </MenuButton>
                }
              >
                <MenuItem value="metamask">Metamask</MenuItem>
                <MenuItem value="magic">Email</MenuItem>
              </Menu>
            </div>

            {hasAuthError && (
              <div className="text-center text-xs mt-4 text-red-500">
                Error! code:{authError.code} {authError.message}
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal
        show={showMagicLogin}
        onClose={() => setShowMagicLogin(false)}
        title="Login using email"
        subTitle="Input your email address to continue"
      >
        <MagicEmailForm />
      </Modal>
    </>
  );
};

export default LoginContainer;
