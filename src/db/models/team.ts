import {
    CreationOptional,
    DataTypes,
    ForeignKey,
    InferAttributes,
    InferCreationAttributes,
    Model,
    NonAttribute
} from 'sequelize';
import sequelize from '../config';
import Club from './club';
import Member from './member';

class Team extends Model<InferAttributes<Team>, InferCreationAttributes<Team>> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare clubId: ForeignKey<Club['id']>;
    declare isSystemTeam: boolean;

    declare members?: NonAttribute<Member[]>;

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
        isSystemTeam: {
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

Member.belongsToMany(Team, {
    through: 'TeamMember',
    foreignKey: 'memberId',
    otherKey: 'teamId',
    as: 'teams'
});

Team.belongsToMany(Member, {
    through: 'TeamMember',
    foreignKey: 'teamId',
    otherKey: 'memberId',
    as: 'members'
});

export default Team;
