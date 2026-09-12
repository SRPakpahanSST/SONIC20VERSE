// ============================================================
// app.js - Entry Point with Debug
// SONIC20VERSE
// ============================================================

console.log('🚀 =====================================');
console.log('🚀 app.js LOADED - SONIC20VERSE');
console.log('🚀 =====================================');

var audioEngine = null;
var keyboardRenderer = null;
var styleEngine = null;
var voiceManager = null;
var arpeggiator = null;
var recorder = null;
var mixer = null;
var aiAssistant = null;
var knobController = null;
var wheelController = null;
var padController = null;
var displayManager = null;

var systemState = {
    powerOn: false,
    bootComplete: false,
    audioUnlocked: false,
    inStudio: false,
    initialized: false
};

// ============================================================
// HANDLE MULAI - FUNGSI UTAMA
// ============================================================
function handleMulaiClick(e) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    console.log('🟢 =====================================');
    console.log('🟢 TOMBOL MULAI DIKLIK!');
    console.log('🟢 =====================================');
    
    var landingPage = document.getElementById('landing-page');
    var splashScreen = document.getElementById('splash-screen');
    var appContainer = document.getElementById('app');
    var loaderBar = document.getElementById('loaderBar');
    
    // Step 1: Hide landing page
    console.log('📍 Step 1: Hide landing page');
    if (landingPage) {
        landingPage.classList.add('hidden');
        console.log('✅ Landing page hidden');
    } else {
        console.error('❌ Landing page tidak ditemukan!');
    }
    
    // Step 2: Show splash after delay
    setTimeout(function() {
        console.log('📍 Step 2: Show splash screen');
        if (splashScreen) {
            splashScreen.classList.add('show');
            console.log('✅ Splash screen shown');
        } else {
            console.error('❌ Splash screen tidak ditemukan!');
        }
        
        // Step 3: Animate loader
        if (loaderBar) {
            console.log('📍 Step 3: Animate loader');
            loaderBar.style.width = '0%';
            var progress = 0;
            var interval = setInterval(function() {
                progress += Math.random() * 10 + 3;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    loaderBar.style.width = '100%';
                    console.log('✅ Loader complete');
                    setTimeout(function() {
                        showStudio();
                    }, 500);
                }
                loaderBar.style.width = progress + '%';
            }, 100);
        } else {
            console.log('⚠️ Loader tidak ditemukan, skip animasi');
            setTimeout(function() {
                showStudio();
            }, 2000);
        }
    }, 600);
}

// ============================================================
// SHOW STUDIO
// ============================================================
function showStudio() {
    console.log('📍 Step 4: Show studio');
    
    var splashScreen = document.getElementById('splash-screen');
    var appContainer = document.getElementById('app');
    
    // Hide splash
    if (splashScreen) {
        splashScreen.classList.remove('show');
        splashScreen.style.display = 'none';
        console.log('✅ Splash hidden');
    }
    
    // Show app
    if (appContainer) {
        appContainer.classList.add('show');
        appContainer.style.display = 'flex';
        console.log('✅ App shown');
    } else {
        console.error('❌ App container tidak ditemukan!');
        return;
    }
    
    // Initialize app
    setTimeout(function() {
        initApp();
    }, 200);
}

