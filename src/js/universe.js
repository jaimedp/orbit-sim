export default class Universe {
  constructor(bodies) {
    this.bodies = bodies;
    this.dt = 24*3600*7;
  }

  step() {
    // calculate all the forces
    for (const body of this.bodies) {
      for (const other of this.bodies) {
        if (body === other) {
          continue;
        }

        const {fx, fy} = body.computeAttraction(other);
        body.addForce(fx, fy);
      }
    }

    // integrate new position for all bodies
    this.bodies.forEach((b) => b.integrate(this.dt));
  }

  render(ctx, toScreen) {
    // render new pos
    this.bodies.forEach((b) => b.render(ctx, toScreen));
  }
}
