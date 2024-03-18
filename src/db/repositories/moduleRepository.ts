import ClubModule from '../models/clubModule';
import Module from '../models/module';

class ModuleRepository {
    static async getModulesForClub() {
        return await Module.findAll({
            attributes: ['id', 'name', 'description', 'iconId', 'isComingSoon'],
            include: [
                {
                    model: ClubModule,
                    as: 'clubs'
                }
            ]
        });
    }

    static async addModuleToClub(clubId: number, moduleId: number) {
        await ClubModule.create({
            clubId,
            moduleId
        });
    }

    static async getClubModule(clubId: number, moduleId: number) {
        return await ClubModule.findOne({
            where: {
                clubId,
                moduleId
            }
        });
    }

    static async removeModuleFromClub(clubId: number, moduleId: number) {
        await ClubModule.destroy({
            where: {
                clubId,
                moduleId
            }
        });
    }
}

export default ModuleRepository;
