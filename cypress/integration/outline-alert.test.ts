describe('Outline Alert', () => {
  beforeEach(() => {
    // This URL is slightly different that the storybook page.
    // Swap `?path=/story/` with `iframe.html?id=`.
    // This loads just the component iframe.
    cy.visit('http://localhost:6006/iframe.html?id=molecules-alert--default-example');
  });

  it('Default slot (message)', () => {
    // If we use a cy.* method, we will let Cypress retry the `expect` a few times.
      // This is helpful because we wait for the element to render.
    cy.get('outline-alert > *').should(($messageElements) => {
      expect($messageElements.length, "Elements in the default slot").to.be.greaterThan(0);
      
      // We use `function() {}` instead of `() => {}` so we can access `this`.
      $messageElements.each(function() {
        expect(this.assignedSlot, "Message is slotted.").is.not.null.is.not.undefined;
      });
    });
  });
});
