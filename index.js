/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

;// CONCATENATED MODULE: ./src/js/components/WidgetHasher/WidgetHasher.js

class WidgetHasher {
  constructor() {
    // this.showHash = this.showHash.bind(this);
  }
  static get markup() {
    return `
      <div class="widget-hasher">
        <h2 class="widget-hasher__title">Hasher</h2>
        <div class="widget-hasher__widget-file-upload"></div>
        <div class="widget-hasher__select-algorithm select-algorithm">
          <span class="select-algorithm__title">Hash Algorithm:</span>
          <select name="name" class="select-algorithm__menu algorithm-menu">
            <option class="algorithm-menu__item">MD5</option>
            <option class="algorithm-menu__item">SHA1</option>
            <option class="algorithm-menu__item">SHA256</option>
            <option class="algorithm-menu__item">SHA512</option>
          </select>
        </div>
      </div>
      <div class="calculated-hash">
        <div class="calculated-hash__title">Calculated Hash</div>
        <div class="calculated-hash__hash">XXXXXXXXXXXXXXXX</div>
      </div>
    `;
  }
  render(container) {
    container.insertAdjacentHTML("afterBegin", WidgetHasher.markup);
  }
  getMenuValue() {
    const menu = document.querySelector(".algorithm-menu");
    return menu.value;
  }
  showHash(e) {
    const hashElement = document.querySelector(".calculated-hash__hash");
    hashElement.innerHTML = "";
    hashElement.textContent = e.data;
  }
}
;// CONCATENATED MODULE: ./src/js/components/WidgetFileUpload/WidgetFileUpload.js

class WidgetFileUpload {
  static get markup() {
    return `
      <div class="file-container">
        <input type="file" class="file-container__input">
        <div class="file-container__overlap overlap-content">
          <span class="overlap-content__text">Drop files here</span>
          <span class="overlap-content__text">or</span>
          <span class="overlap-content__text">Click to select</span>
        </div>          
      </div>
    `;
  }
  render(container) {
    container.insertAdjacentHTML("beforeEnd", WidgetFileUpload.markup);
  }
}
;// CONCATENATED MODULE: ./src/js/components/FileManager/FileManager.js
class FileManager {
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
    const container = this.root.querySelector(".widget-hasher__widget-file-upload");
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
      algorithm: algorithm
    };
    this.worker.postMessage(data);
  }
  init() {
    this.bindToDOM();
    document.querySelector(".algorithm-menu").addEventListener("change", this.sendFileToWorker);
    this.root.querySelector(".file-container").addEventListener("click", this.handlerInputFile);
    this.root.addEventListener("dragover", this.handlerDragover);
    this.root.addEventListener("drop", this.getDropFile);
    this.worker.addEventListener("message", this.widgetHasher.showHash);
  }
}
;// CONCATENATED MODULE: ./src/js/app.js



const worker = new Worker("./worker.js");
document.addEventListener("DOMContentLoaded", () => {
  const root = document.querySelector("#root");
  const widgetHasher = new WidgetHasher();
  const widgetFileUpload = new WidgetFileUpload();
  const fileManager = new FileManager(root, widgetHasher, widgetFileUpload, worker);
  fileManager.init();
});
;// CONCATENATED MODULE: ./src/index.js



// TODO: write your code in app.js
/******/ })()
;