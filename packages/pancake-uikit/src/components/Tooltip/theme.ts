import { shadows } from "../../theme/base";
import { darkColors, lightColors } from "../../theme/colors";
import { TooltipTheme } from "./types";

export const light: TooltipTheme = {
  background: lightColors.backgroundAlt2,
  text: lightColors.text,
  boxShadow: shadows.tooltip,
};

export const dark: TooltipTheme = {
  background: darkColors.backgroundAlt2,
  text: darkColors.text,
  boxShadow: shadows.tooltip,
};
