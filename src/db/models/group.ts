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

class Group extends Model<
    InferAttributes<Group>,
    InferCreationAttributes<Group>
> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare clubId: ForeignKey<Club['id']>;

    declare members?: NonAttribute<Member[]>;

    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

Group.init(
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
        sequelize: sequelize,
        initialAutoIncrement: '1000'
    }
);

Member.belongsToMany(Group, {
    through: 'GroupMember',
    foreignKey: 'memberId',
    otherKey: 'groupId',
    as: 'groups'
});

Group.belongsToMany(Member, {
    through: 'GroupMember',
    foreignKey: 'groupId',
    otherKey: 'memberId',
    as: 'members'
});

export default Group;
