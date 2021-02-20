const {
    Group
} =
require('../models/group.model');
const GroupUser = require('../models/groupUser.model');
const responseHelpers = require('../helpers/response.helpers');
const {
    mongo
} = require('mongoose');

/**
 * Export create group module
 * @param {*} req 
 * @param {*} res 
 */
exports.createGroup = async(req, res) => {
        try {
            let group = await Group.findOne({
                name: req.body.groupName,
            });
            if (group) {

                responseHelpers.successMessage(null, res, 400, "Group already registered!");
            } else {
                group = new Group({
                    name: req.body.groupName,
                    created_by: req.body.user_id
                });
                if (group.save()) {
                    responseHelpers.successMessage(group, res, 200, "Group Added Successfully!");
                }
            }

        } catch (err) {
            responseHelpers.errorMessage(err, res, 400);
        }
    },
    /**
     * Get All group list
     * @param {*} req 
     * @param {*} res 
     */
    exports.getAllGroup = async(req, res) => {
        try {
            let openTicket = await Group.find({
                "status": 1
            }, (err, result) => {
                if (err) responseHelpers.errorMessage(err, res, 400)
                responseHelpers.successMessage(result, res, 200, "Group List!");
            });
        } catch (err) {
            responseHelpers.errorMessage(err, res, 400)
        }
    },
    /**
     * Update group by group id.
     * @param {*} req 
     * @param {*} res 
     */
    exports.updateGroupById = async(req, res) => {
        try {
            await userGroup.find({
                "_id": new mongo.ObjectID(req.params.groupId)
            }, (err, result) => {
                if (err) responseHelpers.errorMessage(err, res, 400);
                if (result) {
                    var updateData = {
                        "name": req.body.groupName,
                    }
                    Group.update({
                        "_id": new mongo.ObjectID(req.params.groupId)
                    }, {
                        $set: updateData
                    }).then(result => {
                        responseHelpers.successMessage(null, res, 200, "Group Status Updated Successfully!");
                    }).catch(err => {
                        responseHelpers.errorMessage(err, res, 400)
                    });
                }

            });
        } catch (err) {
            responseHelpers.errorMessage(err, res, 400)
        }
    },
    /**
     * Get Group by group Id
     * @param {*} req 
     * @param {*} res 
     */
    exports.getGroupByGroupId = async(req, res) => {
        try {
            let groupDetails = await Group.findById({
                _id: new mongo.ObjectID(req.params.groupId)
            }, (err, data) => {
                if (err) {
                    responseHelpers.errorMessage(err, res, 400);
                }
                if (data) {
                    responseHelpers.successMessage(data, res, 200, "Group details!");
                } else {
                    responseHelpers.successMessage(null, res, 200, "Data not found!");
                }
            });
        } catch (err) {
            responseHelpers.errorMessage(err, res, 400)
        }
    },
    /**
     * Add member to group
     * @param {*} req 
     * @param {*} res 
     */
    exports.addMemberToGroup = async(req, res) => {
        try {
            let userGroup = await GroupUser.findOne({
                "group_id": req.body.group_id,
                "user_id": req.body.group_id
            });
            if (userGroup) {
                responseHelpers.successMessage(null, res, 400, "This user is already member of this group!");
            } else {
                userGroup = new GroupUser({
                    "group_id": req.body.group_id,
                    "user_id": req.body.group_id
                });
                if (userGroup.save()) {
                    responseHelpers.successMessage(group, res, 200, "Member Added Successfully!");
                }
            }

        } catch (err) {
            responseHelpers.errorMessage(err, res, 400);
        }
    },
    /**
     * Get Group by group Id
     * @param {*} req 
     * @param {*} res 
     */
    exports.getMemberByGroupId = async(req, res) => {
        let groupMember = await Group.aggregate([{
                '$match': {
                    _id: mongo.ObjectID(req.params.groupId)
                }
            },
            {
                '$lookup': {
                    from: "group_users",
                    localField: "user_id",
                    foreignField: "_id",
                    as: "member"
                },
            },
            // {
            //     '$unwind': '$user_id'
            // },
            {
                '$project': {
                    'message': 1,
                    'time': 1,
                    // 'user._id': '$user_id._id',
                    // 'user.name': '$user_id.name',
                }
            }
        ]);
        responseHelpers.successMessage(groupMember, res, 200, "Group Member List!");
    }