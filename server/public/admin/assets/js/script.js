document.addEventListener('DOMContentLoaded', () => {
    /* Button Status */
    const buttonStatus = document.querySelectorAll('[button-status]')
    if(buttonStatus.length > 0) {
        let url = new URL(window.location.href)
        buttonStatus.forEach(button => {
            button.addEventListener('click', () => {
                const status = button.getAttribute('button-status')
                if(status) {
                    url.searchParams.set('status', status)
                } else {
                    url.searchParams.delete('status')
                }
                window.location.href = url.href
            })
        })
    }
    /* Button Status End*/
    // Upload Avatar
    const uploadAvatar = document.querySelector("[upload-avatar]");
    if(uploadAvatar) {
        const uploadAvatarInput = document.querySelector("[upload-avatar-input]");
        const uploadAvatarPreview = document.querySelector("#avatar-preview"); // Đã sửa từ [upload-avatar-preview] thành #avatar-preview

        // Kiểm tra và ẩn khu vực xem trước nếu không có ảnh avatar
        if(!uploadAvatarPreview.src || uploadAvatarPreview.src.trim() === "") {
            uploadAvatarPreview.classList.add('hidden');
        } else {
            uploadAvatarPreview.classList.remove('hidden');
        }

        // Xử lý khi người dùng chọn ảnh mới
        uploadAvatarInput.addEventListener("change", (e) => {
            const file = e.target.files[0];
            if(file) {
                uploadAvatarPreview.src = URL.createObjectURL(file);
                uploadAvatarPreview.classList.remove('hidden');
            }
        });
    }
    // End Upload Avatar



    //Upload Thumbnail
    const uploadThumbnail = document.querySelector("[upload-thumbnail]");
    if(uploadThumbnail) {
        const uploadThumbnailInput = document.querySelector("[upload-thumbnail-input]");
        const uploadThumbnailPreview = document.querySelector("[upload-thumbnail-preview]");

        if(!uploadThumbnailPreview.src || uploadThumbnailPreview.src.trim() === "") {
            uploadThumbnailPreview.classList.add('hidden');
        }

        uploadThumbnailInput.addEventListener("change", (e) => {
            const file = e.target.files[0];
            if(file) {
                uploadThumbnailPreview.src = URL.createObjectURL(file);
                uploadThumbnailPreview.classList.remove('hidden');
            }
        });
    }
    //End Upload Thumbnail

    const uploadImages = document.querySelector("[upload-images]");
    if(uploadImages) {
        const uploadImagesInput = document.querySelector("[upload-images-input]");
        const uploadImagesPreview = document.querySelector(".upload-images-preview"); // Chỉnh sửa selector

        // Xử lý hiển thị ảnh từ cơ sở dữ liệu
        const initialImages = Array.from(uploadImagesPreview.querySelectorAll('img'));
        initialImages.forEach(img => {
            img.classList.add('preview-image'); // Thêm lớp cho các ảnh nếu cần
        });

        uploadImagesInput.addEventListener("change", (e) => {
            const files = e.target.files;
            if(files.length > 0) {
                // Xóa các ảnh hiện tại trong khu vực xem trước
                uploadImagesPreview.innerHTML = '';

                // Hiển thị các ảnh đã chọn
                Array.from(files).forEach(file => {
                    const img = document.createElement('img');
                    img.src = URL.createObjectURL(file);
                    img.classList.add('preview-image'); // Thêm lớp cho các ảnh nếu cần
                    uploadImagesPreview.appendChild(img);
                });
            }
        });

        // Nếu không có ảnh ban đầu, ẩn khu vực xem trước
        if(uploadImagesPreview.children.length === 0) {
            uploadImagesPreview.classList.add('hidden');
        } else {
            uploadImagesPreview.classList.remove('hidden');
        }
    }

    //Upload Video
    const uploadVideo = document.querySelector("[upload-video]");
    if(uploadVideo) {
        const uploadVideoInput = document.querySelector("[upload-video-input]");
        const uploadVideoPreview = document.querySelector("[upload-video-preview]");

        if(!uploadVideoPreview.src || uploadVideoPreview.src.trim() === "") {
            uploadVideoPreview.classList.add('hidden');
        }

        uploadVideoInput.addEventListener("change", (e) => {
            const file = e.target.files[0];
            if(file) {
                uploadVideoPreview.src = URL.createObjectURL(file);
                uploadVideoPreview.classList.remove('hidden');

            }
        });
    }

    //End video-preview

    //Show alert
    const showAlert = document.querySelector("[show-alert]");
    if(showAlert) {
        const time = parseInt(showAlert.getAttribute("data-time"));
        setTimeout(() => {
            showAlert.classList.add("alert-hidden");
        }, time);

        const closeAlert = showAlert.querySelector("[close-alert]");
        closeAlert.addEventListener("click", () => {
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

        if(keyword) {
            url.searchParams.set('keyword', keyword);
        } else {
            url.searchParams.delete('keyword');
        }
        window.location.href = url.href;
    })
    /* Form Search End */

    /* Pagination */
    const btnsPagination = document.querySelectorAll('[button-pagination]')
    if(btnsPagination) {
        let url = new URL(window.location.href)

        btnsPagination.forEach(button => {
            button.addEventListener('click', () => {
                const page = button.getAttribute('button-pagination')
                if(page) {
                    url.searchParams.set('page', page)
                }
                window.location.href = url.href
            })
        })
    }
    /* End Pagination */

    /* Checkbox multi */
    const checkBoxMulti = document.querySelector('[checkbox-multi]')
    if(checkBoxMulti) {
        const inputCheckAll = checkBoxMulti.querySelector("input[name ='checkall']")
        const inputsIds = checkBoxMulti.querySelectorAll("input[name ='id']")

        inputCheckAll.addEventListener('click', () => {
            if(inputCheckAll.checked) {
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

                if(countChecked == inputsIds.length) {
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
    if(formChangeMulti) {
        formChangeMulti.addEventListener('submit', e => {
            e.preventDefault()

            const checkBoxMulti = document.querySelector('[checkbox-multi]')
            const inputsChecked = checkBoxMulti.querySelectorAll(
                "input[name ='id']:checked"
            )

            const typeChange = e.target.elements.type.value
            if(typeChange == 'delete-all') {
                const isConfirm = confirm('Bạn có chắc muốn xóa những bộ phim này?')

                if(!isConfirm) {
                    return
                }
            }

            if(inputsChecked.length > 0) {
                let ids = []
                const inputIds = formChangeMulti.querySelector("input[name='ids']")
                inputsChecked.forEach(input => {
                    const id = input.value
                    if(typeChange == 'change-position') {
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
if(sort) {
    let url = new URL(window.location.href)
    const sortSelect = sort.querySelector("[sort-select]");
    const sortClear = sort.querySelector("[sort-clear]");

    sortSelect.addEventListener("change", (e) => {
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

    if(sortKey && sortValue) {
        const stringSort = `${sortKey}-${sortValue}`
        const optionSelected = sortSelect.querySelector(`option[value='${stringSort}'`);

        optionSelected.selected = true;
    }
}

//End Sort


