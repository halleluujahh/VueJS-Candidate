/**
  * Hiển thị toast.
  * @param {{type?:'success'|'error'|'info'|'warning', message:string, duration?:number}} opts - Cấu hình toast.
  * @returns {void}
  * Created By hanv 24/12/2025
  */
const Toast = {
  install(app) {
    app.config.globalProperties.$toast = function (type = 'info', message, duration = 3000) {
      let el = document.getElementById("misaToastContainer");
      if (!el) {
        el = document.createElement("div");
        el.id = "misaToastContainer";
        el.className = "misa-toast-container";
        document.body.appendChild(el);
      }
      const toast = document.createElement("div");
      toast.className = `misa-toast misa-toast--${type}`;
      toast.setAttribute("role", "status");
      toast.setAttribute("aria-live", "polite");

      // NEW: icon
      const icon = document.createElement("div");
      icon.className = "misa-toast__icon";
      icon.setAttribute("aria-hidden", "true");

      const text = document.createElement("div");
      text.className = "misa-toast__message";
      text.textContent = message;

      toast.appendChild(icon);
      toast.appendChild(text);

      el.appendChild(toast);

      if (duration > 0) {
        window.setTimeout(() => toast.remove(), duration);
      }
    };
  }
};

export default Toast;