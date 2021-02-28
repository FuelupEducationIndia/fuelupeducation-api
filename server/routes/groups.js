const express = require('express');
const {
    validate,
    ValidationError
} = require('express-validation');
const validations = require('../routes/validation/group');
var grpCtrl = require('../controllers/groupController');
const router = express.Router();

// api to create groups for chat
router.post("/createGroup", validate(validations.createGroup), grpCtrl.createGroup);
router.get("/getAllGroup", grpCtrl.getAllGroup);
router.put("/updateGroupById/:groupId", validate(validations.updateGroup), grpCtrl.updateGroupById);
router.get("/getGroupByGroupId/:groupId", validate(validations.getGroup), grpCtrl.getGroupByGroupId);
router.post("/addMemberToGroup", validate(validations.addMember), grpCtrl.addMemberToGroup);
router.get("/getMemberByGroupId/:groupId", validate(validations.getMemberGroup), grpCtrl.getMemberByGroupId);


module.exports = router;