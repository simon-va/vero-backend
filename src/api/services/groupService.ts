import SystemGroup from '../../db/models/systemGroup';
import GroupRepository from '../../db/repositories/groupRepository';
import MemberRepository from '../../db/repositories/memberRepository';
import Error400 from '../../errors/Error400';
import { ClubAttributes } from '../../types/club';
import { CreationGroupAttributes, GroupAttributes } from '../../types/group';
import { MemberAttributes } from '../../types/member';

interface CreateGroupPayload {
    clubId: ClubAttributes['id'];
    groupPayload: CreationGroupAttributes;
}

interface AddMemberToGroupPayload {
    groupId: GroupAttributes['id'];
    memberId: MemberAttributes['id'];
    clubId: ClubAttributes['id'];
}

interface RemoveMemberFromGroupPayload {
    groupId: GroupAttributes['id'];
    memberId: MemberAttributes['id'];
    clubId: ClubAttributes['id'];
}

interface DeleteGroupPayload {
    groupId: GroupAttributes['id'];
    clubId: ClubAttributes['id'];
}

class GroupService {
    static async createGroup({ groupPayload, clubId }: CreateGroupPayload) {
        return await GroupRepository.createGroup({
            name: groupPayload.name,
            clubId: clubId
        });
    }

    static async addMemberToGroup({
        memberId,
        groupId,
        clubId
    }: AddMemberToGroupPayload) {
        const member = await MemberRepository.getMemberById(memberId);

        if (!member) {
            throw new Error400('Member not found');
        }

        if (groupId < 1000) {
            const group = await SystemGroup.findByPk(1);

            if (!group) {
                throw new Error400('System-Group not found');
            }

            await member.addSystemGroup(group);
        } else {
            const group = await GroupRepository.getGroupById(groupId);

            if (
                !member ||
                !group ||
                member.clubId !== clubId ||
                group.clubId !== clubId
            ) {
                throw new Error400('Group are not part of club');
            }

            await GroupRepository.addMemberToGroup(member, group);
        }
    }

    static async removeMemberFromGroup({
        memberId,
        groupId,
        clubId
    }: RemoveMemberFromGroupPayload) {
        const member = await MemberRepository.getMemberById(memberId);

        if (!member) {
            throw new Error400('Member not found');
        }

        if (groupId < 1000) {
            const group = await SystemGroup.findByPk(1);

            if (!group) {
                throw new Error400('System-Group not found');
            }

            await member.removeSystemGroup(group);
        } else {
            const group = await GroupRepository.getGroupById(groupId);

            if (
                !member ||
                !group ||
                member.clubId !== clubId ||
                group.clubId !== clubId
            ) {
                throw new Error400('Group are not part of club');
            }

            await GroupRepository.removeMemberFromGroup(group, member);
        }
    }

    static async getGroupsWithMembers(clubId: number) {
        const groups = await GroupRepository.getGroupsWithMembers(clubId);
        const systemGroup =
            await GroupRepository.getMembersBySystemGroupAndClubId(clubId);

        const managerGroupMemberIds = systemGroup?.members?.map(
            (member) => member.id
        );

        const managerGroup = {
            id: 1,
            name: 'Manager',
            memberIds: managerGroupMemberIds,
            isSystemGroup: true
        };

        const formattedGroups = groups.map((group) => ({
            id: group.id,
            name: group.name,
            memberIds: group.members?.map((member) => member.id)
        }));

        return [managerGroup, ...formattedGroups];
    }

    static async deleteGroup({ groupId, clubId }: DeleteGroupPayload) {
        const group = await GroupRepository.getGroupById(groupId);

        if (!group || group.clubId !== clubId) {
            throw new Error400('Group not found');
        }

        return await GroupRepository.deleteGroup(groupId);
    }
}

export default GroupService;
