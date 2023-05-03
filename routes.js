const express = require('express')
const router = express.Router()
const [CharaSchema, CharaDescSchema] = require('./schema-models/Character.js')
const CLSchema = require('./schema-models/Changelog.js')

//CRUD - create read update destroy (post get put delet)

//CH = chara, CL = changelog, BL = blurb. (henceforth all "charaDesc" is known as "charaBlurb")

router.post('/RESET1', (req, res) => { //deletes database, initializes a whole bunch of characters. TODO.
    
    CharaSchema.deleteMany({}) //theoretically deletes all entries. for now just send the command until it returns nothing left.
    .then(character => {
        console.log("succesfully deleted!");
        res.send(character)
    })
    .catch(err => {
        console.error(err);
        res.send(err)
    })
    
})

router.post('/RESET2', (req, res) => { //deletes database, initializes a whole bunch of characters. TODO.
    
    CharaSchema.insertMany([
        { "charaName": "Isekendre Faust",
            "charaPronouns": "he/him",
            "charaDescriptions": [{"title": "main", "link": "n/a", "blurb": "relegated to site 13"}, {"title": "test2", "link": "n/a", "blurb": "what a guy"}],
            "charaImg": "faust.jpeg"
        },
        { "charaName": "Cassius Noste",
            "charaPronouns": "he/him",
            "charaDescriptions": [{"title": "main", "link": "youtube.com", "blurb": ":3"}],
            "charaImg": "noste.jpeg"
        },
        { "charaName": "Sierra",
            "charaPronouns": "she/her",
            "charaDescriptions": [{"title": "main", "link": "no", "blurb": "so cool"}]
        },
        { "charaName": "skew",
            "charaDescriptions": [{"title": "main", "blurb": "eye man"}],
        },

    ]) //creates a whole ton
    .then(character => {
      console.log("succesfully added!");
      console.log(character);
      res.send(character);
    })
    .catch(err => {
        console.error(err);
        res.send(err)
    })
    
})

// vv READS ========================================================
router.get('/ch/all', (req, res) => { //retrieves entire chara database
    CharaSchema.find({
    })
    //'then' happens if find is succesful
    .then(characters => {
        console.log("succesfully got entire db!");
        console.log(characters);
        res.json(characters)
    })
    //if theres an error, 'catch' happens instead
    .catch(err => {
      console.error(err);
      res.send(err) //send back the error to postman so it doens't hang. postman can also elaborate on the bug from their end
    })
})

router.get('/ch/:name', (req, res) => { //fetches single character by name
    CharaSchema.find({"charaName": req.params.name})
    .then(character => {
      console.log("succesfully got", req.params.name, "!");
      console.log(character);
      res.json(character)
    })
    .catch(err => {
      console.error(err);
      res.send(err)
    })
})

router.get('/ch/filter', (req, res) => { //retrieves chara database with filter. TODO, alternate filter behaviours? (AND, OR, etc.)
    
    console.log(req.body);
    
    CharaSchema.find(req.body)
    .then(character => {
      console.log("succesfully got all matching the filter!");
      console.log(character);
      res.json(character)
    })
    .catch(err => {
      console.error(err);
      res.send(err)
    })
})

router.get('/cl/all', (req, res) => { //retrieves entire chara database
    CLSchema.find({
    })
    //'then' happens if find is succesful
    .then(changelog => {
      console.log("succesfully got entire db!");
      console.log(changelog);
      res.json(changelog)
    })
    //if theres an error, 'catch' happens instead
    .catch(err => {
      console.error(err);
      res.send(err) //send back the error to postman so it doens't hang. postman can also elaborate on the bug from their end
    })
})

router.get('/cl/:id', (req, res) => { //fetches single changelog entry by id
    CLSchema.findById(req.params.id)
    .then(changelog => {
      console.log("succesfully got!");
      console.log(changelog);
      res.json(changelog)
    })
    .catch(err => {
      console.error(err);
      res.send(err)
    })
})

router.get('/bl/all', (req, res) => { //retrieves entire chara database. TODO FIGURE OUT IF THIS OUGHT TO BE EMPTY (as everything is stored within the chara db and this is just a format template) OR IF IT SHOULD HAVE STUFF IN IT
    CharaDescSchema.find({
    })
    //'then' happens if find is succesful
    .then(desc => {
      console.log("succesfully got entire db!");
      console.log(desc);
      res.json(desc)
    })
    //if theres an error, 'catch' happens instead
    .catch(err => {
      console.error(err);
      res.send(err) //send back the error to postman so it doens't hang. postman can also elaborate on the bug from their end
    })
})

// ^^ READS ========================================================

// vv CREATES ========================================================
router.post('/ch/add', (req, res) => { //create a new character. unchanged from previous
    console.log(req);
    console.log("PARAMS!!!!!", req.params);
    
    CharaSchema.create(req.body)
    .then(character => {
      console.log("succesfully added!");
      console.log(character);
      res.send(character);
    })
    .catch(err => {
        console.error(err);
        res.send(err)
    })
    
})

router.post('/cl/add', (req, res) => { //create a new . unchanged from previous
    console.log(req);
    console.log("PARAMS!!!!!", req.params);
    
    CLSchema.create(req.body)
    .then(changelog => {
      console.log("succesfully added!");
      console.log(changelog);
      res.send(changelog);
    })
    .catch(err => {
        console.error(err);
        res.send(err)
    })
    
})

// ^^ CREATES ========================================================

// vv UPDATES ========================================================
router.put('/ch/:name/update', (req, res) => { //update character by name.
    CharaSchema.findOneAndUpdate({"charaName":req.params.name}, req.body)
    .then(character => {
      console.log("succesfully updated!")
      console.log(character)
      res.send(character)
    })
    .catch(err => {
      console.error(err)
      res.send(err)
    })

})

router.put('/ch/:name/add-bl', (req, res) => { //add a new blurb to the character.
    CharaSchema.findOne({"charaName":req.params.name})
    .then(character => {
        character.charaDescriptions.push(req.body); //pushes to array. remember that mongo just runs on javascript and thus all js commands can be used.
        character.save()
        .then(character => { 
            console.log("succesfully updated!")
            console.log(character)
            res.send(character)
        })
        .catch(err => {
            console.error(err)
            res.send(err)
          })
      
    })
    .catch(err => {
      console.error(err)
      res.send(err)
    })

})

router.put('/ch/:name/overwrite', (req, res) => { //update character by name, overwrites entire item.
    CharaSchema.findOneAndReplace({"charaName":req.params.name}, req.body)
    .then(character => {
      console.log("succesfully updated!")
      console.log(character)
      res.send(character)
    })
    .catch(err => {
      console.error(err)
      res.send(err)
    })

})


// ^^ UPDATES ========================================================

// vv DELET ========================================================
router.delete('/ch/:name/delete', (req, res) => { //delete by name
    CharaSchema.findOneAndDelete(req.params.name)
    .then(character => {
      console.log("succesfully deleted!")
      console.log(character)
      res.send(character)
    })
    .catch(err => {
      console.error(err)
      res.send(err)
    })

})

router.delete('/cl/:id/delete', (req, res) => { //delete by name
    CharaSchema.findByIdAndDelete(req.params.id)
    .then(changelog => {
      console.log("succesfully deleted!")
      console.log(changelog)
      res.send(changelog)
    })
    .catch(err => {
      console.error(err)
      res.send(err)
    })

})

// ^^ DELET ========================================================

module.exports = router
