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
                currentDisplay: "all",
                input: "character name!",
                charaIndexer: [],
            }

            this.CharaCard = this.CharaCard.bind(this);
            this.CharaSingleInfo = this.CharaSingleInfo.bind(this);
            //idk why i need to bind only select items tho
        }

        addCharabaseToState = () => {
            console.log("running add to state")
            fetchCharaBase()
            .then(charabase => {
                console.log("==== CHARABASE:\n", charabase);
                this.setState({entireDB: charabase})
            })
            .catch(err => {
                console.error(err);
            })
        }

        componentDidMount() {
            //this.printData()
            this.addCharabaseToState()
        }

        CharaCard({charaIndex}){
            const chara = this.state.entireDB[charaIndex];
            console.log("characard!!!", chara);

            return(
                <span className="chara-card">
                    {chara.charaName}
                    <br />
                    {chara.charaImg}
                    </span>
            );
        }
        renderCharaCards = () => {
            const charabase = this.state.entireDB;
            console.log("test!", charabase);
            
            return(
                <>   
                {charabase.map((item, index) => (
                    <this.CharaCard charaIndex={index} key={item.charaName}/>
                    ))}
                </>
                );
        }
        CharaSingleInfo({requestIndex}){
            const chara = this.state.entireDB[requestIndex];
            console.log("woah!", chara);

            return(
                <span className="chara-single-info">
                    NAME: {chara.charaName}
                    <br />
                    PRONOUNS: {chara.charaPronouns}
                    <br />
                    IMG: {chara.charaImg}
                    <br />
                    DESC: {JSON.stringify(chara.charaDescriptions)}
                </span>
            )
        }
        // renderCharaSingleInfo = (requestName) => {
        //     const charabase = this.state.entireDB;
        //     console.log("render pleeease!", charabase);

        //     return(
        //         <this.CharaSingleInfo chara={charabase[0]}/>
        //     );
            
        // }

        areEqualFunc(element){
            let input = document.getElementById("chara-input");
            return element == input.value;
        }
        handleFormSubmit(event){
            event.preventDefault(); //this prevents the reloading situation
            let input = document.getElementById("chara-input"); //fix if i find how to 
            console.log("REQUESTED!!", input.value); //what was written in the form field

            if (this.state.charaIndexer.length == 0) { //if still empty
                for (let i = 0; i < this.state.entireDB.length; i++) {
                    console.log("indexed:", this.state.entireDB[i].charaName);
                    this.setState(previousState => ({
                        charaIndexer: [...previousState.charaIndexer, this.state.entireDB[i].charaName]
                    }));
                  }
            }

            console.log(this.state.charaIndexer);
            let tempIndex = this.state.charaIndexer.findIndex(this.areEqualFunc); //would love to do an inline func but because it auto-passes the element in i don't know how to set up the props alas
            {tempIndex==-1 ? console.log("No chara by that name!!!!") : this.setState({currentDisplay: tempIndex})}
            
        }

        render(){
        return(
            <div className="main">
                <div className="content-wrapper">
                    <div className="menu-wrapper">
                        <MenuItem text="display all" func={() => this.setState({currentDisplay: "all"})} />
                        <MenuItem text="woah!!" func={() => console.log("hi")} />
                        <MenuItem text="woah2" func={() => console.log("hi")} />
                        <MenuItem text="ugh" func={() => console.log("hi")} />
                    </div>
                    <div className="content" id="content">
                        
                        <form onSubmit={this.handleFormSubmit.bind(this)}>
                            <label>
                            Name Of Character To Display: 
                            <input id="chara-input" type="text" value={this.state.value} onChange={this.handleChange} />
                            </label>
                            <input type="submit" value="Fetch!" />
                        </form>

                        <hr></hr>
                        
                        <span className="chara-card-wrapper" id="chara-card-wrapper">
                            {this.state.currentDisplay=="all" ? <this.renderCharaCards /> : <this.CharaSingleInfo requestIndex={this.state.currentDisplay}/>}
                            
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
