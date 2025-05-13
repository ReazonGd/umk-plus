import { Image } from "lucide-preact";
import useLocalExtensionStorage from "../../../utils/useLocalExtensionStorage";
import StatInfo from "../small/stat-info";
import { classData, CalenderEvent } from "../../../type";

export default function Stat({ classList, tasks }: { classList: classData[]; tasks: CalenderEvent[] }) {
  const [image, setImage] = useLocalExtensionStorage("image-stat", "", "https://i.pinimg.com/736x/e1/92/92/e1929208c65da14fb828310c431f5d77.jpg");

  const handleChageImage = () => {
    const url = prompt("Enter the image URL", image);
    if (url) {
      setImage(url);
    }
  };

  const all_class_has_progress = classList.filter((cls) => cls.hasprogress);
  const all_class_has_progress_progress = all_class_has_progress.reduce((acc, curr) => {
    return acc + (curr.progress ?? 0);
  }, 0);
  const progress_percentage = Math.round((all_class_has_progress_progress / (all_class_has_progress.length * 100)) * 100);

  return (
    <div className="stat-container column">
      <div className="images" style={{ backgroundImage: `url(${image})` }}>
        <button className="chage-image" onClick={handleChageImage}>
          <Image size={16} />
        </button>
        <div className="stat column">
          <div className="row">
            <div className="row">
              <h4>{progress_percentage}%</h4>
              <div className="column gap-0  ">
                <p>My course</p>
                <p>Progress</p>
              </div>
            </div>
            <div className="row">
              <h4>{tasks.length}</h4>
              <div className="column gap-0">
                <p>Task</p>
                <p>is due</p>
              </div>
            </div>
          </div>
          <div className="progress" style={{ "--progress-width": `${progress_percentage}%` }}>
            <div className="progress-bar"></div>
          </div>
        </div>
      </div>
      <StatInfo />
    </div>
  );
}
