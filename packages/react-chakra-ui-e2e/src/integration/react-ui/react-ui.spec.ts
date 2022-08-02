describe('react-chakra-ui: ReactUi component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=reactui--primary'));

  it('should render the component', () => {
    cy.get('h1').should('contain', 'Welcome to ReactUi!');
  });
});
