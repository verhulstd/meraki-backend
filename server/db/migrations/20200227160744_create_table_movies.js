
exports.up = function (knex) {
    return knex.schema.createTable('movies', (table) => {
        table.increments('id')
        table.string('title')
        table.integer('year')
    })
};

exports.down = async (knex) => await knex.schema.dropTableIfExists('movies')
