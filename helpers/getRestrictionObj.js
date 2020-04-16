// Takes in data from a JOIN between Users and DietaryRestrictions tables
// Returns an object with restrictions the user has, formatted to be used by the front-end
module.exports = data => {
  const userRestrictions = {
    healthTags: [],
    dietTags: []
  }

  const formatRestrictionName = name => {
    return name.toUpperCase().replace(' DIET', '').replace(/-/g, '_')
  }

  data.forEach(item => {
    if (item['DietaryRestrictions.tagType'] === 'health') {
      userRestrictions.healthTags.push(formatRestrictionName(item['DietaryRestrictions.name']));
    } else {
      userRestrictions.dietTags.push(formatRestrictionName(item['DietaryRestrictions.name']));
    }
  })

  return userRestrictions;
}

