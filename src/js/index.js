import Universe from './universe';
import Body from './body';
import {AU} from './constants';

const SCALE = 50 / AU;

const b1 = new Body(1.98892 * Math.pow(10, 30), 'sun', { color: 'yellow' });
const b2 = new Body(5.9742 * Math.pow(10, 24), 'earth', { color: 'blue', x: -1 * AU, vy: 29.783 * 1000 });
const b3 = new Body(4.8685 * Math.pow(10, 24), 'venus', {color: 'red', x: 0.723 * AU, vy: -35.02 * 1000 });

const universe = new Universe([b1, b2, b3]);

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

