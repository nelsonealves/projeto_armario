//let Client = require('ssh2');
//let spawn = require('child_process').spawn;

module.exports.auth_iperf = (express, req, res) => {
    
        if (req.body.host == "localhost") {
            let process = spawn('iperf', req.body.info);
            process.stdout.setEncoding('utf-8');
            process.stdout.on('data', (data) => {
                express.server.socketio.emit('server_iperf', data.toString());
            });
            process.stderr.setEncoding('utf-8');
            process.stderr.on('data', function (data) {
                express.server.socketio.emit('server_iperf', data.toString());
            });
        } else {
            var conn = new Client();
            conn.connect({
                host: req.body.host,
                port: req.body.port,
                username: req.body.username,
                password: req.body.password
            });
            conn.on('ready', () => {
                console.log('Client :: ready');
                conn.exec("iperf" + req.body.info.join(' '), (err, stream) => {
                    if (err) throw err;
                    stream.on('close', function (code, signal) {
                        console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
                        conn.end();
                    }).on('data', function (data) {
                        express.server.socketio.emit('server_ssh', data);
                    }).stderr.on('data', function (data) {
                        console.log('STDERR: ' + data);
                    });
                }, (teste) => {
                    console.log(teste)
                })
            });
        }
    
}
