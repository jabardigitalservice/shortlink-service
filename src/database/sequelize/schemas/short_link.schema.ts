import { DataTypes } from 'sequelize'
import { Connection } from '../interface'

const ShortLink = (connection: Connection) => {
    return connection.define(
        'short_links',
        {
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            is_active: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },
            short_code: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            url: {
                type: DataTypes.TEXT,
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
        },
        {
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        }
    )
}

export default ShortLink
