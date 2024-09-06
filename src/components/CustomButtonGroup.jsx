import { Radio } from "antd";
import styled from "styled-components";

const StyledRadioGroup = styled(Radio.Group)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 5px;
`;

const StyledRadioButton = styled(Radio.Button)`
  border: none;
  border-radius: 10px;
  font-weight: 600;
  padding: 5px 40px;
  height: 40px;
  &::before {
    display: none !important;
  }
  &.ant-radio-button-wrapper-checked {
    border-inline-start: none;
    color: black;
    background-color: #ecf7f8;
    border-bottom: 2px solid #38acb1;
  }
  &.ant-radio-button-wrapper {
    border-inline-start: none;
  }
`;

export default function ButtonGroup({ options, radioButtonProps, ...rest }) {
  return (
    <StyledRadioGroup {...rest}>
      {options.map((option, index) => (
        <StyledRadioButton
          size="large"
          type="primary"
          {...radioButtonProps}
          key={index}
          value={option.value}
        >
          {option.label}
        </StyledRadioButton>
      ))}
    </StyledRadioGroup>
  );
}
