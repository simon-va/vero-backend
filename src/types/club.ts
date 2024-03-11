import { ClubAttributes } from '../db/models/club.model';

export type CreateClubBody = Pick<ClubAttributes, 'name'>