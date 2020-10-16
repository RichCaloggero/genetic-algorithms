import Organism from "./organism.js";
import * as util from "./util.js";

// A population is a group of Organisms that evolves over time
//   and is the heart of your genetic algorithm.

class Population {
constructor (maxGenerations) {
// ============== Genetic Algorithm Parameters ============= //
// A few constants to tune the performance of the
//     genetic algorithm:
//   population size: how many Organisms exist at once
//   turnover rate: how many Organisms die and are born 
//     each generation
//   mutation rate: the chance that an Organism mutates 
//     in a generation
//
//   nudge threshold: how many generations with no change 
//     in Organisms before the population is nudged 
//   nudge rate: roughly how many Organisms are nudged if the 
//     population is nudged. You provide the initial value, which
//     will be decreased after each nudge event to allow for
//     eventual convergence.
//   nudge mutation rate: the chance of each gene in an Organism 
//     being nudged if the Organism is nudged
//
//   max generations: the number of generations to run, after
//     which our genetic algorithm stops running.
// ============================================================ //

this.populationSize =     20;
this.turnoverRate =     0.4;
this.mutationRate =     0.4;
this.nudgeThreshold =     2;
this.nudgeRate =     0.2;
this.nudgeMutationRate =     0.1;
this.maxGenerations =     1000;

// A few internal variables (safe to ignore)
this.generationNumber = 0;
this.generationsWithoutChange = 0;
this.mySpawner = null;
this.myPopulation= [];
this.myMinGeneValue = 0;
this.myMaxGeneValue = 0;
this.myMaxNudgeAmount = 0;
this.stopAlgorithm =     false; 
} // constructor

// ============= After Each Generation ============= //
// Place in here any code that you want to be run after each generation.
// ================================================= //

afterEachGeneration(reportInterval = 1000) {
// Do something every so often
if (reportInterval > 0 &&  this.generationNumber % reportInterval === 0) {
util.log(`generation ${this.generationNumber}\n`);
// Access the current best result
const myBestSoFar = this.myPopulation[0]; 
// Do something with its meaningful representation
//this.mySpawner.synthesize(myBestSoFar);
// Check its fitness:
//console.debug(`fitness: ${myBestSoFar.myFitness}`);
} // if
} // afterNextGeneration

/// internal

setup(s) {
this.mySpawner = s;
this.myMinGeneValue =         s.minGeneValue;
this.myMaxGeneValue =         s.maxGeneValue;
this.myMaxNudgeAmount =         s.maxNudgeAmount;

// We can't respawn more than 50% of the population
//   by pairing up the survivors (each of which has 2 offspring)
this.turnoverRate =         Math.max(this.turnoverRate, 0.5);

// If turnoverRate is 50%, population size better be
//   even.
this.populationSize =         util.makeEven(this.populationSize);

return this;
} // setup

runGeneticAlgorithm(maxGenerations = this.maxGenerations, reportInterval = 0) {
this.populate();
this.generationNumber =         0;
this.generationsWithoutChange =         0;

while (
(maxGenerations <= 0|| this.generationNumber <= maxGenerations)
&& !this.mySpawner.isDone(this)
) {
this.generationNumber++;
this.runGeneration();
this.afterEachGeneration(reportInterval);
} // while

(this.notify && this.notify instanceof Function)?
this.notify(this) : report(this);
} // runGeneticAlgorithm

// Create the initial population and sort it according to
//   its fitness (preparing it to go through a generation).
populate() {
for(let i=0; i < this.populationSize; i++) {
this.myPopulation[i] = this.mySpawner.spawn();
} // for
this.sortPopulation();
} // populate

// Sorts in descending order of fitness (so that best is first)
sortPopulation() {
// First, compute each Organism's fitness
this.myPopulation.forEach(o => o.setFitness(this.mySpawner.fitness(o)));

this.myPopulation.sort(util.compareOrganisms);
} // sortPopulation


// Runs a generation: drop the <turnoverRate> worst Organisms,
//   spawn new ones to fill their place, 
//   randomly mutate a few of the survivors.
// If it's been long enough since a change in the top fitness,
//   nudge the population a little more.

runGeneration() {
let previousTopFitness =         this.myPopulation[0].myFitness;

let numToDrop =         util.makeEven((this.turnoverRate * this.populationSize));
let numToKeep =         this.myPopulation.length - numToDrop;

// Replace the Organisms beyond numToKeep with offspring
//   from parents, starting with the best parents.
let parentIndex =         0;

// Since numToKeep is even, we won't violate the loop 
//   boundary by incrementing by 2
for(let i=numToKeep; i < this.myPopulation.length - 1; i += 2) {
const parents = this.select2(parentIndex);
const children = parents[0].crossover(parents[1]);
this.myPopulation[i] = children[0];
this.myPopulation[i+1] = children[1];
parentIndex += 2;
} // for

// Randomly mutate a few remaining Organisms
for(let i=0; i < this.myPopulation.length; i++) {
if (Math.random() < this.mutationRate) {
this.myPopulation[i] = this.myPopulation[i].mutate(this.myMinGeneValue, this.myMaxGeneValue);
} // if
} // for

// See if we have improved
this.sortPopulation();
let currentTopFitness =         this.myPopulation[0].myFitness;

if (previousTopFitness === currentTopFitness) {
this.generationsWithoutChange++;
} else {
this.generationsWithoutChange =             0;
} // if

// After a lot of no improvement, shake things up a bit
if (this.generationsWithoutChange >= this.nudgeThreshold) {
this.nudgePopulation();
}  // if
} // runGeneration

nudgePopulation() {
for(let i=0; i < this.myPopulation.length; i++) {
if (Math.random() < this.nudgeRate) {
this.myPopulation[i] = this.myPopulation[i].nudge(this.myMinGeneValue, this.myMaxGeneValue, this.myMaxNudgeAmount, this.nudgeMutationRate);
} // if

//this.nudgeRate *= 0.99;
//this.myMaxNudgeAmount  *= 0.99;
} // for

this.nudgeRate *= 0.99;
this.myMaxNudgeAmount  *= 0.99;
this.sortPopulation();
} // nudgePopulation

select2 (index) {
return [this.myPopulation[index], this.myPopulation[index+1]];
} // select2

} // class Population



export {Population as default};

function report (population) {
const fitness = population.myPopulation.map(o => o.myFitness);
const min = Math.min(...fitness);
const max = Math.max(...fitness);
util.log(`
Finished at generation ${population.generationNumber}
fitness: ${max}, ${min}
`);
} // report

