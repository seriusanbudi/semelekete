import { useEffect, useState } from "react";
import { useMoralisWeb3Api } from "react-moralis";
import Moralis from "moralis";
import { Tooltip } from "react-tippy";

const suportedToken = {
  eth: 0,
};

const BalanceContainer = () => {
  const [balance, setBalanceAmount] = useState({ ...suportedToken });

  const Web3Api = useMoralisWeb3Api();

  const loadBalances = async () => {
    const latestBalance = {};

    const ethBalance = await Web3Api.account.getNativeBalance({
      chain: "rinkeby",
    });

    latestBalance["eth"] = ethBalance?.balance || 0;

    setBalanceAmount({ ...latestBalance });
  };

  const formatCrypto = (amount = 0, type = "eth") => {
    return Moralis.Units.FromWei(amount);
  };

  useEffect(() => {
    loadBalances();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center p-4 rounded-lg border-2 border-gray-100 hover:border-black transition">
        <div className="flex items-center">
          <div className="h-[62px] w-[62px] rounded-full mr-4 flex items-center justify-center border">
            <img
              className="object-contain h-[42px]"
              src="https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=022"
              alt="eth-symbol"
            />
          </div>
          <div>
            <div className="font-bold text-lg">ETH</div>
            <div className="text-xs">Ethereum</div>
          </div>
        </div>
        <div>
          <Tooltip
            arrow={true}
            title={formatCrypto(balance?.eth || 0) + " ETH"}
            trigger="mouseenter"
          >
            <div className="font-bold text-2xl text-right w-[120px] truncate">
              {formatCrypto(balance?.eth || 0)} ETH
            </div>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default BalanceContainer;
