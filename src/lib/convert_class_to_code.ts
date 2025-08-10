export default function convert_class_to_code(course_full_name: string) {
  const code = Array.from(course_full_name.match(/\(([^)]+)\)/) ?? [])[1];
  if (code) {
    return code;
  }
  if (course_full_name.startsWith("KW")) {
    const code = Array.from(course_full_name.match(/KW (.*?) Kelas (.*?) (Genap|Ganjil)/) ?? []);
    return code[2];
  }
  return null;
}
