import { html, css, LitElement } from 'lit';
import "@lrnwebcomponents/simple-icon/lib/simple-icon-lite.js";
import "@lrnwebcomponents/simple-icon/lib/simple-icons.js";

export class AnythingUnderTheSun extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 25px;
        color: var(--anything-under-the-sun-text-color, #000);
      }

      button {
        border-radius: 20px;
        border-width: 1px;
        text-decoration: none;
        background-color: lightgrey;
        padding: 15px 25px 15px 25px;
        font-size: 20px;
        color: black;
        transition: 0.2s;
      }

      button:hover, button:focus {
        color: white;
        background-color: green;
        transition: 0.2s;
      }

      button:active {
        background-color: grey;
        color: black;
      }
    `;
  }

  static get properties() {
    return {
      link: { type: String },
      title: { type: String },
      icon: { type: String },
      disabled: { type: Boolean, reflect: true },
      soundList: { type: Array },
    };
  }

  constructor() {
    super();
    this.link = 'https://www.google.com/';
    this.title = 'F***';
    this.icon = false;
    this.disabled = false;
    this.soundList = 
      [
        //sit speak fuck
        '/media/sounds/fuck_s6r02U8.mp3',
        //youre a fucking idiot
        '/media/sounds/youre-a-fucking-idiot.mp3',
        //go fuck yourself
        '/media/sounds/gofuckyourself-copy.mp3',
      ];
  }

  __click(e) {
    // if (this.editMode) {
    //   e.preventDefault();
    //   e.stopPropagation();
    //   e.stopImmediatePropagation();
    // }
    let randNum = Math.floor(Math.random() * this.soundList.length);

    console.log(randNum);
    console.log("https://www.myinstants.com" + this.soundList[randNum]);

    let audio = new Audio("https://www.myinstants.com" + this.soundList[randNum]);
    audio.play();
  }

  render() {
    return html`
      <a 
      @click="${this.__click}">
        <button ?disabled="${this.disabled}">
          ${this.title}
          ${this.icon ? html`<simple-icon-lite icon="${this.icon}"></simple-icon-lite>` : ``}
          <slot></slot>
        </button>
      </a>
    `;
  }
}
