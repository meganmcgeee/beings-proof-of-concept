var nip_engine = function (spec, my) {
    var that = {};
    my = my || {};
    that.feline = "Katie";

//    Add shared variables and functions to my

//    that = a new object;

//   Add privileged methods to that
    that.stat = function stat() {
        return "INACTIVE";
    };
    return that;
};