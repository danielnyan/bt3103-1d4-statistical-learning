/* To do: send data in the form ["editable"][0], ["hidden"][0], 
["shown"][0], where "shown" contains your test cases. 
{'userToken': 'DtQmo', 'public0': {'undefined': ''}, 
'editable': {'0': 'a = 4\nb = 5'}, 
'shown': {'0': 'assert(a == 5)'}, 
'hidden': {'0': 'assert(b == 5)'}}
Then return isComplete, jsonFeedback, htmlFeedback, textFeedback
*/

Vue.component("codeblock", {
  props: ["test", "feedbackId"],
  template: `
    <div>
      <div class="codeblock">
        <pre class="prettyprint lang-python" contenteditable 
        @keydown="handleKeyDown($event)">
def test_function():
&nbsp;&nbsp;&nbsp;&nbsp;for i in range(5):
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print("Edit me!")</pre>
      </div>
      <div class="unselectable codesubmit">
        <p @click="execute">Submit</p>
      </div>
    </div>
  `,
  methods: {
    async execute() {
      let solution = JSON.stringify(this.$el.children[0].children[0].innerText);
      
      console.log(JSON.stringify(this.$el.children[0].children[0].innerText));
    },
    handleKeyDown(e) {
      /* check if e.shiftKey is true for Shift Tab */
      this.hasChanged = true;
      if (e.key === "Tab") {
        e.preventDefault();
        let original = this.$el.children[0].children[0].innerText;
        let selection = window.getSelection();
        let range = selection.getRangeAt(0);
        let newText = original.slice(0, range.startOffset) + "    " 
          + original.slice(range.startOffset, original.length);
        $(this.$el.children[0].children[0]).text(newText);
        range.collapse();
        selection.removeAllRanges();
        console.log(range);
        selection.addRange(range);
      };
      /* More to do: indent at same level */
      /* Possibly pretty-print? https://github.com/google/code-prettify/issues/555 */
      if (e.key === "Enter") {
      };
      
      if (e.key === "z" && e.ctrlKey) {
        e.preventDefault();
        console.log(this.undoHistory);
        if (this.undoHistory.length === 1) {
          $(this.$el.children[0].children[0]).text(this.undoHistory[0]);
        } else {
          this.undoHistory.pop();
          $(this.$el.children[0].children[0]).text
            (this.undoHistory[this.undoHistory.length - 1]);
        }
      }
    },
    // To do: handle redos. 
    handleUndo() {
      if (this.hasChanged) {
        let text = this.$el.children[0].children[0].innerText;
        if (text !== this.undoHistory[this.undoHistory.length - 1]) {
          this.undoHistory.push(this.$el.children[0].children[0].innerText);
        }
        this.hasChanged = false;
      }
      if (this.undoHistory.length > 100) {
        this.undoHistory.shift();
      }
    }
  },
  data() {
    return {
      undoHistory : [],
      hasChanged : true
    }
  },
  created() {
    setTimeout(() => {this.handleUndo()}, 5);
    setInterval(() => {this.handleUndo()}, 1000);
  }
});

let fuee = new Vue({
  el: "#app",
  methods: {
  }
});