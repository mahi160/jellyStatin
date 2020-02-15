<template>
  <div class="quote-section">
    <b-container>
      <blockquote class="mx-auto">
        <p>
          <i>{{ quote[0].name }}</i>
        </p>
      </blockquote>
      <i class="quote">{{ quote[0].auth }}</i>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "quote-section",
  data() {
    return {
      quote: []
    };
  },
  created() {
    //Run when the page is creaed.
    fetch("http://quotes.rest/qod.json")
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.quote.push({
          name: data.contents.quotes[0].quote,
          auth: data.contents.quotes[0].author
        });
      });
  }
};
</script>

<style lang="scss" scoped>
.quote {
  color: #ccc;
  position: absolute;
}
blockquote {
  width: 700px;
  margin: 1.5em 10px;
  padding: 0.5em 10px;
  quotes: "\201C""\201D""\2018""\2019";
}
blockquote::before {
  color: #ccc;
  content: open-quote;
  font-size: 4em;
  line-height: 0.1em;
  margin-right: 0.25em;
  vertical-align: -0.4em;
}
blockquote::after {
  color: #ccc;
  content: close-quote;
  font-size: 4em;
  line-height: 0.1em;
  margin-left: 0.25em;
  vertical-align: -0.4em;
}
blockquote p {
  font-family: cursive;
  display: inline;
  color: #959699;
  font-size: 24px;
}
</style>
