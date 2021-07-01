const boardUniversityModel = require('../models/boardUniversityModel')


module.exports = {

    addBoardUniversity: function(req, res) {
        const inputData = req.body.name
        const name = inputData.toLowerCase()
        const newData = {
            name
        }
        boardUniversityModel.findOne({ name: name }).exec(function (err, boarduniversity) {
            if (err)
                return res.json({ "err": err });
    
            if (boarduniversity)
                return res.json({ "Board_University": "Institution Already Exists..." });
    
            else {
                const _institution = new boardUniversityModel(newData);
    
                _institution.save((error, data) => {
                    if (error) {
                        return res.json({
                            message: error
                        })
                    }
                    if (data) {
                        return res.json({
                            message: "Institution Added Successfully..."
                        })
                    }
                })
            }
        });
    },



    getUniversities: function(req, res){
        boardUniversityModel.find().exec(function(err, data){
            if(err) return res.json({ "err": err })
    
            if(data) return res.json({"insititutions": data})
        })
    },

    

    getUniversityById: function(req, res){
        const inputData = req.body
        if(inputData.id !== ''){
            boardUniversityModel.findById(inputData.id).exec(function(err, data){
                if(err) return res.json({ "err": err })
        
                if(data) return res.json({"insititution": data})
                
                else{
                    return res.json({"insititutions": "No Record Found..."})
                }
            })
        }
        else{
            return res.json({})
        }
    }


}










