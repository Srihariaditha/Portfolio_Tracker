import React, { Component } from 'react';
 import { Switch, Route } from 'react-router-dom';

 // Our all component files
 import ListSecurity from '../Components/ListSecurity';
 import AddSecurity from '../Components/AddSecurity';
 import EditSecurity from '../Components/EditSecurity';

 class Main extends Component {
   render() {
     return (
     <main>
       <Switch>
         <Route exact path='/' component={ListSecurity} />
         <Route path='/list' component={ListSecurity} />
         <Route path='/addSecurity' component={AddSecurity} />
         <Route path='/editSecurity/:ticker' component={EditSecurity} />
       </Switch>
     </main>
     );
   }
 }

 export default Main;
