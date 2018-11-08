const express = require('express');
const router = express.Router();

const DynatraceService = require('../services/DynatraceService');

const dtsvc = new DynatraceService(
  process.env.DT_ENVIRONMENT_ID, 
  process.env.DT_CLUSTER, 
  process.env.DT_API_TOKEN);

/* GET home page. */
router.get('/', async (req, res, next) => {

  // Get all hosts
  let hosts = await dtsvc.getHosts();

  const promises = [];
  // Collect all calls to get the host CPU utilization
  hosts.forEach(async (host) => {
    promises.push(dtsvc.getHostCPU(host.entityId));
  });

  // Call the API for each host asynchronously and wait until all calls return
  const hostCPU = await Promise.all(promises);
  

  // Maps the data from the API to a format that can easily traversed
  const cpuValues = hostCPU.map((elm) => {
    const k = Object.entries(elm)[0][0];
    const v = Object.entries(elm)[0][1][0][1];
    const r = {
      entityId: k,
      cpu: v,
    };
    return r;
  });

  // Traverse all hosts and decorate them with data to show on the webpage
  hosts = hosts.map((host) => {
    const match = cpuValues.find((elm) => {
      return elm.entityId === host.entityId;
    });
    host.cpu = (Math.round(match.cpu * 100) / 100).toFixed(2);

    host.badge = 'badge-dark';
    if(host.cpu < 1) {
      host.badge = 'badge-danger';
    } else if(host.cpu < 5) {
      host.badge = 'badge-success';
    } else if(host.cpu > 50 && host.cpu <= 80) {
      host.badge = 'badge-warning';
    } else if(host.cpu > 80) {
      host.badge = 'badge-danger';
    }

    return host;
  });

  // Renders the view with the data provided in `hosts`
  res.render('index', { title: 'Hosts', hosts });
});

module.exports = router;