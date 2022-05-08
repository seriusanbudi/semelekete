import { useMoralis } from "react-moralis";
import { QRCodeSVG } from "qrcode.react";
import { IoCopy } from "react-icons/io5";
import copy from "copy-to-clipboard";
import { Tooltip } from "react-tippy";

const DepositContainer = () => {
  const { account, user } = useMoralis();
  const walletAddress = user?.get("ethAddress") || null;

  return (
    <div>
      <div className="text-center mb-4">
        Transfer your crypto to this wallet address
      </div>
      <div className="flex justify-center mb-4">
        <QRCodeSVG size="220px" value={walletAddress} />
      </div>
      <div className="text-center mb-4">{walletAddress}</div>
      <div className="flex justify-center">
        <Tooltip title="Click to copy to clipboard">
          <button
            type="button"
            onClick={() => {
              console.log("clicked");
              copy(walletAddress);
            }}
            className="
              flex items-center
              bg-black text-white font-bold px-6 py-2 rounded-full border-4 border-black transition
              hover:bg-white hover:text-black
            "
          >
            <IoCopy className="mr-2" /> Copy
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

export default DepositContainer;
