import { useState } from 'react'
import './App.css'
import React from 'react'


class App extends React.Component { //container for breach alarm, rolling message
        constructor(){
            super()
    
            this.state = {
            }
        }
        
        render(){
        return(
            <div className="main">
                <div className="menu">woah!!!</div>
                <div className="content">Here's the thing. You said a "wyvern is a dragon." Is it in the same family? Yes. No one's arguing that. As someone who is a 1k MMR feeder who studies dragons, I am telling you, specifically, in dota, no one calls wyverns dragons. If you want to be "specific" like you said, then you shouldn't either. They're not the same thing. If you're saying "dragon family" you're referring to the taxonomic grouping of Varanidae, which includes things from wyverns to eldwurms to drakes. So your reasoning for calling a wyvern a dragon is because random people "call the flying lizards dragons?" Let's get gyarados and charizards in there, then, too. Also, calling someone a noob or a feeder? It's not one or the other, that's not how taxonomy works. They're both. A wyvern is a wyvern and a member of the dragon family. But that's not what you said. You said a wyvern is a dragon, which is not true unless you're okay with calling all members of the dragon family dragons, which means you'd call eldwurms, drakes, and other flying lizards dragons, too. Which you said you don't. It's okay to just admit you're wrong, you know? </div>
            </div>
        );
        }
    }

export default App
