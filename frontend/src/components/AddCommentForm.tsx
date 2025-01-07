import { useContext, useState } from "react";
import { addComment } from "../api/main";
import { Context } from "../context/MainContext";
import { toast } from "react-toastify";
import { ErrorMessage, Input, Select } from "./styled-component/formInput";
import Button from "./Button";
import Loading from "./Loading";
import { CommentType } from "../types";

interface InputErrorType {
  number?: string;
  operation?: string;
}

interface AddCommentFormPropsType {
  postId: string;
  parentId?: string;
  setshowAddReply: React.Dispatch<React.SetStateAction<boolean>>;
  setCommentsMain: React.Dispatch<React.SetStateAction<CommentType[]>>;
}
const AddCommentForm = ({
  postId,
  parentId,
  setCommentsMain,
  setshowAddReply,
}: AddCommentFormPropsType) => {
  const [number, setNumber] = useState("");
  const [operation, setOperation] = useState("");
  const { user } = useContext(Context);
  const [inputError, setInputError] = useState<InputErrorType>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    let numberError = "";
    let operationError = "";

    if (!number) {
      numberError = "number is required";
    }
    if (!operation) {
      operationError = "operation is required";
    }

    if (numberError || operationError) {
      setInputError({
        number: numberError,
        operation: operationError,
      });
      return false;
    }
    return true;
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumber(e.target.value);
    if (inputError?.number) {
      setInputError((curr) => {
        return {
          ...curr,
          number: "",
        };
      });
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
          const data = {
            number,
            userId: user?.id,
            parentId,
            postId,
            operation,
          };
          const res = await addComment(data, user.accessToken);
          setNumber("");

          setLoading(false);
          setshowAddReply(false);
          const newComment = {
            ...res.data,
            userId: {
              username: user?.username,
            },
          };
          setCommentsMain((curr) => {
            if (curr.length > 0) {
              const newData = curr.map((item) => {
                if (item._id === parentId) {
                  if (item?.comments) {
                    item.comments = [newComment, ...item.comments];
                  } else {
                    item.replies = [newComment, ...item.replies];
                  }
                }

                return item;
              });

              return newData;
            } else {
              return [newComment];
            }
          });

          toast.success("Submitted successfully");
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
    <div className="addCommentForm">
      <form onSubmit={handleSubmit} className="addPostForm__main">
        <div className="signup__main__form__inputCon">
          <Input
            id="number"
            type="number"
            error={inputError.number ? true : false}
            onChange={handleNumberChange}
            placeholder="Number"
            value={number}
          />
          <ErrorMessage>{inputError?.number}</ErrorMessage>
        </div>
        <div className="signup__main__form__inputCon">
          <Select
            id="operation"
            onChange={(e) => setOperation(e.target.value)}
            error={inputError.number ? true : false}
            value={operation}
          >
            <option value="">--select an operation--</option>
            <option value="+">Addition</option>
            <option value="-">Subtraction</option>
            <option value="/">Division</option>
            <option value="*">Multiplication</option>
          </Select>

          <ErrorMessage>{inputError?.number}</ErrorMessage>
        </div>

        <Button>{loading ? <Loading button={true} /> : "Submit"} </Button>
      </form>
    </div>
  );
};

export default AddCommentForm;
