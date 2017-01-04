import { G, AU } from './constants';

const defaultOptions = Object.freeze({
  color: '#f00'
});

const sizeScale = 1 / 12756 * 10;

export default class Body {
  constructor(mass = 1, name = 'Body', options = {}) {
    this.name = name;
    this.mass = mass;
    this.diameter = options.d || 10;
    this.options = Object.assign({}, defaultOptions, options);

    this.rad = this.diameter / 2 * sizeScale;

    this.x = this.options.x || 0;
    this.y = this.options.y || 0;
    this.vx = this.options.vx || 0;
    this.vy = this.options.vy || 0;

    this.forces = { x: 0, y: 0 };
    this.prevForces = { x: 0, y: 0 };

  }

  computeAttraction(other) {

    const dx = other.x - this.x;
    const dy = other.y - this.y;

    const d2 = dx*dx + dy*dy;

    if (d2 === 0) {
      throw new Error('collision!');
    }

    // gravitational force between two bodies is:
    // G * M1 * m2 / dist^2
    const f = G * this.mass * other.mass / d2;

    // now compute the components of the force
    const t = Math.atan2(dy, dx);

    return {
      fx: Math.cos(t) * f,
      fy: Math.sin(t) * f
    };
  }

  addForce(fx, fy) {
    this.forces.x += fx;
    this.forces.y += fy;
  }

  // simple euler integration
  integrate(dt) {
    const fx = this.forces.x;
    const fy = this.forces.y;

    // v = v0 + F / M * dt
    this.vx += fx / this.mass * dt;
    this.vy += fy / this.mass * dt;

    // p = p0 + v * dt
    this.x += this.vx * dt;
    this.y += this.vy * dt;

    // keep track of the force for debugging
    this.prevForces.x = this.forces.x;
    this.prevForces.y = this.forces.y;

    this.forces.x = 0;
    this.forces.y = 0;
  }

  render(ctx, toScreen, options = {}) {
    const pos = toScreen(this.x, this.y);

    ctx.beginPath();
    ctx.arc(pos.x, pos.y, this.rad, 0, 2 * Math.PI, false);
    ctx.fillStyle = this.options.color;
    ctx.fill();

    if (options.debugForce) {
      ctx.beginPath();
      const scale = 1/1.0e19;
      const _x = pos.x + this.prevForces.x * scale;
      const _y = pos.y + this.prevForces.y * scale;
      ctx.moveTo(pos.x, pos.y);
      ctx.lineTo(_x, _y);
      ctx.strokeStyle = 'red';
      ctx.stroke();
    }
  }
}
