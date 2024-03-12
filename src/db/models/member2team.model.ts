import { Model, DataTypes } from 'sequelize';
import sequelize from '../config';
import Member, { MemberAttributes } from './member.model';
import Team, { TeamAttributes } from './team.model';

interface Member2TeamAttributes {
    memberId: MemberAttributes['id'];
    teamId: TeamAttributes['id'];

    //timestamps
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Member2TeamOutput extends Required<Member2TeamAttributes> {
}

class Member2Team extends Model {
    public memberId!: number;
    public teamId!: number;

    //timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Member2Team.init({}, {
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