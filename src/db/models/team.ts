import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model
} from 'sequelize';
import sequelize from '../config';
import Member from './member';

class Team extends Model<InferAttributes<Team>, InferCreationAttributes<Team>> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare clubId: number;

    declare createdAt: CreationOptional<Date>;
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

Member.belongsToMany(Team, {
    through: 'Member2Team',
    foreignKey: 'memberId',
    otherKey: 'teamId'
});

Team.belongsToMany(Member, {
    through: 'Member2Team',
    foreignKey: 'teamId',
    otherKey: 'memberId'
});

export default Team;
