import * as fs from 'fs';
import parse from 'csv-parse/lib/sync';
import { ParsedQs } from 'qs';
import { numberOrDefault } from '../../shared/utils/parser.service';
import DEFAULT_PAGE_SIZE from '../../shared/constant';
import { Practices } from '../../interface/practices';
import NodeCacheService from '../../config/utils/node-cache.service';

export default async function getPracticesFromCsv(queryParams: ParsedQs): Promise<Practices[]> {
  const offset: number = numberOrDefault(queryParams.offset || queryParams.from, 0);
  const limit: number = numberOrDefault(queryParams.limit || queryParams.size, DEFAULT_PAGE_SIZE);
  let practices: Practices[] = [];
  const cachePractices = await NodeCacheService.retrieveKey('practices');
  if (cachePractices) {
    practices = cachePractices.slice(offset, limit);
  } else {
    const fileContent = await fs.promises.readFile(`./practices.csv`);
    const records = parse(fileContent, { columns: true, delimiter: ';', autoParse: true });
    if (records?.length) {
      const sortedRecords = records.map((record: Practices) => {
        // eslint-disable-next-line no-param-reassign
        delete record[''];
        return record;
      });
      await NodeCacheService.storeKey('practices', sortedRecords);
      practices = sortedRecords.slice(offset, limit);
    }
  }
  return practices;
}
