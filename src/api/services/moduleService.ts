import ModuleRepository from '../../db/repositories/moduleRepository';
import Error400 from '../../errors/Error400';

class ModuleService {
    static async getModules(clubId: number) {
        const modules = await ModuleRepository.getModulesForClub();

        return modules.map((module) => {
            const clubModule = module.clubs?.find(
                (clubModule) => clubModule.clubId === clubId
            );

            return {
                id: module.id,
                name: module.name,
                iconId: module.iconId,
                description: module.description,
                isComingSoon: module.isComingSoon,
                isSelected: !!clubModule
            };
        });
    }

    static async addModuleToClub(clubId: number, moduleId: number) {
        const module = await ModuleRepository.getClubModule(clubId, moduleId);

        if (module) {
            throw new Error400('Module already added to club');
        }

        await ModuleRepository.addModuleToClub(clubId, moduleId);
    }

    static async removeModuleFromClub(clubId: number, moduleId: number) {
        const module = await ModuleRepository.getClubModule(clubId, moduleId);

        if (!module) {
            throw new Error400('Module not added to club');
        }

        await ModuleRepository.removeModuleFromClub(clubId, moduleId);
    }
}

export default ModuleService;
