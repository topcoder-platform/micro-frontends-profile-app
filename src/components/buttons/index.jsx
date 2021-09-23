/**
 * Standard themed buttons for TC UI Kit.
 */

import { themr } from "react-css-super-themr";
import Button from "../Button";

import dangerTheme from "./themes/danger.scss";
import primaryTheme from "./themes/primary.scss";
import secondaryTheme from "./themes/secondary.scss";

export const DangerButton = themr("DangerButton", dangerTheme)(Button);
export const PrimaryButton = themr("PrimaryButton", primaryTheme)(Button);
export const SecondaryButton = themr("SecondaryButton", secondaryTheme)(Button);
