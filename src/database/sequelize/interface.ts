import { ModelStatic, Sequelize } from 'sequelize'

export type Model = ModelStatic<any>

export type Schema = {
    short_link: Model
    // Add other models if needed
}

export type Connection = Sequelize
