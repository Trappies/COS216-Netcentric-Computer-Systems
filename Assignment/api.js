const fetch = require('node-fetch-compat');

function getRandomBrands() {
  return fetch('http://localhost/HomeworkAssignment/API.php')
    .then(response => response.json())
    .then(data => {
      const brands = data.map(brand => ({
        name: brand.name,
        logo: brand.logo,
      }));
      return brands;
    })
    .catch(error => {
      console.error('Error:', error);
      return [];
    });
}

module.exports = { getRandomBrands };