// ============================================================
// INIT APP
// ============================================================
function initApp() {
    if (systemState.initialized) {
        console.log('⚠️ App sudah initialized');
        return;
    }
    
    console.log('🎹 =====================================');
    console.log('🎹 INITIALIZING SONIC20VERSE');
    console.log('🎹 =====================================');
    
    try {
        // 1. Audio Engine
        if (typeof AudioEngine !== 'undefined') {
            audioEngine = new AudioEngine();
            audioEngine.init();
            console.log('✅ Audio Engine');
        }
        
        // 2. Display Manager
        if (typeof DisplayManager !== 'undefined') {
            displayManager = new DisplayManager();
            displayManager.init();
            console.log('✅ Display Manager');
        }
        
        // 3. Keyboard
        if (typeof KeyboardRenderer !== 'undefined') {
            keyboardRenderer = new KeyboardRenderer();
            keyboardRenderer.init(audioEngine);
            console.log('✅ Keyboard (E2-A7)');
        }
        
        // 4. Style Engine
        if (typeof StyleEngine !== 'undefined') {
            styleEngine = new StyleEngine();
            styleEngine.init(audioEngine);
            console.log('✅ Style Engine');
        }
        
        // 5. Voice Manager
        if (typeof VoiceManager !== 'undefined') {
            voiceManager = new VoiceManager();
            voiceManager.init(audioEngine);
            console.log('✅ Voice Manager');
        }
        
        // 6. Arpeggiator
        if (typeof Arpeggiator !== 'undefined') {
            arpeggiator = new Arpeggiator();
            arpeggiator.init(audioEngine);
            console.log('✅ Arpeggiator');
        }
        
        // 7. Recorder
        if (typeof Recorder !== 'undefined') {
            recorder = new Recorder();
            recorder.init();
            console.log('✅ Recorder');
        }
        
        // 8. Mixer
        if (typeof Mixer !== 'undefined') {
            mixer = new Mixer();
            mixer.init(audioEngine);
            console.log('✅ Mixer');
        }
        
        // 9. AI Assistant
        if (typeof AIAssistant !== 'undefined') {
            aiAssistant = new AIAssistant();
            aiAssistant.init(audioEngine);
            console.log('✅ AI Assistant');
        }
        
        // 10. UI Controllers
        if (typeof KnobController !== 'undefined') {
            knobController = new KnobController();
            knobController.init();
            console.log('✅ Knob Controller');
        }
        
        if (typeof WheelController !== 'undefined') {
            wheelController = new WheelController();
            wheelController.init();
            console.log('✅ Wheel Controller');
        }
        
        if (typeof PadController !== 'undefined') {
            padController = new PadController();
            padController.init(audioEngine);
            console.log('✅ Pad Controller');
        }
        
        // Setup Power Button
        setupStudioPower();
        
        // Setup other controls
        setupControls();
        setupTabs();
        setupTransport();
        setupStyleControls();
        setupVoiceControls();
        setupAIEvents();
        setupClock();
        
        // Register globals
        window.audioEngine = audioEngine;
        window.keyboardRenderer = keyboardRenderer;
        window.styleEngine = styleEngine;
        window.voiceManager = voiceManager;
        window.arpeggiator = arpeggiator;
        window.recorder = recorder;
        window.mixer = mixer;
        window.aiAssistant = aiAssistant;
        window.displayManager = displayManager;
        
        systemState.initialized = true;
        
        console.log('🎉 =====================================');
        console.log('🎉 SONIC20VERSE READY!');
        console.log('🎉 Tekan tombol POWER di header untuk menyalakan keyboard');
        console.log('🎉 =====================================');
        
    } catch (error) {
        console.error('❌ =====================================');
        console.error('❌ ERROR saat inisialisasi:');
        console.error('❌', error);
        console.error('❌ =====================================');
    }
}

// ============================================================
// STUDIO POWER ON/OFF
// ============================================================
function setupStudioPower() {
    var btnPower = document.getElementById('btnPowerStudio');
    
    if (!btnPower) {
        console.error('❌ Tombol Power Studio tidak ditemukan!');
        return;
    }
    
    console.log('✅ Tombol Power Studio terpasang');
    
    btnPower.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('⚡ Tombol POWER diklik');
        
        if (systemState.powerOn) {
            powerOffStudio();
        } else {
            powerOnStudio();
        }
    });
    
    // Touch support
    btnPower.addEventListener('touchstart', function(e) {
        e.preventDefault();
        btnPower.click();
    }, { passive: false });
    
    updatePowerIndicator(false);
}

function powerOnStudio() {
    console.log('⚡ POWER ON Studio');
    
    systemState.powerOn = true;
    updatePowerIndicator(true);
    
    // Unlock audio
    unlockAudio();
    
    // Play startup sound
    playStartupSound();
    
    // Show boot screen
    showBootScreen();
}

function powerOffStudio() {
    console.log('⏻ POWER OFF Studio');
    
    systemState.powerOn = false;
    updatePowerIndicator(false);
    
    // Stop all audio
    if (audioEngine) audioEngine.stopAll();
    if (styleEngine) styleEngine.stop();
    
    // Deactivate all keys
    if (keyboardRenderer) {
        Object.keys(keyboardRenderer.activeKeys).forEach(function(noteName) {
            var key = keyboardRenderer.keyElements[noteName];
            if (key) keyboardRenderer.deactivateKey(key);
        });
    }
    
    console.log('💤 Studio OFF');
}

