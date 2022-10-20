const DeliveryPackage = require('../entities/DeliveryPackage/DeliveryPackage')

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

const takeInput = () => new Promise(resolve => readline.question('', resolve))

/**
 *
 * @param {[string]} pkgs
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
    let input = await takeInput()
    const [basePrice, totalPkgs] = input.split(' ').map(i => parseInt(i))

    // take packages
    const pkgsStrs = []
    for (let i = 0; i < totalPkgs; i++) {
      const input = await takeInput()
      pkgsStrs.push(input)
    }
    const deliveryPackages = createPkgs(pkgsStrs)
    // take no of vehicles, max speed, max cariable weight
    // input = await takeInput()
    // const [noOfVehicles, maxSpeed, maxCarriableWeight] = input
    //   .split(' ')
    //   .map(parseInt)

    process.exit()
  } catch (error) {
    console.error(error, 'something went wrong while processing the input')
  }
}

main()
