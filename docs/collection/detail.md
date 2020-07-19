<template>
  <div>
    <CollectionDetail
      :title="title"
      :shortAnswer.async="setAnswer()"
      :corp_tag="corp_tag"
    />
  </div>
</template>

<script>
export default {
  name: "CollectionList",
  data() {
    return {
      title: "",
      corp_tag: []
    }
  },
  mounted() {
    this.window = window;
    if(sessionStorage.getItem("dataDetail")){
        let {corp_tag, short_answer} = JSON.parse(sessionStorage.getItem("dataDetail"));
        this.title = short_answer.title;
        this.corp_tag = corp_tag;
      }
  },
  methods: {
    setAnswer(){
      if(sessionStorage.getItem("dataDetail")){
        const { short_answer} = JSON.parse(sessionStorage.getItem("dataDetail"));
        return short_answer.analysis
      }
    }
  }
};
</script>

<style lang="stylus" scoped>

</style>
