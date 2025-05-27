import { LogIn } from "lucide-preact";
import { useState } from "preact/hooks";
import { Fragment } from "preact/jsx-runtime";
import toast from "react-hot-toast";

function chek_input() {
  return new Promise((resolve, reject) => {
    const formData = new FormData(document.querySelector("#login"));

    if (!formData.get("username")) return reject("Input username kosong!");
    if (!formData.get("password")) return reject("Input password kosong!");
    if (!formData.get("g-recaptcha-response")) return reject("Silahkan selesaikan captcha terlebih dahulu");

    resolve(true);
  });
}

export default function LoginButton() {
  const [loading, setLoading] = useState(false);

  const btnHandler = () => {
    if (loading) return;
    console.log("handeled");

    chek_input()
      .then(() => {
        (document.querySelector("#login") as HTMLFormElement).submit();
        setLoading(true);
      })
      .catch((msg) => {
        toast.error(msg);
      });
  };
  return (
    <Fragment>
      <button type="button" className="btn btn-primary btn-block" onClick={btnHandler}>
        {loading ? (
          <div class="loader">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        ) : (
          <div>
            <LogIn size={16} /> Login
          </div>
        )}
      </button>

      <style>
        {`/* From Uiverse.io by catraco */ 
.loader {
  --color: #ffffff;
  --size: 30px;
  width: var(--size);
  height: var(--size);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2px;
}

.loader span {
  width: 100%;
  height: 100%;
  background-color: var(--color);
  animation: keyframes-blink .5s alternate infinite linear;
}

.loader span:nth-child(1) {
  animation-delay: 0ms;
}

.loader span:nth-child(2) {
  animation-delay: 150ms;
}

.loader span:nth-child(3) {
  animation-delay: 150ms;
}

.loader span:nth-child(4) {
  animation-delay: 280ms;
}

@keyframes keyframes-blink {
  0% {
    opacity: 0.5;
    transform: scale(0.5) rotate(20deg);
  }

  50% {
    opacity: 1;
    transform: scale(1);
  }
}`}
      </style>
    </Fragment>
  );
}
