import { useState } from "react";
import Moralis from "moralis";
import { isEmpty } from "lodash";

const useWithdraw = () => {
  const [destinationAddress, setDestinationAddress] = useState("");
  const [amount, setAmount] = useState(0);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [transactionResponse, setTransactionResponse] = useState(null);

  const validate = () => {
    setErrors({});
    let latestErrors = {};

    if (!amount) latestErrors["amount"] = "Required";
    if (!destinationAddress) latestErrors["destinationAddress"] = "Required";

    setErrors({ ...latestErrors });
    return latestErrors;
  };

  const initiate = async () => {
    const validationErrors = validate();
    setTransactionResponse(null);

    if (!isEmpty(validationErrors)) return validationErrors;

    setIsLoading(true);

    try {
      const options = {
        type: "native",
        amount: Moralis.Units.ETH(amount),
        receiver: destinationAddress,
      };

      const response = await Moralis.transfer(options);
      setTransactionResponse(response);

      setIsLoading(false);
      setAmount("");
      setDestinationAddress("");
    } catch (error) {
      setTransactionResponse(null);
      console.log(error);
      setIsLoading(false);
    }
  };

  const reset = () => {
    setTransactionResponse(null);
    setAmount("");
    setDestinationAddress("");
  };

  return {
    amount,
    destinationAddress,
    errors,
    isLoading,
    transactionResponse,

    initiate,
    setAmount,
    setDestinationAddress,
    reset,
  };
};

export default useWithdraw;
