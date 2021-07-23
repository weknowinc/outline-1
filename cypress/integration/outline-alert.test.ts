describe('Outline Alert', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8000/cypress/fixtures/empty-html');
  });

  it('Add simple alert', () => {
    // This is done inside this wrapper so we are using the document from the application iFrame. 
    cy.document().then( document => {
      const alertElement = document.createElement('outline-alert');

      const testMessage = 'Test message';
      const messageElement = document.createElement('p');
      messageElement.classList.add('message');

      messageElement.innerText = testMessage;
      alertElement.append(messageElement);

      const body = document.querySelector('body') as HTMLBodyElement;
      body.append(alertElement);

      // If we use a cy.* method, we will let Cypress retry the `expect` a few times.
      // This is helpful because we wait for the element to render.
      cy.get('.message').should(($messageElement) => {
        expect($messageElement.prop('assignedSlot'), 'Message is not slotted.').is.not.null;
      });
    });
  });
});
