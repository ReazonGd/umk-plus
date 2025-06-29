import { Book, FileText, House, LogIn, Puzzle } from "lucide-preact";
import CheckBoxControl from "../small/chekbox-control";
import { useConfigContext } from "../contex/config";

const FEATURES = [
  {
    key: "login_page",
    name: "login",
    description: "menambahkan handle pada form login",
    icon: <LogIn size={16} />,
  },
  {
    key: "my_page",
    name: "Dashboard",
    description: "menambahkan Dashboard pada halaman /my",
    icon: <House size={16} />,
  },
  {
    key: "course_view_page",
    name: "Course",
    description: "ringkasan singkat pada setiap course",
    icon: <Book size={16} />,
  },
  {
    key: "pdf_preview",
    name: "PDF viewer",
    description: "Membuka pdf viewer bawaan browser dis setiap link berisi '.pdf'",
    icon: <FileText size={16} />,
  },
] as const;

export default function ControlZone() {
  const [config, updateConfig] = useConfigContext();

  if (!config) return <p>Loading...</p>;

  const toggleFeature = (key: keyof typeof config.pages_script) => {
    updateConfig({
      ...config,
      pages_script: {
        ...config.pages_script,
        [key]: !config.pages_script[key],
      },
    });
  };

  return (
    <div className="container-check">
      <p>
        <Puzzle size={16} />
        &nbsp;
        <span>FITUR</span>
      </p>

      {FEATURES.map(({ key, name, description, icon }) => (
        <CheckBoxControl key={key} name={name} description={description} isActive={config.pages_script[key]} onCLick={() => toggleFeature(key)}>
          {icon}
        </CheckBoxControl>
      ))}
    </div>
  );
}
