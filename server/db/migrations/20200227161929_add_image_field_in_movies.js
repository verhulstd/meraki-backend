
exports.up = function (knex) {
    return knex.schema.table('movies', function (table) {
        table.string('image')
    })
};

exports.down = function (knex) {
    return knex.schema.table('movies', function (table) {
        table.dropColumn('image')
    })
};
