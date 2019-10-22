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
        <p>Submit</p>
      </div>
    </div>
  `,
  methods: {
    execute() {
      console.log(JSON.stringify(this.$el.children[0].children[0].innerText));
    },
    handleKeyDown(e) {
      /* check if e.shiftKey is true for Shift Tab */
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
    },
    handleUndo() {
      console.log("Updated!");
    }
  },
  data() {
    return {
      undoHistory : [],
      hasChanged : false
    }
  },
  created() {
    console.log("Test");
    setInterval(() => {this.handleUndo()}, 10000);
  }
});

let fuee = new Vue({
  el: "#app",
  methods: {
  }
});