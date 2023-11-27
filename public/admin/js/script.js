let url = new URL(window.location.href);
// const buttonsStatus = document.querySelectorAll("[button-status]");

// if (buttonsStatus.length > 0) {

//     buttonsStatus.forEach(button => {
//         button.addEventListener("click", () => {
//             const status = button.getAttribute("button-status");

//             if (status) {
//                 url.searchParams.set("status", status);
//             } else {
//                 url.searchParams.delete("status");
//             }

//             window.location.href = url.href;
//         });
//     });
// }

const formSearch = document.querySelector("#form-search");
if(formSearch){
    formSearch.addEventListener("submit", (e)=>{
        e.preventDefault();
   
        const name = e.target.elements.name.value;
        const deviceName = e.target.elements.deviceName.value;
        const timeIn = e.target.elements.timeIn.value;
        
        if(name){
            url.searchParams.set("name", name)
        }else{
            url.searchParams.delete("name");
        }
        
        if(deviceName){
            url.searchParams.set("deviceName", deviceName)
        }else{
            url.searchParams.delete("deviceName");
        }

        if(timeIn){
            url.searchParams.set("timeIn", timeIn)
        }else{
            url.searchParams.delete("timeIn");
        }

        window.location.href = url.href;
        
    })
}


//paginaton
const buttonPagination = document.querySelectorAll("[button-pagination]");
if(buttonPagination.length>0){
    buttonPagination.forEach((button)=>{
        button.addEventListener("click", (e)=>{
            const page = button.getAttribute("button-pagination");
            if(page){
                url.searchParams.set("page", page);
            }else{
                url.searchParams.delete("page");
            }
            window.location.href = url.href;
        })
    });
}
//end pagination

//checkbox multi
const checkboxMulti =document.querySelector("[checkbox-multi]");
if(checkboxMulti){
    const inputCheckAll = checkboxMulti.querySelector("input[name = 'checkall']");
    const inputIds = checkboxMulti.querySelectorAll("input[name = 'id']");
    inputCheckAll.addEventListener("click", (e)=>{
        if(inputCheckAll.checked){
            inputIds.forEach((input)=>{
                input.checked = true;
            });
        }else{
            inputIds.forEach((input)=>{
                input.checked = false;
            });
        }
    })
    inputIds.forEach((input)=>{
        input.addEventListener("click",(e)=>{
            const countChecked = checkboxMulti.querySelectorAll("input[name = 'id']:checked").length;
            if(countChecked == inputIds.length){
                inputCheckAll.checked = true;
            }else{
                inputCheckAll.checked = false;
            }
        })
    })
}

//form change multi

const formChangeMulti = document.querySelector("[form-change-multi]");
if(formChangeMulti){
    
    formChangeMulti.addEventListener("submit", (e)=>{
        e.preventDefault();
        const inputChecked = document.querySelectorAll("input[name = 'id']:checked");
        const typeChange = e.target.elements.type.value;
        if(typeChange == "delete-all") {
            const isConfirm = confirm("Bạn có chắc muốn xóa những sản phẩm này?");
      
            if(!isConfirm) {
              return;
            }
          }
        if(inputChecked.length > 0){
            let ids = [];
            inputChecked.forEach((input)=>{
                const id = input.value;
                if(typeChange == "change-position"){
                    const inputPosition = input.closest("tr").querySelector("input[name='position']");
                    const position = inputPosition.value;
                    ids.push(`${id}-${position}`);
                }
                else{
                    ids.push(id);
                }
            });
            const inputIds = formChangeMulti.querySelector("input[name = 'ids']");
            inputIds.value = ids.join(", ");
            formChangeMulti.submit();
            
        }
        else{
            alert("Vui lòng chọn ít nhất 1 sản phẩm");
        }
    })
}
// const showAlert = document.querySelector("[show-alert]");
// if(showAlert) {
//   const time = parseInt(showAlert.getAttribute("data-time"));
//   const closeAlert = showAlert.querySelector("[close-alert]");

//   setTimeout(() => {
//     showAlert.classList.add("alert-hidden");
//   }, time);

//   closeAlert.addEventListener("click", () => {
//     showAlert.classList.add("alert-hidden");
//   });
// }