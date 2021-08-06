var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var makeCreepPackage = require('make.creeps');

module.exports.loop = function () {
    // Global variables. change these numbers to change code
    var numHarvesterCreeps = 3;
    var numUpgraderCreeps = 1;
    var numBuilderCreeps = 1;
    
    // Tower code for attacking 
    var tower = Game.getObjectById('957d9fdf56f1b5f20bebe1c88');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
        
    }
    
    /*
    //console.log(makeCreeps.testArray[2]);
    // TODO: Cleanup this code and refactor it accordingly into make.creeps
    // Generate new creeps code
    // makeCreeps.make("random Type test");
    if((_.size(Game.creeps)) >= 0){
        // Iterate over harvester creeps and Generate a harvester creep
        var harvesters = _.filter(Game.creeps, {memory: {role:'harvester'}});
        if(_.size(harvesters) < numHarvesterCreeps){
            // Create new harvester
            var newHarvesterNumber = _.size(harvesters)+1;
            Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], ("Harvester"+(newHarvesterNumber)), {memory: {role: 'harvester'}});
        }
        
        // Get upgrader creeps counts and autogenerate upgrader creeps when less than 1
        var upgraders = _.filter(Game.creeps, {memory: {role:'upgrader'}});
        if(_.size(upgraders) < numUpgraderCreeps){
            // Create new upgrader
            var newUpgraderNumber = _.size(upgraders)+1;
            Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], ("Upgrader"+(newUpgraderNumber)), {memory: {role: 'upgrader'}});
        }
            
        // Get builder creep counts and autogenerate builder creeps when there is less than 1
        var builders = _.filter(Game.creeps, {memory: {role:'builder'}});
        if(_.size(upgraders) < numBuilderCreeps){
            // Create new builder creep
            var newUpgraderNumber = _.size(upgraders)+1;
            Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], ("Builder"+(newUpgraderNumber)), {memory: {role: 'builder'}});
        }
    }
    */

    // ----------------------------------------------------
    // This is the creep population code
    if(_.size(Game.creeps) <= 0){
        // just add a new harvester creep to get this party started
        makeCreepPackage.makeCreep.make("harvester",numHarvesterCreeps,"Spawn1");  
    }
    else{
        // @todo fix this code so that it stops breaking the creeps
        for(var name in Game.creeps){
            // statements to check that the number of creeps what the number dictates above.
            // this will populate the harvester creeps
            // MAKE SURE TO ADD TO THE make.creeps allowableBuilds SET AS NEEDED
            if(_(Game.creeps).filter( { memory: { role: 'harvester' } } ).size() < numHarvesterCreeps){
                makeCreepPackage.makeCreep.make("harvester",numHarvesterCreeps,"Spawn1");  
            }
            // populate upgraders
            if(_(Game.creeps).filter( { memory: { role: 'upgrader' } } ).size() < numUpgraderCreeps){
                makeCreepPackage.makeCreep.make("upgrader",numUpgraderCreeps,"Spawn1");  
            }
            // populate builders
            if(_(Game.creeps).filter( { memory: { role: 'builder' } } ).size() < numBuilderCreeps){
                makeCreepPackage.makeCreep.make("builder",numBuilderCreeps,"Spawn1");  
            }
    
        }
    }
    
    // ----------------------------------------------------
    // Iterate over creeps. perform their associated roles.
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        // perform creep actions roles
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}