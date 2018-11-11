import React from "react";
import { Link, Route } from "react-router-dom";
import Learn from "./Learn";
import './about.css';

const About = props => (
  <div>
  <div className="textdiv row">
    <div className="col-md-2"></div>

  <div id="aboutinfo" className="col-md-8">
    <h1>Contact Page</h1><br></br><br></br>
    <p>
      Nunc pharetra finibus est at efficitur. Praesent sed congue diam. Integer gravida dui mauris,
      ut interdum nunc egestas sed. Aenean sed mollis diam. Nunc aliquet risus ac finibus porta. Nam
      quis arcu non lectus tincidunt fermentum. Suspendisse aliquet orci porta quam semper
      imperdiet. Praesent euismod mi justo, faucibus scelerisque risus cursus in. Sed rhoncus mollis
      diam, sit amet facilisis lectus blandit at.
    </p>
  </div>
  <div className="col-md-2"></div>

  </div>
  <div className="contactdiv row">
  <div className ="col-md-4"></div>
  <div className ="col-md-4">

          {props.match.url === '/about' &&
    <Link to={`/about/learn`} role="button"  style={{
      textDecoration : 'none'
  }}  className="btn more btn-link">
      Learn More
    </Link>
      }

    





    <Route exact path={`${props.match.url}/learn`} component={Learn} />
    </div>
    <div className ="col-md-4"></div>
    </div>
  </div>
);

export default About;