import Button from "components/ui/Button";
import Input from "components/ui/Input";
import InputGroup from "components/ui/InputGroup";
import { useState } from "react";
import { useMoralis } from "react-moralis";

const MagicEmailForm = () => {
  const { authenticate, isAuthenticating } = useMoralis();
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    authenticate({
      provider: "magicLink",
      apiKey: "pk_live_50D2D796688460CA",
      email: email,
      network: "rinkeby",
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup>
        <Input
          required
          type="email"
          placeholder="hoomaan@earth.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </InputGroup>
      <Button type="submit" block loading={isAuthenticating}>
        Login
      </Button>
    </form>
  );
};

export default MagicEmailForm;
