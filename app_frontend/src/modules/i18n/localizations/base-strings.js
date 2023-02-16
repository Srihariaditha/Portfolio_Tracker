const baseStrings = {
  /** Routes */
  'routes.home': '/',
  'routes.checkout': '/checkout',
  'routes.orders': '/orders',

  /** Page content */
  'home.title': 'Home',
  'home.content': 'Thank you for visiting this multi-language routing example.',

  'checkout.title': 'Checkout',
  'summary.content': 'Read more about the article on {medium} or {devto}.',
  
  'orders.title': 'Orders',

  'error.title': 'Error',
  'error.content': 'This page decided to take a vacation. Try again later.',

  /** Links */
  'links.medium':
    'https://medium.com/prototyped/multi-language-routing-in-react-d7eb7a0688e9',
  'links.dev.to': 'https://dev.to/prototyp/multi-language-routing-in-react-k9l'
};

// export type LanguageStrings = typeof baseStrings;
export const en = baseStrings;
