const Delivery = require('./Delivery')
const couponsRepo = require('../../repos/CouponsRepo')
const vehiclesRepo = require('../../repos/VehiclesRepo')

const DEFAULT_AMOUNT_FOR_1_KM = 5
const DEFAULT_AMOUNT_FOR_1_KG = 10

const delivery = new Delivery({ couponsRepo, vehiclesRepo })

delivery.amountFor1Kg = DEFAULT_AMOUNT_FOR_1_KG
delivery.amountFor1Km = DEFAULT_AMOUNT_FOR_1_KM

module.exports = delivery
