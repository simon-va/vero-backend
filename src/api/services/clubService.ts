import { ClubAttributes, CreationClubAttributes } from '../../types/club';
import { UserAttributes } from '../../types/user';
import ClubRepository from '../../db/repositories/clubRepository';
import MemberRepository from '../../db/repositories/memberRepository';
import UserRepository from '../../db/repositories/userRepository';
import { MemberAttributes } from '../../types/member';

interface CreateClubPayload {
    clubPayload: CreationClubAttributes;
    user: UserAttributes;
}

interface DeleteClubPayload {
    member: MemberAttributes;
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

    static async deleteClub({ clubId, member }: DeleteClubPayload) {
        if (!member.isAdmin) {
            return { errorMessage: 'You are not authorized to delete this club' };
        }

        await ClubRepository.deleteClub(clubId);

        return { message: 'Club deleted successfully' };
    }
}

export default ClubService;