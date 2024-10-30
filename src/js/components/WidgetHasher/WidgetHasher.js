import "./WidgetHasher.css";

export default class WidgetHasher {
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
