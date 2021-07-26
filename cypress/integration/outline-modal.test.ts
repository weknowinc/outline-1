import { OutlineModalElementType } from '../../src/components/base/outline-modal/outline-modal';

describe('Outline Modal', () => {
  beforeEach(() => {
    // This URL is slightly different that the storybook page.
    // Swap `?path=/story/` with `iframe.html?id=`.
    // This loads just the component iframe.
    cy.visit(
      'http://localhost:6006/iframe.html?id=molecules-modal--custom-focus-element'
    );
  });

  it('Default slot (message) before and after opening modal.', () => {
    const defaultSlottedElements = cy.get('outline-modal > :not("[slot]")');

    // If we use a cy.* method, we will let Cypress retry the `expect` a few times.
    // This is helpful because we wait for the element to render.
    defaultSlottedElements.should($messageElements => {
      expect(
        $messageElements.length,
        'Elements in the default slot'
      ).to.be.greaterThan(0);

      // We use `function() {}` instead of `() => {}` so we can access `this`.
      $messageElements.each(function () {
        expect(this.assignedSlot, 'Message is not yet slotted.').is.null;
      });
    });

    cy.get('[slot="outline-modal--trigger"]').click();

    defaultSlottedElements.should($messageElements => {
      $messageElements.each(function () {
        expect(
          this.assignedSlot,
          'Message is now slotted.'
        ).is.not.null.is.not.undefined;
      });
    });

    cy.get('outline-modal').should($modal => {
      const modalElement = $modal[0] as OutlineModalElementType;

      if ('close' in modalElement) {
        modalElement.close();
      }
    });

    defaultSlottedElements.should($messageElements => {
      $messageElements.each(function () {
        expect(this.assignedSlot, 'Message is no longer slotted.').is.null;
      });
    });
  });
});
