import { AU } from './constants';

export default class Universe {
  constructor(bodies) {
    this.bodies = bodies;

    // default to 1 day timestep
    this.dt = 24*3600;
  }

  step() {
    // calculate all the forces for all bodies... this is O(n^2)... watch out
    for (const body of this.bodies) {
      for (const other of this.bodies) {
        if (body === other) {
          continue;
        }

        const F = body.computeAttraction(other);
        body.addForce(F.fx, F.fy);
      }
    }

    // integrate new position for all bodies
    this.bodies.forEach((b) => {
      b.integrate(this.dt);
    });
  }

  render(ctx, toScreen, options = {}) {
    // render new pos
    this.bodies.forEach((b) => b.render(ctx, toScreen));

    if (options.info) {
      const text = this.bodies.map((b) => {
        return `${b.name}: Pos: ${(b.x/AU).toFixed(4)}, ${(b.y/AU).toFixed(4)}, Vel: ${(b.vx).toFixed(4)}, ${(b.vy).toFixed(4)}`;
      }).join('<br>');
      options.info.innerHTML = text;
    }
  }
}
