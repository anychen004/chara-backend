import { useState } from 'react'
import './App.css'
import React from 'react'

import dialogueIcon from './assets/oz_pfp.png';


async function fetchCharaBase() {
    console.log("fetching charabase...")
    const charaBase = await fetch("http://localhost:3000/ch/all");

    console.log("charabase fetched")
    return charaBase.json();
}


function MenuItem({ text, func }) {
    return(
        <div className="menu-item" onClick={() => {console.log("clicked!"); func()}}>
            {text}
        </div>
    );
}

class App extends React.Component {
        constructor(){
            super()
    
            this.state = {
                entireDB: [{"charaName": "nothing yet!"}],
                currentDisplay: "all"
            }
        }

        addCharabaseToState = () => {
            console.log("running add to state")
            fetchCharaBase()
            .then(charabase => {console.log("==== CHARABASE:\n", charabase); this.setState({entireDB: charabase})})
            .catch(err => {
                console.error(err);
            })
        }

        componentDidMount() {
            //this.printData()
            this.addCharabaseToState();
        }

        CharaCard({charaName}){
            return(
                <span className="chara-card">
                    {charaName}</span>
            );
        }
        renderCharaCards = () => {
            const charabase = this.state.entireDB;
            console.log("test!", charabase);
            
            return(
                <>   
                {charabase.map((item, index) => (
                    <this.CharaCard charaName={item.charaName} key={item.charaName}/>
                    ))}
                </>
                );
        }
        CharaSingleInfo({chara}){
            console.log("woah!", chara);

            return(
                <span className="chara-single-info">
                    NAME: {chara.charaName}
                </span>
            )
        }
        renderCharaSingleInfo = (requestName) => {
            const charabase = this.state.entireDB;
            console.log("rendeer please!", charabase);

            return(
                <this.CharaSingleInfo chara={charabase[0]}/>
            );
            
        }

        render(){
        return(
            <div className="main">
                <div className="content-wrapper">
                    <div className="menu-wrapper">
                        <MenuItem text="display all" func={() => console.log("TOO BAD LMAO")} />
                        <MenuItem text="woah!!" func={() => console.log("hi")} />
                        <MenuItem text="woah2" func={() => console.log("hi")} />
                        <MenuItem text="ugh" func={() => console.log("hi")} />
                    </div>
                    <div className="content" id="content">
                        
                        <form onSubmit={() => this.setState({currentDisplay: "skew"})}>
                            <label>
                            Name Of Character To Display: 
                            <input value={this.state.value} onChange={this.handleChange} />
                            </label>
                            <input type="submit" value="Fetch!" />
                        </form>

                        <hr></hr>
                        
                        <span className="chara-card-wrapper">
                            {this.state.currentDisplay=="all" ? <this.renderCharaCards /> : <this.renderCharaSingleInfo requestName={this.state.currentDisplay}/>}
                            
                        </span>
                    
                    </div>
                </div>
                <div className="dialogue-box-wrapper">
                    <img className="dialogue-icon" src={dialogueIcon} style={{height: "120%", outline: "1px red solid", alignSelf: "flex-end"}}></img>
                    <span className="dialogue-text">oh nyoooo~!!!1!!</span>
                </div>
            </div>
        );
        }
    }

export default App
