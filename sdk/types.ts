export type Colors =
  | "base-100"
  | "primary"
  | "secondary"
  | "accent"
  | "neutral"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "base-200"
  | "base-300"
  | "base-400"
  | "base-content"
  | "primary-content"
  | "secondary-content"
  | "accent-content"
  | "neutral-content"
  | "success-content"
  | "warning-content"
  | "error-content"
  | "info-content"
  | "black"
  | "white"
  | "transparent";

export type FontStyle = "font-noto-sans";

export type FontSize =
  | "text-xs"
  | "text-sm"
  | "text-base"
  | "text-lg"
  | "text-xl"
  | "text-2xl"
  | "text-3xl";

export type GapSizes = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "8";

export interface TextProps {
  /**
   * @title Text
   */
  text: string;
  /**
   * @title Font color
   */
  fontColor: Colors;
  /**
   * @title Font size
   * @description text-xs: 12px, text-sm: 14px, text-base: 16px, text-lg: 18px, text-xl: 20px, text-2xl: 24px, text-3xl: 30px
   */
  fontSize: FontSize;
}
