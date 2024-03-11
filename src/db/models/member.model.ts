import { DataTypes, Model } from 'sequelize';
import sequelize from '../config';
import { UserAttributes } from './user.model';
import { ClubAttributes } from './club.model';

export interface MemberAttributes {
    id: number;
    firstName: string;
    lastName: string;
    userId?: UserAttributes['id'];
    clubId: ClubAttributes['id'];
    email?: string;
    isAdmin: boolean;

    //timestamps
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
}

export interface MemberOutput extends Required<MemberAttributes> {
}

class Member extends Model {
    public id!: number;
    public firstName!: string;
    public lastName!: string;
    public userId!: UserAttributes['id'];
    public clubId!: ClubAttributes['id'];
    public email!: string;
    isAdmin!: boolean;

    //timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
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
        allowNull: true,
        unique: true
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    timestamps: true,
    sequelize: sequelize,
    paranoid: true,
    tableName: 'members'
});

export default Member;