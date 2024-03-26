import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
    NonAttribute
} from 'sequelize';
import sequelize from '../config';
import Member from './member';

class SystemGroup extends Model<
    InferAttributes<SystemGroup>,
    InferCreationAttributes<SystemGroup>
> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare description: string;

    declare members?: NonAttribute<Member[]>;

    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

SystemGroup.init(
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
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    },
    {
        sequelize: sequelize
    }
);

Member.belongsToMany(SystemGroup, {
    through: 'SystemGroupMember',
    foreignKey: 'memberId',
    otherKey: 'systemGroupId',
    as: 'systemGroups'
});

SystemGroup.belongsToMany(Member, {
    through: 'SystemGroupMember',
    foreignKey: 'systemGroupId',
    otherKey: 'memberId',
    as: 'members'
});

export default SystemGroup;
