import { Transaction } from 'sequelize';
import { ClubAttributes, CreationClubAttributes } from '../../types/club';
import Club from '../models/club';

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
}

export default ClubRepository;
