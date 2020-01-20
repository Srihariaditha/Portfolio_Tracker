# Portfolio_Tracker
An app to Trade various Securities for maintaining a Portfolio


1. Add a security:
      API: /addSecurity
      Params: ex:
          "companyTicker": "WIPRO",
          "pricePerShare": "1460.93",
          "numOfShares": "560"

2. Get all securites from Portfolio
      API: /allSecurities

3. Get a single Security  
      API: /security/:companyTicker

4. Fetch returns from a Portfolio
      API: /fetchReturns

5. Add a trade to a Portfolio
      API: /buyTrade/:companyTicker
      Params:
      "pricePerShare": "300",
      "numOfShares": "30"

6. Sell a trade from a Portfolio
      API : /sellTrade/:companyTicker
      Params:
        "numOfShares": "30"

7. Delete Particular security
      API: /deleteSecurity/:companyTicker
