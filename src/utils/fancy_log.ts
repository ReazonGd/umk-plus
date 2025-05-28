export default function Mlog(...msg: any) {
  console.log("%c[umk+]", "color: #2658a5", ...msg);
}
export function Merror(...msg: any) {
  console.error("%c[umk+]", "color: #f30606", ...msg);
}
