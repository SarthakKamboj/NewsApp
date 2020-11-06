<h1>News Web Application</h1>
This is a news application I developed for the Capital One Summit. It servers as an easy and reliable way to access information about current events about sports, entertainment, and technology.

<h2>Development Challenges/Solutions</h2>
For this application, I focused on ensuring I take advantage of the modularity that comes with React Components and apply them whenever necessary. Some notable use cases I found were wrapping the JSX elements I wanted to animate into higher-level components and creating re-usable components to list the articles received from the API.

In the first situation, I knew I wanted to animate the primary article I display with initial and exit animations. However, I quickly found myself wrapping each element in its own container and creating a boolean state values associate with said element. Understanding this is not the optimal solution, I decided to create a component that handled this logic. By abstracting the animation logic into a separate component, I was able to easily add additional functionality such as style inheritance and event-based triggers. Moreover, when I used this component in my ArticleToShow component, it allowed for better code-readility and less state variables to handle for.

Moreover, as the development went on, I realized the number of animation variables I was created in my ArticleToShow component was becoming too much. Therefore, I decided to place these specifications in a separate file and export them instead. This change decreased the number of lines of the component drastically while maintaining all the animations.

In the second situation, I created a NewSummary component that displayed information about a specific article in a condensed form. Abstracting this process into its own component enabled me to add one crucial feature: pagination. Since the logic for rendering individual article summaries and rendering groups of articles were separate, I easily able to manipulate how many news articles I could show on the side pane.

<h2>Other Development Choices</h2>

For the animations themselves, I chose to use Framer Motion particularly because it allowed for straight-forward enter and exit animations while also providing components that were easily replaceable with their JSX counterparts. This decision enabled me to initally write code without animating any elements and then be able to animate them efficiently.

To style the components, I used Sass modules for two reasons: enhanced styling capabilities due to variables and nesting and their local-scope. Declaring variables in Sass allowed me to declare variables globally that could be used anywhere in my Sass files. I primarily used this functionality to store colors and transition information. Moreover, this allowed me to easily test different color schemes to see what fit best with my application as I simply had to change the values in the variables Sass file.

Lastly, I decided to use Typescript for this application since it allowed for enhanced code readability and strong type checking. in both situations, the results included faster and more effective development as Typescript informed me of whatever properties I need to pass into components while also specifying what purpose a specific component or function may have had.

<h3>Developer: Sarthak Kamboj</h3>
<h4>Tech Stack</h4>
<ul>
   <li>Frontend Framework: NextJs</li>
   <li>Primary Packages Used
   <ul>
        <li>Framer Motion (Animations)</li>
        <li>Sass Modules(For CSS Preprocessing)</li>
        <li>Typescript</li>
   </ul>
   </li>
</ul>
<h4>Overview</h4>
<h6>My goal for this news application was to create a </h6>
