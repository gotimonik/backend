import NodeCache from 'node-cache';
import { JsonObject } from 'swagger-ui-express';

export default class NodeCacheService {
  public static myCache: NodeCache = new NodeCache();

  public static async storeKey(key: string, value: JsonObject): Promise<boolean> {
    return this.myCache.set(key, value);
  }

  public static async retrieveKey(key: string): Promise<JsonObject> {
    return this.myCache.get(key) as JsonObject;
  }

  public static async hasKey(key: string): Promise<boolean> {
    return this.myCache.has(key) as boolean;
  }
}
