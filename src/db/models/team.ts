import {
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional
} from 'sequelize';
import sequelize from '../config';

class Team extends Model<InferAttributes<Team>, InferCreationAttributes<Team>> {
    // id can be undefined during creation when using `autoIncrement`
    declare id: CreationOptional<number>;
    declare name: string;
    declare clubId: number;

    // timestamps!
    // createdAt can be undefined during creation
    declare createdAt: CreationOptional<Date>;
    // updatedAt can be undefined during creation
    declare updatedAt: CreationOptional<Date>;
}

Team.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        clubId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    },
    {
        timestamps: true,
        sequelize: sequelize,
        tableName: 'teams'
    }
);

export default Team;
