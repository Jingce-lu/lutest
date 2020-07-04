const path = require("path")
const fs = require("fs")

function getSidebar(sidebarPath) {
  const menuPath = path.join(process.cwd(), "docs", sidebarPath)
  const curPath = fs.readdirSync(menuPath)
  const sidebars = []
  curPath.forEach((item) => {
    if (
      item.toLocaleLowerCase() !== "readme.md" &&
      item !== ".DS_Store" &&
      item.indexOf(".") !== 0
    ) {
      let curSidebar = item.replace(".md", "")
      if (item.indexOf(".md") < 0) {
        curSidebar = {
          title: item,
          path: `/${sidebarPath}/${item}/`,
        }
        const childrenPath = fs.readdirSync(path.join(process.cwd(), "docs", sidebarPath, item))
        const curSidebarChildren = []
        childrenPath.forEach((childrenItem) => {
          if (
            childrenItem.toLocaleLowerCase() !== "readme.md" &&
            childrenItem.indexOf(".md") >= 0 &&
            item.indexOf(".") !== 0
          ) {
            curSidebarChildren.push({
              title: childrenItem.replace(".md", ""),
              path: `/${sidebarPath}/${item}/${childrenItem.replace(".md", "")}`,
            })
          }
        })
        curSidebar.children = curSidebarChildren
      }
      sidebars.push(curSidebar)
    }
  })
  return sidebars
}
module.exports = {
  title: "Lu notes",
  description: " ",
  dest: "./dist",
  head: [["link", { rel: " ", href: " " }]],
  markdown: {
    lineNumbers: true, // 代码块显示行号
    toc: {
      includeLevel: [2, 3],
    },
  },
  // base: '/lu-frontwiki/',
  base: "/lutest/",
  // configureWebpack: {
  //   resolve: {
  //     alias: {
  //       '@': `${__dirname}/lu-frontwiki`,
  //     }
  //   }
  // },

  // configureWebpack: (config, isServer) => {
  //   if (!isServer) {
  //     // config.output.filename = 'assets/js/[name].[chunkhash:8].js'
  //     config.output.filename = 'assets/js/[name].js'
  //   }
  // },

  themeConfig: {
    nav: [
      { text: "首页", link: "/" },
      { text: "Prepare", link: "/prepare/" },
      { text: "Js", link: "/js/" },
      // { text: 'React', link: '/react/' },
      // { text: 'Vue', link: '/vue/' },
      // { text: '框架通识', link: '/framework/' },
      // { text: '安全性能', link: '/safety/' },
      // { text: 'FullStack', link: '/fullstack/' },
      // { text: '手撸代码无敌', link: '/handrolledcode/' },
      // { text: '数据算法', link: '/dataalgorithm/' },
      // { text: '工程化', link: '/engineering/' },
      // { text: '其他', link: '/other/' },
    ],
    sidebar: {
      "/js/": getSidebar("js"),
      "/prepare/": getSidebar("prepare"),
      // '/react/':getSidebar('react'),
      // '/vue/':getSidebar('vue'),
      // '/framework/':getSidebar('framework'),
      // '/safety/':getSidebar('safety'),
      // '/fullstack/': getSidebar('fullstack'),
      // '/handrolledcode/': getSidebar('handrolledcode'),
      // '/dataalgorithm/': getSidebar('dataalgorithm'),
      // '/engineering/': getSidebar('engineering'),
      // '/other/':getSidebar('other'),
    },
  },
}
