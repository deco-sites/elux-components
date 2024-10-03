import { GAP_SIZES, TEXT_COLORS } from "../../constants.tsx";
import { clx } from "../../sdk/clx.ts";
import { Colors, FontSize, GapSizes } from "../../sdk/types.ts";
import Container, { SpacingConfig } from "../container/Container.tsx";

export interface Props {
  /**
   * @title Title props
   */
  title: TitleProps;
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

interface TitleProps {
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
   */
  fontSize: FontSize;
}

export default function Policy({ title, content, spacing, gap = "0" }: Props) {
  return (
    <Container
      spacing={spacing}
      class={clx(
        "font-noto-sans flex flex-col",
        GAP_SIZES[gap],
        "px-4 lg:px-0 container max-w-[863px]",
      )}
    >
      <h1
        class={clx(
          TEXT_COLORS[title.fontColor ?? "primary"],
          title.fontSize,
        )}
      >
        {title.text}
      </h1>
      <div
        class="policy-content"
        dangerouslySetInnerHTML={{ __html: content }}
      >
      </div>
    </Container>
  );
}
