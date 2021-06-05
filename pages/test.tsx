import { FC } from "react"
import Header from "../components/Header/Header"
import HTMLRenderer from "../components/HTMLRenderer/HTMLRenderer"

interface TestProps {}

const html = `<p><strong>Hey there</strong>, welcome to your new home on the web! Awesome</p><p>Unlike social networks, this one is all yours. Publish your work on a custom domain, invite your audience to subscribe, send them new content by email newsletter, and offer premium subscriptions to generate sustainable recurring revenue to fund your work. </p><p>Ghost is an independent, open source app, which means you can customize absolutely everything. Inside the admin area, you'll find straightforward controls for changing themes, colors, navigation, logos and settings — so you can set your site up just how you like it. No technical knowledge required.</p><p>If you're feeling a little more adventurous, there's really no limit to what's possible. With just a little bit of HTML and CSS you can modify or build your very own theme from scratch, or connect to Zapier to explore advanced integrations. Advanced developers can go even further and build entirely custom workflows using the Ghost API.</p><p>This level of customization means that Ghost grows with you. It's easy to get started, but there's always another level of what's possible. So, you won't find yourself outgrowing the app in a few months time and wishing you'd chosen something more powerful!</p><hr><p>For now, you're probably just wondering what to do first. To help get you going as quickly as possible, we've populated your site with starter content (like this post!) covering all the key concepts and features of the product.</p><p>You'll find an outline of all the different topics below, with links to each section so you can explore the parts that interest you most.</p><p>Once you're ready to begin publishing and want to clear out these starter posts, you can delete the "Ghost" staff user. Deleting an author will automatically remove all of their posts, leaving you with a clean blank canvas.</p><h2 id="your-guide-to-ghost">Your guide to Ghost</h2><ul><li><a href="http://localhost:2368/design/">Customizing your brand and site settings</a></li><li><a href="http://localhost:2368/write/">Writing &amp; managing content, an advanced guide for creators</a></li><li><a href="http://localhost:2368/portal/">Building your audience with subscriber signups</a></li><li><a href="http://localhost:2368/sell/">Selling premium memberships with recurring revenue</a></li><li><a href="http://localhost:2368/grow/">How to grow your business around an audience</a></li><li><a href="http://localhost:2368/integrations/">Setting up custom integrations and apps</a></li></ul><p>If you get through all those and you're hungry for more, you can find an extensive library of content for creators over on <a href="https://ghost.org/blog/">the Ghost blog</a>.</p><hr><h2 id="getting-help">Getting help</h2><p>If you need help, <a href="https://ghost.org/pricing/">Ghost(Pro)</a> customers can always reach our full-time support team by clicking on the <em>Ghost(Pro)</em> link inside their admin panel.</p><p>If you're a developer working with the codebase in a self-managed install, check out our <a href="https://forum.ghost.org">developer community forum</a> to chat with other users.</p><p>Have fun!</p>`

const Test: FC<TestProps> = ({}) => {
  return (
    <div className="inner">
      <Header />
      <div className="content-area">
        <HTMLRenderer
          className="prose max-w-none prose-2xl prose-red text-primary-100"
          html={html}
        />
      </div>
    </div>
  )
}

export default Test
