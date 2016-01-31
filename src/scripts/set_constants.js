"use strict";

module.exports = function(entity, data) {
    
    var player = 1;
    var om = 3;

    var player_size = data.entities.get(player, "size");
    var om_size = data.entities.get(om,"size");

    var constants = data.entities.get(entity, "constants");
    constants.center = {
        "x": (data.canvas.width / 2),
        "y": (data.canvas.height * 0.6)
    }
    var new_pos = {
        "x": constants.center.x - player_size.width / 2,
        "y": constants.center.y - player_size.height / 2,
    }
    var om_pos = {
        "x": data.canvas.width*0.9 -om_size.width,
        "y": data.canvas.height*0.95 -om_size.height
    }
    data.entities.set(player, "position", new_pos);

    var cone_id = 4;
    var cone_icon_size = data.entities.get(cone_id, "size");
    var cone_icon_position = {
        "x": (data.canvas.width / 2) - cone_icon_size.width * 1.5,
        "y": (data.canvas.height * 0.95) - cone_icon_size.height,
    }
    data.entities.set(cone_id, "position", cone_icon_position);

    var bomb_id = 5;
    var bomb_icon_size = data.entities.get(bomb_id, "size");
    var bomb_icon_position = {
        "x": (data.canvas.width / 2) - bomb_icon_size.width * 0.5,
        "y": (data.canvas.height * 0.95) - bomb_icon_size.height,
    }
    data.entities.set(bomb_id, "position", bomb_icon_position);

    var laser_id = 6;
    var laser_icon_size = data.entities.get(bomb_id, "size");
    var laser_icon_position = {
        "x": (data.canvas.width / 2) + laser_icon_size.width * 0.5,
        "y": (data.canvas.height * 0.95) - laser_icon_size.height,
    }
    data.entities.set(laser_id, "position", laser_icon_position);
    data.entities.set(om,"position",om_pos);

    var progress_meter = 7;
    var progress_meter_size = data.entities.get(progress_meter,"size");
    var progress_meter_position = data.entities.get(progress_meter,"position");
    var progress = data.entities.get(progress_meter,"progress");

    progress_meter_size.height = data.canvas.height * 0.5;
    progress_meter_size.width = data.canvas.width *0.02;
    progress_meter_position.x = data.canvas.width*0.1 + om_size.width/2;
    progress_meter_position.y = data.canvas.height*0.25;

    var tempArray = [];
    var pill_number = 15;
    var buffer = 0.05*(progress_meter_size.height/pill_number);
    var pill_size = {
        "width":progress_meter_size.width,
        "height": 0.95 *(progress_meter_size.height/pill_number)
    }
    for (var i = 0; i<pill_number;++i){
        var pill = data.instantiatePrefab("progress_block");
        var match = data.entities.get(pill,"match");

        data.entities.set(pill,"size",pill_size);
        match.offsetY = i*(buffer + pill_size.height);

        tempArray.push(pill);
    }
    for (var i= tempArray.length -1; i>= 0; --i){
        progress.blocks.push(tempArray[i]);
    }

}
