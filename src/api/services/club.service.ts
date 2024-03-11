import { CreateClubBody } from '../../types/club';
import Club, { ClubOutput } from '../../db/models/club.model';

class ClubService {
    static async createClub(payload: CreateClubBody): Promise<ClubOutput> {
        return await Club.create(payload);
    }

    static async deleteClub(clubId: ClubOutput['id']): Promise<void> {
        await Club.destroy({ where: { id: clubId } });
    }
}

export default ClubService;
