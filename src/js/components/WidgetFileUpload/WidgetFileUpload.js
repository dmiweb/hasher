import "./WidgetFileUpload.css";

export default class WidgetFileUpload {
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
