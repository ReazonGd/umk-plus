import { log } from "./debug-log";

export function form_fetch(form: HTMLFormElement) {
  const form_data = new FormData(form);
  const data_string = JSON.stringify(Object.fromEntries(form_data));

  if (!form.action) return log("cant do form fetch. the action is empty");
  return fetch(form.action, {
    body: data_string,
    method: form.method,
  });
}
