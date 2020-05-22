
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('games').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('games').insert([
        {name: 'Call of Duty'},
        {name: 'Minecraft'},
        {name: 'Pokemon'},
        {name: 'God of War'}
      ]);
    });
};
