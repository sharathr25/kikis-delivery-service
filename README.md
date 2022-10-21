
# KIKIS DELIVERY SERVICE
command line application to calculate the **estimated delivery time** for every package by **maximizing no. of packages in every shipment.**

### Requirements
* Node 8
* Git

### Setup
install dependecies by running the command `npm i`

### Tests
Run tests by runnning the command `npm test`
Get test coverage by running th commane `npm run test-coverage`

### Run the project
Run the project by running the command `npm start`
#### Sample
##### input
```
base_delivery_cost no_of_packges: 100 5
pkg_id1 pkg_weight1_in_kg distance1_in_km offer_code1: PKG1 50 30 OFR001
pkg_id2 pkg_weight2_in_kg distance2_in_km offer_code2: PKG2 75 125 OFFR0008
pkg_id3 pkg_weight3_in_kg distance3_in_km offer_code3: PKG3 175 100 OFFR003
pkg_id4 pkg_weight4_in_kg distance4_in_km offer_code4: PKG4 110 60 OFFR002
pkg_id5 pkg_weight5_in_kg distance5_in_km offer_code5: PKG5 155 95 NA
no_of_vehicles max_speed max_carriable_weight: 2 70 200
```
##### output
```
PKG1 0 750 3.98
PKG2 0 1475 1.78
PKG3 0 2350 1.42
PKG4 105 1395 0.85
PKG5 0 2125 4.18
```