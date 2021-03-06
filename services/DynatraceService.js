const axios = require('axios');


class DynatraceService {
  constructor(environment, cluster, token) {
    this.environment = environment;
    this.cluster = cluster;
    this.token  = token;
  }

  /**
   * Fetch all hosts from the Dynatrace API
   */
  async getHosts() {
    const url = `${this.baseUrl}/entity/infrastructure/hosts?relativeTime=day`;
    const result = await axios.get(url, this.axiosConfig);
    if(result.data) return result.data;
    return [];
  }

  /**
   * Get the CPU utilization of a host by its entity id
   * @param {string} entityId 
   */
  async getHostCPU(entityId) {
    try {
      const url = `${this.baseUrl}/timeseries/com.dynatrace.builtin:host.cpu.user?aggregationType=AVG&relativeTime=day&queryMode=total&entity=${entityId}&includeData=true`;
      const result = await axios.get(url, this.axiosConfig)
      if(result.data && result.data.dataResult.dataPoints && result.data.dataResult.dataPoints[entityId]) {
        return result.data.dataResult.dataPoints;
      }
      return -1;
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  get baseUrl() {
    return `https://${this.environment}.${this.cluster}/api/v1`;
  };

  get axiosConfig() {
    return {
      headers: { 'Authorization': ' Api-Token ' + this.token },
    }
  }

}

module.exports = DynatraceService;