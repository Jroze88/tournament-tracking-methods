import React, { Component } from 'react';

import $ from 'jquery'
import axios from 'axios';
import border from './bordersmall.gif'
import Encoder from './decoder'
import {TransitionGroup, CSSTransition} from 'react-transition-group'


import { Page, Grid, StoreCard, Table, Card, Badge } from "tabler-react";
import Button from 'react-bootstrap/Button'
import SiteWrapper from "./SiteWrapper.react";
import bgimg from './588c4ba75cbd6dd9fe3c5bfafaaccdea.jpg'
import StickyFooter from 'react-sticky-footer'
import { ResponsiveEmbed } from 'react-bootstrap';







function importAll (r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); })
    return images;

}

const images = importAll(require.context('./gotimg', false, /\.(png|jpe?g|svg)$/))


class TournamentReportm extends Component {
    constructor(props) {
        super(props);

    
        this.state = {
        
              rawResults: [],
              activeTournament: [],
              otherTournaments: {},
              renderCombatUnits: false,
              renderCommander: false,
              commander : {},
              NCUs : [],
              combatUnits : [],
              renderNCUs  : false,
              isMobile : false
              


            
          }
        }

        componentWillMount = () => {
            document.body.style.backgroundImage = `url(${bgimg})`;
        }

        populateList = () => {


                /// in case some lists go through unparsed
            if (!Array.isArray(this.state.activeList.unEncoded)) {



              

                let listToParse = this.state.activeList.unEncoded

                let listtoParseArray = listToParse.split(/(\u2022)/)

                let parsedList = []

                for (let i = 0; i < listtoParseArray.length; i++) {

                    let tempList1 = listtoParseArray[i].split(/(\n)/g)
              
                    for (let k = 0; k < tempList1.length; k++) {
              
                      if (tempList1[k].length !== 0 && tempList1[k].length !== 1) {
                         tempList1[k] =  tempList1[k].replace(/,/g, '')
                        parsedList.push(tempList1[k])
                      }
              
                    }
              
              
              
              
                  }

                  this.setState({
                      activeList : {
                          unEncoded : parsedList
                      }
                  })


                    let armyList = []

                    let thisLine = <li data={`${0}`}  onClick = {this.swapLists} style={{fontSize: '0.8em', listStyleType: 'none', textAlign: 'center', textDecoration: 'underline'}}>`{this.state.activePlayer.name}'s {this.state.activeList.unEncoded[0]}`</li>
                armyList.push(thisLine)
        
                
        
                for (let i = 1; i < this.state.activeList.unEncoded.length - 1; i++) {
        
        
                    if (this.state.activeList.unEncoded[i].includes('with')) {
                        let thisLine = <li data={`${i}`} style={{fontSize: '0.8em', textAlign: 'center',  listStyleType: 'none'}}>=>{this.state.activeList.unEncoded[i]}</li>
                        armyList.push(thisLine)
                    } else if (this.state.activeList.unEncoded[i].includes('Faction')) {
                        let thisLine = <li data={`${i}`} style={{fontSize: '0.8em' , textAlign: 'center',  listStyleType: 'none'}}>{this.state.activeList.unEncoded[i]}</li>
                    armyList.push(thisLine)
                    }  else  if (this.state.activeList.unEncoded[i].includes('Commander')) {
                        let thisLine = <li data={`${i}`} style={{fontSize: '0.8em' , textAlign: 'center',  listStyleType: 'none'}}>{this.state.activeList.unEncoded[i]}</li>
                    armyList.push(thisLine)
                    } else  if (this.state.activeList.unEncoded[i].includes('Points')) {
                        let thisLine = <li  data={`${i}`} style={{fontSize: '0.8em' , textAlign: 'center',  listStyleType: 'none'}}>{this.state.activeList.unEncoded[i]}</li>
                    armyList.push(thisLine)
                    } else {
                        let thisLine = <li data={`${i}`} style={{fontSize: '0.8em'}}>{this.state.activeList.unEncoded[i]}</li>
                    armyList.push(thisLine)
                    }
        
        
                    
                }
        
        
                return armyList
                  





            }
            else {
 
                    let armyList = []

            let thisLine = <li data={`${0}`}  onClick = {this.swapLists} style={{fontSize: '0.8em', listStyleType: 'none', textAlign: 'center', textDecoration: 'underline'}}>`{this.state.activePlayer.name}'s {this.state.activeList.unEncoded[0]}`</li>
        armyList.push(thisLine)

        

        for (let i = 1; i < this.state.activeList.unEncoded.length - 1; i++) {


            if (this.state.activeList.unEncoded[i].includes('with')) {
                let thisLine = <li data={`${i}`} style={{fontSize: '0.8em', textAlign: 'center',  listStyleType: 'none'}}>=>{this.state.activeList.unEncoded[i]}</li>
                armyList.push(thisLine)
            } else if (this.state.activeList.unEncoded[i].includes('Faction')) {
                let thisLine = <li data={`${i}`} style={{fontSize: '0.8em' , textAlign: 'center',  listStyleType: 'none'}}>{this.state.activeList.unEncoded[i]}</li>
            armyList.push(thisLine)
            }  else  if (this.state.activeList.unEncoded[i].includes('Commander')) {
                let thisLine = <li data={`${i}`} style={{fontSize: '0.8em' , textAlign: 'center',  listStyleType: 'none'}}>{this.state.activeList.unEncoded[i]}</li>
            armyList.push(thisLine)
            } else  if (this.state.activeList.unEncoded[i].includes('Points')) {
                let thisLine = <li  data={`${i}`} style={{fontSize: '0.8em' , textAlign: 'center',  listStyleType: 'none'}}>{this.state.activeList.unEncoded[i]}</li>
            armyList.push(thisLine)
            } else {
                let thisLine = <li data={`${i}`} style={{fontSize: '0.8em'}}>{this.state.activeList.unEncoded[i]}</li>
            armyList.push(thisLine)
            }


            
        }


        return armyList
                
            }

      

                
        
            




        }

