import Universe from './universe';
import Body from './body';
import {AU} from './constants';

const SCALE = 150 / AU;

// planetary data from http://nssdc.gsfc.nasa.gov/planetary/factsheet/
// and http://www.enchantedlearning.com/subjects/astronomy/glossary/AU.shtml
const planets = [];
planets[0] = new Body(1.98892 * Math.pow(10, 30), 'sun', { d: 14000, color: 'yellow' });
planets[1] = new Body(0.330 * Math.pow(10, 24), 'mercury', { d: 4879, color: 'grey', x: -0.39 * AU, vy: 47.4 * 1000 });
planets[2] = new Body(4.8685 * Math.pow(10, 24), 'venus', { d: 12104, color: 'brown', x: -0.723 * AU, vy: 35.02 * 1000 });
planets[3] = new Body(5.9742 * Math.pow(10, 24), 'earth', { d: 12756, color: 'blue', x: -1 * AU, vy: 29.783 * 1000 });
planets[4] = new Body(4.8685 * Math.pow(10, 24), 'mars', { d: 6792, color: 'red', x: -1.524 * AU, vy: 24.1 * 1000 });
// const b6 = new Body(4.8685 * Math.pow(10, 24), 'jupiter', { d: 142984, color: 'red', x: -5.203 * AU, vy: 13.1 * 1000 });
// const b7 = new Body(4.8685 * Math.pow(10, 24), 'saturn', { d: 120536, color: 'red', x: -9.539 * AU, vy: 9.7 * 1000 });
// const b8 = new Body(4.8685 * Math.pow(10, 24), 'uranus', { d: 51118, color: 'red', x: -19.18 * AU, vy: 6.8 * 1000 });
// const b9 = new Body(4.8685 * Math.pow(10, 24), 'neptun', { d: 49528, color: 'red', x: -30.06 * AU, vy: 5.4 * 1000 });
// const b10 = new Body(4.8685 * Math.pow(10, 24), 'pluto', { d: 2370, color: 'red', x: -39.53 * AU, vy: 4.7 * 1000 });

const universe = new Universe(planets);

const canvas = document.getElementById('myCanvas');
const context = canvas.getContext('2d');
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

const toScreen = (x, y) => ({x: x * SCALE + centerX, y: centerY + y * SCALE});
const btn = document.getElementById('step');

const step = () => {
  universe.step();
  context.clearRect(0, 0, canvas.width, canvas.height);
  universe.render(context, toScreen, {info: document.getElementById('info')});
};

setInterval(() => step(), 16);

btn.addEventListener('click', () => {
  step();
});

