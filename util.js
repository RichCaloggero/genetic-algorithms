export function makeEven (n) {
return Math.floor(n / 2) * 2;
} // makeEven

export function compareOrganisms (o1, o2) {
	return -1*compare(o1.myFitness, o2.myFitness);
} // compareOrganisms

export function compare (a, b) {
return a >= b? 1 : -1;
	} // compare

export function rand2f (a, b) {
	return Math.random() * Math.abs(a-b) + Math.min(a,b);
} // rand2f

export function rand2 (a, b) {
return Math.trunc(rand2f(Math.trunc(a), Math.trunc(b)));
} // rand2

export function hann (i,N) {
  return 0.5*(1 - Math.cos(6.283185307179586*i/(N-1)));
} // hann

export function sum (a) {
return 	a.reduce((sum, value) => sum += value);
} // sum

export function average (a) {
	return sum(a) / a.length;
} // average

export function log (message, clear) {
const _log = document.querySelector("#log");
if (clear) _log.innerHTML = "";
_log.appendChild(document.createTextNode(message));
} // log

export function clamp (value, min, max) {
return Math.min(
Math.max(value, min),
max);
} // clamp


