import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
    NonAttribute
} from 'sequelize';
import sequelize from '../config';
import ClubModule from './clubModule';

class Module extends Model<
    InferAttributes<Module>,
    InferCreationAttributes<Module>
> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare description: string;
    declare iconId: number;
    declare isComingSoon: boolean;

    declare clubs?: NonAttribute<ClubModule[]>;

    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

Module.init(
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
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        iconId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        isComingSoon: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    },
    {
        sequelize: sequelize
    }
);

export default Module;
