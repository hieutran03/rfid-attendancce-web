// const buttonsChangeStatus = document.querySelectorAll("[button-change-status]");
// if(buttonsChangeStatus.length>0){
//     buttonsChangeStatus.forEach((button)=>{
//         const id = button.getAttribute("data-id");
//         const status = button.getAttribute("data-status");
//         const formChangeStatus = document.querySelector("#form-change-status");
//         button.addEventListener("click", (e)=>{
//             const dataPath = formChangeStatus.getAttribute("data-path");
//             const changeStatus = (status === "active") ? "inactive" : "active";
//             const action = `${dataPath}/${changeStatus}/${id}/?_method=PATCH`;
//             formChangeStatus.action = action;
//             formChangeStatus.submit();
//         })
//     })
// }

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


