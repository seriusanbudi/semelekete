import Button from "components/ui/Button";
import Input from "components/ui/Input";
import InputGroup from "components/ui/InputGroup";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";

const UpdateUsernameForm = (props) => {
  const { onSuccess } = props;
  const [username, setUsername] = useState("");
  const { user } = useMoralis();

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      user.set("username", username);
      user.save();
      onSuccess();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const currentUsername = user?.get("username") || "";
    setUsername(currentUsername);
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup>
        <Input
          required
          placeholder="awesome hero"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </InputGroup>
      <Button type="submit" block>
        Save
      </Button>
    </form>
  );
};

export default UpdateUsernameForm;
