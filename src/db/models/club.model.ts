import { DataTypes, Model } from 'sequelize';
import sequelize from '../config';
import Member from './member.model';

export interface ClubAttributes {
    id: number;
    name: string;

    //timestamps
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
}

export interface ClubOutput extends Required<ClubAttributes> {
}

class Club extends Model {
    public id!: number;
    public name!: string;

    //timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

Club.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true,
    sequelize: sequelize,
    paranoid: true,
    modelName: 'club'
});

Club.hasMany(Member, {
    foreignKey: 'clubId',
    as: 'members'
});

Member.belongsTo(Club, {
    foreignKey: 'clubId',
    as: 'club'
});

export default Club;