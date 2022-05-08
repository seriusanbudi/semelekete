import Avatar from "react-avatar";
import BalanceContainer from "components/containers/BalanceContainer";
import DepositContainer from "components/containers/DepositContainer";
import LoginContainer from "components/containers/LoginContainer";
import WithdrawContainer from "components/containers/WithdrawContainer";
import useEagerConnect from "hooks/useEagerConnect";
import { IoPencil, IoPower } from "react-icons/io5";
import { Tooltip } from "react-tippy";
import { useState } from "react";
import { useMoralis } from "react-moralis";
import Modal from "components/ui/Modal";
import UpdateUsernameForm from "components/forms/UpdateUsernameForm";

const HomePage = () => {
  const [currentTab, setCurrentTab] = useState("Balance");
  const [editUsername, setEditUsername] = useState(false);
  const { isAuthenticated, account, logout, user } = useMoralis();

  const username = user?.get("username") || "-";

  if (!isAuthenticated) return <LoginContainer />;

  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center bg-black">
        <div className="w-[480px]">
          <div className="mb-4">
            <h1 className="text-white font-bold text-4xl">Semelekete</h1>
          </div>
          <div className="bg-white p-8 rounded-lg min-h-[600px]">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center">
                <Avatar
                  name={username}
                  size="48px"
                  className="rounded-full mr-2"
                />
                <div>
                  <div className="flex items-center">
                    <div className="truncate w-fit max-w-[100px] font-bold mr-1">
                      {username}
                    </div>
                    <Tooltip position="right" arrow title="Change username">
                      <button
                        type="button"
                        onClick={() => setEditUsername(true)}
                        className="flex items-center justify-center group w-[18px] h-[18px] bg-transparent rounded hover:bg-black transition"
                      >
                        <IoPencil className="text-xs text-gray-300 group-hover:text-white transition" />
                      </button>
                    </Tooltip>
                  </div>
                  <div className="truncate w-[180px] text-xs">
                    {user?.get("ethAddress")}
                  </div>
                </div>
              </div>
              <button
                className="group hover:bg-red-500 p-2 rounded-lg transition"
                onClick={() => logout()}
              >
                <IoPower className="text-2xl text-gray-300 group-hover:text-white transition" />
              </button>
            </div>
            <div className="flex mb-6">
              {["Balance", "Deposit", "Withdraw"].map((tab) => (
                <button
                  className={`
                  font-bold text-2xl transition mr-4 border-b-4
                  ${
                    currentTab === tab
                      ? "opacity-100 border-black"
                      : "opacity-20 border-transparent"
                  }
                `}
                  onClick={() => setCurrentTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {currentTab === "Balance" && <BalanceContainer />}
            {currentTab === "Withdraw" && <WithdrawContainer />}
            {currentTab === "Deposit" && <DepositContainer />}
          </div>
        </div>
      </div>

      <Modal
        show={editUsername}
        onClose={() => setEditUsername(false)}
        title="Update username"
        subTitle="Set your own username"
      >
        <UpdateUsernameForm
          onSuccess={() => {
            setEditUsername(false);
          }}
        />
      </Modal>
    </>
  );
};

export default HomePage;