        windowCheck = () => {
            if (window.innerWidth <= 500) {
                this.setState({
                    isMobile : true
                },function() {
                    $('#sticky-footer').css('display', 'none')
                    $('body').css('overflowY', 'hidden')
                })
                
            } else {
                this.setState({
                    isMobile : false
                },function() {
                    $('#sticky-footer').css('display', 'block')
                    $('body').css('overflowY', 'scroll')
                })
            }
        }

        componentDidMount = () => {

            let clientSize = $('.col-md-9').clientTop
            console.log(clientSize)
         

            

        }



        swapLists = (e) => {

            let tournamentNumber = e.target.getAttribute('dataactivetournament')
            let playerNumber = e.target.getAttribute('dataactiveplayer')
            console.log(tournamentNumber)


            console.log(this.state.otherTournaments)

            this.setState({
                renderCombatUnits : false,
                renderNCUs : false,
                renderCommander : false,
                commander : {},
                activeList : false,
                combatUnits : [],
                NCUs : [],
                activeTournament : this.state.allTournaments[tournamentNumber]
            })

            setTimeout(() => {

                

                // this.setState({    
                //     allTournaments : response.data,              
                //     activeTournament: response.data[0],
                //     activePlayer : response.data[0].players[0],
                //     activeList : {
                //         encoded : response.data[0].players[0].army1Encoded,
                //         unEncoded : response.data[0].players[0].army1
                //     },
                //     otherTournaments: response.data
                // }, function() {
                //     this.superHighLevelEncryptionAlgorithm(this.state.activeList)
                    
                // })

           

                let targetPlayer = this.state.allTournaments[tournamentNumber].players[playerNumber]

                this.setState({
                    
      
                    activePlayer : targetPlayer
                    
                })
              }, 600)

              setTimeout(() => {
                this.setState({

                    activeList : {
                        encoded : this.state.activePlayer.army1Encoded,
                        unEncoded : this.state.activePlayer.army1
                    }
                }, function() {
                    this.superHighLevelEncryptionAlgorithm(this.state.activeList)
                })
               
              }, 1200)





        }

