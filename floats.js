import Population from "./population.js";
import Organism from "./organism.js";
import * as util from "./util.js";

// @title Genetic_Algorithm_Example_Floats.js
// @author Jack Atherton (lja@ccrma)
// @author rjc@mit.edu (adapted for javascript)
// @desc Specify and run a genetic algorithm.  
//       The example genetic algorithm evolves an array
//       of random floats to an array of perfect 10's.
// @version chuck-1.3.4.0
// @revision 1

// To run your own genetic algorithm, you will absolutely need
//   to redefine spawn() and fitness() in the class Spawner,
//   as well as the 3 required fields minGeneValue, maxGeneValue,
//   and maxNudgeAmount with values that make sense for the scale
//   of your problem.

// You may also find it helpful to define setup() and synthesize()
//   in Spawner, as well as afterEachGeneration() in Population.
// You can also tinker with the algorithm constants in Population.

// Each of these sections is well-marked below. Have fun!


// ============================================================== //

// The Spawner class is responsible for creating Organisms based
//   on the particular problem you are interested in solving.
// All domain-specific knowledge also lives in this class (whereas
//   Organism only knows about arrays of floats).
// You will have to edit this class based on what you are trying
//   to do, but the functions below can serve as a general outline
//   and example.
// For a valid Spawner class, you must at least implement:
// Organism spawn(), 
//   which creates a valid Organism for your problem, and
// fitness(Organism), which evaluates how good of a solution
//   an Organism is (higher = better; the genetic algorithm maximizes 
//   fitness).
// Fitness can be difficult to think about, but if you have a 
//   distance metric (i.e. lower is better), 
//   a good fitness metric is just -1 * distance. 
// It may also be useful for you to define a setup() function,
//   where you do some preprocessing and analysis before you are
//   ready to create any Organisms.
// Finally, it may also be useful for you to define a synthesize()
//   function, where you transmute an Organism from an array of 
//   floats back into some domain that makes more sense to you
//   (e.g. a sound file).

export class Spawner {
constructor () {    
    // ================ Required Fields =============== //
    // Required fields (used by Population as the bounds within
    //   which it can mutate your Organisms).  You must have these
    //   variables, but define them according to your own problem.
    
	// The minimum value any gene can have.
this.minGeneValue =     0;
    
	// The maximum value any gene can have.
this.maxGeneValue =     10;

    // The maximum amount a gene can get perturbed by in the event of a "natural disaster."
this.maxNudgeAmount =     5;

// number of genes per organism
this.numGenes =     10;
} // constructor

	// ================================================= //
    
    // ================ Custom Fields ================== //
    // Delete or modify these for whatever your problem
    //   requires.
    // ================================================= //
    
    // ==================== Setup ====================== //
    // Place in here any code that must run before you   //
    //   are ready to generate any Organisms.            //
    // (For example, loading a sound file.)              //
    // ================================================= //

    setup() {
        // I don't have any pre-processing to do, so it's not
        //   useful for me to edit this function.
    } // setup       
     
    // ===================== Spawn ===================== //    
    // This creates an Organism.                //
    // What you need to specify is the array of floats   //
    //   that will be called the Organism's "genes."     //
    // ================================================= //
    
	spawn() { // returns Organism
        // For my problem, I'm going to create an array of 
        //   random floats to be my Organism's genes.
        const genes = [];
for (let i=0; i<this.numGenes; i++) {
	genes[i] =             util.rand2f(this.minGeneValue, this.maxGeneValue);
        } // for
        
        // This can stay the same
        return new Organism().setup(genes);
    } // spawn
    
    // ==================== Fitness ==================== //
    // This returns a representation of  how    //
    //   good an Organism is.  The only requirement is   //
    //   that if one Organism is better than another     //
    //   organism, then its fitness will be higher.      //
    // ================================================= //
    
	fitness(o) {
        // Since my problem is to evolve from an array of 
        //   random floats to an array of perfect 10's, 
        //   I'll make the fitness the sum of all the gene values.
return util.sum(o.myGenes);
    } // fitness
    
    
    // =================== Synthesize ================== //
    // This transmutes an Organism into a representation
    //   that makes more sense for your particular problem.
    // You can think of it as a mapping between the "genotype"
    //   (an array of floats) to the "phenotype" of how those
    //   floats are expressed.
    // Change the return type or signature of this 
    //   as you see fit.  It is only for your own
    //   benefit and is not used internally by any code. 
    // It might be helpful to you to use this in your
    //   fitness() definition!
    // ================================================= //
    
	synthesize(o) {
        // Since my genes aren't representing any other concept 
        //   than pure numbers, I will "transmute" the Organism
        //   to the "representation" of having been printed.
for(let i=0; i < o.myGenes.length; i++) {
            util.log(`${o.myGenes[i]}`);
        } // for
        return 0.0;
    } // synthesize

isDone (population) {
//return population.myPopulation.every(organism => organism.myFitness > 98);
return population.myPopulation[0].myFitness > 99;
} // isDone

} // class Spawner


function isDone (population) {
//return population.myPopulation.every(organism => organism.myFitness > 98);
return population.myPopulation[0].myFitness > 99;
} // isDone

