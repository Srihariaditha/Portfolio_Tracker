// import React, {Component} from 'react';
// import Layout from './hoc/Layout/Layout'
// import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder'
// import Checkout from './Containers/Checkout/Checkout'
// import Orders from './Containers/Orders/Orders';
// 
// import {Route, Switch} from 'react-router-dom'
// 
// class App extends Component{
//   render(){
//     return (
//       <div>
//         <Layout>
//           <Switch>
//             <Route path="/checkout" component={Checkout} /> 
//             <Route path="/orders" component={Orders} />
//             <Route path="/" exact component={BurgerBuilder}/>  
//           </Switch>
//         </Layout>
//       </div>
//     );
//   }
// }
// 

import React, {Component}  from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { AppRoute, AppLanguage } from './lib';
// import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder'
import Checkout from './Containers/Checkout/Checkout'
import Orders from './Containers/Orders/Orders';
import { AppLayout } from './modules/layout';
import { LocalizedRouter, LocalizedSwitch, appStrings } from './modules/i18n';

// export const App: React.FC = () => (
//   <LocalizedRouter
//     RouterComponent={BrowserRouter}
//     languages={AppLanguage}
//     appStrings={appStrings}
//   >
//     <AppLayout>
//       <LocalizedSwitch>
//         <Route exact path={AppRoute.Home} component={BurgerBuilder}/>
//         <Route exact path={AppRoute.Checkout} component={Checkout}  />
//         <Route exact path={AppRoute.Orders} component={Orders}  />
//       </LocalizedSwitch>
//     </AppLayout>
//   </LocalizedRouter>
// );

class App extends Component{
  render(){
    return (
      <LocalizedRouter
        RouterComponent={BrowserRouter}
        languages={AppLanguage}
        appStrings={appStrings}
      >
        <AppLayout>
          <LocalizedSwitch>
            <Route exact path={AppRoute.Home} component={BurgerBuilder}/>
            <Route exact path={AppRoute.Checkout} component={Checkout}  />
            <Route exact path={AppRoute.Orders} component={Orders}  />
          </LocalizedSwitch>
        </AppLayout>
      </LocalizedRouter>
    );
  }
}
export default App;
