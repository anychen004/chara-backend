// grab the things we need
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//====================================================================================

const changelogSchema = new Schema({ //exclusively for changes to character database
    editorName: { //for now it's just a placeholder
        type: String,
        default: "TEST"
    },
    dateTime: { //time & date of change
      type: Date
    },
    changeType: {
        type: String,
        required: true,
        enum: ["create", "delete", "edit"]
    },
    changeLocation: {
        type: String //id of chara database entry
    },
    descriptionOfChange: {
        type: String,
        default: "change made."
    }
});

//====================================================================================


const Changelog = mongoose.model("Changelog", changelogSchema);

module.exports = Changelog;
