const delivery = require('../domain/Delivery')
const DeliveryPackage = require('../entities/DeliveryPackage/DeliveryPackage')

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

const takeInput = (q = '') =>
  new Promise(resolve => {
    readline.question(q, data => {
      resolve(data)
    })
  })

/**
 *
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

const main = async () => {
  try {
    // take base price and total packages
    let input = await takeInput('base_delivery_cost no_of_packges: ')
    const [basePrice, totalPkgs] = input.split(' ').map(i => parseInt(i))
    delivery.baseDeliveryCost = basePrice

    // take packages
    const pkgsStrs = []
    for (let i = 1; i <= totalPkgs; i++) {
      const input = await takeInput(
        `pkg_id${i} pkg_weight${i}_in_kg distance${i}_in_km offer_code${i}: `
      )
      pkgsStrs.push(input)
    }

    // take no of vehicles, max speed, max cariable weight
    input = await takeInput('no_of_vehicles max_speed max_carriable_weight: ')
    const [noOfVehicles, maxSpeed, maxCarriableWeight] = input
      .split(' ')
      .map(i => parseInt(i))
    delivery.noOfVehicles = noOfVehicles
    delivery.maxSpeed = maxSpeed
    delivery.maxCarriableWeight = maxCarriableWeight

    const deliveryPackages = createPkgs(pkgsStrs)
    const deliveryPackagesWithOffers = delivery.getDeliveryPackagesWithCostAndTime(
      deliveryPackages
    )

    for (const deliveryPackage of deliveryPackagesWithOffers) {
      console.log(
        deliveryPackage.id,
        deliveryPackage.discountAmount,
        deliveryPackage.deliveryCost,
        deliveryPackage.deliveryTime
      )
    }

    readline.close()
    process.exit()
  } catch (error) {
    console.error(error, 'something went wrong while processing the input')
  }
}

main()