function updatePowerIndicator(isOn) {
    var btnPower = document.getElementById('btnPowerStudio');
    var powerLed = document.getElementById('powerLed');
    var powerLabel = document.getElementById('powerLabel');
    
    if (btnPower) {
        if (isOn) {
            btnPower.classList.add('on');
        } else {
            btnPower.classList.remove('on');
        }
    }
    
    if (powerLed) {
        if (isOn) {
            powerLed.classList.add('on');
        } else {
            powerLed.classList.remove('on');
        }
    }
    
    if (powerLabel) {
        powerLabel.textContent = isOn ? 'ON' : 'OFF';
        if (isOn) {
            powerLabel.classList.add('on');
        } else {
            powerLabel.classList.remove('on');
        }
    }
}

// ============================================================
// STARTUP SOUND
// ============================================================
function playStartupSound() {
    try {
        var ctx = new (window.AudioContext || window.webkitAudioContext)();
        if (ctx.state === 'suspended') ctx.resume();
        
        var notes = [261.63, 329.63, 392.00, 523.25];
        var now = ctx.currentTime;
        
        notes.forEach(function(freq, i) {
            var osc = ctx.createOscillator();
            var gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.value = freq;
            
            gain.gain.setValueAtTime(0, now + i * 0.1);
            gain.gain.linearRampToValueAtTime(0.15, now + i * 0.1 + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.8);
            
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now + i * 0.1);
            osc.stop(now + i * 0.1 + 0.8);
        });
        
        setTimeout(function() { ctx.close(); }, 2000);
    } catch(e) {
        console.log('Startup sound error:', e);
    }
}

// ============================================================
// UNLOCK AUDIO
// ============================================================
function unlockAudio() {
    try {
        var ctx = new (window.AudioContext || window.webkitAudioContext)();
        if (ctx.state === 'suspended') ctx.resume();
        systemState.audioUnlocked = true;
        
        var osc = ctx.createOscillator();
        var gain = ctx.createGain();
        gain.gain.value = 0.001;
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
        
        setTimeout(function() { ctx.close(); }, 500);
        console.log('🔊 Audio unlocked');
    } catch(e) {
        console.log('Audio unlock error:', e);
    }
}

// ============================================================
// BOOT SCREEN
// ============================================================
var bootSteps = [
    { progress: 5, status: 'Initializing system...', log: '⚡ Power ON detected' },
    { progress: 15, status: 'Loading frequencies...', log: '✅ Loaded 114 notes (E2-A7)' },
    { progress: 25, status: 'Initializing audio engine...', log: '✅ Web Audio API ready' },
    { progress: 35, status: 'Loading AI modules...', log: '✅ Multi-Agent AI loaded' },
    { progress: 45, status: 'Loading style engine...', log: '✅ 9 styles loaded' },
    { progress: 55, status: 'Loading voice manager...', log: '✅ 32 voices loaded' },
    { progress: 65, status: 'Initializing keyboard...', log: '✅ 114 tuts rendered' },
    { progress: 75, status: 'Initializing effects...', log: '✅ Reverb, Delay, Chorus' },
    { progress: 85, status: 'Calibrating sensors...', log: '✅ Touch & MIDI ready' },
    { progress: 95, status: 'Finalizing...', log: '✅ SONIC20VERSE ready!' },
    { progress: 100, status: 'Welcome!', log: '🎹 20 Nada Menggema di Semesta' }
];

function showBootScreen() {
    var bootScreen = document.getElementById('boot-screen');
    if (!bootScreen) {
        console.log('⚠️ Boot screen tidak ada, langsung ready');
        systemState.bootComplete = true;
        return;
    }
    
    bootScreen.classList.add('show');
    
    var progressBar = document.getElementById('bootProgressBar');
    var statusEl = document.getElementById('bootStatus');
    var logEl = document.getElementById('bootLog');
    
    if (logEl) logEl.innerHTML = '';
    
    var stepIndex = 0;
    
    function runBootStep() {
        if (stepIndex >= bootSteps.length) {
            setTimeout(function() {
                bootScreen.classList.remove('show');
                systemState.bootComplete = true;
                console.log('🎉 Boot complete! Keyboard ready.');
                
                var footerStatus = document.getElementById('footerStatus');
                if (footerStatus) footerStatus.textContent = 'Status: Ready';
            }, 800);
            return;
        }
        
        var step = bootSteps[stepIndex];
        
        if (progressBar) progressBar.style.width = step.progress + '%';
        if (statusEl) statusEl.textContent = step.status;
        
        if (logEl) {
            var logLine = document.createElement('div');
            logLine.textContent = step.log;
            logEl.appendChild(logLine);
            logEl.scrollTop = logEl.scrollHeight;
        }
        
        stepIndex++;
        setTimeout(runBootStep, 200 + Math.random() * 300);
    }
    
    runBootStep();
}

