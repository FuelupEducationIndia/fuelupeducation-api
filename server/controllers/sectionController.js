const sectionModel = require('../models/sectionModel')


module.exports = {


    addSection: function(req, res) {
        const { name, courseId, languageId, examTime } = req.body
        const _name = name.toLowerCase()
        const newData = {
            name, courseId, languageId, examTime
        }
        sectionModel.findOne({$and: [{ name }, {courseId}, {languageId}]}).exec(function (err, section) {
            if (err)
                return res.json({ "err": err });
    
            if (section)
                return res.json({ message: "Section Already Exists..." });
    
            else {
                const _section = new sectionModel(newData);
    
                _section.save((error, data) => {
                    if (error) {
                        return res.json({
                            message: error
                        })
                    }
                    if (data) {
                        return res.json({
                            message: "Section Added Successfully..."
                        })
                    }
                })
            }
        });
    },
    
    
    
    
    getSections: function(req, res){
        const { courseId, languageId } = req.body
        sectionModel.find({$and: [{courseId}, {languageId}]}).exec(function(err, data){
            if(err) return res.json({ "err": err })
    
            if(data) return res.json({"sections": data})
        })
    }
    


}
