Feature: Ecommerce Validation

    @Validations
    Scenario: Placing the Order
        Given a login to Ecommerce2 application with "rahulshetty" and "learning"
        Then Verify Error message is displayed