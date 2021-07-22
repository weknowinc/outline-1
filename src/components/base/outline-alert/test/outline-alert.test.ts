import { OutlineAlert } from '../outline-alert';
import { expect, fixture, html } from '@open-wc/testing';

describe('outline-alert', () => {
  // We don't get base styles automatically. Is there a better way?
  const addBaseStyles = () => {
    const defaultCSS = document.createElement('link');
    defaultCSS.setAttribute('rel', 'stylesheet');
    defaultCSS.setAttribute('href', '/outline.theme.css');

    document.head.append(defaultCSS);
  };

  before(() => {
    addBaseStyles();
  });

  it('Make sure to load necessary component JS', () => {
    // If we don't use OutlineAlert at least once, it's JS will never be loaded and the component won't render. :(
    const alertElement = document.createElement('outline-alert');

    expect(alertElement).is.instanceOf(OutlineAlert);
  });

  it('See message', () => {
    const alertElement = document.createElement('outline-alert');

    const testMessage = 'Test message';
    const messageElement = document.createElement('p');
    messageElement.innerText = testMessage;
    alertElement.append(messageElement);

    document.body.append(alertElement);

    // Wait for the component to render. :(
    setTimeout(() => {
      expect(messageElement.assignedSlot, 'Message is not slotted.').is.not
        .null;
    }, 10);

    // Can't really test if the text is present since it's present in the DOM.
  });

  it('See header', () => {
    const alertElement = document.createElement('outline-alert');

    const testHeaderText = 'Test header text';
    const headerSlotElement = document.createElement('span');
    headerSlotElement.setAttribute('slot', 'outline-alert--header');
    headerSlotElement.innerText = testHeaderText;
    alertElement.append(headerSlotElement);

    document.body.append(alertElement);

    // Wait for the component to render. :(
    setTimeout(() => {
      expect(headerSlotElement.assignedSlot, 'Header is not slotted.').is.not
        .null;
    }, 10);

    // Can't really test if the text is present since it's present in the DOM.
  });

  it('See header (fixture option)', async () => {
    const alertElement = await fixture(html`
      <outline-alert>
        <span slot="outline-alert--header">My header</span>
        This is my alert!
      </outline-alert>
    `);

    const headerSlotElement = alertElement.querySelector(
      '[slot="outline-alert--header"]'
    ) as HTMLElement;

    expect(headerSlotElement.assignedSlot, 'Header is not slotted.').is.not
      .null;

    // Can't really test if the text is present since it's present in the DOM.
  });
});
