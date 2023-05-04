// grab the things we need
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//====================================================================================

function validateCharaDesc(desc) {
    console.log("VALIDATED!!!!!!");
    return true
    //return desc.hasOwnProperty("main")
}

//====================================================================================

const charaDescSchema = new Schema({ //a child schema to charaScema. 
    title: {
        type: String
    },
    link: { //link to media source (aka. fic permalink or smt)
      type: String
    },
    blurb: {
        type: String,
        required: true
    }
});

const charaSchema = new Schema({ //the schema for displaying a single character.
    charaName: {
        type: String,
        required: [true, 'Can\'t find character name ("charaName")!'],
        unique: true
    },
    charaPronouns: {
        type: String,
        enum: ["she/her", "he/him", "they/them"], //only these three for now.
        default: "they/them"
    },
    charaDescriptions: {
        type: [charaDescSchema], //by using the brackets, this indicates it's to be an array of instance(s) of this particular schema.
        //default: ["title, link, desc"]
        validate: validateCharaDesc
    },
    charaImg: {
        type: [String], //this would be an array of strings.
        default: "placeholder.png"

    }
});

//====================================================================================

const Character = mongoose.model("Character", charaSchema);
//const CharaDesc = mongoose.model("CharaDesc", charaDescSchema);

module.exports = Character;
