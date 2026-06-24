// Ключевые цифры сайта — меняй здесь, и они обновятся на главной странице.
//
//  foundedYear   — год основания (счётчик в блоке статистики)
//  flightHours   — налётных часов в год
//  protectedArea — площадь лесов под охраной (как показывать, напр. "6.5М")
//
//  Количество авиаотделений (branchesCount) берётся АВТОМАТИЧЕСКИ из списка
//  отделений в src/lib/branches.ts — добавишь там новое отделение, и цифра
//  (и на карте, и в статистике, и в заголовке) сама станет 19, 20 и т.д.

import { branches } from './branches';

export const siteStats = {
  foundedYear: '1978',
  branchesCount: String(branches.length),
  flightHours: '10453',
  protectedArea: '9 651',
};
