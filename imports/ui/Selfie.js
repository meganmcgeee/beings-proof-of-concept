Template.Selfie.events({
  'click .takePhoto': function (e, instance) {
    e.preventDefault();
    var cameraOptions = {
      width: 800,
      height: 600
    };
    MeteorCamera.getPicture(cameraOptions, function (error, data) {
      if (!error) {
        instance.$('.photo').attr('src', data);
      }
    });
  }
});