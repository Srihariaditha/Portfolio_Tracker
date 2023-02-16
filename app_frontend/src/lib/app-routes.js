export let AppRoute

;(function(AppRoute) {
  AppRoute["Home"] = "routes.home"
  AppRoute["Orders"] = "routes.orders"
  AppRoute["Checkout"] = "routes.checkout"
})(AppRoute || (AppRoute = {}))

export const AppRouteTitles = new Map([
  [AppRoute.Home, "home.title"],
  [AppRoute.Orders, "orders.title"]
])
