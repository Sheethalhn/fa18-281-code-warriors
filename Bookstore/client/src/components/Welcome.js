import React, {Component} from 'react';
import Header from './Header/Header1'
import './welcome.css'
import background from './kids.jpg'

class Welcome extends Component{

    componentWillMount(){
        //localStorage.removeItem('user');
        if(localStorage.getItem('userId') != null){
            window.location = "/books"
        }
    }

    render(){
        return(
            <div>
              <div className="main-class" style={{ backgroundImage: "url(" + background + ")", marginTop: "75px"}}>
                  <div>
                      <Header/>
                  </div>



              </div>
            </div>


        );
    }
}

export default Welcome;