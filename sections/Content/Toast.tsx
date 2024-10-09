import { TOAST_ID } from "../../constants.tsx";

export default function Toast() {
  return <div id={TOAST_ID} class="fixed z-50" />;
}
