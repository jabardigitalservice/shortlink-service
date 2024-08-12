import { ModelStatic, Op, Sequelize } from 'sequelize'

export type Model = ModelStatic<any>

export type Schema = {
    short_link: Model
    // Add other models if needed
    Op: typeof Op
}

export type Connection = Sequelize
