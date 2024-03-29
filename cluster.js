let os = require('os');
let fs = require('fs');

let cluster = require('cluster')
let Worker = require('./clusterWorker')
let type = 'cluster'

class Cluster {
    constructor() {
        if (cluster.isMaster) {
            process.title = 'node ' + type + ' master'
            setInterval(this.write, 5000)
            this.fork();
            //open('http://localhost:8000/api');
        }
        else {
            new Worker();
        }
    }
    // log process of memory
    write() {
        fs.writeFile(`./data/${type}-master.mem`, Date.now() + ' ' + JSON.stringify(process.memoryUsage()) + '\n', (error) => {});
        fs.writeFile(`./data/${type}-master.cpu`, Date.now() + ' ' + JSON.stringify(os.loadavg()) + '\n', (error) => {});
    }
    fork() {
        let cpus = os.cpus().length
        for (let i = 0; i < cpus; i++) {
            cluster.fork({ id: i })
        }
        cluster.on('online', function(worker) {
            console.log('Worker ' + worker.process.pid + ' is online');
        });
    
        cluster.on('exit', function(worker, code, signal) {
            console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
            console.log('Starting a new worker');
            cluster.fork();
        });
    }
}
new Cluster();
