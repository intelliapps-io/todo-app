import { StarFilled, StarOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from "react";

interface StarCheckboxProps {
  isChecked: boolean
  onClick: (args: { event: React.MouseEvent<HTMLElement, MouseEvent>, isChecked: boolean }) => void
  style?: React.CSSProperties
}

export const StarCheckbox: React.FC<StarCheckboxProps> = props => <Button
  className="icon-btn-lg"
  shape="circle"
  icon={props.isChecked ? <StarFilled /> : <StarOutlined />}
  onClick={(e) => { if (props.onClick) props.onClick({ event: e, isChecked: !props.isChecked }) }}
  style={{ color: props.isChecked ? "rgb(255 188 0 / 100%)" : "rgb(0 0 0 / 20%)", transition: 'ease 0.5s color' }}
/>