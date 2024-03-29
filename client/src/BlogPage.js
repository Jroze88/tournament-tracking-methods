import React from 'react';
import Carousel from 'react-bootstrap/Carousel'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'

// import About from './about'
// import Contact from './contact'
// import Projects from './projects'


class Home extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      index: 0,
      direction: null,
    };
  }

  handleSelect(selectedIndex, e) {
    this.setState({
      index: selectedIndex,
      direction: e.direction,
    });
  }

  render() {
    const { index, direction } = this.state;
    const styleCarousel = {
      height: '80vh',
      width: '100vw'
    }
    const imgStyle = {
      width: '100%',
      height: '100%',
      visibility: 'hidden',
      backgroundImage: 'url("./header.jpg")'
    }
    return (

      <Container>
        <Row>
          <Col>
       <Carousel
        activeIndex={index}
        direction={direction}
        onSelect={this.handleSelect}
      >
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={require('./header.jpg')}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={require('./header.jpg')}
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={require('./header.jpg')}
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      </Col>
      </Row>
      
      </Container>
    );
  }
}

export default Home;
              
//   <div style={{display: 'none'}} id="DIV_1">
//   <div id="DIV_2">
//       <div id="DIV_3">
//           <div id="DIV_4">
//               <div id="DIV_5">
//                   <i className = 'mdi mdi-speedometer' id="I_6"></i>
//               </div>
//           </div>
//           <div id="DIV_7">
//               <div className='squaretext' id="DIV_8">
//                   Complete
//               </div>
//               <div className='squaretext' id="DIV_9">
//                   Start-to-finish Website or Mobile App deployment.
//               </div>
//           </div>
//       </div>
//       <div id="DIV_10">
//           <div id="DIV_11">
//               <div id="DIV_12">
//                   <i className='mdi mdi-cellphone-link' id="I_13"></i>
//               </div>
//           </div>
//           <div id="DIV_14">
//               <div className='squaretext'  id="DIV_15">
//                   Scaling
//               </div>
//               <div className='squaretext'  id="DIV_16">
//                   Large-scale distribution infrastructure.
//               </div>
//           </div>
//       </div>
//   </div>
//   <div id="DIV_17">
//       <div id="DIV_18">
//           <div id="DIV_19">
//               <div id="DIV_20">
//                   <i className = 'mdi mdi-lightbulb-outline' id="I_21"></i>
//               </div>
//           </div>
//           <div id="DIV_22">
//               <div className='squaretext'  id="DIV_23">
//                   Intuitive
//               </div>
//               <div className='squaretext'  id="DIV_24">
//                   Easy to use, intuitive, UX/UI.
//               </div>
//           </div>
//       </div>
//       <div id="DIV_25">
//           <div id="DIV_26">
//               <div id="DIV_27">
//                   <i className='mdi mdi-rocket' id="I_28"></i>
//               </div>
//           </div>
//           <div id="DIV_29">
//               <div className='squaretext'  id="DIV_30">
//                   Dynamic
//               </div>
//               <div className='squaretext'  id="DIV_31">
//                   Making pages come to life.
//               </div>
//           </div>
//       </div>
//   </div>
// </div>