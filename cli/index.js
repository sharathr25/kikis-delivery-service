const delivery = require('../domain/Delivery')
const DeliveryPackage = require('../entities/DeliveryPackage/DeliveryPackage')

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

/**
 * Takes user input by asking a question
 * @param {[string]} question
 * @returns {Promise}
 */
const takeInput = (question = '') =>
  new Promise(resolve => {
    readline.question(question, data => {
      resolve(data)
    })
  })

/**
 * Creates DeliveryPackage objects using string data
 * @param {[string]} pkgs
 * @returns {[DeliveryPackage]}
 */
const createPkgs = pkgs => {
  return pkgs.map(pkg => {
    const [id, weightInKG, distanceInKM, offerCode] = pkg.split(' ')
    return new DeliveryPackage({
      id,
      weightInKG: parseInt(weightInKG),
      distanceInKM: parseInt(distanceInKM),
      offerCode
    })
  })
}

/**
 * Takes user input from the console
 * @returns {Promise}
 */
const takeUserInput = async () => {
  let input = await takeInput('base_delivery_cost no_of_packges: ')
  const [basePrice, totalPkgs] = input.split(' ').map(i => parseInt(i))
  delivery.baseDeliveryCost = basePrice

  const pkgsStrs = []
  for (let i = 1; i <= totalPkgs; i++) {
    const input = await takeInput(
      `pkg_id${i} pkg_weight${i}_in_kg distance${i}_in_km offer_code${i}: `
    )
    pkgsStrs.push(input)
  }

  input = await takeInput('no_of_vehicles max_speed max_carriable_weight: ')
  const [noOfVehicles, maxSpeed, maxCarriableWeight] = input
    .split(' ')
    .map(i => parseInt(i))

  return { basePrice, pkgsStrs, noOfVehicles, maxSpeed, maxCarriableWeight }
}

/**
 * Prints to console
 * @param {[DeliveryPackage]} deliveryPackages
 */
const printOutPut = deliveryPackages => {
  for (const deliveryPackage of deliveryPackages) {
    console.log(
      deliveryPackage.id,
      deliveryPackage.discountAmount,
      deliveryPackage.deliveryCost,
      deliveryPackage.deliveryTime
    )
  }
}

/**
 * Main runner
 * @returns {Promise}
 */
const main = async () => {
  try {
    const {
      basePrice,
      pkgsStrs,
      noOfVehicles,
      maxSpeed,
      maxCarriableWeight
    } = await takeUserInput()

    delivery.baseDeliveryCost = basePrice
    delivery.noOfVehicles = noOfVehicles
    delivery.maxSpeed = maxSpeed
    delivery.maxCarriableWeight = maxCarriableWeight
    const deliveryPackages = createPkgs(pkgsStrs)

    const deliveryPackagesWithCostAndTime = delivery.getDeliveryPackagesWithCostAndTime(
      deliveryPackages
    )

    printOutPut(deliveryPackagesWithCostAndTime)

    process.exit()
  } catch (error) {
    console.error(error, 'something went wrong while processing the input')
  }
}

main()
