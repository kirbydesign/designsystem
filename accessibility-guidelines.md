# Accessibility in Kirby

[ Index goes here when converted to HTML]

## Can Kirby make an application accessible?

The short answer is no.

The accessibility of an application largely depends on its markup. In other words, it depends on how the components in Kirby are used. The role of the components is to allow for developers to make their applications accessible; they should not be in the way.

This means the developer has a lot of responsibility to ensure their application is accessible. All of this might be frustrating news for those new to accessibility; where to begin?

Besides, accessibility is hard. There is a lot to consider when thinking about the accessibility of an application as can be seen in the following sections. But [as with fixing a bug](https://assets.deepsource.io/032e723/images/blog/cost-of-fixing-bugs/chart.jpg), it is easier to consider accessibility from the start; the further in an applications lifecycle it is improved, the more expensive and harder it is to do.

We in team Kirby elieve it is the job of an responsible frontend developer to prioritize and care about accessibility. See it as an opportunity to learn more about the web technologies you are building with every day and [exploring new ways of improving your product for everyone](https://uxdesign.cc/the-unseen-benefits-of-accessibility-ef259202b638).

So where do you begin? Our suggestion is to read on!

### Mindset - what is accessibility?

In an attempt to make it easier to get started with accessibility, the following section details our mindset towards accessibility and how we think about it in Team Kirby.

#### Accessibility is not a feature

Accessibility is not something that is tagged onto an application like a feature.

**All** applications have some degree of accessibility, whether it is considered or not. If it is not actively prioritized, the accessibility of an application is most likely poor. It is similar to the quality of a codebase; simply by existing it has some degree of quality. Not prioritizing it might have consequences in the long run, such as the codebase being hard to modify. Analogously not prioritizing accessibility might make an application impossible to use for people with various disabilities.

Then how can it be improved? Beginning applying ARIA tags and using automated tests such as Lighthouse, might spring to mind. This is definitely better than nothing. However accessibility is more than that.

#### A whole different UX

The markup might be correct and all the correct ARIA tags can be utilized. But if for example an application relies on color to convey important information, that will be lost on someone who is color blind, unless it is supplemented in other ways. This is not something that can be caught by an automated test but requires context and the insight of a human.

Likewise consider someone using a screen reader to search through a list containing hundreds of records based on date. If the date text reads "Created on March 25", they will have to wait for "created on" to be read aloud for every record. If the structure was instead altered to be "March 25, created on" the important information would be read aloud first.

In many ways working with accessibility is improving a whole different UX than the one people without disabilities is used to. It has its own patterns, pains and ways of being used.

#### More than screen readers

Many developers will be aware of the fact that their application might be accessed by users depending on screen readers. If this is the only focus in terms of accessibility, the application is mainly made more accessible for those with disabilities affecting sight.

However there are a lot of disabilities to consider when improving accessibility. Someone who has trouble hearing or is deaf will need captions to understand videos. A person with motor problems will have a hard time clicking an element within a timespan.

Someone with [vestibular or seizure](https://webaim.org/articles/seizure/) disorder would prefer that their [preference for reduced motion](https://web.dev/prefers-reduced-motion/) is respected. If not they might get nauseous or have an outright seizure if excessive motion such as parallax scrolling or strobelight like effects is used.

#### An ego-centric argument for accessibility

To conclude accessibility is many things. Various aspects of your application ranging from the markup to design are affected by it.

And it might seem overwhelming... So besides helping those with disabilities to access and use the digital tools we all rely on in the 21st century; why care as a developer without any disabilities?

So here is a more ego-centric argument for caring about accessibility: you will most likely be disabled to some degree in the future. Apologies if it sounds bleak.

You might break your dominant arm causing you to rely on keyboard navigation. More severely you could get into a car accident paralyzing you from the neck down. Moreover your sight, motor skills and reaction time will most likely decrease as you get older.

In any case would you be able to rely on the digital tools you do now in a world where developers do not consider accessibility?

## Kirby's role

As mentioned the accessibility of an application largely depends on how it is built and designed. This means that the Kirby design system can not magically make an application accessible. So what is Kirby's role exactly when it comes to accessibility?

### Do not be in the way

The components in the Kirby design system should allow developers to create accessible applications; they can be thought of as HTML elements. It is possible to use them in ways that allows for accessibility. On the contrary, it is also possible to use them in a lot of completely inaccessible ways.

But the components in Kirby should never be in the way of making an application accessible.

If a developer ever experiences that a Kirby component causes problems when working with accessibility; do not hesitate to create an issue in the [Kirby Design System Github repository](https://github.com/kirbydesign/designsystem/issues/new/choose).

### A knowledge source

While we are not there yet; we desire to give developers using the Kirby design system the best possible foundation for working with accessibility in their applications. We wish to highlight do's, don'ts, anti-patterns and best practices as part of the documentation for the components in Kirby.

## We need the help of developers

In Team Kirby we are on a learning journey ourselves. In order to be able to meet our desire to become a knowledge source, we need the help of developers using Kirby.

If they have encountered any anti-patterns, best practices, do's or don'ts in their applications. Then we would like to hear about it in order to highlight it as part of the documentation so other developers can learn from their experience.

We have created a Github discussions thread where experiences can be shared [here](create a gh discussions here). If a submission is highlighted in the documentation it will happen anonymously.

## How do I get started improving the accessibility of my application?

A lot of great material is freely available online; so instead of reiterating what they already state, we will point you in the direction of some of our favorite resources.

### A11y.coffee: A great starting point

The content on [a11y.coffee](https://a11y.coffee) is a great starting point; especially its [coffee metaphor](https://a11y.coffee/a11y-testing-making-coffee/) serves as a good overview of testing methods. Furthermore it also has a list of [quick wins](https://a11y.coffee/quick-wins/) for those who want to get their hands dirty.

### Topics for exploration

When diving into a new field it can be useful to have some topics and a general idea of which way to direct learning. We believe the following topics are important to have knowledge about, when getting into web accessibility:

- [How to evaluate acessibility](https://a11y.coffee/start-testing/) in your application. As mentioned, automatic testing can not be relied on alone; skill and education is required as a developer.
- How to write proper [semantic markup](https://jerryjones.dev/2020/04/20/the-importance-of-html/). This is how to gain the most with the least effort. Not only does it benefit people with disabilities; it makes your application more robust, future proof and is easier for computers to process.
- How and [when](https://gomakethings.com/when-should-you-use-aria/) to use ARIA attributes.

### Additional resources

While a11y.coffee has a [list of resources](https://a11y.coffee/dig-in/) to further explore the field of accessibility, we would like to supplement that with some of our own resources:

- [WebAIM articles](https://webaim.org/articles/): a list of high quality articles from WebAIM ranging from a [beginner friendly introduction to a11y](https://webaim.org/intro/) to an [8-step implementation models](https://webaim.org/articles/implementation/).
- [The a11y project checklist](https://www.a11yproject.com/checklist/): a user friendly checklist based on [WCAG](https://www.w3.org/WAI/standards-guidelines/wcag/) for evaluating and identifying opportunities for improving accessibility in applications. The a11y project also has a large [list of resources](https://www.a11yproject.com/resources/) from newsletters and books to podcasts.
- [Web Content Accessibility (WCAG) overview](https://www.w3.org/WAI/standards-guidelines/wcag/): WCAG is a standard by the W3C Web Accessibility Initiative (WAI) that explains how to make content more accessible to people with disabilities. This overview serves as a good starting point for diving into the [WCAG standard](https://www.w3.org/TR/WCAG21/).