          otherTournamentsPopulate = () => {

            let tableOfPlayers = []
            
            let table = []
            
            let events = []

            let event =[]
            

            const playerstanding = {
                color: 'whitesmoke',
                fontSize: '0.8em',
                textAlign: 'left',
                userSelect: 'none',
                mouseOver: 'pointer'
            }

            const otherevents = {
                width: '100%',
            }

            const resultsStyle = {
                backgroundImage: `url(${border})`,
                backgroundSize: `100% 100%`,
                padding: '1em'
            }

        //     <Grid.Col lg={3}>
        //     <StoreCard
        //       title="Apple iPhone 7 Plus 256GB Red Special Edition"
        //       subtitle="Apple"
        //       price="$499"
        //       imgUrl={testimg}
        //     />
        //     <StoreCard
        //       title="GoPro HERO6 Black"
        //       subtitle="GoPro"
        //       price="$599"
        //       imgUrl={testimg}
        //     />
        //   </Grid.Col>
    

            

                    // Outer loop to create players with html
                    for (let i = 0; i < this.state.otherTournaments.length; i++) {

                        
                        
                        let eventTitle = this.state.otherTournaments[i].tournamentName
                        table = []
                        

                        let eventDate = this.state.otherTournaments[i].tournamentDate
                        tableOfPlayers = []
                        
                        

                        for (let k = 0; k < this.state.otherTournaments[i].players.length; k++) {

                            let player = this.state.otherTournaments[i].players[k].name

                         
                            
                        

                            tableOfPlayers.push(<li dataActiveTournament = {i} dataActivePlayer = {k} onClick = {(e) => this.swapLists(e)} style={playerstanding}>#{k + 1} {player} - {this.state.otherTournaments[i].players[k].army}</li>)

                        }

                        
                        
                        table.push(<div style={playerstanding}>{eventTitle}</div>)

                        table.push(<div style={playerstanding}>{eventDate}</div>)
                        
                        table.push(<ul>{tableOfPlayers}</ul>)

                        event.push(<div style={resultsStyle} className='results card-body'>{table}</div>)
                    }
                    
                    events.push(table)
                    console.log(events)
            return <div className='card' >{event}</div>
  }



  superHighLevelEncryptionAlgorithm = (obj) => {

        let arr = []

        const NCUdivider = obj.encoded.indexOf('NonCombatUnits')
        const combatDivider = obj.encoded.indexOf('CombatUnits')

        for (let i = 0; i <combatDivider; i++) {
            if (obj.encoded[i].includes('Commander')) {

                let encoderArg = obj.encoded[i].toLowerCase()
                encoderArg = encoderArg.replace('commander', '')

                this.setState({
                    commander : {
                        code : Encoder[encoderArg],
                        name : obj.unEncoded[i],
                        
                    }
                })

            }
        }

        setTimeout(() => {
            this.setState({
                renderCommander : true
            })
        }, 1000)




   
        let NCUs = []
        let combatUnits = [{}]
 
  

    for (let i = 2; i < NCUdivider; i++) {


        if (obj.encoded[i].includes('with')) {

             

                let thisAttachment = obj.encoded[i].toLowerCase()

            thisAttachment = thisAttachment.replace('with', '')



                combatUnits[combatUnits.length-1].attachment =  {
                    name : obj.unEncoded[i],
                    code : Encoder[thisAttachment],
                }
                combatUnits[combatUnits.length-1].hasAttachment = true

            } else {

                let encodeArg = obj.encoded[i]
                encodeArg = encodeArg.toLowerCase()
                console.log(encodeArg)


       let thisUnit = {
        name : obj.unEncoded[i],
        code : Encoder[encodeArg],
        attachment : null,
        hasAttachment : false
       } 

       console.log(thisUnit)

        if (thisUnit.code !== undefined) {
            combatUnits.push(thisUnit)
        }

       
    }
    }



    for (let i = NCUdivider + 1; i < obj.encoded.length - 1; i++) {

        let encoderArg = obj.encoded[i].toLowerCase()

        let thisNCU = {
            code : Encoder[encoderArg],
            name : obj.unEncoded[i],
            
        }

        NCUs.push(thisNCU)
    }

   this.setState({

       NCUs : NCUs,
       renderNCUs: true,
       combatUnits : combatUnits,
       
   })

   setTimeout(() => {
    this.setState({
        renderCombatUnits: true
    })
   }, 1000)
    

   console.log(this.state)
   $('.front').mouseover(function(e) {


    $(e.target).addClass('zoomed')

      
   
       setTimeout(() => {

         
         $(e.target).removeClass('zoomed');

       }, 6090)

   })

 
}



    componentWillMount = () => {

        window.addEventListener('resize', this.windowCheck);

        this.windowCheck()


        $('body').css('overflowY', 'scroll')

        axios.get("/get/tournamentresults").then(response => { 


                console.log(response.data[0].players[0].army1Encoded)

               


                this.setState({    
                    allTournaments : response.data,              
                    activeTournament: response.data[0],
                    activePlayer : response.data[0].players[0],
                    activeList : {
                        encoded : response.data[0].players[0].army1Encoded,
                        unEncoded : response.data[0].players[0].army1
                    },
                    otherTournaments: response.data
                }, function() {
                    this.superHighLevelEncryptionAlgorithm(this.state.activeList)
                    
                })
                



         


          }).catch(error => {
            console.log(error.response)
        });

          
         


    }



    render() {

       

                const defaultStyle = {
                transition: `opacity 300ms ease-in-out`,
                opacity: 0,
                }

                const transitionStyles = {
                entering: { opacity: 0 },
                entered:  { opacity: 1 },
                };
            


    return(



        <SiteWrapper >
        <Page.Content style={{backgroundImage : `url(${bgimg})`}}  title="Live Tournament Results (Beta)">
          <Grid.Row>
              <Grid.Col md={2}>
            {this.otherTournamentsPopulate()}
            </Grid.Col>
            <Grid.Col md={10}>
              <Card>
                <Table className="card-table table-vcenter">
                  <Table.Body  >
                    <Table.Row>
                      <Table.Col style={{height: '410px'}}>


                    <Card.Title className="NCUtitle" > <p style={{fontSize : '0.7em'}}>Non-Combat Units:</p ><ul>{ this.state.NCUs.map((element, i) =>          <li style={{fontSize: '0.4em', color: 'whitesmoke'}}>{element.name}</li>)}</ul> </Card.Title>


{   this.state.renderNCUs ? 
     this.state.NCUs.map((element, i) =>       


    element.code === undefined || element === undefined  ? ''
    :

 

<div className={` __statcard  __card`} style={{position: 'relative', height: '210px', width: '180px', transition: `all  ${2 + 0.5}s cubic-bezier(0.68, -0.55, 0.265, 1.55)`}}>
                                <div   style = {{backgroundImage : `url(${images[(element.code + 'b.jpg')]})`, backgroundSize: '100% 100%'}} className="front "  >
                                  </div>
                            </div>
     
      
                ) : ''}

                      </Table.Col>
                      <Table.Col className="text-right text-muted d-none d-md-table-cell text-nowrap">
                      <div style={{textAlign: 'left', userSelect : 'none'}} className = 'armylist'>{this.state.activeList ? this.populateList() : ''}</div>
                      <Button 
                      onClick = {this.swapLists}
                      >ClickSwap</Button>
                      </Table.Col>

                      <Table.Col style={{fontSize: '0.8em', color: 'whitesmoke'}} className="text-left text-muted d-none d-md-table-cell text-wrap">
                    
                <TransitionGroup className = 'commanderCards'>
                  
                  <Card.Title style={{fontSize: '0.5em', color: 'whitesmoke'}}><p style={{widht: '220px', fontSize: '0.5em', color: 'whitesmoke'}}>{this.state.commander.name}</p></Card.Title>

{this.state.renderCommander ? 

this.state.commander.code === undefined || this.state.commander === undefined  ? ''
:

                                 
                                  <div className={" __statcard  __card"} style={{position: 'relative', height: '260px', width: '190px', transition: `all  ${2 + 0.5}s cubic-bezier(0.68, -0.55, 0.265, 1.55)`}}>
                                <div   style = {{backgroundImage : `url(${images[(this.state.commander.code + 'b.jpg')]})`, backgroundSize: '100% 100%'}} className="front "  >
                                  </div>
                            </div>
                            :
                            ''
                  
                             
                                }
                                 
                 </TransitionGroup>
                      </Table.Col>

                    </Table.Row>
                  
                  </Table.Body>
                </Table>
              </Card>
            </Grid.Col>
          </Grid.Row>
          <Grid.Row>
          <Table.Col style={{overflowX : 'scroll'}}>
                     
                     
         
         { this.state.renderCombatUnits ?  this.state.combatUnits.map((element, i) =>       

         element.code === undefined || element === '' ? '' :
         
         
 
             
        //      <CSSTransition
        //      key={i}
        //     unmountOnExit
        
        //      on={this.state.renderCombatUnits}
        //      classNames={`star1${i}m`}
        //    >       
         
            element.hasAttachment ?
         
         <div  className= {` __statcard __card`} style={{margin: '45px', marginRight: '60px', position: 'relative' ,height: '260px', width: '210px',  transition: `all  ${1 + 0.5*i}s cubic-bezier(0.68, -0.55, 0.265, 1.55)`}}  
          >  <div style={{width: '105px', height: '130px', zIndex: '-2', position: 'absolute', top: '-40px', right: '-40px', backgroundImage : `url(${images[(element.attachment.code + 'f.jpg')]})`, backgroundSize: '100% 100%'}}></div>
                        
         <div style = {element.code > 20000 ? {backgroundImage : `url(${images[(element.code + 'f.jpg')]})`, backgroundSize: '100% 100%', height: '260px', width: '210px'} : {backgroundImage : `url(${images[(element.code + 'f.jpg')]})`, backgroundSize: '200% 100%', backgroundRepeat: 'no-repeat', height: '260px', width: '210px'}} className="front "  >
         
            </div>
         </div> :
         
         <div  className= {` __statcard __card`} style={{margin: '45px',position: 'relative' ,height: '260px', width: '210px',  transition: `all  ${1 + 0.5*i}s cubic-bezier(0.68, -0.55, 0.265, 1.55)`}}  
          >
         <div style = {element.code > 20000 ? {backgroundImage : `url(${images[(element.code + 'f.jpg')]})`, backgroundSize: '100% 100%', height: '260px', width: '210px'} : {backgroundImage : `url(${images[(element.code + 'f.jpg')]})`, backgroundSize: '200% 100%', backgroundRepeat: 'no-repeat', height: '260px', width: '210px'}} className="front "  >
         
            </div>
         </div>
         
                         )
                        : 
                        ''}
                                    
                    
                               </Table.Col>
          </Grid.Row>
        </Page.Content>
        <StickyFooter
    bottomThreshold={99999}
    normalStyles={{
    backgroundColor: "#343a40",
    padding: "0.5em",
    fontSize: '0.5em',
    color: '#738597'
    }}
    stickyStyles={{
    backgroundColor: "#343a40",
    padding: "0.5em",
    width: '100vw',
    fontSize: '0.5em',
    color: '#738597'
    }}
>
<div>
Copyright &copy; <a style={{color: 'lightblue'}} href="https://cmon.com/products">CMON</a> A Song of Ice and Fire, <a style={{color: 'lightblue'}} href="https://asoiafcc.com">OnTheTableGaming</a>, <a style={{color: 'lightblue'}} href="/home">Jano Roze</a>. List generation by <a style={{color: 'lightblue'}} href='https://asoiafbuilder.com'>ASOIAFBuilder</a>
</div>
</StickyFooter>
      </SiteWrapper>)
//         <Container >
//         <Row  style={{minHeight: '800px', maxHeight : '800px', minWidth:  '1454px', maxWidth: '1454px', padding: '0', margin: '0'}}>
//             <div style={{minheight: '350', maxHeight: '350px', paddingRight: '0', overflowY : 'scroll', WebkitOverflowScrolling : 'auto'}}>
//          {this.otherTournamentsPopulate()}
                                      
//             <Button onClick = {this.swapLists}>ClickSwap</Button>
     
     
//             </div>
//             <Col style={{minHeight: '350px', maxHeight: '350px', minWidth: '300px', maxWidth: '300px', color: 'white'}}>
//             <ul className='list'>
            
         
          
//             <Card.Title style={{fontSize: '1.2em'}}>{this.state.commander.name}</Card.Title>


// {this.state.commander.code === undefined || this.state.commander === undefined  ? ''
// :
       

        
                           
//                             <Card xs={12} className={"star1m __statcard  __card" } style={{height: '260px', width: '210px', position: 'absolute', transition: `all  ${2 + 0.5}s cubic-bezier(0.68, -0.55, 0.265, 1.55)`}}>
//                           <div   style = {{backgroundImage : `url(${images[(this.state.commander.code + 'b.jpg')]})`, backgroundSize: '100% 100%', height: '260px', width: '210px'}} className="front "  >
//                             </div>
//                       </Card>}
                           
       
//            </ul>
           
//             </Col>









//             <Col style={{minHeight: '350px', minWidth: '280px', maxWidth: '280px', maxHeight: '350px', padding: '0'}}>
//             <div style={{textAlign: 'left'}} className = 'armylist'>{this.state.activeList ? this.populateList() : ''}</div>
//             </Col>











//             <Col style={{color: 'white', fontSize: '1em'}}  md={4}>
//                 <ul className = 'list'>
           
//             <Card.Title style={{fontSize: '1em'}}> Non-Combat Units:<ul>{ this.state.NCUs.map((element, i) =>          <li>{element.name}</li>)}</ul> </Card.Title>


// { this.state.NCUs.map((element, i) =>       


// element.code === undefined || element === undefined  ? ''
// :
  

//       <Card className={`star1m __statcard  __card`} style={element.code > 20000 ? {height: '260px', width: '190px',  transition: `all ${2*i +1.5*i}s cubic-bezier(0.68, -0.55, 0.265, 1.55)`} :
//          {height: '260px', width: '210px',  transition: `all  ${2*i + 0.5*i}s cubic-bezier(0.68, -0.55, 0.265, 1.55)`}}  
//           >
       
//                 <div style = {element.code > 20000 ? {backgroundImage : `url(${images[(element.code + 'f.jpg')]})`, backgroundSize: '100% 100%', height: '260px', width: '190px'} : {backgroundImage : `url(${images[(element.code + 'f.jpg')]})`, backgroundSize: '200% 100%', backgroundRepeat: 'no-repeat', height: '260px', width: '210px'}} className="front "  >
            
//             </div>
            
//         </Card>

//         )}

                    
                 
//         </ul>
//             </Col>

   
//         <Col style={{color: 'white'}} >
//     <ul className='list'>

   

    

// { this.state.combatUnits.map((element, i) =>       


// element.code === undefined || element === undefined  ? ''
// :

    

// element.hasAttachment ?

//       <Card  className={`star1m __statcard  __card`} style={element.code > 20000 ? {height: '250px', width: '210px',  transition: `all ${3+ 0.5*i}s cubic-bezier(0.68, -0.55, 0.265, 1.55)`} :
//          {height: '260px', width: '210px',  transition: `all  ${2 + 0.5*i}s cubic-bezier(0.68, -0.55, 0.265, 1.55)`}}  
//           >
//           <div style={{width: '105px', height: '130px', zIndex: '-2', position: 'absolute', backgroundImage : `url(${images[(element.attachment.code + 'f.jpg')]})`, backgroundSize: '100% 100%'}}></div>
// <div style = {element.code > 20000 ? {backgroundImage : `url(${images[(element.code + 'f.jpg')]})`, backgroundSize: '100% 100%', height: '260px', width: '210px'} : {backgroundImage : `url(${images[(element.code + 'f.jpg')]})`, backgroundSize: '200% 100%', backgroundRepeat: 'no-repeat', height: '260px', width: '210px'}} className="front "  >

//             </div>
//         </Card> :

// <Card  className= 'star1m __statcard __card' style={element.code > 20000 ? {height: '260px', width: '210px',  transition: `all ${2 + 0.5*i}s cubic-bezier(0.68, -0.55, 0.265, 1.55)`} :
// {height: '260px', width: '210px',  transition: `all  ${3 + 0.5*i}s cubic-bezier(0.68, -0.55, 0.265, 1.55)`}}  
// >
// <div style = {element.code > 20000 ? {backgroundImage : `url(${images[(element.code + 'f.jpg')]})`, backgroundSize: '100% 100%', height: '260px', width: '210px'} : {backgroundImage : `url(${images[(element.code + 'f.jpg')]})`, backgroundSize: '200% 100%', backgroundRepeat: 'no-repeat', height: '260px', width: '210px'}} className="front "  >

// </div>
// </Card>


//         )}

               
                            



//                 </ul>
//                 </Col>
//     </Row>

//     </Container>

    


 
 
//             <div >
//                 <Row  style={{minHeight: '800px', maxHeight : '800px', minWidth:  '1454px', maxWidth: '1454px', padding: '0', margin: '0'}}>
//                     <div style={{minheight: '350', maxHeight: '350px', paddingRight: '0', overflowY : 'scroll', WebkitOverflowScrolling : 'auto'}}>
//                  {this.otherTournamentsPopulate()}
                                              
//                     <Button onClick = {this.swapLists}>ClickSwap</Button>
             
             
//                     </div>
//                     <Col style={{minHeight: '350px', maxHeight: '350px', minWidth: '300px', maxWidth: '300px', color: 'white'}}>
//                     <ul className='list'>
                    
//                     <TransitionGroup className = 'commanderCards'>
                  
//                     <Card.Title style={{fontSize: '1.2em'}}>{this.state.commander.name}</Card.Title>


// {this.state.commander.code === undefined || this.state.commander === undefined  ? ''
// :
//                             <CSSTransition
//                             key = {1}
//                             unmountOnExit
//                             classNames={this.state.isMobile ? "star1m" : "star1C"}
//                             on={this.state.renderCommander}
                         
//                           >

                
                                   
//                                     <Card xs={12} className={this.state.isMobile ? "star1m __statcard  __card" : "star1C __statcard  __card"} style={{height: '260px', width: '210px', position: 'absolute', transition: `all  ${2 + 0.5}s cubic-bezier(0.68, -0.55, 0.265, 1.55)`}}>
//                                   <div   style = {{backgroundImage : `url(${images[(this.state.commander.code + 'b.jpg')]})`, backgroundSize: '100% 100%', height: '260px', width: '210px'}} className="front "  >
//                                     </div>
//                               </Card>
                    
//                                     </CSSTransition>}
                                   
//                    </TransitionGroup>
//                    </ul>
                   
//                     </Col>









//                     <Col style={{minHeight: '350px', minWidth: '280px', maxWidth: '280px', maxHeight: '350px', padding: '0'}}>
//                     <div style={{textAlign: 'left'}} className = 'armylist'>{this.state.activeList ? this.populateList() : ''}</div>
//                     </Col>











//                     <Col style={{color: 'white', fontSize: '1em'}}  md={4}>
//                         <ul className = 'list'>
//                     <TransitionGroup className="cardsTransition">  
//                     <Card.Title style={{fontSize: '1em'}}> Non-Combat Units:<ul>{ this.state.NCUs.map((element, i) =>          <li>{element.name}</li>)}</ul> </Card.Title>


// { this.state.NCUs.map((element, i) =>       


//     element.code === undefined || element === undefined  ? ''
//     :

//     <CSSTransition
//     key={i}
//    unmountOnExit
//    classNames={`star1N${i}`}
//     in={this.state.renderCombatUnits}
 
//   >   

//               <Card className={`star1N${i} __statcard  __card`} style={element.code > 20000 ? {height: '260px', width: '190px',  transition: `all ${2*i +1.5*i}s cubic-bezier(0.68, -0.55, 0.265, 1.55)`} :
//                  {height: '260px', width: '210px',  transition: `all  ${2*i + 0.5*i}s cubic-bezier(0.68, -0.55, 0.265, 1.55)`}}  
//                   >
               
//                         <div style = {element.code > 20000 ? {backgroundImage : `url(${images[(element.code + 'f.jpg')]})`, backgroundSize: '100% 100%', height: '260px', width: '190px'} : {backgroundImage : `url(${images[(element.code + 'f.jpg')]})`, backgroundSize: '200% 100%', backgroundRepeat: 'no-repeat', height: '260px', width: '210px'}} className="front "  >
                    
//                     </div>
                    
//                 </Card>
     
//                 </CSSTransition>)}

                            
//                 </TransitionGroup>               
//                 </ul>
//                     </Col>
      
           
//                 <Col style={{color: 'white'}} >
//             <ul className='list'>

//             <TransitionGroup className="cardsTransition">  

            

// { this.state.combatUnits.map((element, i) =>       


//    element.code === undefined || element === undefined  ? ''
//    :
    
//     <CSSTransition
//     key={i}
//    unmountOnExit
//     classNames="star"
//     in={this.state.renderCombatUnits}
//     classNames={`star1${i}`}
//   >       

//    {element.hasAttachment ?

//               <Card  className={`star1${i} __statcard  __card`} style={element.code > 20000 ? {height: '250px', width: '210px',  transition: `all ${3+ 0.5*i}s cubic-bezier(0.68, -0.55, 0.265, 1.55)`} :
//                  {height: '260px', width: '210px',  transition: `all  ${2 + 0.5*i}s cubic-bezier(0.68, -0.55, 0.265, 1.55)`}}  
//                   >
//                   <div style={{width: '105px', height: '130px', zIndex: '-2', position: 'absolute', backgroundImage : `url(${images[(element.attachment.code + 'f.jpg')]})`, backgroundSize: '100% 100%'}}></div>
//   <div style = {element.code > 20000 ? {backgroundImage : `url(${images[(element.code + 'f.jpg')]})`, backgroundSize: '100% 100%', height: '260px', width: '210px'} : {backgroundImage : `url(${images[(element.code + 'f.jpg')]})`, backgroundSize: '200% 100%', backgroundRepeat: 'no-repeat', height: '260px', width: '210px'}} className="front "  >
  
//                     </div>
//                 </Card> :

// <Card  className= 'star1${i} __statcard __card' style={element.code > 20000 ? {height: '260px', width: '210px',  transition: `all ${2 + 0.5*i}s cubic-bezier(0.68, -0.55, 0.265, 1.55)`} :
// {height: '260px', width: '210px',  transition: `all  ${3 + 0.5*i}s cubic-bezier(0.68, -0.55, 0.265, 1.55)`}}  
//  >
// <div style = {element.code > 20000 ? {backgroundImage : `url(${images[(element.code + 'f.jpg')]})`, backgroundSize: '100% 100%', height: '260px', width: '210px'} : {backgroundImage : `url(${images[(element.code + 'f.jpg')]})`, backgroundSize: '200% 100%', backgroundRepeat: 'no-repeat', height: '260px', width: '210px'}} className="front "  >

//    </div>
// </Card>}


//                 </CSSTransition>)}

                            
//                 </TransitionGroup>               
                                    



//                         </ul>
//                         </Col>
//             </Row>

//             </div>
        
    }
}




export default TournamentReportm