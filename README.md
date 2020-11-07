<h1>News Web Application</h1>
This is a news application I developed for the Capital One Summit. It servers as an easy and reliable way to access information about current events about sports, entertainment, and technology.

<h2>Challenges/Solutions</h2>
<p>
For this application, I focused on ensuring I take advantage of the modularity that comes with React Components and apply them whenever necessary. Some notable use cases I found were wrapping the JSX elements I wanted to animate into higher-level components and creating re-usable components to list the articles received from the API. 
</p>

<h4>Challenge 1: Animating elements once the user clicked on Read More</h4>
<p>
    When I started developing the primary article view component, I knew I wanted to animate the information in and out with initial and exit animations. However, I quickly found myself wrapping each element that I wanted to animate in its own container and creating several boolean state values to control said animations. Understanding this is not the optimal solution, I decided to create a component that handled this logic.
</p>

<p>
    Initially I developed this component (called AnimatedComponent) to request an external component to render along with various animation properties. However, because I abstracted the animation logic into a separate component, I was able to easily add additional functionality I had not originally planned on developing.
</p>

<p>
    One such feature I implemented was style inheritance. I requested a styles object that is shipped with modular Sass files and an object that specifies key-value pairs for specific Sass classes. Then by using this properties to style the component that was passed in, I was able to create animations without breaking previous designs.
</p>

<h4>Challenge 2: Delaying animations for previous exit animations to finish</h4>
<p>
    When I was implementing animations, I chose to use the Framer Motion API since its components were very similar to their JSX counterparts. For example, in JSX I could write
</p>
    
```html
<div>Content</div>
```

<p>
    While in Framer Motion, I could animate this div by writing
</p>

```tsx
const [renderComponent, setRenderComponent] = useState<boolean>(true);
```

```jsx
renderComponent && <motion.div>Animated Content</motion.div>;
```

<p>
    However, in order to control the animations, I needed to toggle boolean values determining whether the component can be seen using React Hook useState functions. However, the issue was as soon a I toggle a boolean value to false, it would become true also instantenously in order to load the new content. This would force Framer Motion to abruptly end and completely skip the exit animations.
</p>

<p>
    The solution I came up was to use the setTimeout function to call a function after a fixed number of milliseconds that toggled this boolean on whenever I toggled it off. This in turn automatically scheduled a delayed the process of re-rendeing by a couple millisseconds. Therefore, everytime the component was taken out of the virtual DOM, the delay gave Framer Motion enough time to animate it out. Then, after a few moments, the component would once again re-enter the virtual DOM and be animated in with the new article information.
</p>

<p>
    Although not the largest solution, this solution required me to use the most amount of thought because I had to combine the functionality of a native window with JSX logic. This ended up being extremely effective due to the asynchronous nature of setTimeout allowing for other Javascript to be run while it is waiting.
</p>

<h4>Challenge 3: Reducing Load Time</h4>
<p>
    The design of my web application allows me to separate the content for entertainment, technology, and sports. Therefore, this allowed me to implement a version of lazy loading that improved the load time of the website.
</p>

<p>
    Instead of making 3 API calls for entertainment articles, technology articles, and sports articles, I only make one API call depending on the category the user is viewing. For example, if he or she is viewing the sports category, then the application makes a request to only the sports category endpoint. If he or she clicks on the entertainment option, then the application sends a request to only the entertainment endpoint.
</p>

<p>
    Overall, this reduces how long the user has to wait for the content to render and speeds up the web application.
</p>

<h4>Challenge 4: Loading default images if API did not provide its own images</h4>
<p>
    When animated article images as backgrounds, I realized some articles did not provide an image in the first place. However, this could mean the image was null, undefined, or simply an empty string. 
</p>
    
<p>
    Therefore, to handle for this, I downloaded an image locally and created a function check the validity of an image url. This allowed me to avoid having no background and instead render an image that can load faster than its article counterparts.
</p>

<h2>Other Development Choices</h2>

For the animations themselves, I chose to use Framer Motion particularly because it allowed for straight-forward enter and exit animations while also providing components that were easily replaceable with their JSX counterparts. This decision enabled me to initally write code without animating any elements and then be able to animate them efficiently. <br />

To style the components, I used Sass modules for two reasons: enhanced styling capabilities due to variables and nesting and their local-scope. Declaring variables in Sass allowed me to declare variables globally that could be used anywhere in my Sass files. I primarily used this functionality to store colors and transition information. Moreover, this allowed me to easily test different color schemes to see what fit best with my application as I simply had to change the values in the variables Sass file. <br />

Lastly, I decided to use Typescript for this application since it allowed for enhanced code readability and strong type checking. in both situations, the results included faster and more effective development as Typescript informed me of whatever properties I need to pass into components while also specifying what purpose a specific component or function may have had. <br />

<h3>Developer: Sarthak Kamboj</h3>
<h4>Built With</h4>
<ul>
    <li>Frontend Framework: NextJs</li>
    <li>Animations: Framer Motion</li>
    <li>Styling: Sass Modules</li>
    <li>Coding: TypeScript</li>
</ul>

<h4>Installation</h4>
<ol>
    <li>Move into the frontend directory</li>
    <li>Run "npm i"</li>
    <li>Run "npm run dev"</li>
</ol>
