export class MinimapEngine {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.frames = []; // Array of { ball: {x, y}, players: [{x, y, team}] }
        this.currentFrame = 0;
        this.isPlaying = false;
        this.animationId = null;
        
        // UI elements
        this.slider = document.getElementById('timeline-slider');
        this.timeDisplay = document.getElementById('timeline-time');
        this.btnPlay = document.getElementById('btn-play-pause');
        
        if (this.slider && this.btnPlay) {
            this.slider.addEventListener('input', (e) => {
                this.currentFrame = parseInt(e.target.value);
                this.render();
                this.updateTimeDisplay();
            });
            
            this.btnPlay.addEventListener('click', () => {
                this.isPlaying = !this.isPlaying;
                this.btnPlay.innerHTML = this.isPlaying 
                    ? '<i data-lucide="pause" style="width:20px;height:20px;"></i>' 
                    : '<i data-lucide="play" style="width:20px;height:20px;"></i>';
                if (window.lucide) window.lucide.createIcons();
                
                if (this.isPlaying) this.play();
                else this.pause();
            });
        }
        
        // Handle resize
        window.addEventListener('resize', () => this.resize());
        this.resize();
    }
    
    resize() {
        if (!this.canvas) return;
        const rect = this.canvas.parentElement.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
        this.render();
    }
    
    loadData(framesData, rawNetworkFrames) {
        this.frames = [];
        this.boostPads = [];
        let numFrames = 0;
        
        if (framesData && framesData.meta && framesData.meta.boost_pads) {
            this.boostPads = framesData.meta.boost_pads.map(pad => ({
                x: pad.location.x,
                y: pad.location.y,
                isBig: pad.is_big
            }));
        }
        
        if (framesData && framesData.frame_data) {
            const fd = framesData.frame_data;
            numFrames = fd.metadata_frames ? fd.metadata_frames.length : 0;
            
            for (let i = 0; i < numFrames; i++) {
                let frame = { ball: null, players: [] };
                
                // Ball
                if (fd.ball_data && fd.ball_data.frames && fd.ball_data.frames[i]) {
                    const bf = fd.ball_data.frames[i];
                    if (bf !== "Empty" && bf.Data && bf.Data.rigid_body) {
                        frame.ball = {
                            x: bf.Data.rigid_body.location.x,
                            y: bf.Data.rigid_body.location.y
                        };
                    }
                }
                
                // Players
                if (fd.players) {
                    fd.players.forEach(pTuple => {
                        const playerData = pTuple[1];
                        if (playerData && playerData.frames && playerData.frames[i]) {
                            const pf = playerData.frames[i];
                            if (pf !== "Empty" && pf.Data && pf.Data.rigid_body) {
                                const q = pf.Data.rigid_body.rotation;
                                const yaw = q ? Math.atan2(2.0 * (q.w * q.z + q.x * q.y), 1.0 - 2.0 * (q.y * q.y + q.z * q.z)) : 0;
                                
                                frame.players.push({
                                    x: pf.Data.rigid_body.location.x,
                                    y: pf.Data.rigid_body.location.y,
                                    yaw: yaw,
                                    team: pf.Data.is_team_0 ? 0 : 1,
                                    name: pf.Data.player_name,
                                    boost: pf.Data.boost_amount !== undefined ? Math.round((pf.Data.boost_amount / 255) * 100) : 0
                                });
                            }
                        }
                    });
                }
                
                this.frames.push(frame);
            }
        }
        
        if (this.frames.length === 0) {
            // Fallback visualization if empty
            numFrames = 3000;
            for (let i = 0; i < numFrames; i++) {
                this.frames.push({
                    ball: { x: Math.sin(i/100)*2000, y: Math.cos(i/100)*2500 },
                    players: [
                        { x: Math.sin(i/50)*1000, y: Math.cos(i/50)*1000-2000, team: 0 },
                        { x: Math.sin(i/60)*1500, y: Math.cos(i/60)*1500+2000, team: 1 }
                    ]
                });
            }
        }
        
        if (this.slider) {
            this.slider.max = numFrames - 1;
            this.slider.value = 0;
        }
        
        this.currentFrame = 0;
        this.render();
        this.updateTimeDisplay();
    }
    
    play() {
        if (this.currentFrame >= this.frames.length - 1) {
            this.currentFrame = 0;
        }
        
        const loop = () => {
            if (!this.isPlaying) return;
            
            this.currentFrame += 2; // Play speed
            if (this.currentFrame >= this.frames.length) {
                this.currentFrame = this.frames.length - 1;
                this.isPlaying = false;
                if (this.btnPlay) {
                    this.btnPlay.innerHTML = '<i data-lucide="play" style="width:20px;height:20px;"></i>';
                    if (window.lucide) window.lucide.createIcons();
                }
                return;
            }
            
            if (this.slider) this.slider.value = this.currentFrame;
            this.updateTimeDisplay();
            this.render();
            
            this.animationId = requestAnimationFrame(loop);
        };
        
        loop();
    }
    
    pause() {
        if (this.animationId) cancelAnimationFrame(this.animationId);
    }
    
    updateTimeDisplay() {
        if (!this.timeDisplay) return;
        // Assume 30 fps
        const totalSeconds = Math.floor(this.currentFrame / 30);
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        this.timeDisplay.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
    }
    
    render() {
        if (!this.ctx || this.frames.length === 0) return;
        const frame = this.frames[this.currentFrame];
        if (!frame) return;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        const cx = this.canvas.width / 2;
        const cy = this.canvas.height / 2;
        const scale = Math.min(this.canvas.width / 8200, this.canvas.height / 10280); // RL dimensions approx 8000x10000
        
        // Draw Field
        this.ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(cx - 4096 * scale, cy - 5120 * scale, 8192 * scale, 10240 * scale);
        
        // Draw Goals
        this.ctx.fillStyle = "rgba(59, 130, 246, 0.2)"; // Blue Goal
        this.ctx.fillRect(cx - 892 * scale, cy - 5120 * scale - 880 * scale, 1784 * scale, 880 * scale);
        this.ctx.fillStyle = "rgba(249, 115, 22, 0.2)"; // Orange Goal
        this.ctx.fillRect(cx - 892 * scale, cy + 5120 * scale, 1784 * scale, 880 * scale);
        
        // Draw Center circle
        this.ctx.beginPath();
        this.ctx.arc(cx, cy, 1000 * scale, 0, Math.PI * 2);
        this.ctx.stroke();
        
        // Draw Boost Pads
        if (this.boostPads) {
            this.boostPads.forEach(pad => {
                this.ctx.beginPath();
                this.ctx.arc(cx + pad.x * scale, cy + pad.y * scale, pad.isBig ? 12 : 5, 0, Math.PI * 2);
                this.ctx.fillStyle = pad.isBig ? "rgba(234, 179, 8, 0.5)" : "rgba(234, 179, 8, 0.2)"; // Yellow
                this.ctx.fill();
                this.ctx.strokeStyle = "rgba(234, 179, 8, 0.8)";
                this.ctx.lineWidth = 1;
                this.ctx.stroke();
            });
        }
        
        // Draw ball trail
        if (this.currentFrame > 0) {
            this.ctx.beginPath();
            let startFrame = Math.max(0, this.currentFrame - 30);
            let first = true;
            for (let i = startFrame; i <= this.currentFrame; i++) {
                const f = this.frames[i];
                if (f && f.ball) {
                    const bx = cx + f.ball.x * scale;
                    const by = cy + f.ball.y * scale;
                    if (first) {
                        this.ctx.moveTo(bx, by);
                        first = false;
                    } else {
                        this.ctx.lineTo(bx, by);
                    }
                }
            }
            this.ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
            this.ctx.lineWidth = 4;
            this.ctx.lineCap = "round";
            this.ctx.lineJoin = "round";
            this.ctx.stroke();
        }

        // Draw players
        frame.players.forEach(p => {
            const px = cx + p.x * scale;
            const py = cy + p.y * scale;
            const isBlue = p.team === 0;
            const color = isBlue ? '#3B82F6' : '#F97316';
            
            this.ctx.save();
            this.ctx.translate(px, py);
            
            // Draw directional triangle
            if (p.yaw !== undefined) {
                // Rocket League uses Unreal Engine coordinates, where +X is forward?
                // We might need to adjust the angle offset by -Math.PI/2 depending on how x/y maps.
                // Assuming standard rotation:
                this.ctx.rotate(p.yaw);
                
                this.ctx.beginPath();
                this.ctx.moveTo(12, 0); // Nose
                this.ctx.lineTo(-8, 8); // Back right
                this.ctx.lineTo(-4, 0); // Center back
                this.ctx.lineTo(-8, -8); // Back left
                this.ctx.closePath();
                
                this.ctx.fillStyle = color;
                this.ctx.fill();
                this.ctx.strokeStyle = '#fff';
                this.ctx.lineWidth = 1.5;
                this.ctx.stroke();
            } else {
                // Fallback to dot
                this.ctx.beginPath();
                this.ctx.arc(0, 0, 8, 0, Math.PI * 2);
                this.ctx.fillStyle = color;
                this.ctx.fill();
                this.ctx.strokeStyle = '#fff';
                this.ctx.lineWidth = 2;
                this.ctx.stroke();
            }
            
            this.ctx.restore();
            
            // Draw name and boost
            if (p.name) {
                this.ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
                this.ctx.font = "11px sans-serif";
                this.ctx.textAlign = "center";
                this.ctx.fillText(p.name, px, py - 18);
            }
            if (p.boost !== undefined) {
                // Boost bar background
                const barW = 20;
                const barH = 4;
                this.ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
                this.ctx.fillRect(px - barW/2, py - 14, barW, barH);
                
                // Boost bar fill (color changes based on amount: red < 20, yellow < 50, green >= 50)
                let boostColor = "#22c55e"; // green
                if (p.boost < 20) boostColor = "#ef4444"; // red
                else if (p.boost < 50) boostColor = "#eab308"; // yellow
                
                this.ctx.fillStyle = boostColor;
                this.ctx.fillRect(px - barW/2, py - 14, barW * (p.boost / 100), barH);
                
                // Boost text
                this.ctx.fillStyle = "#fff";
                this.ctx.font = "bold 9px sans-serif";
                this.ctx.fillText(p.boost, px + barW/2 + 8, py - 9);
            }
        });
        
        // Draw ball
        if (frame.ball) {
            const bx = cx + frame.ball.x * scale;
            const by = cy + frame.ball.y * scale;
            this.ctx.beginPath();
            this.ctx.arc(bx, by, 10, 0, Math.PI * 2);
            this.ctx.fillStyle = '#fff';
            this.ctx.fill();
            this.ctx.strokeStyle = '#000';
            this.ctx.lineWidth = 3;
            this.ctx.stroke();
        }
    }
}
