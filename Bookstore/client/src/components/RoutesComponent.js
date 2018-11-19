import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import Welcome from './Welcome';
import ViewCart from './ViewCart/ViewCart';

class RoutesComponent extends Component{

    redirectURL = (url) => {
        debugger;
        this.props.history.push(url);

    }

    render(){
        return(
            <div>

                <Route exact path="/" render={() => (
                    <div>
                        <Welcome />
                    </div>
                )}/>

                <Route path="/viewshoppingcart" component={ViewCart}/>
            </div>
        );
    }




}

export default withRouter(RoutesComponent);