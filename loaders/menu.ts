import { ImageWidget } from "apps/admin/widgets.ts";
import { AppContext } from "../apps/site.ts";
import { AvailableIcons } from "../components/ui/Icon.tsx";

/** @titleBy title */
export interface NavItem {
  /**
   * @title Ícone
   * @format icon-select
   * @options site/loaders/availableIcons.ts
   */
  icon?: AvailableIcons;
  /** @title Título */
  title: string;
  /** @title É uma nova aba? */
  isBlank?: boolean;
  link: string;
}

/** @titleBy title */
export interface Category {
  /**
   * @title Ícone
   * @format icon-select
   * @options site/loaders/availableIcons.ts
   */
  icon?: AvailableIcons;
  /** @title Título */
  title: string;
  link: string;
  /** @title É uma nova aba? */
  isBlank?: boolean;
  /** @title Itens da navegação */
  navItems: NavItem[];
}

/**
 * @titleBy title
 * @title {{#categories}}{{{title}}} {{/categories}}
 */
export interface Column {
  /** @title Categorias */
  categories: Category[];
}

/** @titleBy title */
export interface Department {
  /**
   * @title Ícone
   * @format icon-select
   * @options site/loaders/availableIcons.ts
   */
  icon?: AvailableIcons;
  /** @title Título */
  title: string;
  /**
   * @format color-input
   * @title Cor do Título
   */
  color?: string;
  link: string;
  /** @title É uma nova aba? */
  isBlank?: boolean;
  /** @title Colunas */
  collums: Column[];
}

/** @titleBy title */
export interface ExtraLink {
  /**
   * @title Ícone
   * @format icon-select
   * @options site/loaders/availableIcons.ts
   */
  icon: AvailableIcons;
  /** @title Título */
  title: string;
  link: string;
  /** @title É uma nova aba? */
  isBlank?: boolean;
}

/** @titleBy title */
export interface ExtraMenu {
  /**
   * @title Ícone
   * @format icon-select
   * @options site/loaders/availableIcons.ts
   */
  icon?: AvailableIcons;
  /** @title Título */
  title: string;
  links: ExtraLink[];
}

export interface Mobile {
  logo: ImageWidget;
  textGoBack: string;
}

export interface Menu {
  links: Department[];
  /** @title Links Extras */
  extraLinks?: ExtraMenu[];
  /** @title Linguagens */
  languages: ExtraMenu;
  /** @description This field is to render the right name of the btn in desktop that open the menu */
  allCategoriesText: string;
  mobile: Mobile;
  menuText: string;
}

export interface Props {
  menu: Department[];
  /** @title Links Extras */
  extraLinks?: ExtraMenu[];
  /** @title Linguagens */
  languages: ExtraMenu;
  /** @description This field is to render the right name of the btn in desktop that open the menu */
  allCategoriesText: string;
  menuText: string;
  mobile: Mobile;
}

export default function loader(
  props: Props,
  _req: Request,
  _ctx: AppContext,
): Menu {
  return { links: props.menu, ...props };
}
