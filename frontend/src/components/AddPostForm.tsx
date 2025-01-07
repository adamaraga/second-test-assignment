import { useContext, useState } from "react";
import { addNumberPost } from "../api/main";
import { Context } from "../context/MainContext";
import { toast } from "react-toastify";
import { ErrorMessage, Input } from "./styled-component/formInput";
import Button from "./Button";
import Loading from "./Loading";
import { PostType } from "../types";

interface InputErrorType {
  number?: string;
}

const AddPostForm = ({
  setPosts,
}: {
  setPosts: React.Dispatch<React.SetStateAction<PostType[]>>;
}) => {
  const [number, setNumber] = useState("");
  const { user } = useContext(Context);
  const [inputError, setInputError] = useState<InputErrorType>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    let numberError = "";

    if (!number) {
      numberError = "number is required";
    }

    if (numberError) {
      setInputError({
        number: numberError,
      });
      return false;
    }
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumber(e.target.value);
    if (inputError?.number) {
      setInputError({ number: "" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (user?.id) {
      const checkValidate = validate();

      if (checkValidate) {
        setInputError({});
        setLoading(true);

        try {
          const res = await addNumberPost(number, user?.id, user?.accessToken);
          setNumber("");

          setLoading(false);
          const newComment = {
            ...res.data,
            userId: {
              username: user?.username,
            },
          };
          setPosts((curr) => {
            return [newComment, ...curr];
          });
          // console.log("res.data", res.data);
          toast.success("Started successfully");
        } catch (err: any) {
          setLoading(false);
          const message =
            (err.response && err.response.data && err.response.data.message) ||
            err.message ||
            err.toString();
          toast.error(message);
        }
      }
    }
  };
  return (
    <div className="addPostForm">
      <form onSubmit={handleSubmit} className="addPostForm__main">
        <h2>Start a chain calculation</h2>
        <div className="signup__main__form__inputCon">
          <Input
            id="number"
            type="number"
            error={inputError.number ? true : false}
            onChange={handleChange}
            placeholder="Number"
            value={number}
          />
          <ErrorMessage>{inputError?.number}</ErrorMessage>
        </div>

        <Button>{loading ? <Loading button={true} /> : "Submit"} </Button>
      </form>
    </div>
  );
};

export default AddPostForm;
