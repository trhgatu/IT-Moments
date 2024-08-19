document.addEventListener('DOMContentLoaded', () => {
    /* Button Status */
    const buttonStatus = document.querySelectorAll('[button-status]')
    if (buttonStatus.length > 0) {
        let url = new URL(window.location.href)
        buttonStatus.forEach(button => {
            button.addEventListener('click', () => {
                const status = button.getAttribute('button-status')
                if (status) {
                    url.searchParams.set('status', status)
                } else {
                    url.searchParams.delete('status')
                }
                window.location.href = url.href
            })
        })
    }
    /* Button Status End*/

    //Upload Image
    const uploadImage = document.querySelector("[upload-image]");
    if (uploadImage) {
        const uploadImageInput = document.querySelector("[upload-image-input]");
        const uploadImagePreview = document.querySelector("[upload-image-preview]");

        if (!uploadImagePreview.src || uploadImagePreview.src.trim() === "") {
            uploadImagePreview.classList.add('hidden');
        }

        uploadImageInput.addEventListener("change", (e) => {
            const file = e.target.files[0];
            if (file) {
                uploadImagePreview.src = URL.createObjectURL(file);
                uploadImagePreview.classList.remove('hidden');
            }
        });
    }
    //End Upload Image

    //Show alert
    const showAlert = document.querySelector("[show-alert]");
    if(showAlert){
        const time = parseInt(showAlert.getAttribute("data-time"));
        setTimeout(() =>{
            showAlert.classList.add("alert-hidden");
        }, time);

        const closeAlert = showAlert.querySelector("[close-alert]");
        closeAlert.addEventListener("click", () =>{
            showAlert.classList.add("alert-hidden");
        });
    }
    //End show alert

    /* Form Search */
    const formSearch = document.querySelector('#form-search')
    formSearch.addEventListener('submit', e => {
        let url = new URL(window.location.href)
        e.preventDefault()
        const keyword = e.target.elements.keyword.value.trim();

        if (keyword) {
            url.searchParams.set('keyword', keyword);
        } else {
            url.searchParams.delete('keyword');
        }
        window.location.href = url.href;
    })
    /* Form Search End */

    /* Pagination */
    const btnsPagination = document.querySelectorAll('[button-pagination]')
    if (btnsPagination) {
        let url = new URL(window.location.href)

        btnsPagination.forEach(button => {
            button.addEventListener('click', () => {
                const page = button.getAttribute('button-pagination')
                if (page) {
                    url.searchParams.set('page', page)
                }
                window.location.href = url.href
            })
        })
    }
    /* End Pagination */

    /* Checkbox multi */
    const checkBoxMulti = document.querySelector('[checkbox-multi]')
    if (checkBoxMulti) {
        const inputCheckAll = checkBoxMulti.querySelector("input[name ='checkall']")
        const inputsIds = checkBoxMulti.querySelectorAll("input[name ='id']")

        inputCheckAll.addEventListener('click', () => {
            if (inputCheckAll.checked) {
                inputsIds.forEach(input => {
                    input.checked = true
                })
            } else {
                inputsIds.forEach(input => {
                    input.checked = false
                })
            }
        })

        inputsIds.forEach(input => {
            input.addEventListener('click', () => {
                const countChecked = checkBoxMulti.querySelectorAll(
                    "input[name = 'id']:checked"
                ).length //Tìm đến ô input đã check

                if (countChecked == inputsIds.length) {
                    inputCheckAll.checked = true
                } else {
                    inputCheckAll.checked = false
                }
            })
        })
    }
    /* End Checkbox multi */

    //Form Change Multiple
    const formChangeMulti = document.querySelector('[form-change-multi]')
    if (formChangeMulti) {
        formChangeMulti.addEventListener('submit', e => {
            e.preventDefault()

            const checkBoxMulti = document.querySelector('[checkbox-multi]')
            const inputsChecked = checkBoxMulti.querySelectorAll(
                "input[name ='id']:checked"
            )

            const typeChange = e.target.elements.type.value
            if (typeChange == 'delete-all') {
                const isConfirm = confirm('Bạn có chắc muốn xóa những bộ phim này?')

                if (!isConfirm) {
                    return
                }
            }

            if (inputsChecked.length > 0) {
                let ids = []
                const inputIds = formChangeMulti.querySelector("input[name='ids']")
                inputsChecked.forEach(input => {
                    const id = input.value
                    if (typeChange == 'change-position') {
                        const position = input
                            .closest('tr')
                            .querySelector("input[name = 'position']").value
                        ids.push(`${id}-${position}`)
                    } else {
                        ids.push(id)
                    }
                })
                inputIds.value = ids.join(', ')

                formChangeMulti.submit()
            } else {
                alert('vui lòng chọn ít nhất 1 bản ghi')
            }
        })
    }
    //End Form Change Multiple
});

//Sort
    const sort = document.querySelector("[sort]");
    if(sort){
        let url = new URL(window.location.href)
        const sortSelect = sort.querySelector("[sort-select]");
        const sortClear = sort.querySelector("[sort-clear]");

        sortSelect.addEventListener("change", (e) =>{
            const value = e.target.value;
            const [sortKey, sortValue] = value.split("-");
            console.log(sortKey);
            console.log(sortValue);

            url.searchParams.set("sortKey", sortKey);
            url.searchParams.set("sortValue", sortValue);

            window.location.href = url.href;
        })

        //Xóa sort
        sortClear.addEventListener("click", () => {
            url.searchParams.delete("sortKey");
            url.searchParams.delete("sortvalue");

            window.location.href = url.href;
        });

        //Thêm selected cho option
        const sortKey = url.searchParams.get("sortKey");
        const sortValue = url.searchParams.get("sortValue");

        if(sortKey && sortValue){
            const stringSort = `${sortKey}-${sortValue}`
            const optionSelected = sortSelect.querySelector(`option[value='${stringSort}'`);

            optionSelected.selected = true;
        }
    }

//End Sort