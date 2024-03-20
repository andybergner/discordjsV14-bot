const { createClient } = require("redis");

class RedisCache {
  /**
   * @param {import("redis").RedisClientOptions} options
   */
  constructor(options) {
    this.client = createClient(options);
    this.client.on("error", (err) => {
      console.error("Redis Client Rrror", err);
    });
  }

  /**
   *
   * @param {String} key
   * @param {String} value
   * @param {Number} expire miliseconds
   */
  async set(key, value, expire) {
    this.client.set(key, value, { EX: expire });
  }
}

module.exports = RedisCache;
