import { ImageWidget } from "apps/admin/widgets.ts";
import Icon, { AvailableIcons } from "../../components/ui/Icon.tsx";
import {
  HOVER_BG_COLORS,
  HOVER_BORDER_COLORS,
  PEER_CHECKED_BG_COLORS,
  PEER_CHECKED_BORDER_COLORS,
  TEXT_COLORS,
} from "../../constants.tsx";
import { clx } from "../../sdk/clx.ts";
import {
  Colors,
  FontSize,
  TextProps,
  WidthAndHeight,
} from "../../sdk/types.ts";
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
  countryCards: CountryCardsProps;
  /**
   * @title Spacing config
   */
  spacing?: SpacingConfig;
}

interface CountryCardsProps {
  /**
   * @title GlobalCardProps
   */
  cardProps: CardProps;
  /**
   * @title Countries
   */
  countries: CountryCardContent[];
}

interface CountryCardContent {
  /**
   * @title Country name
   */
  label: string;
  /**
   * @title Country flag
   */
  icon: AvailableIcons;
  /**
   * @title Country avaliable stores
   */
  countryStores?: CountryStores[];
}

interface CountryStores {
  /**
   * @title Store image
   */
  image: ImageWidget;
  /**
   * @title Title
   */
  title: string;
  /**
   * @title Description
   */
  description: string;
}

interface CardProps {
  /**
   * @title Font color
   */
  fontColor: Colors;
  /**
   * @title Title Font size
   * @description text-xs: 12px, text-sm: 14px, text-base: 16px, text-lg: 18px, text-xl: 20px, text-2xl: 24px, text-3xl: 30px
   */
  titleFontSize: FontSize;
  /**
   * @title Description Font size
   * @description text-xs: 12px, text-sm: 14px, text-base: 16px, text-lg: 18px, text-xl: 20px, text-2xl: 24px, text-3xl: 30px
   */
  descriptionFontSize: FontSize;
  /**
   * @title Images Sizes
   */
  imagesSizes: ImageSizes;
  /**
   * @title Hover color
   * @description Bg color when hover country card
   */
  hoverColor: Colors;
  /**
   * @title Hover Border color
   * @description Border color when hover country card
   */
  hoverColorBorder: Colors;
}

interface ImageSizes {
  mobile: WidthAndHeight;
  desktop: WidthAndHeight;
}

export default function Support(
  { title, description, spacing, countryCards }: Props,
) {
  const { cardProps, countries } = countryCards;
  return (
    <Container
      spacing={spacing}
      class={clx(
        "font-noto-sans",
        "px-6 lg:px-0 container",
      )}
    >
      {/** Title */}
      <h1
        class={clx(
          TEXT_COLORS[title.fontColor ?? "primary"],
          title.fontSize,
          "font-bold",
        )}
      >
        {title.text}
      </h1>
      {/** Description */}
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
      {/** Country Cards */}
      <div class="flex flex-row flex-wrap pt-6 gap-4">
        {countries?.map(({ label, icon }, index) => {
          const id = `country-${index}`;
          return (
            <div>
              <input
                type="radio"
                class="peer hidden"
                name="country-group"
                id={id}
              />
              <label
                class={clx(
                  "flex flex-col gap-1 border border-neutral px-4 pb-2.5 pt-3.5 font-light rounded-sm cursor-pointer peer-checked:font-normal hover:font-normal peer-checked:pointer-events-none",
                  TEXT_COLORS[cardProps.fontColor],
                  cardProps.descriptionFontSize,
                  HOVER_BG_COLORS[cardProps.hoverColor],
                  HOVER_BORDER_COLORS[cardProps.hoverColorBorder],
                  PEER_CHECKED_BG_COLORS[cardProps.hoverColor],
                  PEER_CHECKED_BORDER_COLORS[cardProps.hoverColorBorder],
                )}
                for={id}
              >
                <Icon id={icon} width={20} height={15} />
                <div class="relative">
                  <span class="invisible font-normal">{label}</span>
                  <span class="absolute left-0 top-0">
                    {label}
                  </span>
                </div>
              </label>
            </div>
          );
        })}
      </div>
    </Container>
  );
}
