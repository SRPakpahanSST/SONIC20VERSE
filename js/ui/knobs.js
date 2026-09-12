// ================================================================
// knobs.js - Interaksi Knobs
// SONIC20VERSE
// ================================================================

function KnobController() {
    this.knobs = [];
    this.isDragging = false;
    this.currentKnob = null;
    this.startY = 0;
    this.startValue = 0;
}

KnobController.prototype.init = function() {
    var self = this;
    var knobElements = document.querySelectorAll('.knob');
    
    knobElements.forEach(function(el) {
        var knobData = {
            element: el,
            name: el.dataset.knob,
            min: parseFloat(el.dataset.min) || 0,
            max: parseFloat(el.dataset.max) || 100,
            value: parseFloat(el.dataset.value) || 50
        };
        
        self.knobs.push(knobData);
        self.updateKnobVisual(knobData);
        
        el.addEventListener('mousedown', function(e) {
            e.preventDefault();
            self.startDrag(knobData, e.clientY);
        });
        
        el.addEventListener('touchstart', function(e) {
            e.preventDefault();
            self.startDrag(knobData, e.touches[0].clientY);
        }, { passive: false });
    });
    
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
        self.isDragging = false;
    });
    
    document.addEventListener('touchend', function() {
        self.isDragging = false;
    });
    
    console.log('✅ Knob Controller siap (' + this.knobs.length + ' knobs)');
};

KnobController.prototype.startDrag = function(knobData, clientY) {
    this.isDragging = true;
    this.currentKnob = knobData;
    this.startY = clientY;
    this.startValue = knobData.value;
    knobData.element.style.cursor = 'grabbing';
};

KnobController.prototype.drag = function(clientY) {
    if (!this.currentKnob) return;
    
    var delta = this.startY - clientY;
    var range = this.currentKnob.max - this.currentKnob.min;
    var sensitivity = range / 150;
    var newValue = this.startValue + (delta * sensitivity);
    
    newValue = Math.max(this.currentKnob.min, Math.min(this.currentKnob.max, newValue));
    this.currentKnob.value = newValue;
    this.currentKnob.element.dataset.value = newValue;
    
    this.updateKnobVisual(this.currentKnob);
    this.handleKnobChange(this.currentKnob);
};

KnobController.prototype.updateKnobVisual = function(knobData) {
    var range = knobData.max - knobData.min;
    var percentage = (knobData.value - knobData.min) / range;
    var rotation = -135 + (percentage * 270);
    
    var indicator = knobData.element.querySelector('.knob-indicator');
    if (indicator) {
        indicator.style.transform = 'translateX(-50%) rotate(' + rotation + 'deg)';
        indicator.style.transformOrigin = '50% 25px';
    }
    
    var valueEl = document.getElementById('knob' + 
        knobData.name.charAt(0).toUpperCase() + knobData.name.slice(1) + 'Val');
    if (valueEl) {
        valueEl.textContent = Math.round(knobData.value);
    }
};

KnobController.prototype.handleKnobChange = function(knobData) {
    var value = knobData.value;
    
    if (knobData.name === 'volume' && window.audioEngine) {
        window.audioEngine.setVolume(value / 100);
    } else if (knobData.name === 'reverb' && window.audioEngine) {
        window.audioEngine.setReverb(value / 100);
    } else if (knobData.name === 'delay' && window.audioEngine) {
        window.audioEngine.setDelay(value / 100);
    } else if (knobData.name === 'chorus' && window.audioEngine) {
        window.audioEngine.setChorus(value / 100);
    }
};

var knobController = new KnobController();
window.knobController = knobController;
window.KnobController = KnobController;
console.log('✅ knobs.js loaded');