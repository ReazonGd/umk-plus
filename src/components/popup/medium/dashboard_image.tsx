import { Image, Link } from "lucide-preact";
import useLocalExtensionStorage from "../../../utils/hooks/useLocalExtensionStorage";
import { localExtensionStorageName } from "../../../type";

export default function Dashboard_Image() {
  const [image, setImage] = useLocalExtensionStorage(localExtensionStorageName.dashboard_image, "", "https://i.pinimg.com/736x/e1/92/92/e1929208c65da14fb828310c431f5d77.jpg");

  return (
    <div className="dashboard-image">
      <br />
      <p>
        <Image size={16} />
        &nbsp;
        <span>Dashboard Image</span>
      </p>
      <br />
      <div className="image" style={{ backgroundImage: `url('${image}')` }}></div>
      <div className="input-wrap">
        <span>
          <Link size={16} />
        </span>
        <input type="text" onInput={(e) => setImage(e.currentTarget.value)} value={image} />
      </div>
    </div>
  );
}
