import sequelize from 'sequelize'
import { QueryInterface } from 'sequelize'

const tableName = 'short_links'

module.exports = {
    async up(queryInterface: QueryInterface) {
        return queryInterface
            .addColumn(tableName, 'is_random_short_code', {
                type: sequelize.BOOLEAN,
                allowNull: true,
                defaultValue: true,
            })
            .then(() => {
                return queryInterface.addIndex(tableName, [
                    'is_random_short_code',
                ])
            })
    },

    async down(queryInterface: QueryInterface) {
        return queryInterface.removeColumn(tableName, 'is_random_short_code')
    },
}
