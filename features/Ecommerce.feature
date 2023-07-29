Feature: Ecommerce Validation

    Scenario: Placing the Order
        Given a login to Ecommerce application with "kjamadar26@gmail.com" and "Sachin@200"
        When Add "zara coat 3" to cart
        Then Verify "zara coat 3" is displayed in the cart
        Then Verify order is present in the OrderHistory