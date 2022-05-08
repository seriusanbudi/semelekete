import Button from "components/ui/Button";
import Input from "components/ui/Input";
import InputGroup from "components/ui/InputGroup";
import Modal from "components/ui/Modal";
import Select from "components/ui/Select";
import useWithdraw from "hooks/useWithdraw";
import { useEffect, useState } from "react";
import Moralis from "moralis";

const WithdrawContainer = () => {
  const {
    amount,
    destinationAddress,
    errors,
    isLoading,
    transactionResponse,

    initiate,
    setDestinationAddress,
    setAmount,
    reset,
  } = useWithdraw();

  return (
    <>
      <div>
        <InputGroup label="Token">
          <Select options={[{ value: "eth", label: "(ETH) Ethereum" }]} />
        </InputGroup>
        <InputGroup
          label="Destination address"
          error={errors?.destinationAddress || null}
        >
          <Input
            value={destinationAddress}
            onChange={(e) => setDestinationAddress(e.target.value)}
            placeholder="0x7FA8Ca23aB6092b98455..."
          />
        </InputGroup>
        <InputGroup label="Amount" error={errors?.amount || null}>
          <Input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="1000"
          />
        </InputGroup>
        <Button loading={isLoading} block onClick={() => initiate()}>
          Send
        </Button>
      </div>

      <Modal
        show={!!transactionResponse}
        title="Transcation Success"
        subTitle="Transaction detail information"
        onClose={() => reset()}
      >
        <div className="grid grid-cols-2 mb-1">
          <div>From</div>
          <div className="max-w-[200px] truncate">
            {transactionResponse?.from}
          </div>
        </div>
        <div className="grid grid-cols-2 mb-1">
          <div>To</div>
          <div className="max-w-[200px] truncate">
            {transactionResponse?.to}
          </div>
        </div>
        <div className="grid grid-cols-2 mb-1">
          <div>Amount</div>
          <div className="max-w-[200px] truncate font-bold">
            {Moralis.Units.FromWei(transactionResponse?.value?.toString() || 0)}{" "}
            ETH
          </div>
        </div>
        <div className="grid grid-cols-2 mb-8">
          <div>Hash</div>
          <div className="max-w-[200px] truncate">
            {transactionResponse?.hash}
          </div>
        </div>
        <Button onClick={() => reset()} block>
          Close
        </Button>
      </Modal>
    </>
  );
};

export default WithdrawContainer;
