/* Credits to https://gist.github.com/adambene/b3de67803e634be8f7d6baa273b5f447
for coroutine and delay code */
const coroutine = nextValue => iterator => {
    const {
        done,
        value
    } = iterator.next(nextValue);

    if (done) {
        return;
    }

    if (value.constructor === Promise) {
        value.then(promiseValue => {
            coroutine(promiseValue)(iterator);
        });
    } else {
        coroutine(value)(iterator);
    }
};

const delay = (ms, result) =>
    new Promise(resolve => setTimeout(() => resolve(result), ms));

// This one's stolen from https://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript
const arraysEqual = function(a, b) {
    if (a === b)
        return true;
    if (a == null || b == null)
        return false;
    if (a.length != b.length)
        return false;

    for (let i = 0; i < a.length; ++i) {
        if (a[i] !== b[i])
            return false;
    }
    return true;
}

Vue.component("variableblock", {
    props: ["name"],
    template: `
  <span class="unselectable draggable block" @mousedown="handleMouseDown($event)" @mouseup="handleMouseUp($event)">
  {{name}}
  </span>
  `,
    methods: {
        initialize: async function(e) {
            this.$emit("initialize", this);
        },
        handleMouseDown(e) {
            this.$el.style.position = "absolute";
            this.$el.style.zIndex = 9001;
            document.body.appendChild(this.$el);

            this.moveAt(e.pageX, e.pageY);

            if (this.onMouseMove)
                return;

            this.onMouseMove = (e) => {
                this.moveAt(e.pageX, e.pageY);
                let elemsBelow = document.elementsFromPoint(e.clientX, e.clientY);

                let foundDroppable = false;
                for (candidate of elemsBelow) {
                    if (candidate.className.includes("droppable")) {
                        if (this.currentDroppable != candidate) {
                            this.currentDroppable = candidate;
                        }
                        foundDroppable = true;
                        break;
                    }
                }
                if (!foundDroppable) {
                    if (this.currentDroppable) {
                        this.currentDroppable = null;
                    }
                }
            };
            document.addEventListener("mousemove", this.onMouseMove);
        },
        moveAt(pageX, pageY) {
            this.$el.style.left = pageX - this.$el.offsetWidth / 2 + 'px';
            this.$el.style.top = pageY - this.$el.offsetHeight / 2 + 'px';
        },
        handleMouseUp(e) {
            document.removeEventListener("mousemove", this.onMouseMove);
            this.onMouseMove = null;
            this.$el.style.position = "";
            this.$el.style.zIndex = "";
            this.$el.style.left = "";
            this.$el.style.top = "";
            if (this.currentDroppable !== null) {
                this.currentDroppable.appendChild(this.$el);
                if (this.currentDroppable !== this.previousParent) {
                    this.$emit("itemclicked");
                }
                this.previousParent = this.currentDroppable;
            } else {
                this.previousParent.appendChild(this.$el);
            }
        },
    },
    data() {
        return {
            imageUrl: "",
            currentDroppable: null,
            previousParent: null,
            onMouseMove: null,
        }
    },
    created() {
        this.initialize();
    }
});

Vue.component("bar", {
    props: ["name", "val"],
    template: `
    <div style="height:16px; margin:10px;">
      <div class="bar-description">{{name}}</div>
        <div class="bar" :style="{width:size*60+'%','background-color':colour}"></div>
        <div class="bar-description" style="margin-left:10px">{{Math.round(this.size*1000)/1000}}</div>
      </div>
    </div>
  `,
    data() {
        return {
            size: 0,
            colour: "#CCC",
            targetValue: null
        }
    },
    methods: {
        * adjustBar() {
            while (Math.abs(this.size - this.targetValue) > 0.001) {
                this.size = (this.size) + 0.2 * (this.targetValue - this.size);
                if (this.size > 0.05) {
                    this.colour = "#EBB";
                } else {
                    this.colour = "#CCC";
                }
                yield delay(25, null);
            }
            this.size = this.targetValue;
            this.targetValue = null;
        }
    },
    watch: {
        val(newValue, oldValue) {
            if (this.targetValue == null) {
                this.targetValue = newValue;
                coroutine()(this.adjustBar());
            } else {
                this.targetValue = newValue;
            }
        }
    },
    created() {
        this.targetValue = this.val;
        coroutine()(this.adjustBar());
    }
});

