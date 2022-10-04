describe('Normal user sign-up test', () => {

  it('Visits the homepage', () => {
    cy.visit('http://localhost:8080/')
  })

  it('Accesses the signup page from the homepage', () => {
    cy.get('a[href*="/signup"]').click()
  })

  it('Finds username input field', () => {
    cy.get('[id=usernameSignUpInput]')
  })

  it('Finds password input field', () => {
    cy.get('[id=passwordSignUpInput]')
  })

  it('Finds city input field', () => {
    cy.get('[id=citySignUpInput]')
  })

  it('Finds AIQ limit field', () => {
    cy.get('[id=thresholdSignUpInput]')
  })

  it('Finds the link back to the login page', () => {
      cy.get('a[href*="/"]')
  })

  it('Successfully registers new user', () => {
    cy.get('[id=usernameSignUpInput]').type('defaultUserTest')
    cy.get('[id=passwordSignUpInput]').type('defaultPasswordTest')
    cy.get('[id=citySignUpInput]').type('Beijing')
    cy.get('[id=thresholdSignUpInput]').type('25')
    cy.get('[id=signUpSubmitButton]').click()
    cy.url().should('include','/dashboard')
  })

  it('Dynamically generates dashboard based on new user data', () => {
    cy.contains('Hey defaultUserTest, welcome to your dashboard.')
    cy.contains("You're living in Beijing and the highest air pollution level (aka AIQ) you can tolerate is 25.")
    cy.get('[id=recommendedActionText]').contains(/, have fun being outside!|, so we recommend staying inside./g)
    cy.contains("No longer in Beijing? 🌎")
  })

  it('Displays the AIQ for a custom city search', () => {
    cy.get('[id=newCitySearchBar]').clear()
    cy.get('[id=newCitySearchBar]').type('atlanta')
    cy.get('[id=newCitySearchButton]').click()
    cy.contains("The air quality in Atlanta is currently")
  })

  it('Displays results of failed custom city search', () => {
    cy.get('[id=newCitySearchBar]').clear().type('narnia')
    cy.get('[id=newCitySearchButton]').click()
    cy.contains("Sorry! Narnia isn't in our database yet. Feel free to try another city.")
  })

})

describe('Rejects invalid sign-up attempts', () => {

  it('Rejects sign up attempt with empty username field', () => {
    cy.visit('http://localhost:8080/')
    cy.get('a[href*="/signup"]').click()
    cy.get('[id=passwordSignUpInput]').type('defaultPasswordTest')
    cy.get('[id=citySignUpInput]').type('Beijing')
    cy.get('[id=thresholdSignUpInput]').type('25')
    cy.get('[id=signUpSubmitButton]').click()

    cy.on ('window:alert', (text) => {
      expect(text).to.eq('Please fill in all fields to allow the app to work properly.')
    })

    cy.url().should('not.include','/dashboard')

  })

  it('Rejects sign up attempt with empty password field', () => {
    cy.get('[id=usernameSignUpInput]').clear().type('defaultUserTest')
    cy.get('[id=passwordSignUpInput]').clear()
    cy.get('[id=citySignUpInput]').clear().type('Beijing')
    cy.get('[id=thresholdSignUpInput]').clear().type('25')
    cy.get('[id=signUpSubmitButton]').click()

    cy.on ('window:alert', (text) => {
      expect(text).to.eq('Please fill in all fields to allow the app to work properly.')
    })

    cy.url().should('not.include','/dashboard')
  })

  it('Rejects sign up attempt with empty city field', () => {
    cy.get('[id=usernameSignUpInput]').clear().type('defaultUserTest')
    cy.get('[id=passwordSignUpInput]').clear().type('defaultPasswordTest')
    cy.get('[id=citySignUpInput]').clear()
    cy.get('[id=thresholdSignUpInput]').clear().type('25')
    cy.get('[id=signUpSubmitButton]').click()

    cy.on ('window:alert', (text) => {
      expect(text).to.eq('Please fill in all fields to allow the app to work properly.')
    })

    cy.url().should('not.include','/dashboard')
  })

  it('Rejects sign up attempt with empty threshold field', () => {
    cy.get('[id=usernameSignUpInput]').clear().type('defaultUserTest')
    cy.get('[id=passwordSignUpInput]').clear().type('defaultPasswordTest')
    cy.get('[id=citySignUpInput]').clear().type('Beijing')
    cy.get('[id=thresholdSignUpInput]').clear()
    cy.get('[id=signUpSubmitButton]').click()

    cy.on ('window:alert', (text) => {
      expect(text).to.eq('Please fill in all fields to allow the app to work properly.')
    })

    cy.url().should('not.include','/dashboard')
  })

  it("Rejects sign up attempt with city name that is not in the the API's list of monitored stations", () => {
    cy.get('[id=usernameSignUpInput]').clear().type('defaultUserTest')
    cy.get('[id=passwordSignUpInput]').clear().type('defaultPasswordTest')
    cy.get('[id=citySignUpInput]').clear().type('narnia')
    cy.get('[id=thresholdSignUpInput]').clear().type('25')
    cy.get('[id=signUpSubmitButton]').click()

    cy.on ('window:alert', (text) => {
      expect(text).to.eq("Sorry, that city isn't in our database yet. Please try another city.")
    })

    cy.url().should('not.include','/dashboard')

    // Added this in to make Cypress wait 1 second in between these two tests as Cypress was emitting events faster than the browser could send alerts that Cypress was checking for
    cy.wait(1000)

  })

  it("Rejects sign up attempt with a non-numeric AIQ threshold level", () => {
    
    cy.get('[id=usernameSignUpInput]').clear().type('defaultUserTest')
    cy.get('[id=passwordSignUpInput]').clear().type('defaultPasswordTest')
    cy.get('[id=citySignUpInput]').clear().type('Beijing')
    cy.get('[id=thresholdSignUpInput]').clear().type('a5')
    cy.get('[id=signUpSubmitButton]').click()

    cy.on ('window:alert', (text) => {
      expect(text).to.eq("Please enter an AIQ number (from 0 to 500) for your air quality limit by referring to the chart.")
    })

    cy.url().should('not.include','/dashboard')

  })

})

