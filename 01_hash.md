# Hash

A hash is the result of a hashing function, and the purpose of a hashing function is to take data and produce a fixed-size value. This value is usually a number. Let’s look at a concrete example to give you a better idea what this means.

I am running a club veiled in secrecy. It’s so secret that I don’t keep a list of members, but I do have a list of numbers. When someone comes to the club they give the bouncer their name and, after taking a moment to check the list of numbers, the person is allowed in if they are a member. How is this possible? The club keeps a hash of every member's name, let’s look at what that means.

First, I need to create the club's hash function. It turns out that converting a name to a number is not difficult. A convenient and easy method is combining the [ASCII codes](https://en.wikipedia.org/wiki/ASCII) of each letter. Jared becomes 74 + 97 + 114 + 101 + 100, so my number is 486. When I tell the bouncer my name is Jared he runs my name through the hash function and compares the result to his list, if 486 is on the list then I’m in! (This is not a guarantee, as [Marx](https://en.wikiquote.org/wiki/Groucho_Marx) once said, "I don’t want to belong to any club that will accept me as a member.")

I described this function as convenient and easy, but alas, that does not make it robust. There are a lot of problems with this implementation that will help explain other important principles of a hash function.

What if there is another Jared? The club could collect both my first and last name, but there could be another Jared Hettinger. We could require every member to remember a secret phrase to go along with their name. We use both their name and their secret phrase to create a unique hash. Congratulations, we just reinvented user passwords, now make sure you build a reliable and convenient password reset service too.

The design of this function is prone to a hash collision, which is when two different pieces of data produce an identical hash. This will happen if one person’s name is May and another person’s name is Mya. The total value of the ASCII codes for each name are identical. This is a huge problem that can lead to misidentification, accepting wrong passwords, and data being overwritten.

We can make this function more robust by multiplying each ASCII code by its place in the name and dividing it by the corresponding prime number.

For May we have: (77 * 1) / 2 + (97 * 2) / 3 + (121 * 3) / 5 = 175.7666

For Mya we have: (77 * 1) / 2 + (121 * 2) / 3 + (97 * 3) / 5 = 177.3666

Another problem is that the hashes for similar data look similar. They literally look similar to even a casual observer. If you use the original function for Jen and Ken, the hash for Jen is 285 and the hash for Ken is 286. It is too easy for someone to deduce details about the original data from the hash, which is something that should be impossible. We want any difference in data to generate a vastly different and unrecognizable hash.

In summary, here are the important details to understand about the hash function and its hashes:
1. A hash function takes a variable amount of data and produces a consistent number
2. Each unique piece of data should produce a unique hash
3. Any small difference in data should produce a vastly different hash
4. It should not be possible for someone to deduce details about the original data from the hash
5. You should understand the principles of hash functions to work with the hashes, but never try to deploy your own

That last one is not a principle of hash design, but it's an important principle for software engineers to keep in mind. This project uses [SHA256](https://en.wikipedia.org/wiki/SHA-2) to produce block hashes. It is used in several security protocols that secure the internet, so there's no doubt it's good enough for Birdblock.
