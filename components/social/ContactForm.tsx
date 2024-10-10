import { useScript } from "@deco/deco/hooks";
import { clx } from "../../sdk/clx.ts";
import {
  ErrorProps,
  TextareaProps,
} from "../../sections/Social/ContactForm.tsx";
import Icon from "../ui/Icon.tsx";
import { ButtonProps } from "../../sdk/types.ts";
import {
  BG_COLORS,
  BORDER_CLASSES,
  BORDER_COLORS,
  HOVER_BG_COLORS,
  LANGUAGE_DIFFS,
  TEXT_COLORS,
} from "../../constants.tsx";
import { useComponent } from "../../sections/Component.tsx";
import { SubmitContactFormProps } from "../../packs/types.ts";
import { AppContext } from "../../apps/site.ts";
import { useToast } from "../../sdk/useToast.ts";

export interface Props {
  countries: string[];
  subjects: string[];
  textareaProps?: TextareaProps;
  errorMessages?: ErrorProps;
  buttonProps?: ButtonProps;
  displayToast?: "success" | "error";
  language: "ES" | "EN";
}

function script(charLimit: number) {
  const form = document.querySelector("form");
  const textarea = document.getElementById("messageTextarea") as
    | HTMLInputElement
    | null;
  const charCountLabel = document.getElementById("charCount");
  const submitButton = document.querySelector('button[type="submit"]');
  const emailField = document.querySelector('[name="personEmail"]') as
    | HTMLInputElement
    | null;
  const confirmEmailField = document.querySelector(
    '[name="personConfirmEmail"]',
  ) as HTMLInputElement | null;

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

  // Add email matching validation
  const validateEmails = () => {
    const inputController = document.getElementById(
      "confirmMailControlMessage",
    ) as HTMLInputElement;
    if (emailField!.value !== confirmEmailField!.value) {
      inputController.checked = true;
    } else {
      inputController.checked = false;
    }
  };

  //Add event listeners to email inputs
  if (emailField && confirmEmailField) {
    emailField.addEventListener("input", validateEmails);
    confirmEmailField.addEventListener("input", validateEmails);
  }

  //Validate the form before send
  const validateForm = () => {
    const requiredFields = document.querySelectorAll("[data-required]");
    const allFields = Array.from(requiredFields).reduce((isValid, field) => {
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

    if (emailField && confirmEmailField) {
      const inputController = document.getElementById(
        "confirmMailControlMessage",
      ) as HTMLInputElement;
      if (emailField.value.trim() !== confirmEmailField.value.trim()) {
        inputController.checked = true;
        return false;
      } else {
        inputController.checked = false;
      }
    }

    return allFields;
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
  ) as HTMLInputElement;
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
  errorMessages = {
    requiredFieldText: "This field needs to be completed",
    mustBeEqualEmailField: "Email must be equal",
  },
  displayToast,
  language,
}: Props) {
  const inputClass =
    "input w-full rounded border-xs border-neutral text-sm h-11.5";
  const selectClass = "select w-full rounded border-xs border-neutral text-sm";
  const labelClass = "text-xs font-semibold text-secondary";
  const { characterLimit, textareaRows } = textareaProps;
  const { requiredFieldText, mustBeEqualEmailField } = errorMessages;
  const { contactForm } = LANGUAGE_DIFFS[language];
  const toast = displayToast
    ? displayToast === "success"
      ? useToast({
        text: "Formulario de contacto enviado!",
        time: 5,
        trigger: "load",
        type: "success",
      })
      : useToast({
        text: "No se pudo enviar el formulario",
        time: 5,
        trigger: "load",
        type: "error",
      })
    : undefined;

  return (
    <div
      {...toast}
    >
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
          errorMessages,
          language,
        })}
      >
        <div class="flex flex-col gap-6 mt-12 max-w-[687px] outline-0">
          {/* Country Select field */}
          <div class="form-control md:max-w-[333px]">
            <label class={labelClass}>
              {contactForm.country.label}
            </label>
            <select
              class={selectClass}
              name="country"
              data-required
              hx-on:change={useScript(handleRequiredSelect, "country")}
            >
              <option value="default" default>
                {contactForm.country.placeholder}
              </option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            <ErrorComponent name={"countryControl"} text={requiredFieldText!} />
          </div>

          <div class="flex flex-col gap-6 md:flex-row md:gap-5">
            {/* Product Code field */}
            <div class="form-control w-full">
              <label class={labelClass}>
                {contactForm.productCode.label}
              </label>
              <input
                type="text"
                placeholder={contactForm.productCode.placeholder}
                class={inputClass}
                name="serialNumber"
              />
            </div>
            {/* Subject Select field */}
            <div class="form-control w-full">
              <label class={labelClass}>
                {contactForm.subject.label}
              </label>
              <select class={selectClass} name="subject">
                <option value="default" default>
                  {contactForm.subject.placeholder}
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
              {contactForm.message.label}
            </label>
            <textarea
              class="textarea w-full rounded-sm border border-neutral text-sm"
              placeholder={contactForm.message.placeholder}
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
          <span class="text-secondary font-bold md:mt-6">
            {contactForm.label}
          </span>
          {/* Personal data section */}
          <div class="flex flex-col max-md:gap-6 md:grid md:grid-cols-2 md:gap-y-5 md:gap-x-6">
            {/* Name field */}
            <div class="form-control">
              <label class={labelClass}>
                {contactForm.name.label}
              </label>
              <input
                type="text"
                placeholder={contactForm.name.placeholder}
                class={inputClass}
                name="personName"
                data-required
                hx-on:input={useScript(handleRequiredField, "personName")}
              />
              <ErrorComponent name={"nameControl"} text={requiredFieldText!} />
            </div>
            {/* Surname field */}
            <div class="form-control">
              <label class={labelClass}>
                {contactForm.surnames.label}
              </label>
              <input
                type="text"
                placeholder={contactForm.surnames.placeholder}
                class={inputClass}
                name="personSurname"
                data-required
                hx-on:input={useScript(handleRequiredField, "personSurname")}
              />
              <ErrorComponent
                name={"surnameControl"}
                text={requiredFieldText!}
              />
            </div>
            {/* Email field */}
            <div class="form-control">
              <label class={labelClass}>
                {contactForm.email.label}
              </label>
              <input
                type="email"
                placeholder={contactForm.email.placeholder}
                class={inputClass}
                name="personEmail"
                data-required
                hx-on:input={useScript(handleRequiredField, "personEmail")}
              />
              <ErrorComponent name={"mailControl"} text={requiredFieldText!} />
            </div>
            {/* Confirm Email field */}
            <div class="form-control">
              <label class={labelClass}>
                {contactForm.confirmEmail.label}
              </label>
              <input
                type="text"
                placeholder={contactForm.confirmEmail.placeholder}
                class={inputClass}
                name="personConfirmEmail"
                data-required
                hx-on:input={useScript(
                  handleRequiredField,
                  "personConfirmEmail",
                )}
              />
              <ErrorComponent
                name={"confirmMailControl"}
                text={requiredFieldText!}
              />
              <ErrorComponent
                id="confirmMailControlMessage"
                name={"confirmMailControlMessage"}
                text={mustBeEqualEmailField!}
              />
            </div>
            {/* Confirm Phone number */}
            <div class="form-control">
              <label class={labelClass}>
                {contactForm.phone.label}
              </label>
              <input
                type="text"
                placeholder={contactForm.phone.placeholder}
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
    </div>
  );
}

function ErrorComponent(
  { name, text, id }: { name: string; text: string; id?: string },
) {
  return (
    <>
      <input
        type="radio"
        class="hidden peer"
        name={name}
        id={id}
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
  const formResult = await ctx.invoke(
    "site/actions/contact/submit.ts",
    { ...formDataObject, status: "submitted" },
  );

  return {
    ...props,
    ...formResult.success
      ? { displayToast: "success" }
      : { displayToast: "error" },
  };
}
