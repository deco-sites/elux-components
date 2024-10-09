import { TEXT_COLORS } from "../../constants.tsx";
import { clx } from "../../sdk/clx.ts";
import { ButtonProps, TextProps } from "../../sdk/types.ts";
import Container, { SpacingConfig } from "../container/Container.tsx";
import ContactFormComponent from "../../components/social/ContactForm.tsx";

export interface Props {
  title: TextProps;
  description?: TextProps;
  /**
   * @description The list of countries to be displayed in the dropdown
   */
  countries?: string[];
  /**
   * @description The list of subjects to be displayed in the dropdown
   */
  subjects?: string[];
  /**
   * @description Textarea props
   */
  textareaProps?: TextareaProps;
  /**
   * @description Button Props
   */
  buttonProps?: ButtonProps;
  /**
   * @description Error text in form
   */
  errorText?: string;
  /**
   * @description Spacing config
   */
  spacing: SpacingConfig;
}

export interface TextareaProps {
  textareaRows: number;
  characterLimit: number;
}

export default function ContactForm({
  title,
  description,
  spacing,
  countries = [],
  subjects = [],
  textareaProps,
  buttonProps,
}: Props) {
  return (
    <Container
      spacing={spacing}
      class="flex flex-col px-6 lg:px-0 container"
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
      <ContactFormComponent
        countries={countries}
        subjects={subjects}
        textareaProps={textareaProps}
        buttonProps={buttonProps}
      />
    </Container>
  );
}
