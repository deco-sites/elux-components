import { clx } from "../../sdk/clx.ts";

export interface Props {
  countries: string[];
  subjects: string[];
}

export default function ContactForm({ countries, subjects }: Props) {
  const inputClass =
    "input w-full rounded border border-neutral text-sm h-11.5";
  const selectClass = "select w-full rounded border border-neutral text-sm";
  const labelClass = "text-xs font-semibold text-secondary";
  const characterLimit = 500;
  const textareaRows = 8;
  return (
    <form class="flex flex-col max-w-[687px] gap-6 mt-12">
      <div class="form-control">
        <label class={labelClass}>
          Country*
        </label>
        <select class={selectClass} required name="country">
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>
      <div class="form-control">
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
      <div class="form-control">
        <label class={labelClass}>
          Subject
        </label>
        <select class={selectClass} name="subject">
          <option value="" disabled default>
            Select the subject
          </option>
          {subjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </div>
      <div class="form-control">
        <label class={labelClass}>
          Message
        </label>
        <textarea
          class="textarea w-full rounded-sm border border-neutral text-sm"
          placeholder="Insert the message"
          maxLength={characterLimit}
          rows={textareaRows}
          required
          name="message"
        >
        </textarea>
        <label class={clx(labelClass, "self-end")}>
          0/{characterLimit}
        </label>
      </div>
      <span class="text-secondary font-bold">Personal data</span>
      <div class="form-control">
        <label class={labelClass}>
          Name*
        </label>
        <input
          type="text"
          placeholder="Insert your name"
          class={inputClass}
          required
          name="personName"
        />
      </div>
      <div class="form-control">
        <label class={labelClass}>
          Surnames*
        </label>
        <input
          type="text"
          placeholder="Insert your surnames"
          class={inputClass}
          required
          name="personSurname"
        />
      </div>
      <div class="form-control">
        <label class={labelClass}>
          Email*
        </label>
        <input
          type="text"
          placeholder="Insert your surnames"
          class={inputClass}
          required
          name="personEmail"
        />
      </div>
      <div class="form-control">
        <label class={labelClass}>
          Confirm email*
        </label>
        <input
          type="text"
          placeholder="Insert your surnames"
          class={inputClass}
          required
          name="personConfirmEmail"
        />
      </div>
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
    </form>
  );
}