// ============================================================
// SETUP FUNCTIONS
// ============================================================

function setupControls() {
    var volume = document.getElementById('volumeControl');
    if (volume && audioEngine) {
        volume.addEventListener('input', function(e) {
            audioEngine.setVolume(parseFloat(e.target.value));
        });
    }
    
    var reverb = document.getElementById('reverbControl');
    if (reverb && audioEngine) {
        reverb.addEventListener('input', function(e) {
            audioEngine.setReverb(parseFloat(e.target.value));
        });
    }
    
    var waveform = document.getElementById('waveformSelect');
    if (waveform && audioEngine) {
        waveform.addEventListener('change', function(e) {
            audioEngine.setWaveform(e.target.value);
        });
    }
}

function setupTabs() {
    document.querySelectorAll('.tab-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var tabId = this.dataset.tab;
            document.querySelectorAll('.tab-btn').forEach(function(b) {
                b.classList.toggle('active', b.dataset.tab === tabId);
            });
        });
    });
}

function setupTransport() {
    var btnPlay = document.getElementById('btnPlay');
    if (btnPlay) {
        btnPlay.addEventListener('click', function() {
            if (!systemState.powerOn) return;
            if (styleEngine) {
                if (styleEngine.isPlaying) {
                    styleEngine.stop();
                    this.textContent = '▶️';
                } else {
                    styleEngine.start();
                    this.textContent = '⏸️';
                }
            }
        });
    }
    
    var btnStop = document.getElementById('btnStop');
    if (btnStop) {
        btnStop.addEventListener('click', function() {
            if (styleEngine) styleEngine.stop();
            if (audioEngine) audioEngine.stopAll();
            if (btnPlay) btnPlay.textContent = '▶️';
        });
    }
}

function setupStyleControls() {
    var styleSelect = document.getElementById('styleSelect');
    if (styleSelect && styleEngine) {
        styleSelect.addEventListener('change', function() {
            styleEngine.setStyle(this.value);
        });
    }
}

function setupVoiceControls() {
    document.querySelectorAll('.voice-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.voice-btn').forEach(function(b) {
                b.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
}

function setupAIEvents() {
    var btnCompose = document.getElementById('btnAICompose');
    if (btnCompose) {
        btnCompose.addEventListener('click', function() {
            if (!systemState.powerOn) return;
            if (aiAssistant) {
                var melody = aiAssistant.compose('maqam_rast', 'happy');
                aiAssistant.playMelody(melody);
            }
        });
    }
}

function setupClock() {
    function updateClock() {
        var now = new Date();
        var hours = String(now.getHours()).padStart(2, '0');
        var mins = String(now.getMinutes()).padStart(2, '0');
        var clockEl = document.getElementById('statusClock');
        if (clockEl) clockEl.textContent = '🕐 ' + hours + ':' + mins;
    }
    updateClock();
    setInterval(updateClock, 60000);
}

// ============================================================
// DOM READY - PASANG EVENT LISTENER TOMBOL MULAI
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 DOMContentLoaded fired');
    
    var btnMulai = document.getElementById('btnMulai');
    
    if (!btnMulai) {
        console.error('❌ Tombol Mulai TIDAK DITEMUKAN!');
        return;
    }
    
    console.log('✅ Tombol Mulai ditemukan');
    
    // Clone untuk hapus event listener lama
    var newBtn = btnMulai.cloneNode(true);
    btnMulai.parentNode.replaceChild(newBtn, btnMulai);
    
    // Pasang event listener baru
    newBtn.addEventListener('click', handleMulaiClick);
    newBtn.addEventListener('touchstart', function(e) {
        e.preventDefault();
        handleMulaiClick(e);
    }, { passive: false });
    
    console.log('✅ Event listener tombol Mulai terpasang');
});

// Fallback: coba lagi setelah 1 detik
setTimeout(function() {
    var btn = document.getElementById('btnMulai');
    if (btn && !btn._hasListener) {
        console.log('🔄 Fallback: pasang event listener tombol Mulai');
        btn._hasListener = true;
        btn.addEventListener('click', handleMulaiClick);
    }
}, 1000);

console.log('✅ app.js loaded');