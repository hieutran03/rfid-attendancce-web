const buttonsDelete = document.querySelectorAll("[button-delete]");
console.log(buttonsDelete);
if(buttonsDelete.length>0){
    buttonsDelete.forEach(button=>{
        const id = button.getAttribute("data-id");
        const formDeleteItem = document.querySelector("#form-delete-item")
        button.addEventListener("click", (e)=>{
            const isConfirm = confirm("Bạn có chắc chắn muốn xóa?");
            if(isConfirm){
                const dataPath = formDeleteItem.getAttribute("data-path");
                const action = `${dataPath}/${id}?_method=DELETE`;
                formDeleteItem.action = action;
                formDeleteItem.submit();
            }
            
        })
    })
}


