const {
    Joi
} = require('express-validation');
// POST /api/group
exports.createGroup = {
        body: Joi.object({
            groupName: Joi.string().required(),
            user_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        })
    },
    // GET-PUT-DELETE /api/group/:groupId
    exports.getGroup = {
        params: Joi.object({
            groupId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        })
    },

    // PUT /api/group/:groupId
    exports.updateGroup = {
        body: Joi.object({
            groupName: Joi.string(),
        })
    },
    //POST /api/add member to group
    exports.addMember = {
        body: Joi.object({
            group_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            user_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        })
    },
    exports.getMemberGroup = {
        params: Joi.object({
            groupId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        })
    }