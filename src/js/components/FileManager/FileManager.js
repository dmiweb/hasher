export default class FileManager {
  constructor(root, widgetHasher, widgetFileUpload, worker) {
    this.root = root;
    this.widgetHasher = widgetHasher;
    this.widgetFileUpload = widgetFileUpload;
    this.worker = worker;

    this.file = null;

    this.handlerDragover = this.handlerDragover.bind(this);
    this.getDropFile = this.getDropFile.bind(this);
    this.handlerInputFile = this.handlerInputFile.bind(this);
    this.sendFileToWorker = this.sendFileToWorker.bind(this);
  }

  bindToDOM() {
    this.widgetHasher.render(this.root);

    const container = this.root.querySelector(
      ".widget-hasher__widget-file-upload"
    );

    this.widgetFileUpload.render(container);
  }

  handlerDragover(e) {
    e.preventDefault();

    const overlapElement = this.root.querySelector(".file-container__overlap");

    if (e.target.classList.contains("file-container__overlap")) {
      overlapElement.classList.add("file-container__overlap_hover");
    } else {
      overlapElement.classList.remove("file-container__overlap_hover");
    }
  }

  getDropFile(e) {
    e.preventDefault();

    const overlapElement = document.querySelector(".file-container__overlap");
    overlapElement.classList.remove("file-container__overlap_hover");

    if (e.target !== overlapElement) return;

    this.file = e.dataTransfer.files && e.dataTransfer.files[0];

    this.sendFileToWorker();
  }

  handlerInputFile() {
    const fileInput = document.querySelector(".file-container__input");

    fileInput.dispatchEvent(new MouseEvent("click"));

    fileInput.addEventListener("change", () => {
      if (fileInput.files && fileInput.files[0]) {
        this.file = fileInput.files[0];

        fileInput.value = null;

        this.sendFileToWorker(null);
      }
    });
  }

  sendFileToWorker(e) {
    if (!this.file) return;

    const defaultMenuValue = this.widgetHasher.getMenuValue();
    const changeMenuValue = e && e.target.value;

    const algorithm = changeMenuValue || defaultMenuValue;

    const data = {
      file: this.file,
      algorithm: algorithm,
    };

    this.worker.postMessage(data);
  }

  init() {
    this.bindToDOM();

    document
      .querySelector(".algorithm-menu")
      .addEventListener("change", this.sendFileToWorker);

    this.root
      .querySelector(".file-container")
      .addEventListener("click", this.handlerInputFile);

    this.root.addEventListener("dragover", this.handlerDragover);
    this.root.addEventListener("drop", this.getDropFile);

    this.worker.addEventListener("message", this.widgetHasher.showHash);
  }
}