Vue.component("rsqbar", {
    props: ["val", "target"],
    template: `
  <div style="height:22px">
    <div class="bar-description">Adj R^2</div>
    <div class="bar-container">
      <div class="bar" :style="{width:size*100+'%','background-color':colour}"></div>
      <div :style="{position:'absolute', left:target*100+'%'}">
        | &larr; {{size > target ? "Reached!" : "Goal"}}
      </div>
    </div>
  </div>
  `,
    data() {
        return {
            size: this.val,
            colour: "#CCC",
            targetValue: null
        }
    },
    methods: {
        * adjustBar() {
            while (Math.abs(this.size - this.targetValue) > 0.00001) {
                if (this.size < this.targetValue) {
                    this.colour = "#EEA";
                } else {
                    this.colour = "#EBB";
                }
                this.size = (this.size) + 0.2 * (this.targetValue - this.size);
                yield delay(25, null);
            }
            if (this.size > this.target) {
                this.colour = "#9E9";
            } else {
                this.colour = "#CCC";
            }
            this.size = this.targetValue;
            this.targetValue = null;
        }
    },
    watch: {
        val(newValue, oldValue) {
            if (this.targetValue == null) {
                this.targetValue = newValue;
                coroutine()(this.adjustBar());
            } else {
                this.targetValue = newValue;
            }
        }
    },
});

Vue.component("feedback", {
    props: ["status", "correct", "incorrect"],
    template: `
    <div class="feedback">
      <div style="color:green; display:none">{{correct}}</div>
      <div style="color:red; display:none">{{incorrect}}</div>
      <div style="color:black; display:none">Checking answer...</div>
    </div>
  `,
    watch: {
        status(newValue, oldValue) {
            const children = $(this.$el).children();
            let correctElement = children.eq(0);
            let incorrectElement = children.eq(1);
            let checkingElement = children.eq(2);
            switch (newValue) {
                case "correct":
                    correctElement.slideDown(500);
                    incorrectElement.slideUp(500);
                    checkingElement.slideUp(500);
                    break;
                case "incorrect":
                    correctElement.slideUp(500);
                    incorrectElement.slideDown(500);
                    checkingElement.slideUp(500);
                    break;
                case "checking":
                    correctElement.slideUp(500);
                    incorrectElement.slideUp(500);
                    checkingElement.slideDown(500);
                    break;
                default:
                    correctElement.slideUp(500);
                    incorrectElement.slideUp(500);
                    checkingElement.slideUp(500);
                    break;
            }
        }
    },
});

// Note: there can only be one footmenu in the page. 
Vue.component("footmenu", {
    data() {
        expand: false;
    },
    template: `
    <div class="footmenu w3-center">
      <div class="unselectable footmenu-button" @click="toggleExpand">
        Menu
      </div>
      <a href="#" class="w3-bar-item w3-button">Return to Top</a>
      <a href="contents.html" class="w3-bar-item w3-button">Return to Menu</a>
    </div>
  `,
    methods: {
        toggleExpand() {
            this.expand = !this.expand;
            if (this.expand) {
                // footmenu already has a transition property in the CSS file
                $(".footmenu").css({ height: "60px" });
            } else {
                $(".footmenu").css({ height: "20px" });
            }
        }
    }
});

Vue.component("hint", {
    props: ["openheight", "title", "wrong_attempts"],
    template: `
    <div>
    </br>
      <div style="display:none;" class='hint-button' @click="toggleExpand">{{title}}</div>
      <div style="height:0px;overflow:hidden;color:red">
		<p><slot></slot></p>
      </div>
    </div>
  `,
    data() {
        clicked: false;
        opened: false;
    },
    watch: {
        wrong_attempts(newValue, oldValue) {
            if (newValue >= 2) {
                $(this.$el.children[1]).slideDown(500);
            }
        }
    },
    methods: {
        toggleExpand() {
            if (!this.clicked) {
                this.clicked = true;
            }
            console.log(this.$el.children);
            if (this.opened) {
                $(this.$el.children[2]).animate({ height: 0 }, 500);
            } else {
                $(this.$el.children[2]).animate({ height: this.openheight }, 500);
            }
            this.opened = !this.opened;
        }
    }
});

const parseCode = function(id) {
    let lines = $("#" + id).next().find(".codemirror-line");
    if (lines.length === 0) {
        lines = $("#" + id).next().find(".CodeMirror-line");
    }
    let output = ""
    for (let i = 0; i < lines.length; i++) {
        let line = lines.eq(i).text();
        line = line.replace(/[\u200B-\u200D\uFEFF]/g, '');
        if (line) {
            output += line + '\n';
        }
    }
    output = output.replace(/\s+/g, '');
    return output;
}

const initializeCodeblocks = function(codeblockNames) {
    for (let name of codeblockNames) {
        CodeMirror.fromTextArea(document.getElementById(name), {
            lineNumbers: true,
            mode: "python",
            theme: "night",
            indentUnit: 4
        });
    }
}

const retrieveProgress = function() {
    return new Promise((resolve) => {
      resolve(JSON.parse(sessionStorage.getItem("progress")));
    });
}

const setProgress = function(questionId) {
  retrieveProgress().then((result) => {
    let progress = result;
    if (!progress.includes(questionId)) {
      progress.push(questionId);
      sessionStorage.setItem("progress", JSON.stringify(progress));
    }
  });
}