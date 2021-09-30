import { html } from 'lit';
import '../anything-under-the-sun.js';

export default {
  title: 'AnythingUnderTheSun',
  component: 'anything-under-the-sun',
  argTypes: {
    title: { control: 'text' },
    play: { control: 'boolean' },
    icon: { control: 'text' },
  },
};

function Template({ title = 'Hello world', play = false, icon, slot }) {
  return html`
    <anything-under-the-sun .title=${title} ?play=${play} .icon=${icon}>
      ${slot}
    </anything-under-the-sun>
  `;
}

export const Regular = Template.bind({});

export const CustomTitle = Template.bind({});
CustomTitle.args = {
  title: 'My title',
  icon: 'save',
  play: true,
};

export const SlottedContent = Template.bind({});
SlottedContent.args = {
  slot: html`A title that should show up because of the slot`,
};
