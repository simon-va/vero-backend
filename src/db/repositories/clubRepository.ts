import { Transaction } from 'sequelize';
import { ClubAttributes, CreationClubAttributes } from '../../types/club';
import { UserAttributes } from '../../types/user';
import Club from '../models/club';
import ClubModule from '../models/clubModule';
import Member from '../models/member';

class ClubRepository {
    static async deleteClub(clubId: ClubAttributes['id']) {
        await Club.destroy({
            where: {
                id: clubId
            }
        });
    }

    static async createClub(payload: CreationClubAttributes, t: Transaction) {
        return await Club.create(payload, { transaction: t });
    }

    static async getClubsByUserId(userId: UserAttributes['id']) {
        const clubs = await Club.findAll({
            include: [
                {
                    model: Member,
                    as: 'members',
                    where: {
                        userId
                    }
                }
            ]
        });

        if (!clubs) {
            return null;
        }

        return clubs.map(({ id, name }) => ({ id, name }));
    }

    static getClubById(clubId: ClubAttributes['id']) {
        return Club.findByPk(clubId, {
            include: [
                {
                    model: ClubModule,
                    as: 'clubModules',
                    attributes: ['moduleId']
                }
            ],
            attributes: ['id', 'name']
        });
    }
}

export default ClubRepository;
