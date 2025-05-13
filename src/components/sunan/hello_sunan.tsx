import { useEffect, useState } from "preact/hooks";
import { Fragment } from "preact/jsx-runtime";

export function HelloSunan() {
  const [isLoged, setIsLoged] = useState(false);
  useEffect(() => {
    const have_profile_element = document.querySelector(".text-username.menu-action");
    if (have_profile_element) {
      setIsLoged(true);
    }
  }, []);
  return (
    <div className="card">
      <div className="card-body">
        <h4>UMK+</h4>
        <hr />
        <br />
        <p>Quick Links</p>
        <ul>
          {isLoged ? (
            <Fragment>
              <li>
                <a href="https://sunan.umk.ac.id/my">Dashboard</a>
              </li>
              <li>
                <a href="https://kanal.umk.ac.id/mahasiswa/jadwalkuliah">Update Schedule</a>
              </li>
            </Fragment>
          ) : (
            <li>
              <a href="https://sunan.umk.ac.id/login">login</a>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
