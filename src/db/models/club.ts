import {
    Association,
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
    NonAttribute
} from 'sequelize';
import sequelize from '../config';
import ClubModule from './clubModule';
import Group from './group';
import Member from './member';

class Club extends Model<InferAttributes<Club>, InferCreationAttributes<Club>> {
    // id can be undefined during creation when using `autoIncrement`
    declare id: CreationOptional<number>;
    declare name: string;

    // timestamps!
    // createdAt can be undefined during creation
    declare createdAt: CreationOptional<Date>;
    // updatedAt can be undefined during creation
    declare updatedAt: CreationOptional<Date>;

    declare members?: NonAttribute<Member[]>;
    declare groups?: NonAttribute<Group[]>;
    declare clubModules?: NonAttribute<ClubModule[]>;

    // associations
    declare static associations: {
        members: Association<Club, Member>;
        groups: Association<Club, Group>;
        clubModules: Association<Club, ClubModule>;
    };
}

Club.init(
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
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    },
    {
        sequelize: sequelize
    }
);

Club.hasMany(Member, {
    foreignKey: 'clubId',
    as: 'members'
});

Member.belongsTo(Club, {
    foreignKey: 'clubId',
    as: 'club'
});

Club.hasMany(Group, {
    foreignKey: 'clubId',
    as: 'groups'
});

Group.belongsTo(Club, {
    foreignKey: 'clubId',
    as: 'club'
});

export default Club;
