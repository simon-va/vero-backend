import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import sequelize from '../config';
import Member from './member.model';
import Team from './team.model';

class Member2Team extends Model<
    InferAttributes<Member2Team>,
    InferCreationAttributes<Member2Team>
> {
    declare memberId: number;
    declare teamId: number;

    // timestamps!
    // createdAt can be undefined during creation
    declare createdAt: CreationOptional<Date>;
    // updatedAt can be undefined during creation
    declare updatedAt: CreationOptional<Date>;
}

Member2Team.init({
    memberId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    teamId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
}, {
    timestamps: true,
    sequelize: sequelize,
    tableName: 'Member2Team'
});

Member.belongsToMany(Team, {
    through: Member2Team,
    foreignKey: 'memberId',
    otherKey: 'teamId'
});

Team.belongsToMany(Member, {
    through: Member2Team,
    foreignKey: 'teamId',
    otherKey: 'memberId'
});

export default Member2Team;