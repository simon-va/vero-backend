import Club from '../models/club';
import { ClubAttributes, CreationClubAttributes } from '../../types/club';

class ClubRepository {
    static async deleteClub(clubId: ClubAttributes['id']) {
        await Club.destroy({
            where: {
                id: clubId
            }
        });
    }

    static async createClub(payload: CreationClubAttributes) {
        return await Club.create(payload);
    }
}

export default ClubRepository;