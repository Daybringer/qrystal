(function () {
  let darkSwitch = document.getElementById("darkSwitch");
  if (darkSwitch) {
    initTheme();
    darkSwitch.addEventListener("change", function (event) {
      resetTheme();
    });
    function initTheme() {
      if (localStorage.getItem("first") === null) localStorage.setItem("darkSwitch", "dark");
      let darkThemeSelected =
        localStorage.getItem("darkSwitch") !== null ||
        localStorage.getItem("darkSwitch") === "dark";
      darkSwitch.checked = darkThemeSelected;
      darkThemeSelected
        ? document.body.setAttribute("data-theme", "dark")
        : document.body.removeAttribute("data-theme");
    }
    function resetTheme() {
      if (darkSwitch.checked) {
        document.body.setAttribute("data-theme", "dark");
        localStorage.setItem("darkSwitch", "dark");
      } else {
        localStorage.setItem("first", "set");
        document.body.removeAttribute("data-theme");
        localStorage.removeItem("darkSwitch");
      }
    }
  }
})();