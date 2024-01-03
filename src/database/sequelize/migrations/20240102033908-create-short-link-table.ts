import { DataTypes, QueryInterface, Sequelize } from 'sequelize'

const tableName = 'short_links'

export async function up(queryInterface: QueryInterface) {
    return queryInterface
        .createTable(tableName, {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },
            short_code: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            url: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            clicks: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            expired: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: true,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP()'),
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: true,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP()'),
            },
        })
        .then(() => {
            return queryInterface.addIndex(tableName, ['short_code'])
        })
}

export async function down(queryInterface: QueryInterface) {
    return queryInterface.dropDatabase(tableName)
}
