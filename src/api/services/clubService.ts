import { ClubAttributes, CreationClubAttributes } from '../../types/club';
import { UserAttributes } from '../../types/user';
import ClubRepository from '../../db/repositories/clubRepository';
import MemberRepository from '../../db/repositories/memberRepository';
import UserRepository from '../../db/repositories/userRepository';

interface CreateClubPayload {
    clubPayload: CreationClubAttributes;
    user: UserAttributes;
}

interface DeleteClubPayload {
    clubId: ClubAttributes['id'];
}

class ClubService {
    static async createClub({ user, clubPayload }: CreateClubPayload) {
        const club = await ClubRepository.createClub(clubPayload);

        const member = await MemberRepository.createMember({
            userId: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            clubId: club.id,
            isAdmin: true,
            ...clubPayload
        });

        return { club, member };
    }

    static async getClubsByUserId(userId: UserAttributes['id']) {
        return await UserRepository.getClubsByUserId(userId);
    }

    static async deleteClub({ clubId }: DeleteClubPayload) {
        await ClubRepository.deleteClub(clubId);
    }
}

export default ClubService;