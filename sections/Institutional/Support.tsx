import Icon, { AvailableIcons } from "../../components/ui/Icon.tsx";
import {
  GAP_SIZES,
  GRID_SIZES_DESKTOP,
  TEXT_COLORS,
} from "../../constants.tsx";
import { clx } from "../../sdk/clx.ts";
import { Colors, FontSize, GapSizes, TextProps } from "../../sdk/types.ts";
import Container, { SpacingConfig } from "../container/Container.tsx";

export interface Props {
  /**
   * @title Title props
   */
  title: TextProps;
  /**
   * @title Description props
   */
  description?: TextProps;
  /**
   * @title Cards
   */
  cards: CardContent[];
  /**
   * @title Cards styling
   */
  cardsStyling: CardsStyling;
  /**
   * @title Spacing config
   */
  spacing?: SpacingConfig;
}

interface CardContent {
  /**
   * @title Title
   */
  title: string;
  /**
   * @title Info items
   */
  cardItems: CardItem[];
}

interface CardItem {
  /**
   * @title Icon
   */
  icon: AvailableIcons;
  /**
   * @title Label
   */
  label: string;
  /**
   * @title Href
   */
  href?: string;
}

interface CardsStyling {
  /**
   * @title Icons Style
   */
  icons: CardsIconProps;
  /**
   * @title Texts style
   */
  text: CardsTextProps;
  /**
   * @title Cards grid (only desktop)
   */
  grid: "1" | "2" | "3" | "4";
  /**
   * @title Cards gap
   */
  gap: GapSizes;
}

interface CardsIconProps {
  /**
   * @title Icons size (px)
   */
  iconSize: number;
  /**
   * @title Icons color
   */
  iconColor: Colors;
}
interface CardsTextProps {
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

export default function Support(
  { title, description, cards, cardsStyling, spacing }: Props,
) {
  const { grid, text, icons, gap } = cardsStyling;
  return (
    <Container
      spacing={spacing}
      class={clx(
        "font-noto-sans",
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
      {description && (
        <div
          class={clx(
            "mt-4 lg:mt-6",
            TEXT_COLORS[description.fontColor ?? "primary"],
            description.fontSize,
          )}
        >
          <span>{description.text}</span>
        </div>
      )}
      <div
        class={clx(
          "mt-12 grid grid-cols-1",
          GRID_SIZES_DESKTOP[grid],
          GAP_SIZES[gap],
        )}
      >
        {cards.map(({ cardItems, title }) => (
          <div
            class={clx(
              "flex flex-col gap-4 pb-10",
              TEXT_COLORS[text.fontColor],
              text.fontSize,
            )}
          >
            <span class="text-base font-bold">{title}</span>
            <div class="flex flex-col gap-3">
              {cardItems.map(({ href, icon, label }) => (
                <div class="flex flex-row gap-3 sm:gap-4">
                  <Icon
                    id={icon}
                    width={icons.iconSize}
                    height={icons.iconSize}
                    size={icons.iconSize}
                    class={TEXT_COLORS[icons.iconColor]}
                  />
                  <a href={href}>{label}</a>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
