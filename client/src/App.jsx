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

async function fetchCharaSingle(name) {
    console.log("fetching charabase...")
    const charaBase = await fetch("http://localhost:3000/ch/"+{name});

    console.log("character fetched")
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
                entireDB: "nothing yet!"
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

        printData = () => {
            fetchCharaBase()
            .then(data => {console.log(data)})
            .catch(err => {
                console.error(err);
            })
        }

        displayCharabase = () => {
            console.log(this.state.entireDB[0].charaName);
            document.getElementById("content").innerHTML=String(this.state.entireDB[0].charaName);
        }

        displayCharaSingle = (name) => {
            console.log("running display single")
            fetchCharaSingle()
            .then(charabase => {console.log("==== CHARA:\n", charabase); document.getElementById("content").innerHTML=String(charabase)})
            .catch(err => {
                console.error(err);
            })
        }

        componentDidMount() {
            //this.printData()
            this.addCharabaseToState()
        }


        render(){
        return(
            <div className="main">
                <div className="content-wrapper">
                    <div className="menu-wrapper">
                        <MenuItem text="display all" func={() => this.displayCharabase()} />
                        <MenuItem text="woah!!" func={() => console.log("hi")} />
                        <MenuItem text="woah2" func={() => console.log("hi")} />
                        <MenuItem text="ugh" func={() => console.log("hi")} />
                    </div>
                    <div className="content" id="content">
                        
                        <form onSubmit={() => {console.log(this.state.value); this.displayCharaSingle("skew")}}>
                            <label>
                            Name Of Character To Display: 
                            <input value={this.state.value} onChange={this.handleChange} />
                            </label>
                            <input type="submit" value="Fetch!" />
                        </form>
                    
                    </div>
                </div>
                <div className="dialogue-box-wrapper">
                    <img className="dialogue-icon" src={dialogueIcon} style={{height: "120%", outline: "0px red solid", alignSelf: "flex-end"}}></img>
                    <span className="dialogue-text">oh nyoooo~!!!1!!</span>
                </div>
            </div>
        );
        }
    }

export default App
