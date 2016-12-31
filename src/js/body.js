const G = 6.67428e-11;

const defaultOptions = Object.freeze({
  color: '#f00'
});

export default class Body {
  constructor(mass = 1, name = 'Body', options = {}) {
    this.name = name;
    this.mass = mass;
    this.options = Object.assign({}, defaultOptions, options);

    this.rad = 5;

    this.x = this.options.x || 0;
    this.y = this.options.y || 0;
    this.vx = this.options.vx || 0;
    this.vy = this.options.vy || 0;

    this.forces = { x: 0, y: 0 };
  }

  computeAttraction(other) {
    const dx = other.x - this.x;
    const dy = other.y - this.y;

    const d2 = dx*dx + dy*dy;

    if (d2 === 0) {
      throw new Error('coliision!');
    }

    const f = G * this.mass * other.mass / d2;
    const t = Math.atan2(dy, dx);

    return {
      fx: Math.cos(t) * f,
      fy: Math.sin(t) * f
    };
  }

  addForce(fx, fy) {
    this.forces.x += fx;
    this.forces.y += fx;
  }

  integrate(dt) {
    const fx = this.forces.x;
    const fy = this.forces.y;

    const v0x = this.vx;
    const v0y = this.vy;

    this.vx += fx / this.mass * dt;
    this.vy += fy / this.mass * dt;

    this.x += (v0x + this.vx) * 0.5 * dt;
    this.y += (v0y + this.vy) * 0.5 * dt;

    this.forces.x = 0;
    this.forces.y = 0;
  }

  render(ctx, toScreen) {
    const {x, y} = toScreen(this.x, this.y);

    ctx.beginPath();
    ctx.arc(x, y, this.rad, 0, 2 * Math.PI, false);
    ctx.fillStyle = this.options.color;
    ctx.fill();
  }
}
