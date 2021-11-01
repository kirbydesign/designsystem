<!--
Noter fra Jesper:
  - Hvad er accessibility?
    - Husk at bruge de rigtige tags. Lav det semantisk.
  - Hvad er accessibility ikke
    - Not something you tag on. Aria er ikke en lifesaver
      - Some things does not exist in HTML, you need to enrich the markup.
  - Hvad er Kirbys role?
  - Hvordan kommer jeg i gang
-->

# Accessibility, Kirby & You

- We want to get you started building accessible products with Kirby!
- First we need to talk a bit accessibility and how we in team Kirby think about it.
- We will clarify our role in the process of making your product accessible.
- There's already a ton of great resources on accessibility, we will point to some of our favorites together with some quick wins to get you started!

## Can Kirby make my product accessible?

We do not wish to point fingers but in the long run the accessibility of your product largely depends on **your** markup.
This might be frustrating news if you're new to accessibility; where do you begin?

Lets start talking a bit about mindset and how we think about the topic in team Kirby.

### Mindset - what is accessibility?

<!-- This section exists to make sure the reader and team kirby see eye to eye on the issue of accessibility. It is important to get the reader to understand that kirby can't provide a magic bullet to solve all their accessibility troubles -->

- It's not something you tag on. By existing your product has some degree of accessibility (or lack thereof). Just like code quality; by existing your code has some kind of quality. Whether you think about it or not.

- Okay... I want to improve the accessibility of my site, now that i figure it sucks, what do? I've heard ARIA tags and a lighthouse report should fix it!

  - It's more than ARIA tags and stuff automated tests can catch.
    - Your markup might be correct and you're using all the correct ARIA tags and so on. But if you rely on color to convey meaning, that meaning will be lost on someone who is colorblind.
    - It's a whole different UX that is often neglected
      - It has it's own patterns, pains and ways of being used.
      - Consider someone using a screen reader to search through a list of hundreds of records based on date. If the date text says "Created on March 25" they will have to wait for "created on" to be read aloud for evey record. "March 25, created on" would give them the important information immediately.

- It's an ongoing process.

  - Make it part of your daily development pratice to test your product with a screen reader, WAVE, Accessibility Insights etc. Much the same way, you most likely have a test suite.
  - Consider plopping it into your CI/CD pipeline. While automated testing won't catch everything, it is still useful.
    - This will help keeping it top of mind.

- It's not just about blind people. What about deaf people, they need captions. People with motorproblems might only be able to use a keyboard.

  - The goal should be to make your product TRULY accessible, ie. usable by people with various disabilities.

- Begin caring about improving your accessibility now. As with code quality and behaviour tests it only gets more expensive the longer you wait.

- At last, a more self-centric argument for caring: it could (and most likely will) be yourself one day.
  - You could break your arm tomorrow or get into a car accident next week impairing you from the neck down.
  - What about when you get older?
    - Your sight, motorskills and reaction time will most likely severly decrease (if it haven't already).
  - In any case would you be able to rely on the tools you do now, in a world where the developers of these do not consider accessibility?
  - Start caring :-)

### That sound like a no... Then what is Kirby's role in making my product accessible?

<!-- People should know what they can expect from us. And that Kirby can't fix their accessibliity problems for them. No magic bullet.  -->

- As mentioned the accessibility of your product in large depends on your markup. BUT

  - Kirby should not be in the way
  - We want to be a source of do's and don'ts when using Kirby components
  - We want to give developers using Kirby the best possible foundation for working with accessibility in their product // BE THE BEACON

- We are on a learning journey ourselves and we could really use your help.
  - If Kirby components ever limit you in improving the accessibility, please create an issue in our repository.
  - If you notice any anti-patterns in our components, let us know!
  - If you stumble upon any common problems and anti-patterns with your use of kirby components, please let us know, so we can learn from you! (Should we create a GH discussions post to document this?).
    - We would like to document anti-patterns and best-pratice patterns in our cookbook.

## How do i get started with improving the accessibility of my product?

- You got to know if it a problem to start with: take a look at the different forms of testing you can do!
- You got to educate yourself and your team about accessibility. It does not have to be a big bang thing, just get started!
  - Use tools as part of your education. They will point out common problems with your product to get you started!.
  - We have found some resources to get you started

#### Can i do accessibility testing myself?

<!-- We should encourage people to start caring about and testing accessibility of their products. But also drive home the point that they will never have the same experience as someone who relies on these tools. Users tests are required for this.  -->

- Yes!\*

  - Tools for automated and semi-automated testing exists. As mentioned they won't catch everything tho.
  - Perhaps get
  - You can also do manual testing!

- \* but...

  - Semi- and Automated tools wont catch everything.
  - When doing manual testing as someone without a disability you most likely miss the context and expertise using these tools and use them in different ways than someone that truly rely on them.

- Should i impair myself in the name of accessibility? //(probably find a better wording for this... It's a bit... harsh?)
  - Nah, do user testing instead and...
  - ...Take a look at this great article from [a11y.coffe](Link to article regarding) and see what you can expect from the different kinds of testing with the resources you have available!

### Some quick wins to get you started

<!-- Should conretize what some accessibility tasks might look like and give some actionable items to get started on -->

- Find a pre-existing list of quick wins and plop into here with correct attribution

### Resources to get started

<!-- point people in the direction of where to go from here? -->

- A11y.coffe
- I think Jesper might have a single site or two :-)
