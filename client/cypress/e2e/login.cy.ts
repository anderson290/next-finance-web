/// <reference types="cypress" />

describe("Next Finance Landing Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should render the hero section and login card", () => {
    cy.contains("Next Finance").should("be.visible");
    cy.contains("Acesse sua conta").should("be.visible");
    cy.get("button").contains("GitHub").should("be.visible");
  });

  it("should toggle dark mode", () => {
    cy.get('button[aria-label="toggle dark mode"]').click();
    cy.get("main").should("exist");
  });

  it("should have a link to the GitHub repository in the footer", () => {
    cy.get("footer").within(() => {
      cy.contains("GitHub")
        .should("have.attr", "href")
        .and("include", "github.com/anderson290/next-finance-web");
      cy.contains("Criado por Anderson Nunes").should("be.visible");
    });
  });

  it("should redirect to GitHub OAuth when clicking the GitHub button", () => {
    cy.get("button").contains("GitHub").click();
    cy.url().should("include", "github.com");
  });

  it("should show the transparency section", () => {
    cy.contains("Transparência e responsabilidade").should("be.visible");
    cy.contains("brapi.dev").should("be.visible");
  });
});
