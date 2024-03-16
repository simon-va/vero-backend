import ModuleRepository from '../../db/repositories/moduleRepository';

class ModuleService {
    static async getModules() {
        return await ModuleRepository.getModules();
    }
}

export default ModuleService;