describe('Normal login test', () => {
  it('Visits the homepage', () => {
    cy.visit('http://localhost:8080/')
  })

  it('Finds username input field', () => {
    cy.get('[id=usernameLoginInput]')
  })

  it('Finds password input field', () => {
    cy.get('[id=passwordLoginInput]')
  })

  it('Finds login button', () => {
    cy.get('[id=loginSubmitButton]')
  })

  it('Finds sign-up link', () => {
    cy.contains("Don't have an account?")
  })

  it('Finds attribution', () => {
    cy.get('[id=attribution]')
  })

  it('Successfully logs in', () => {
    cy.get('[id=usernameLoginInput]').type('Mike3')
    cy.get('[id=passwordLoginInput]').type('mypass3')
    cy.get('[id=loginSubmitButton]').click()
    cy.url().should('include','/dashboard')
  })

  it('Successfully logs out', () => {
    cy.get('a[href*="/"]').click()
    cy.url().should('include','/')
  })

  it('Successfully logs in with recently completed sign-up', () => {
    cy.visit('http://localhost:8080/')
    cy.get('[id=usernameLoginInput]').type('defaultUserTest')
    cy.get('[id=passwordLoginInput]').type('defaultPasswordTest')
    cy.get('[id=loginSubmitButton]').click()
    cy.url().should('include','/dashboard')
  })
})

describe('Reject non-registered user login tests', () => {
  it('Visits the homepage', () => {
    cy.visit('http://localhost:8080/')
  })
  
  it('Fails to authenticate without username', () => {
    cy.get('[id=passwordLoginInput]').type('mypass3')
    cy.get('[id=loginSubmitButton]').click()

    cy.on ('window:alert', (text) => {
      expect(text).to.eq('Please fill out both the username and password fields.')
    })

    cy.url().should('not.include','/dashboard')

  })

  it('Fails to authenticate without password', () => {
    cy.get('[id=usernameLoginInput]').type('Mike3')
    cy.get('[id=passwordLoginInput]').clear()
    cy.get('[id=loginSubmitButton]').click()

    cy.on ('window:alert', (text) => {
      expect(text).to.eq('Please fill out both the username and password fields.')
    })

    cy.url().should('not.include','/dashboard')
  })
})

describe('Authentication', () => {
  it('Unable to visit dashboard without login', () => {
    cy.visit('http://localhost:8080/#/dashboard')
    cy.url().should('not.include','/dashboard')
  })
})