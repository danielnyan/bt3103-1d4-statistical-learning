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
        <pre class="prettyprint lang-python" contenteditable @keydown="handleKeyDown($event)">
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
        /* To do: add four spaces after cursor */
      };
      /* More to do: indent at same level */
    }
  },
});

let fuee = new Vue({
  el: "#app",
  methods: {
  }
});