// ================================================================
// wheels.js - Pitch & Modulation Wheel
// SONIC20VERSE
// ================================================================

function WheelController() {
    this.pitchWheel = null;
    this.modWheel = null;
    this.pitchValue = 0;
    this.modValue = 0;
    this.isDragging = false;
    this.currentWheel = null;
    this.startY = 0;
    this.startValue = 0;
}

WheelController.prototype.init = function() {
    var self = this;
    this.pitchWheel = document.getElementById('pitchWheel');
    this.modWheel = document.getElementById('modWheel');
    
    if (this.pitchWheel) {
        var pitchHandle = this.pitchWheel.querySelector('.wheel-handle');
        
        this.pitchWheel.addEventListener('mousedown', function(e) {
            e.preventDefault();
            self.startDrag('pitch', e.clientY);
        });
        
        this.pitchWheel.addEventListener('touchstart', function(e) {
            e.preventDefault();
            self.startDrag('pitch', e.touches[0].clientY);
        }, { passive: false });
    }
    
    if (this.modWheel) {
        this.modWheel.addEventListener('mousedown', function(e) {
            e.preventDefault();
            self.startDrag('mod', e.clientY);
        });
        
        this.modWheel.addEventListener('touchstart', function(e) {
            e.preventDefault();
            self.startDrag('mod', e.touches[0].clientY);
        }, { passive: false });
    }
    
    document.addEventListener('mousemove', function(e) {
        if (self.isDragging) self.drag(e.clientY);
    });
    
    document.addEventListener('touchmove', function(e) {
        if (self.isDragging) {
            e.preventDefault();
            self.drag(e.touches[0].clientY);
        }
    }, { passive: false });
    
    document.addEventListener('mouseup', function() {
        if (self.isDragging) self.endDrag();
    });
    
    document.addEventListener('touchend', function() {
        if (self.isDragging) self.endDrag();
    });
    
    // Setup other wheel-related controls
    this.setupSustain();
    this.setupOctave();
    this.setupPedals();
    
    console.log('✅ Wheel Controller siap');
};

WheelController.prototype.startDrag = function(wheelType, clientY) {
    this.isDragging = true;
    this.currentWheel = wheelType;
    this.startY = clientY;
    
    if (wheelType === 'pitch') {
        this.startValue = this.pitchValue;
    } else {
        this.startValue = this.modValue;
    }
};

WheelController.prototype.drag = function(clientY) {
    var delta = this.startY - clientY;
    
    if (this.currentWheel === 'pitch') {
        this.pitchValue = Math.max(-1, Math.min(1, this.startValue + delta / 50));
        this.updatePitchVisual();
    } else if (this.currentWheel === 'mod') {
        this.modValue = Math.max(0, Math.min(1, this.startValue + delta / 70));
        this.updateModVisual();
    }
};

WheelController.prototype.endDrag = function() {
    this.isDragging = false;
    
    if (this.currentWheel === 'pitch') {
        // Pitch returns to center
        this.pitchValue = 0;
        this.updatePitchVisual();
    }
    
    this.currentWheel = null;
};

WheelController.prototype.updatePitchVisual = function() {
    if (!this.pitchWheel) return;
    var handle = this.pitchWheel.querySelector('.wheel-handle');
    if (handle) {
        var top = 50 - (this.pitchValue * 40);
        handle.style.top = top + '%';
    }
};

WheelController.prototype.updateModVisual = function() {
    if (!this.modWheel) return;
    var handle = this.modWheel.querySelector('.wheel-handle');
    if (handle) {
        var top = 80 - (this.modValue * 60);
        handle.style.top = top + '%';
    }
};

WheelController.prototype.setupSustain = function() {
    var btn = document.getElementById('btnSustain');
    if (!btn) return;
    
    var self = this;
    btn.addEventListener('mousedown', function() {
        this.classList.add('active');
    });
    btn.addEventListener('mouseup', function() {
        this.classList.remove('active');
    });
    btn.addEventListener('touchstart', function(e) {
        e.preventDefault();
        this.classList.add('active');
    }, { passive: false });
    btn.addEventListener('touchend', function(e) {
        e.preventDefault();
        this.classList.remove('active');
    }, { passive: false });
};

WheelController.prototype.setupOctave = function() {
    var self = this;
    var octDisplay = document.getElementById('octDisplay');
    var currentOct = 4;
    
    var btnDown = document.getElementById('btnOctDown');
    var btnUp = document.getElementById('octUp');
    
    if (btnDown) {
        btnDown.addEventListener('click', function() {
            currentOct = Math.max(1, currentOct - 1);
            if (octDisplay) octDisplay.textContent = currentOct;
            var sel = document.getElementById('octaveSelect');
            if (sel) {
                sel.value = currentOct;
                sel.dispatchEvent(new Event('change'));
            }
        });
    }
    
    if (btnUp) {
        btnUp.addEventListener('click', function() {
            currentOct = Math.min(7, currentOct + 1);
            if (octDisplay) octDisplay.textContent = currentOct;
            var sel = document.getElementById('octaveSelect');
            if (sel) {
                sel.value = currentOct;
                sel.dispatchEvent(new Event('change'));
            }
        });
    }
};

WheelController.prototype.setupPedals = function() {
    var pedals = ['btnPedal1', 'btnPedal2', 'btnExpression'];
    pedals.forEach(function(id) {
        var btn = document.getElementById(id);
        if (btn) {
            btn.addEventListener('mousedown', function() {
                this.classList.add('active');
            });
            btn.addEventListener('mouseup', function() {
                this.classList.remove('active');
            });
        }
    });
};

var wheelController = new WheelController();
window.wheelController = wheelController;
window.WheelController = WheelController;
console.log('✅ wheels.js loaded');