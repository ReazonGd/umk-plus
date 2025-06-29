import { JSXInternal } from "preact/src/jsx";

export default function CheckBoxControl({ children, name, isActive, description, onCLick }: { children: JSXInternal.Element; name: string; isActive: boolean; onCLick: () => void; description: string }) {
  return (
    <div class="container" onClick={onCLick}>
      <input type="checkbox" hidden checked={isActive} />
      <div class="icon">{children}</div>
      <div class="label">
        <h4>{name}</h4>
        <p>{description}</p>
      </div>
      <div class="checkmark"></div>
    </div>
  );
}
