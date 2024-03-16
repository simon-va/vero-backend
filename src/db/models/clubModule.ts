import {
    CreationOptional,
    DataTypes,
    ForeignKey,
    InferAttributes,
    InferCreationAttributes,
    Model
} from 'sequelize';
import sequelize from '../config';
import Club from './club';
import Module from './module';

class ClubModule extends Model<
    InferAttributes<ClubModule>,
    InferCreationAttributes<ClubModule>
> {
    declare clubId: ForeignKey<Club['id']>;
    declare moduleId: ForeignKey<Module['id']>;

    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

ClubModule.init(
    {
        clubId: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        moduleId: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    },
    {
        sequelize: sequelize
    }
);

Club.hasMany(ClubModule, {
    foreignKey: 'clubId',
    as: 'modules'
});

ClubModule.belongsTo(Club, {
    foreignKey: 'clubId',
    as: 'club'
});

Module.hasMany(ClubModule, {
    foreignKey: 'moduleId',
    as: 'clubs'
});

ClubModule.belongsTo(Module, {
    foreignKey: 'moduleId',
    as: 'module'
});

export default ClubModule;
