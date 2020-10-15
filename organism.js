import * as util from "./util.js";

// An organism represents one possible solution to your problem
//   and is represented by an array of floats.
// One potential use case: the floats, when cast to integers,
//   are indices to an array of SndBufs, and playing them one
//   after another (or overlapped by 50%, etc.) 
//   generates the audio that this Organism truly represents.



// The Organism class has a few functions that generate similar
// Organisms, but do not modify this Organism -- Organisms are
//   immutable. 


class Organism {
    constructor () {
		this.myGenes= [];
    this.myFitness = 0;
this.myFitnessCalculated =     false;
	} // constructor

    setup(genes) {
        this.myGenes = genes;
	return this;
	} // setup
    
    // Returns 2 Organisms, each with the beginning part from one
    // of the input Organisms and the end part from the other.
    // The crossover pois randomized.

crossover(other) {
        const maxCrossoverPoint = (Math.min(other.myGenes.length, this.myGenes.length) - 1);
const crossoverPoint =         util.rand2(0, maxCrossoverPoint);
        
        const child1Genes = other.myGenes.slice(0, crossoverPoint)
.concat(this.myGenes.slice(crossoverPoint));
        
const child2Genes = this.myGenes.slice(0, crossoverPoint)
.concat(other.myGenes.slice(crossoverPoint));
        
        return [
new Organism().setup(child1Genes),
    new Organism().setup(child2Genes)
];
} // crossover
    
    // Returns a new Organism where a random gene is replaced
    // by an amount in [minValue, maxValue]
    mutate(minValue, maxValue) {
const index =         util.rand2(0, this.myGenes.length - 1);
const value =         util.rand2f(minValue, maxValue);
        
return new Organism().setup(
this.myGenes.slice(0, index)
.concat([value])
.concat(this.myGenes.slice(index+1))
);
} // mutate
    
    // Returns a new Organism where each gene is nudged
    // by a random amount in [-maxNudge, maxNudge] with
    // chance nudgeRate, constrained also to the range
    // [minValue, maxValue].
    
nudge(minValue, maxValue, maxNudge, nudgeRate) {
        const newGenes = [];

for(let i=0; i < this.myGenes.length; i++) {
            if (Math.random() < nudgeRate) {
let newValue =                 this.myGenes[i];
                newValue += util.rand2f(-maxNudge, maxNudge);
newValue = util.clamp(newValue, minValue, maxValue);
newGenes[i] =                 newValue;
            } else {
newGenes[i] =                 this.myGenes[i];
            } // if
        } // for
        
return new         Organism().setup(newGenes);
    } // nudge
    
    
    setFitness(f) {
this.myFitness =         f;
this.myFitnessCalculated =         true;
    } // setFitness
} // class Organism


export {Organism as default};
