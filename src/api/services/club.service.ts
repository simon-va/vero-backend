import { ClubAttributes, CreationClubAttributes } from '../../types/club';
import Club from '../../db/models/club.model';

class ClubService {
    static async createClub(payload: CreationClubAttributes) {
        return await Club.create(payload);
    }

    static async deleteClub(clubId: ClubAttributes['id']): Promise<void> {
        await Club.destroy({ where: { id: clubId } });
    }
}

export default ClubService;
