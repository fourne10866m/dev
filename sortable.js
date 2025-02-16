function TableDragDrop(id, options) {
   // Lignes de la table
   var trs = document.querySelectorAll("#" + id + " tbody tr");
   // (PART B) "CURRENT ROW BEING DRAGGED"
   var dragged;

   // (PART C) DRAG-AND-DROP MECHANISM
   for (let tr of trs) {
      // Ligne draggable
      tr.draggable = true;

      // (C2) ON DRAG START - SET "CURRENTLY DRAGGED" & DATA TRANSFER
      tr.ondragstart = e => {
         dragged = tr;
         e.dataTransfer.dropEffect = "move";
         e.dataTransfer.effectAllowed = "move";
         e.dataTransfer.setData("text/html", tr.innerHTML);
      };

      // (C3) PREVENT DRAG OVER - NECESSARY FOR DROP TO WORK
      tr.ondragover = e => e.preventDefault();

      // (C4) ON DROP - "SWAP ROWS"
      tr.ondrop = e => {
         // On autorise le drop  
         e.preventDefault();
         // Si la ligne n'est pas la même que celle qui est en cours de drag
         if (dragged != tr) {
            // On récupère les lignes de la table
            let draggedIndex2 = dragged.rowIndex;
            let targetIndex2 = tr.rowIndex;
            // On appelle la fonction de drop
            if (options && options.functionDrop) options.functionDrop({ dragged: dragged.dataset, target: tr.dataset })
            // Si l'index de la ligne en cours de drag est inférieur à l'index de la ligne sur laquelle on drop
            if (draggedIndex2 < targetIndex2) {
               tr.after(dragged);
            } else {
               tr.before(dragged);
            }
         }
      };

      // (C5) COSMETICS - HIGHLIGHT ROW "ON DRAG HOVER"
      tr.ondragenter = () => tr.classList.add("hover");
      tr.ondragleave = () => tr.classList.remove("hover");
      tr.ondragend = () => {
         for (let r of trs) { r.classList.remove("hover"); }
      };
   }
}

// (PART D) INITIATE DRAG-AND-DROP
window.addEventListener("load", () => {
   // (PART A) GET TABLE ROWS, EXCLUDE HEADER ROW
   TableDragDrop("demo", {
      functionDrop(res) {
         console.log(res);
      }
   });

   TableDragDrop("demo2", {
      functionDrop(res) {
         console.log(res);
      }
   });
});