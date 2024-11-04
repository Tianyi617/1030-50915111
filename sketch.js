let particles = []; // 粒子陣列

function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background(0, 50); // 淡黑色背景，提供拖影效果

    // 添加新粒子
    particles.push(new Particle(mouseX, mouseY));

    // 更新並顯示粒子
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].display();

        // 從陣列中刪除透明度耗盡的粒子
        if (particles[i].alpha <= 0) {
            particles.splice(i, 1);
        }
    }

    // 顯示粒子間的連接線
    drawConnections();
}

// 粒子類
class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = random(5, 15); // 隨機大小
        this.alpha = 255;
        this.life = random(60, 120); // 設定粒子壽命
        this.color = [random(100, 255), random(100, 255), random(100, 255)];
        this.vx = random(-1, 1); // 隨機水平速度
        this.vy = random(-1, 1); // 隨機垂直速度
    }

    update() {
        // 根據速度移動位置
        this.x += this.vx;
        this.y += this.vy;

        // 增加透明度漸變
        this.alpha = map(this.life, 0, 120, 0, 255);
        this.size *= 0.98; // 緩慢縮小粒子

        // 隨時間推移，顏色逐漸淡化
        this.color[0] = (this.color[0] + random(-1, 1)) % 255;
        this.color[1] = (this.color[1] + random(-1, 1)) % 255;
        this.color[2] = (this.color[2] + random(-1, 1)) % 255;

        this.life -= 1; // 減少壽命
    }

    display() {
        noStroke();
        fill(this.color[0], this.color[1], this.color[2], this.alpha); // 透明顏色
        ellipse(this.x, this.y, this.size);
    }
}

// 畫出粒子之間的連接線
function drawConnections() {
    stroke(255, 100); // 淡白色連接線
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            let d = dist(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
            if (d < 80) {
                line(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
            }
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
