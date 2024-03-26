import {
    Association,
    BelongsToManyAddAssociationMixin,
    BelongsToManyRemoveAssociationMixin,
    CreationOptional,
    DataTypes,
    ForeignKey,
    HasManyHasAssociationMixin,
    InferAttributes,
    InferCreationAttributes,
    Model,
    NonAttribute
} from 'sequelize';
import sequelize from '../config';
import Club from './club';
import Group from './group';
import SystemGroup from './systemGroup';
import User from './user';

class Member extends Model<
    InferAttributes<Member>,
    InferCreationAttributes<Member>
> {
    declare id: CreationOptional<number>;
    declare firstName: string;
    declare lastName: string;
    declare userId: ForeignKey<User['id']>;
    declare clubId: ForeignKey<Club['id']>;
    declare email: string;
    declare isAdmin: boolean;
    declare birthDate: CreationOptional<string>;
    declare phone: CreationOptional<string>;
    declare address: CreationOptional<string>;
    declare city: CreationOptional<string>;
    declare zipCode: CreationOptional<string>;
    declare gender: CreationOptional<number>;

    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;

    declare user?: NonAttribute<User>;
    declare club?: NonAttribute<Club>;

    declare addGroup: BelongsToManyAddAssociationMixin<Group, number>;
    declare addSystemGroup: BelongsToManyAddAssociationMixin<
        SystemGroup,
        number
    >;
    declare removeGroup: BelongsToManyRemoveAssociationMixin<Group, number>;
    declare removeSystemGroup: BelongsToManyRemoveAssociationMixin<
        SystemGroup,
        number
    >;

    declare hasGroup: HasManyHasAssociationMixin<Group, number>;
    declare hasSystemGroup: HasManyHasAssociationMixin<SystemGroup, number>;

    // associations
    declare static associations: {
        user: Association<Member, User>;
    };
}

Member.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            defaultValue: ''
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        birthDate: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        zipCode: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        gender: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    },
    {
        sequelize: sequelize
    }
);

export default Member;
