/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('make.creeps');
 * mod.thing == 'a thing'; // true
 */
 

// these are the allowable creeps to be built. add as needed
const allowableBuilds = new Set(['harvester','builder','upgrader']);

var makeCreep = {
    /** 
     * This method will spawn creeps but ONLY with WORK, CARRY AND MOVE parts at the moment
     * @todo add more functionality to include different types of creeps
     * @param {String} creepType The type of creep, checked against the internal key
     * @param {Number} desiredAmount The desired amount of creeps to generate/checked against if they're on screen'
     * @param {String} spawn The string of the spawn where the creep will spawn at.
    **/
    make: function(creepType, desiredAmount, spawn) {
        // Check to make sure creepType Exists, and raise an error if it doesn't
        
        try{
            // Check that the creeptye is an allowable build
            if(allowableBuilds.has(creepType)){
                // get the current count
                var filteredCreeps = _.filter(Game.creeps, {memory: {role:creepType}});
                if(_.size(filteredCreeps) < desiredAmount){
                    // Create a new creep
                    var newCreepNumber = _.size(filteredCreeps)+1;
                    Game.spawns[spawn].spawnCreep([WORK, CARRY, MOVE], (creepType+""+newCreepNumber), {memory: {role: creepType}});
                }
            }
            else{
                // throwing the error if type doesn't exist in keys
                throw "creepType does not exist."
            }
        } catch(e){
            console.log(e)
        }
        
        //console.log("inside make function");

	}
	

	
};

module.exports = {makeCreep, allowableBuilds};
