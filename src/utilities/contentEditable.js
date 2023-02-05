// onKeyDown
export const saveContentAfterPressEnter = (e) => {
   if (e.key === 'Enter') {
      e.preventDefault();
      e.target.blur();
   }
}

// Select all input value on click
export const selectAllInLineText = (e) => {
   e.target.focus();
   e.target.select();
   // document.execCommand('selectAll', false, null); replace by select()
}


