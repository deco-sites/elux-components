import { GAP_SIZES, TEXT_COLORS } from "../../constants.tsx";
import { clx } from "../../sdk/clx.ts";
import { GapSizes, TextProps } from "../../sdk/types.ts";
import Container, { SpacingConfig } from "../container/Container.tsx";

export interface Props {
  /**
   * @title Title props
   */
  title: TextProps;
  /**
   * @title Content
   * @format rich-text
   */
  content: string;
  /**
   * @title Gap between title and content
   */
  gap?: GapSizes;
  /**
   * @title Spacing config
   */
  spacing?: SpacingConfig;
}

export default function Policy({ title, content, spacing, gap = "0" }: Props) {
  return (
    <Container
      spacing={spacing}
      class={clx(
        "font-noto-sans flex flex-col",
        GAP_SIZES[gap],
        "px-6 lg:px-0 container",
      )}
    >
      <h1
        class={clx(
          TEXT_COLORS[title.fontColor ?? "primary"],
          title.fontSize,
          "font-bold",
        )}
      >
        {title.text}
      </h1>
      <div
        class="policy-content  max-w-[863px] text-secondary text-sm"
        dangerouslySetInnerHTML={{ __html: content }}
      >
      </div>
    </Container>
  );
}
