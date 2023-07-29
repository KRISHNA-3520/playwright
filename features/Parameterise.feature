Feature: Ecommerce Validation

    @Param
    Scenario Outline: Scenario Outline name: Placing the Order
        Given a login to Ecommerce2 application with "<username>" and "<password>"
        Then Verify Error message is displayed

        Examples:
            | username          | password    |
            | rahulshetty       | learning    |
            | anshika@gmail.com | Iamking@000 |