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
import Team from './team';
import User from './user';

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

    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;

    declare user?: NonAttribute<User>;
    declare club?: NonAttribute<Club>;

    declare addTeam: BelongsToManyAddAssociationMixin<Team, number>;
    declare removeTeam: BelongsToManyRemoveAssociationMixin<Team, number>;

    declare hasTeam: HasManyHasAssociationMixin<Team, number>;

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
    },
    {
        timestamps: true,
        sequelize: sequelize,
        tableName: 'members'
    }
);

export default Member;
