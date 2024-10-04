import { NAVBAR_HEIGHT_DESKTOP } from "../../constants.tsx";
import type { Department } from "../../loaders/menu.ts";
import { clx } from "../../sdk/clx.ts";
import Column from "./Collum.tsx";
function NavItem(
  { title, collums, link, isBlank, color }: Department,
) {
  return (
    <li class="group flex items-center justify-center h-full relative w-[182px]">
      <a
        href={link}
        class={clx(
          "text-base font-normal leading-none h-7 flex items-center",
        )}
        style={{ color: color }}
        target={isBlank ? "_blank" : "_self"}
        rel={isBlank ? "noopener noreferrer" : ""}
      >
        <p class="leading-none text-[#323333] font-semibold text-sm">{title}</p>
      </a>

      {collums && collums.length > 0 && (
        <div
          class="absolute hidden hover:flex group-hover:flex bg-white z-40 items-start justify-start gap-6 top-0 left-0"
          style={{ marginTop: NAVBAR_HEIGHT_DESKTOP }}
        >
          <ul class="flex items-start justify-start p-6 gap-4">
            {collums.map((column) => <Column {...column} />)}
          </ul>
        </div>
      )}
    </li>
  );
}

export default NavItem;
