import {
    Association,
    CreationOptional,
    DataTypes,
    ForeignKey,
    InferAttributes,
    InferCreationAttributes,
    Model,
    NonAttribute
} from 'sequelize';
import sequelize from '../config';
import User from './user.model';
import Club from './club.model';

class Member extends Model<
    InferAttributes<Member>,
    InferCreationAttributes<Member>
> {
    declare id: CreationOptional<number>;
    declare firstName: string;
    declare lastName: string;
    declare userId: ForeignKey<User['id']>;
    declare clubId: number;
    declare email: string;
    declare isAdmin: boolean;

    // timestamps!
    // createdAt can be undefined during creation
    declare createdAt: CreationOptional<Date>;
    // updatedAt can be undefined during creation
    declare updatedAt: CreationOptional<Date>;

    declare user?: NonAttribute<User>;
    declare club?: NonAttribute<Club>;

    // associations
    declare static associations: {
        user: Association<Member, User>;
    };
}

Member.init({
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
    userId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    clubId: {
        type: DataTypes.INTEGER,
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
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
}, {
    timestamps: true,
    sequelize: sequelize,
    tableName: 'members'
});

export default Member;