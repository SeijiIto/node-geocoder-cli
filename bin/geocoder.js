#!/usr/bin/env node

var program  = require('commander'),
  GeocoderFactory = require('node-geocoder');

program
  .version('2.12.0')
  .option('-p, --provider [value]', 'Geocoder provider (default to google)', 'google')
  .option('-j, --json', 'Output raw json format')
  .option('-l, --language [value]', 'Language (default to ja)', 'ja')
  .option('-k, --key [value]', 'Google API Key');

// Crappy hack
program.executables = true;

program
  .command('geocode [options] [value]')
  .description('geocode given value')
  .action(function(value){
    try {
      var extra = {
        language: program.language,
        apiKey: program.key
      };
      var geocoder = GeocoderFactory.getGeocoder(program.provider, null, extra);
    } catch(e) {
      console.error(e.message);
      process.exit(1);
    }

    geocoder.geocode(value)
      .then(function(results) {
        if (program.json && program.json != undefined) {
          console.log("%j", results);
          return;
        }
        console.log(results);
      }, function(err) {
        console.error(err.message);
        process.exit(1);
      });
  });

program
  .command('reverse [options] [lat] [long]')
  .description('reverse geocode given value')
  .action(function(lat, long){
    try {
      var extra = {
        language: program.language,
        apiKey: program.key
      };
      var geocoder = GeocoderFactory.getGeocoder(program.provider, null, extra);
    } catch(e) {
      console.error(e.message);
      process.exit(1);
    }

    geocoder.reverse({lat:lat, lon:long})
      .then(function(results) {
        if (program.json && program.json != undefined) {
          console.log("%j", results);
          return;
        }
        console.log(results);
      }, function(err) {
        console.error(err.message);
        process.exit(1);
      });
  });

program.parse(process.argv);


