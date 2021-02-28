const AccessControl = require("accesscontrol");

const ac = new AccessControl();

exports.role = (function() {
    ac.grant("student")
        .readOwn("profile")
        .updateOwn("profile");

    ac.grant("teacher")
        .extend("student")
        .readAny("profile");

    ac.grant("admin")
        .extend(['student', 'teacher'])
        .readAny("profile")
        .updateAny("profile")
        .deleteAny("profile");

    return ac;

})();