import React from "react";
import { SpaceProps } from "styled-system";

export const variants = {
  DIFAULT: "default",
  WARNING: "warning",
  DANGER: "danger",
} as const;

export type Variant = typeof variants[keyof typeof variants];

export interface MessageProps extends SpaceProps {
  variant: Variant;
  icon?: React.ReactNode;
}
