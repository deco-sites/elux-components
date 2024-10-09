import { useScript } from "@deco/deco/hooks";
import { clx } from "../../sdk/clx.ts";
import { TextareaProps } from "../../sections/Social/ContactForm.tsx";
import Icon from "../ui/Icon.tsx";
import { ButtonProps } from "../../sdk/types.ts";
import {
  BG_COLORS,
  BORDER_CLASSES,
  BORDER_COLORS,
  HOVER_BG_COLORS,
  TEXT_COLORS,
} from "../../constants.tsx";
import { useComponent } from "../../sections/Component.tsx";
import { SubmitContactFormProps } from "../../packs/types.ts";
import { AppContext } from "../../apps/site.ts";

export interface Props {
  countries: string[];
  subjects: string[];
  textareaProps?: TextareaProps;
  errorText?: string;
  buttonProps?: ButtonProps;
}

function script(charLimit: number) {
  const form = document.querySelector("form");
  const textarea = document.getElementById("messageTextarea") as
    | HTMLInputElement
    | null;
  const charCountLabel = document.getElementById("charCount");
  const submitButton = document.querySelector('button[type="submit"]');

  //Update char count label
  if (textarea && charCountLabel) {
    textarea.addEventListener("input", function () {
      const currentLength = this.value.length;
      charCountLabel.textContent = `${currentLength}/${charLimit}`;
    });
  }

  //Add submit event prevent in form
  if (form && submitButton) {
    submitButton.addEventListener("click", function (event) {
      if (!validateForm()) {
        event.preventDefault();
      }
    });
  }

  //Validate the form before send
  const validateForm = () => {
    const requiredFields = document.querySelectorAll("[data-required]");
    return Array.from(requiredFields).reduce((isValid, field) => {
      if (
        field instanceof HTMLInputElement ||
        field instanceof HTMLTextAreaElement
      ) {
        if (!field.value.trim()) {
          showError(field);
          return false;
        }
      } else if (field instanceof HTMLSelectElement) {
        if (field.value === "" || field.value === "default") {
          showError(field);
          return false;
        }
      }
      return isValid;
    }, true);
  };

  //Show form errors
  const showError = (field: HTMLElement) => {
    const errorElement = field.nextElementSibling as HTMLInputElement;
    if (errorElement && errorElement.type === "radio") {
      errorElement.checked = true;
    }
    field.classList.add("!border-error");
  };
}

function handleRequiredSelect(elementName: string) {
  const selectElement = document.querySelector(
    `[name="${elementName}"]`,
  ) as HTMLSelectElement;
  const errorElement = selectElement?.nextElementSibling as HTMLInputElement;

  if (!selectElement || !errorElement) return;

  const isInvalid = ["", "default"].includes(selectElement.value);
  errorElement.checked = isInvalid;
  selectElement.classList.toggle("!border-error", isInvalid);
}

function handleRequiredField(elementName: string) {
  const field = document.querySelector(
    `[name="${elementName}"]`,
  ) as HTMLSelectElement;
  const errorElement = field?.nextElementSibling as HTMLInputElement;

  if (!field && !errorElement) return;

  const isInvalid = !field.value.trim();
  errorElement.checked = isInvalid;
  field.classList.toggle("!border-error", isInvalid);
}

