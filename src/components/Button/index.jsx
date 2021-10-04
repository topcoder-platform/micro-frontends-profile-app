import React from "react";
import PT from "prop-types";

const Button = ({
  active,
  children,
  disabled,
  onClick,
  onMouseDown,
  size,
  theme,
  type,
}) => {
  let className = theme.button;
  if (theme[size]) className += ` ${theme[size]}`;
  if (active && theme.active) className += ` ${theme.active}`;
  if (disabled) {
    if (theme.disabled) className += ` ${theme.disabled}`;
    return <div className={className}>{children}</div>;
  }
  if (theme.regular) className += ` ${theme.regular}`;
  return (
    <button
      className={className}
      onClick={onClick}
      onMouseDown={onMouseDown}
      type={type}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  active: false,
  children: null,
  disabled: false,
  onClick: null,
  onMouseDown: null,
  openNewTab: false,
  size: null,
  type: "button",
};

Button.propTypes = {
  active: PT.bool,
  children: PT.node,
  disabled: PT.bool,
  onClick: PT.func,
  onMouseDown: PT.func,
  openNewTab: PT.bool,
  size: PT.string,
  theme: PT.shape({
    button: PT.string.isRequired,
    disabled: PT.string,
    link: PT.string,
    regular: PT.string,
  }).isRequired,
  type: PT.oneOf(["button", "reset", "submit"]),
};

export default Button;
