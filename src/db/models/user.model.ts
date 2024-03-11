import { DataTypes, Model } from 'sequelize';
import sequelize from '../config';
import Member from './member.model';

export interface UserAttributes {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;

    //timestamps
    createdAt?: Date;
    updatedAt?: Date;
}

export interface UserOutput extends Required<UserAttributes> {
}

class User extends Model {
    public id!: number;
    public firstName!: string;
    public lastName!: string;
    public email!: string;
    public password!: string;

    //timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init({
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
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true,
    sequelize: sequelize,
    tableName: 'users'
});

User.hasMany(Member, {
    foreignKey: 'userId',
    as: 'members'
});

Member.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
})

export default User;