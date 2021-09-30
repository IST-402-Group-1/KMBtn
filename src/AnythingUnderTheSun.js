import { html, css, LitElement } from 'lit';
import '@lrnwebcomponents/simple-icon/lib/simple-icon-lite.js';
import '@lrnwebcomponents/simple-icon/lib/simple-icons.js';

export class AnythingUnderTheSun extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 25px;
        color: var(--anything-under-the-sun-text-color, #000);
      }
      /** special styling while we are playing */
      :host([play]) button {
        color: white;
        background-color: red;
        cursor: wait;
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
      play: { type: Boolean, reflect: true },
    };
  }

  constructor() {
    super();
    this._clicked = false;
    this.link = 'https://www.google.com/';
    this.title = 'F***';
    this.icon = false;
    this.disabled = false;
    this.soundList = [
      // sit speak fuck
      'https://www.myinstants.com/media/sounds/fuck_s6r02U8.mp3',
      // youre a fucking idiot
      'https://www.myinstants.com/media/sounds/youre-a-fucking-idiot.mp3',
      // go fuck yourself
      'https://www.myinstants.com/media/sounds/gofuckyourself-copy.mp3',
    ];
    // we are not playing by default
    this.play = false;
    // create an internal variable so that we only have 1 audio instance
    // per web component
    this.__audio = new Audio();
    // audio classes are really just an instance of the `<audio>` tag
    // this means we can read the mozilla docs about the events an audio
    // tag has -- https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/ended_event#examples
    // here we see that it has an ended event which we can either set a listener
    // on the tag if it was in the DOM but since this is just the class usage
    // we can specifically set a callback for onended which will fire
    // when the file is done playing
    this.__audio.onended = () => {
      // when we are done playing, change state of our button to match
      this.play = false;
      if (this.link && this._clicked) {
        this._clicked = false;
        window.open(this.link, '_blank', 'noopener');
      }
    };
    // we have a light dom selector, let's use the DOM to power data
    // select all audio tags that have an src set
    if (this.querySelectorAll('audio[src]').length) {
      // wipe default
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

  // Lit life-cycle. This implies we can safely query the shadowRoot
  // and that our element is about to be visible
  firstUpdated() {
    // store the initial icon value as a temporary old value for use later
    this._oldIcon = this.icon;
  }

  // Lit life-cycle. This runs every time something defined in properties() is mutated
  // in any way. That means setting initial value, having no value, having a new value
  updated(changedProperties) {
    // this value is a Map; a special kind of JS object that we break out into old value
    // and name of the property. This way we know what something WAS and can use this.whatever
    // to get what it is currently
    changedProperties.forEach((oldValue, propName) => {
      // see if play changed; this also allows us to set play to automatically
      // happen on page load because it is a stateful value as opposed to purely
      // event (click) driven
      if (propName === 'play') {
        // if it's true, we should play our track
        if (this.play) {
          // disable to prevent F spamming
          this.disabled = true;
          // set old icon as a tempory value
          this._oldIcon = this.icon;
          // change icon to be an audio indicator of playing sound
          this.icon = 'image:audiotrack';
          // actually play the sound
          this.playF();
        }
        // make sure we actually have an old value, so it used to be true or false
        // this helps avoid initial setup issues with defaults or undefined values
        else if (oldValue !== undefined) {
          // enable the button again
          this.disabled = false;
          // set the icon back to what it was
          this.icon = this._oldIcon;
          // this is a timing "hack". Javascript works off of a concept of microtasks / time
          // this effectively delays execution until the current loop / microtask finishes
          // this slight delay is enough to ensure that the this.disabled value
          // being reflected above, is removed from the element so that we can focus()
          // our tag again. If we don't delay a microtask, the call to focus runs
          // prior to Lit updating the disabled attribute and it's not possible to focus
          // a disabled item
          setTimeout(() => {
            this.shadowRoot.querySelector('button').focus();
          }, 0);
        }
      }
    });
  }

  // function that plays on its own
  // this way we could call it directly if we really wanted to
  playF() {
    const randNum = Math.floor(Math.random() * this.soundList.length);

    console.log(randNum);
    this.__audio.src = this.soundList[randNum];
    this.__audio.play();
  }

  __click(e) {
    // force us NOT to go to the link immediately
    // this ensures we are accessible yet we are funny :)
    e.preventDefault();
    this._clicked = true;
    // updating play means that the updated() life-cycle will execute
    // which will ensure that we have the correct state management we want
    this.play = true;
  }

  render() {
    return html`
      <a href="${this.link}" @click="${this.__click}" tabindex="-1">
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
