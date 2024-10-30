import WidgetHasher from "./components/WidgetHasher/WidgetHasher";
import WidgetFileUpload from "./components/WidgetFileUpload/WidgetFileUpload";
import FileManager from "./components/FileManager/FileManager";

const worker = new Worker("./worker.js");

document.addEventListener("DOMContentLoaded", () => {
  const root = document.querySelector("#root");
  const widgetHasher = new WidgetHasher();
  const widgetFileUpload = new WidgetFileUpload();

  const fileManager = new FileManager(
    root,
    widgetHasher,
    widgetFileUpload,
    worker
  );

  fileManager.init();
});
