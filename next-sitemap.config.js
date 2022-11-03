/** @type {import("next-sitemap").IConfig}  */

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || undefined

const sitemapCfg = {
  siteUrl,
  generateRobotsTxt: true,
  exclude: ["/server-sitemap.xml"],
  robotsTxtOptions: {
    additionalSitemaps: [`${siteUrl}/server-sitemap.xml`],
  },
}

module.exports = sitemapCfg
