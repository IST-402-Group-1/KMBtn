import { html } from 'lit';
import '../anything-under-the-sun.js';

export default {
  title: 'AnythingUnderTheSun',
  component: 'anything-under-the-sun',
  argTypes: {
    link: { control: 'text' },
    title: { control: 'text' },
    icon: { control: 'text' },
    disabled: { control: 'boolean' },
    play: { control: 'boolean' },
    dark: { control: 'boolean' },
  },
};

function Template({ title = 'Meme', icon = "av:volume-mute", link = "https://www.google.com/", disabled = false, slot, dark = false, play = false}) {
  return html`
    <anything-under-the-sun
      .title=${title} .icon=${icon} .link =${link} .disabled=${disabled} .dark=${dark} .play=${play}
    >
      ${slot}
    </anything-under-the-sun>
  `;
}

export const Regular = Template.bind({});