export default function ContactForm({
  countries,
  subjects,
  textareaProps = {
    characterLimit: 500,
    textareaRows: 8,
  },
  buttonProps,
  errorText = "This field needs to be completed",
}: Props) {
  const inputClass =
    "input w-full rounded border-xs border-neutral text-sm h-11.5";
  const selectClass = "select w-full rounded border-xs border-neutral text-sm";
  const labelClass = "text-xs font-semibold text-secondary";
  const { characterLimit, textareaRows } = textareaProps;

  return (
    <>
      <form
        class="flex flex-col"
        hx-sync="this:replace"
        hx-trigger="submit"
        hx-target="this"
        hx-indicator="this"
        hx-disabled-elt="this"
        hx-swap="outerHTML"
        hx-post={useComponent<Props>(import.meta.url, {
          countries,
          subjects,
          textareaProps,
          buttonProps,
          errorText,
        })}
      >
        <div class="flex flex-col gap-6 mt-12 max-w-[687px] outline-0">
          {/* Country Select field */}
          <div class="form-control md:max-w-[333px]">
            <label class={labelClass}>
              Country*
            </label>
            <select
              class={selectClass}
              name="country"
              data-required
              hx-on:change={useScript(handleRequiredSelect, "country")}
            >
              <option value="default" default>Select the country</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            <ErrorComponent name={"countryControl"} text={errorText} />
          </div>

          <div class="flex flex-col gap-6 md:flex-row md:gap-5">
            {/* Product Code field */}
            <div class="form-control w-full">
              <label class={labelClass}>
                Product code / Model number
              </label>
              <input
                type="text"
                placeholder="Insert the product code/model number"
                class={inputClass}
                name="serialNumber"
              />
            </div>
            {/* Subject Select field */}
            <div class="form-control w-full">
              <label class={labelClass}>
                Subject
              </label>
              <select class={selectClass} name="subject">
                <option value="default" default>
                  Select the subject
                </option>
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* Message Textarea */}
          <div class="form-control">
            <label class={labelClass}>
              Message
            </label>
            <textarea
              class="textarea w-full rounded-sm border border-neutral text-sm"
              placeholder="Insert the message"
              maxLength={characterLimit}
              rows={textareaRows}
              name="message"
              id="messageTextarea"
            >
            </textarea>
            <label id="charCount" class={clx(labelClass, "self-end")}>
              0/{characterLimit}
            </label>
          </div>
          <span class="text-secondary font-bold md:mt-6">Personal data</span>
          {/* Personal data section */}
          <div class="flex flex-col max-md:gap-6 md:grid md:grid-cols-2 md:gap-y-5 md:gap-x-6">
            {/* Name field */}
            <div class="form-control">
              <label class={labelClass}>
                Name*
              </label>
              <input
                type="text"
                placeholder="Insert your name"
                class={inputClass}
                name="personName"
                data-required
                hx-on:input={useScript(handleRequiredField, "personName")}
              />
              <ErrorComponent name={"nameControl"} text={errorText} />
            </div>
            {/* Surname field */}
            <div class="form-control">
              <label class={labelClass}>
                Surnames*
              </label>
              <input
                type="text"
                placeholder="Insert your surnames"
                class={inputClass}
                name="personSurname"
                data-required
                hx-on:input={useScript(handleRequiredField, "personSurname")}
              />
              <ErrorComponent name={"surnameControl"} text={errorText} />
            </div>
            {/* Email field */}
            <div class="form-control">
              <label class={labelClass}>
                Email*
              </label>
              <input
                type="email"
                placeholder="Insert your surnames"
                class={inputClass}
                name="personEmail"
                data-required
                hx-on:input={useScript(handleRequiredField, "personEmail")}
              />
              <ErrorComponent name={"mailControl"} text={errorText} />
            </div>
            {/* Confirm Email field */}
            <div class="form-control">
              <label class={labelClass}>
                Confirm email*
              </label>
              <input
                type="text"
                placeholder="Insert your surnames"
                class={inputClass}
                name="personConfirmEmail"
                data-required
                hx-on:input={useScript(
                  handleRequiredField,
                  "personConfirmEmail",
                )}
              />
              <ErrorComponent name={"confirmMailControl"} text={errorText} />
            </div>
            {/* Confirm Phone number */}
            <div class="form-control">
              <label class={labelClass}>
                Contact phone number
              </label>
              <input
                type="text"
                placeholder="Insert your surnames"
                class={inputClass}
                name="personPhone"
              />
            </div>
          </div>
        </div>
        <hr class="hidden md:block md:w-full border-base-200 mt-10" />
        <button
          type="submit"
          class={clx(
            "btn btn-ghost px-6.5 min-h-10.5 max-h-10.5 mt-12 md:mt-6",
            "font-semibold text-sm w-full",
            "[&_section]:contents",
            "self-center md:self-end md:max-w-[242px]",
            TEXT_COLORS[buttonProps?.fontColor ?? "white"],
            BG_COLORS[buttonProps?.color ?? "primary"],
            buttonProps?.borderColor
              ? BORDER_COLORS[buttonProps.borderColor]
              : "",
            buttonProps?.borderWidth && buttonProps.borderWidth !== "0"
              ? BORDER_CLASSES.full[buttonProps.borderWidth]
              : "",
            buttonProps?.hoverColor
              ? HOVER_BG_COLORS[buttonProps.hoverColor]
              : "",
          )}
        >
          <span class="inline [.htmx-request_&]:hidden">
            {buttonProps?.text ?? "Send message"}
          </span>
          <span class="loading loading-spinner hidden [.htmx-request_&]:block" />
        </button>
      </form>
      <script
        dangerouslySetInnerHTML={{ __html: useScript(script, characterLimit) }}
      />
    </>
  );
}

function ErrorComponent({ name, text }: { name: string; text: string }) {
  return (
    <>
      <input
        type="radio"
        class="hidden peer"
        name={name}
      />
      <label
        for={name}
        class="hidden peer-checked:flex flex-row gap-1.5 text-error items-center"
      >
        <Icon id="error-frigidaire" size={16} width={16} height={16} />
        <span class="text-xs">
          {text}
        </span>
      </label>
    </>
  );
}

export async function action(props: Props, req: Request, ctx: AppContext) {
  const form = await req.formData();
  const formDataObject = Object.fromEntries(form) as SubmitContactFormProps;
  await ctx.invoke(
    "site/actions/contact/submit.ts",
    formDataObject,
  );

  return props;
}
