# Proof of Work

The idea behind proof of work is to require one person (the prover) to prove to another (the verifier) that they have done a certain amount of work. The amount of work required to prove can vary, but we want the verification process to be minimal.

Lets say I'm an eccentric billionaire who loves collecting llama figurines and wants to give away a yacht. I decide that I will create a contest where people can send me llama figurines along with an entry form. After a month I will pick one at random and send that person a free yacht. I want people to be able to send multiple figurines (I seriously love those llamas!), but I also don't want the winner to be whichever person has the ability to spam the contest with as many llamas as possible.

I devise a simple proof of work method. Every entry form has a random number on it between 0 and 99, and the number is labeled 'start number'. The entry forms also have a box labeled 'proof'. To submit their llama a person has to solve a very simple math problem and write their answer in the proof box.

The instructions on the form say to take the start number, add your birth year to it, then solve for the smallest number whose sum makes the last two digits become 00. Lets do an example: you were born in 1987 and the form says the start number is 42. 1987 plus 42 is 2029. You will need to add 71 to 2029 to produce 2100. You write 71 into the proof box.

Any contest entry that does produce the final 00 gets thrown out, and it's very simple to check whether those three numbers add up. The "work" required in this proof of work is simple arithmetic, but lets be honest, how many of us would send less contest entries to avoid doing the math?

Proof of work is a computational concept and the simplicity of this example is computationally laughable. Sometimes the point of proof of work is not to be difficult, only to be inconvenient enough to discourage certain behaviors. If proof of work limits users to only send a message every two seconds that allows 1800 messages per hour: more than enough for someone like me, but a limiting factor for spammers.

There are other times where we might want the proof of work to be a lot of work. There is a whole world of math that is difficult even for computers. One option is to require the answer to be a [https://en.wikipedia.org/wiki/Twin_prime](twin prime) that has a certain relationship with the start number. We could also require specific outputs from a [https://github.com/kafkaesc/Birdblock/blob/main/01_hash.md](hash function), which is a concept you might already be familiar with!
