import styled from "styled-components";
import { ErrorMessageType, InputType, SelectType } from "../../types";

const colorTheme = {
  primary: "#ffce22",
  error: "#a92424",
  lightGray: "#d9d9d9",
};

export const Input = styled.input<InputType>`
  height: 3.5rem;
  width: 100%;
  border-radius: 5px;
  outline: none;
  border: ${(props) =>
    props.error
      ? `1px solid ${colorTheme.error}`
      : `1px solid ${colorTheme.lightGray}`};
  margin-bottom: 1rem;
  padding: 0 1rem;
  transition: 0.3s;
  font-family: inherit;

  &:hover {
    border: ${(props) =>
      props.error
        ? `1px solid ${colorTheme.error}`
        : `1px solid ${colorTheme.primary}`};
  }

  &:focus {
    border: ${(props) =>
      props.error
        ? `1px solid ${colorTheme.error}`
        : `1px solid ${colorTheme.primary}`};
  }
`;

export const Select = styled.select<SelectType>`
  cursor: ${(props) => (props.disabled ? "not-allowed" : "default")};

  height: 3rem;
  width: 25rem;
  border-radius: 5px;
  outline: none;
  box-sizing: border-box;
  border: ${(props) =>
    props.error
      ? `1px solid ${colorTheme.error}`
      : `1px solid ${colorTheme.lightGray}`};
  margin-bottom: 1rem;
  padding: 0 1rem;
  transition: 0.3s;

  &:hover {
    border: ${(props) =>
      props.error
        ? `1px solid ${colorTheme.error}`
        : `1px solid ${colorTheme.primary}`};
  }

  &:focus {
    border: ${(props) =>
      props.error
        ? `1px solid ${colorTheme.error}`
        : `1px solid ${colorTheme.primary}`};
  }
`;

export const ErrorMessage = styled.div<ErrorMessageType>`
  color: ${colorTheme.error};
  font-size: 1.2rem;
  font-weight: 400;
  /* display: ${(props) => (props.show ? "inline-block" : "none")}; */
  position: relative;
  top: ${(props) => (props.top ? props.top : "-1rem")};
`;
