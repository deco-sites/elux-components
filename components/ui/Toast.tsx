import { useId } from "../../sdk/useId.ts";
import { clx } from "../../sdk/clx.ts";
import Icon from "../ui/Icon.tsx";
import { useScript } from "@deco/deco/hooks";
interface Props {
  /**
      @title Texto exibido
      */
  text: string;
  /**
      @title Tempo sendo mostrado (segundos)
      */
  time: number;
  type: "success" | "error";
}
export type ToastProps = Props;
const onLoad = (id: string, time: number) => {
  const element = document.getElementById(id);
  if (element) {
    //Set toast-show only after 200ms - it turns opacity 1
    setTimeout(() => {
      element.classList.add("toast-show");
    }, 200);
    setTimeout(() => {
      element.classList.remove("toast-show");
      element.classList.add("toast-hide");
      setTimeout(() => {
        element.remove();
      }, 200);
    }, time * 1000);
  }
};
const closeElement = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.classList.remove("toast-show");
    element.classList.add("toast-hide");
    setTimeout(() => {
      element.remove();
    }, 200);
  }
};
export default function TooltipAddButton({ text, time, type }: Props) {
  const id = useId();
  return (
    <div
      id={id}
      class={clx(
        "absolute flex flex-row -bottom-h-screen",
        "w-screen h-12.5 items-center px-4 justify-between",
        "text-xs font-medium text-white",
        "sm:w-72 sm:rounded sm:m-8 sm:text-sm toast-shadow",
        "transition-all duration-300 ease-in-out",
        "transform translate-y-full opacity-0",
        type === "success" ? "bg-success" : "bg-error",
      )}
    >
      <span>{text}</span>
      <button hx-on:click={useScript(closeElement, id)}>
        <Icon
          id="close-frigidaire"
          width={16}
          height={16}
          size={16}
          class="text-white"
        />
      </button>
      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: useScript(onLoad, id, time),
        }}
      />
    </div>
  );
}
