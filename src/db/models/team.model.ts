import { Model, DataTypes } from 'sequelize';
import sequelize from '../config';
import { ClubAttributes } from './club.model';

export interface TeamAttributes {
    id: number;
    name: string;
    clubId: ClubAttributes['id'];

    //timestamps
    createdAt?: Date;
    updatedAt?: Date;
}

export interface TeamOutput extends Required<TeamAttributes> {
}

class Team extends Model {
    public id!: number;
    public name!: string;
    public clubId!: number;

    //timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Team.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    clubId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: true,
    sequelize: sequelize,
    tableName: 'teams'
});

export default Team;