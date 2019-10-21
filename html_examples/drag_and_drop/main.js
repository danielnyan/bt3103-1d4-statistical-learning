/*
var fuee = new VUE( {
    el : "#app",
    data : {
    },
    methods : {
      
    }
  }
)*/
function handle_mousedown(e){
  ball = this;
  parent = this.parentNode;
  
  ball.style.position = 'absolute';
  ball.style.zIndex = 1000;
  document.body.appendChild(ball);

  moveAt(event.pageX, event.pageY);

  function moveAt(pageX, pageY) {
    ball.style.left = pageX - ball.offsetWidth / 2 + 'px';
    ball.style.top = pageY - ball.offsetHeight / 2 + 'px';
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
    let elemsBelow = document.elementsFromPoint(event.clientX, event.clientY);
    let droppableBelow = $(elemsBelow).get(1);
    
    if (!droppableBelow) return;
    if (droppableBelow.className.includes("droppable")) {
      if (currentDroppable != droppableBelow) {
        currentDroppable = droppableBelow;
        enterDroppable(currentDroppable);
      }
    } else {
      if (currentDroppable) {
        leaveDroppable(currentDroppable);
        currentDroppable = null;
      }
    }
  }

  document.addEventListener('mousemove', onMouseMove);

  ball.onmouseup = function() {
    document.removeEventListener('mousemove', onMouseMove);
    ball.onmouseup = null;
    if (currentDroppable) {
      currentDroppable.appendChild(ball);
    } else {
      parent.appendChild(ball);
    }
    $(ball).css({position:"", zIndex:"", left:"", top:""});
    if (currentDroppable) {
      leaveDroppable(currentDroppable);
      currentDroppable = null;
    }
  };
}

$(document).ready(() => {
  $(".draggable").mousedown(handle_mousedown);
  $(".draggable").prop({draggable: "true"});
  $(".draggable").on("dragstart", () => {return false});
})

let currentDroppable = null;

function enterDroppable(elem) {
  elem.style.backgroundColor = "pink";
}

function leaveDroppable(elem) {
  elem.style.backgroundColor = "";
}

$editables = $('[contenteditable=true]');

$editables.filter(".codeblock").on('keypress',function(e){
  if(e.keyCode==13){ //enter && shift

    e.preventDefault(); //Prevent default browser behavior
    if (window.getSelection) {
        var selection = window.getSelection();
        range = selection.getRangeAt(0);
        
        br = document.createElement("br");
        textNode = document.createTextNode("\u00a0");
        
        //Passing " " directly will not end up being shown correctly
        range.deleteContents();//required or not?
        range.insertNode(br);
        range.collapse();
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
});

document.execCommand("defaultParagraphSeparator", false, "<br>");