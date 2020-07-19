<template>
  <div class="brochure-list">
    <div>
      <a href="05-react" class="link">
        <div>
          <img
            src="https://cdn.docschina.org/static/media/react.16ed8348.svg"
            alt="react"
          />
        </div>
        <div>React</div>
      </a>
    </div>
    <div>
      <a href="04-vue" class="link">
        <div>
          <img
            src="https://cdn.docschina.org/static/media/vue.9a45fc76.svg"
            alt="vue"
          />
        </div>
        <div>Vue</div>
      </a>
    </div>
    <div>
      <a href="03-js" class="link">
        <div>
          <img
            src="https://cdn.docschina.org/static/media/javascript.2d368183.svg"
            alt="javascript"
          />
        </div>
        <div>Javascript</div>
      </a>
    </div>
    <div>
      <a href="07-node" class="link">
        <div>
          <img
            src="https://cdn.docschina.org/static/media/node.a2d39902.svg"
            alt="javascript"
          />
        </div>
        <div>Node</div>
      </a>
    </div>
  </div>
</template>

<script>
var json = require("../json/html.json");
export default {
  name: "BrochureList",
  mounted() {
    console.log(1111);
    console.log(json.msg);
  }
};
</script>

<style lang="stylus" scoped>
.brochure-list {
  display: flex;
  flex-wrap: wrap;

  > div {
    width: 29%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    margin: 0.5rem;
    box-sizing: border-box;
  }

  img {
    width: 90%;
    padding: 0.5rem;
    max-width: 100px;
  }

  .link {
    text-align: center;
  }
}
</style>
