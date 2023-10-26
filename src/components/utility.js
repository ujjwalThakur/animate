class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    add(...args) {
        let v1 = this.scale(1);
        for (const v of args) {
            v1.x += v.x;
            v1.y += v.y
        }
        return v1;
    }

    sub(v) {
        const v1 = this.scale(1);
        if (Array.isArray(v)) {
            for (let i = 0; i < v.length; i++) {
                v1.x -= v[i].x;
                v1.y -= v[i].y;
            }
        }
        else {
            v1.x -= v.x;
            v1.y -= v.y;
        }
        return v1;
    }

    dot(v) {
        return this.x * v.x + this.y * v.y
    }

    scale(k) {
        return new Vector(k * this.x, k * this.y);
    }

    mag() {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }
}
class Particle {
    constructor(fx, fy, x, y, dx = 0, dy = 0, ax = 0, ay = 0) {
        this.fx = fx
        this.fy = fy
        this.position = new Vector(x, y);
        this.velocity = new Vector(dx, dy);
        this.acc = new Vector(ax, ay);
    }
    move() {
        this.position = this.position.add(this.velocity);
    }
    accelerate() {
        this.velocity = this.velocity.add(this.acc);
    }
}

export {Vector, Particle}