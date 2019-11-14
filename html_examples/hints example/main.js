Vue.component("hint", {
  props: ["questionid", "openheight", "title"],
  template: `
    <div>
      <div @click="toggleExpand">{{title}}</div>
      <div style="height:0px;overflow:hidden;background-color:red">
        <slot></slot>
      </div>
    </div>
  `,
  data() {
    clicked : false;
    opened : false;
  },
  methods: {
    toggleExpand() {
      if (!this.clicked) {
        this.clicked = true;
        this.sendData();
      }
      if (this.opened) {
        $(this.$el.children[1]).animate({height: 0}, 500);
      } else {
        $(this.$el.children[1]).animate({height: this.openheight}, 500);
      }
      this.opened = !this.opened;
    },
    sendData() {
      const nekoUrl = window.location.origin + "/Prod/lambda_handler";
      const xmlHttp = new XMLHttpRequest();
      xmlHttp.open("POST", nekoUrl, true);
      xmlHttp.send(JSON.stringify({
        userId: sessionStorage.getItem("userID"),
        operation: "hint",
        questionId: this.questionid
      }));
    }
  }
});

let fuee = new Vue({
  el: "#app",
});