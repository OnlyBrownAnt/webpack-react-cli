import styled from "styled-components";

const Button = styled.button`
  height: 100px;
  width: 100px;
`;

const CommonButton = styled(Button)`
  color: ${(props) => props.theme.color};
  background-color: ${(props) => props.theme.backgroundColor};
`;

export { CommonButton };
