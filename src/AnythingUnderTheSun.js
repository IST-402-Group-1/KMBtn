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

      :host([play]) button {
        color: white;
        background-color: red;
        cursor: wait;
      }

      :host([dark]) button {
        color: white;
        background-color: black;
      }

      :host([dark]) button:hover,
      :host([dark]) button:focus {
        color: white;
        background-color: green;
      }

      :host([disabled]) button,
      :host([disabled]) button:hover,
      :host([disabled]) button:focus {
        color: white;
        background-color: red;
      }

      /*disables icon when button is disabled*/
      :host([disabled]) simple-icon-lite {
        pointer-events: none;
      }

      button {
        border-radius: 20px;
        border-width: 1px;
        text-decoration: none;
        background-color: lightgrey;
        padding: 15px 25px 15px 25px;
        font-size: 20px;
        color: black;
        transition: all 0.2s ease-in-out;
      }

      button:hover,
      button:focus {
        color: white;
        background-color: green;
      }      

      button:active {
        color: white;
        background-color: green;
      }
    `;
  }

  static get properties() {
    return {
      link: { type: String },
      title: { type: String },
      icon: { type: String },
      disabled: { type: Boolean, reflect: true },
      play: { type: Boolean, reflect: true },
      dark: { type: Boolean, reflect: true },
    };
  }

  constructor() {
    super();
    this.link = 'https://www.google.com/';
    this.title = 'Meme';
    this.icon = 'av:volume-mute';
    this.disabled = false;
    //default audio
    this.soundList = 
      [
        //bruh
        'https://www.myinstants.com/media/sounds/movie_1.mp3',
        //okay
        'https://www.myinstants.com/media/sounds/my-song-2_2.mp3',
        //youre not that guy
        'https://www.myinstants.com/media/sounds/youre-not-that-guy-full.mp3',
      ];
    
    this.play = false;

    this.__audio = new Audio();

    //runs when audio finishes
    this.__audio.onended = () => {
      this.play = false;

      //opens link in new tab
      window.open(this.link, '_blank', 'noopener, noreferrer');
    }

    //loads only the audios loaded with tag
    if (this.querySelectorAll('audio[src]').length) {
      // empty original
      this.soundList = [];
      // loop through audio tags we found
      this.querySelectorAll('audio[src]').forEach(node => {
        // log just so we can see the node
        console.log(node);
        // steal the src off of this element and push it into the array
        this.soundList.push(node.getAttribute('src'));
        // remove the node from the DOM, it served its purpose
        node.remove();
      });
    }
  }

  firstUpdated() {
    // store the initial icon value as a temporary old value for use later
    this._oldIcon = this.icon;
  }

  updated(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      if (propName === 'play') {
        if (this.play) {
          // disable to prevent F spamming
          this.disabled = true;

          // set old icon as a tempory value
          this._oldIcon = this.icon;

          // icon chagnes to showis playing sound
          this.icon = 'av:volume-up';

          this.playSound();
        }
        else if (oldValue !== undefined) {
          // enable the button again
          this.disabled = false;
          
          // set the icon back to what it was
          this.icon = this._oldIcon;

          setTimeout(() => {
            this.shadowRoot.querySelector('button').focus();
          }, 0);
        }
      }
    });
  }

  //grabs random sound from list and plays
  playSound() {
    const randNum = Math.floor(Math.random() * this.soundList.length);

    console.log(randNum);
    this.__audio.src = this.soundList[randNum];
    this.__audio.play();
  }

  //click event
  //sets play state for rest of functions to run
  __click() {
    this.play = true;
  }

  //dont include href since window.open is set in constructor instead
  render() {
    return html`
      <a @click="${this.__click}" tabindex="-1">
        <button ?disabled="${this.disabled}">
          ${this.title}
          ${this.icon
            ? html`<simple-icon-lite icon="${this.icon}"></simple-icon-lite>`
            : ``}
          <slot></slot>
        </button>
      </a>
    `;
  }
}
