const waitOn = require('wait-on');
const { spawn } = require('child_process');

const opts = {
    resources: ['http://localhost:4200'],
    timeout: 30000, // 30 seconds
    interval: 500,  // check every 0.5s
    verbose: true
};

waitOn(opts, (err) => {
    if (err) {
        console.error('❌ wait-on failed:', err);
        process.exit(1);
    }

    console.log('✅ Angular dev server is ready. Launching Electron...');

    const electron = spawn('electron', ['.', '--dev'], {
        stdio: 'inherit',
        shell: true
    });

    electron.on('exit', (code) => {
        console.log(`Electron exited with code ${code}`);
    });
});
