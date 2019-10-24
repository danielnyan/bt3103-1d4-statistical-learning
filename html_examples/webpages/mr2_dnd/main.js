Vue.component("variableblock", {
    props: ["name"],
    template: `
    <span class="unselectable draggable block" @mousedown="handleMouseDown($event)" @mouseup="handleMouseUp($event)">
    {{name}}
    </span>
  `,
    methods: {
        initialize : async function(e) {
            this.$emit("initialize", this);
        },
        handleMouseDown(e) {
            this.$el.style.position = "absolute";
            this.$el.style.zIndex = 9001;
            document.body.appendChild(this.$el);

            this.moveAt(e.pageX, e.pageY);

            if (this.onMouseMove) return;

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
            if (this.currentDroppable != null) {
                if (this.currentDroppable != this.previousParent) {
                    this.$emit("itemclicked");
                }
                else {
                    this.previousParent.appendChild(this.$el);
                }
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

let variables = new Vue({
    el: '#app',
    data: {
        unselected: [
            { name: "cylinder" },
            { name: "displacement" },
            { name: "horsepower" },
            { name: "weight" },
            { name: "acceleration" },
            { name: "year" },
            { name: "origin" }
        ],
        selected: []
    },
    methods: {
        swapVar(name) {
            for (let index in this.unselected) {
              if (this.unselected[index].name == name) {
                let variable = this.unselected[index];
                this.selected.push(variable);
                this.unselected.splice(index, 1);
                return;
              }
            }
            for (let index in this.unselected) {
              if (this.selected[index].name == name) {
                let variable = this.selected[index];
                this.unselected.push(variable);
                this.selected.splice(index, 1);
                return;
              }
            }
        },
        initialise(e) {
            Vue.nextTick(() => {
                e.previousParent = e.$el.parentElement;
            })
        },
    }
});