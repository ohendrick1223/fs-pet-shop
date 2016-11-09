'use strict';

var fs = require('fs');
var path = require('path');
var petsPath = './pets.json';

var node = path.basename(process.argv[0]);
var file = path.basename(process.argv[1]);
var cmd = process.argv[2];

//beginning of read subcommand
if (cmd === 'read') {
    var index = process.argv[3];

    fs.readFile(petsPath, 'utf8', function(err, data) {

        var pets = JSON.parse(data);

        if (err) {
            console.log("there was an error");
            throw err;
        } else if (index === undefined) {
            console.log(pets);
            process.exit(1);
        } else if (index > pets.length - 1 || index < 0) {
            console.error(`Usage: ${node} ${file} ${cmd} put in an INDEX position`);
            // console.log("not working");
            process.exit(1);
        }
        //console.log(index);
        var pet = pets;
        console.log(pet[index]);
    });
} //end of read subcommand

//beginning of create subcommand
else if (cmd === 'create') {
    var age = process.argv[3]
    var kind = process.argv[4];
    var name = process.argv[5];

    fs.readFile(petsPath, 'utf8', function(err, data) {
        if (err) {
            console.log("there was an error");
            throw err;
        } else if (typeof age === "undefined" || typeof kind === "undefined" || typeof name === "undefined") {
            console.log("put in age kind name");
            console.error(`Usage: ${node} ${file} ${cmd} put in AGE, KIND, NAME`);
            process.exit(1);
        } else {

            console.log("getting to create");
            var pets = JSON.parse(data);
            var tempObject = {
                'age': age,
                'kind': kind,
                'name': name
            };
            pets.push(tempObject);

            var petsJSON = JSON.stringify(pets);

            fs.writeFile(petsPath, petsJSON, function(writeErr) {
                if (writeErr) {
                    throw writeErr;
                }
                // console.log(petsJSON);
                console.log(pets);
            });
        }
    });
} //end of create subcommand

//beginningo of update subcommand
else if (cmd === 'update') {
    var index = process.argv[3]
    var age = process.argv[4]
    var kind = process.argv[5];
    var name = process.argv[6];

    fs.readFile(petsPath, 'utf8', function(err, data) {
        if (err) {
            console.log("there was an error");
            throw err;
        } else if (typeof index === "undefined" || typeof age === "undefined" || typeof kind === "undefined" || typeof name === "undefined") {
            console.log("put in index, age, kind, name");
            console.error(`Usage: ${node} ${file} ${cmd} put in INDEX, AGE, KIND, NAME`);
            process.exit(1);
        } else {

            console.log("getting to create");
            var pets = JSON.parse(data);
            var pet = {
                'age': age,
                'kind': kind,
                'name': name
            };
            pets[index] = pet;

            var petsJSON = JSON.stringify(pets);

            fs.writeFile(petsPath, petsJSON, function(writeErr) {
                if (writeErr) {
                    throw writeErr;
                }
                // console.log(petsJSON);
                console.log(pets);
            });
        }
    }); //end of update subcommand

//beginning of destroy subcommand
} else if (cmd === 'destroy') {
    var index = process.argv[3];

    fs.readFile(petsPath, 'utf8', function(err, data) {
        if (err) {
            console.log("there was an error");
            throw err;
        } else if (typeof index === "undefined") {
            console.log("put in index");
            console.error(`Usage: ${node} ${file} ${cmd} put in INDEX`);
            process.exit(1);
        } else {
            console.log("getting to destoy");
            var pets = JSON.parse(data);
            pets.splice(0, 1);
        }

        var petsJSON = JSON.stringify(pets);

        fs.writeFile(petsPath, petsJSON, function(writeErr) {
            if (writeErr) {
                throw writeErr;
            }
        //  console.log(petsJSON);
            console.log(pets);
        });
    });
} //end of destroy subcommand
